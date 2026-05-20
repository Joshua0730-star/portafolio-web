# Scripts

## `translate-content.mjs`

AI translation of project markdown files (`src/content/projects/*.md`) from Spanish to English using Google Gemini.

### Setup

1. Get a free API key at https://aistudio.google.com/apikey
2. Set the env var:

```powershell
# PowerShell
$env:GEMINI_API_KEY = "your-key-here"
```

```bash
# bash / zsh
export GEMINI_API_KEY=your-key-here
```

### Usage

```bash
pnpm translate           # only translate files that don't have an EN version yet
pnpm translate:force     # re-translate everything (overwrites existing .en.md files)
```

Output is written next to each source file as `<slug>.en.md` with `lang: "en"` in the frontmatter. Astro picks up the right variant automatically thanks to the locale-aware loader in `src/lib/projects.ts`.

### Customization

- Change the model via `GEMINI_MODEL` (default: `gemini-2.5-flash`).
- The translation prompt lives in `SYSTEM` inside the script — adjust if you want a different tone or stricter glossary.
- The script is provider-agnostic: replace `callLLM()` with any other API (OpenAI, Anthropic, local model) and everything else keeps working.
