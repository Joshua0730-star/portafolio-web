#!/usr/bin/env node
/**
 * AI translation pipeline for Astro Content Collections.
 *
 * Reads `src/content/projects/*.md` (Spanish source files), translates them
 * to English using Google's Gemini API, and writes the result as
 * `src/content/projects/<slug>.en.md` with `lang: "en"` in the frontmatter.
 *
 * Usage:
 *   GEMINI_API_KEY=xxx pnpm translate           # only missing translations
 *   GEMINI_API_KEY=xxx pnpm translate:force     # re-translate everything
 *
 * Why Gemini? It is multilingual, fast, has a generous free tier and ships
 * a JSON-mode that we leverage to keep frontmatter strictly structured.
 *
 * The script is provider-agnostic: swap `callLLM()` for any other API.
 */

import { readFile, writeFile, readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PROJECTS_DIR = join(ROOT, "src", "content", "projects");

const FORCE = process.argv.includes("--force");
const TARGET_LANG = "en";
const SOURCE_LANG = "es";

const API_KEY = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

if (!API_KEY) {
  console.error(
    "[translate] Missing GEMINI_API_KEY. Get one at https://aistudio.google.com/apikey",
  );
  process.exit(1);
}

// ---------- Frontmatter parsing (no extra deps) ----------

/** Extract frontmatter and body from a markdown file. */
function parseMarkdown(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error("Invalid markdown: no frontmatter found.");
  return { frontmatter: m[1], body: m[2] };
}

/**
 * Light-touch frontmatter mutator: rewrites the value of a top-level key
 * in YAML without altering anything else. Adds the key if missing.
 */
function setFrontmatterKey(frontmatter, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const line = `${key}: ${JSON.stringify(value)}`;
  if (re.test(frontmatter)) return frontmatter.replace(re, line);
  return `${line}\n${frontmatter}`;
}

// ---------- Gemini call ----------

async function callLLM(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.9,
        maxOutputTokens: 8192,
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini ${res.status}: ${text}`);
  }
  const json = await res.json();
  const out = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!out) throw new Error(`Empty response: ${JSON.stringify(json)}`);
  return out.trim();
}

// ---------- Translation prompt ----------

const SYSTEM = `You are a senior technical translator for a software-architect portfolio.
Translate the given markdown from ${SOURCE_LANG} (Spanish) to ${TARGET_LANG} (English).
Hard rules:
- Preserve the original markdown structure: headings (##, ###), lists, code blocks, blockquotes, links, image references — DO NOT alter syntax.
- Translate human-readable text inside frontmatter (title, summary, coverAlt, gallery[].alt, gallery[].caption). Keep keys, types, slugs, urls, dates, technology names, file paths and identifiers unchanged.
- DO NOT translate technology names ("Node.js", "TypeScript", "Astro", "React", "PostgreSQL", "Tailwind CSS", "MVC", "MCP", "SDD", "TDD", etc.).
- DO NOT translate proper nouns ("Cap Bros", "Code Jay", "Figma", "Windsurf", "Claude Code", "Codex", "Gemini", "JayDev").
- Keep the natural professional tone of the original. No extra prose, no comments.
- Output ONLY the translated markdown file (frontmatter + body). No fences, no preamble.`;

async function translateMarkdown(raw) {
  const prompt = `${SYSTEM}\n\n--- INPUT MARKDOWN START ---\n${raw}\n--- INPUT MARKDOWN END ---`;
  let out = await callLLM(prompt);
  // Strip stray code fences if the model adds them despite instructions.
  out = out.replace(/^```(?:markdown|md)?\s*\n/, "").replace(/\n```\s*$/, "");
  return out;
}

// ---------- Driver ----------

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

function isSourceFile(name) {
  return name.endsWith(".md") && !name.endsWith(`.${TARGET_LANG}.md`);
}

function targetFilename(sourceName) {
  return sourceName.replace(/\.md$/, `.${TARGET_LANG}.md`);
}

async function main() {
  await ensureDir(PROJECTS_DIR);
  const entries = await readdir(PROJECTS_DIR);
  const sources = entries.filter(isSourceFile);

  if (sources.length === 0) {
    console.log("[translate] No source files found in", PROJECTS_DIR);
    return;
  }

  console.log(
    `[translate] ${sources.length} source files, target=${TARGET_LANG}, model=${MODEL}, force=${FORCE}`,
  );

  let translated = 0;
  let skipped = 0;
  for (const src of sources) {
    const target = targetFilename(src);
    const targetPath = join(PROJECTS_DIR, target);
    if (!FORCE && existsSync(targetPath)) {
      const [s, t] = await Promise.all([
        stat(join(PROJECTS_DIR, src)),
        stat(targetPath),
      ]);
      if (t.mtimeMs >= s.mtimeMs) {
        console.log(`  · skip  ${src}  (translation up-to-date)`);
        skipped++;
        continue;
      }
    }

    console.log(`  → translating ${src} ...`);
    try {
      const raw = await readFile(join(PROJECTS_DIR, src), "utf8");
      const translatedMd = await translateMarkdown(raw);
      // Force lang: "en" in the translated frontmatter even if the model
      // forgot or kept the source value.
      const { frontmatter, body } = parseMarkdown(translatedMd);
      const fixedFm = setFrontmatterKey(frontmatter, "lang", TARGET_LANG);
      const final = `---\n${fixedFm}\n---\n${body}`;
      await writeFile(targetPath, final, "utf8");
      translated++;
      console.log(`    ✓ wrote ${target}`);
    } catch (err) {
      console.error(`    ✗ failed: ${err.message}`);
    }
  }

  console.log(
    `[translate] done. translated=${translated} skipped=${skipped} total=${sources.length}`,
  );
}

main().catch((err) => {
  console.error("[translate] fatal:", err);
  process.exit(1);
});
