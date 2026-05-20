import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import { ui } from "../i18n/ui";

export type Project = CollectionEntry<"projects">;

/** The "canonical" slug shared between language variants. e.g. "ecommerce-cap-bros". */
export function canonicalSlug(slug: string): string {
  return slug.replace(/\.(en|es)$/, "");
}

function lang(p: Project): Locale {
  return (p.data.lang ?? "es") as Locale;
}

/**
 * Pick the best variant of each project for the requested locale.
 * Falls back to the default locale when a translation is missing.
 */
async function getLocalizedProjects(locale: Locale): Promise<Project[]> {
  const all = await getCollection("projects");
  const byCanonical = new Map<string, Project[]>();
  for (const p of all) {
    const key = canonicalSlug(p.slug);
    const arr = byCanonical.get(key) ?? [];
    arr.push(p);
    byCanonical.set(key, arr);
  }
  const picked: Project[] = [];
  for (const variants of byCanonical.values()) {
    const exact = variants.find((v) => lang(v) === locale);
    const fallback = variants.find((v) => lang(v) === DEFAULT_LOCALE);
    const chosen = exact ?? fallback ?? variants[0];
    if (chosen) picked.push(chosen);
  }
  return picked;
}

export async function getAllProjects(
  locale: Locale = DEFAULT_LOCALE,
): Promise<Project[]> {
  const all = await getLocalizedProjects(locale);
  return all.sort((a, b) => {
    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;
    if (a.data.featured && b.data.featured) {
      const ao = a.data.featuredOrder ?? Infinity;
      const bo = b.data.featuredOrder ?? Infinity;
      return ao - bo;
    }
    return (
      new Date(b.data.publishedDate).getTime() -
      new Date(a.data.publishedDate).getTime()
    );
  });
}

export async function getFeaturedProjects(
  locale: Locale = DEFAULT_LOCALE,
  limit = 4,
): Promise<Project[]> {
  const all = await getLocalizedProjects(locale);
  return all
    .filter((p) => p.data.featured)
    .sort(
      (a, b) =>
        (a.data.featuredOrder ?? Infinity) - (b.data.featuredOrder ?? Infinity),
    )
    .slice(0, limit);
}

export async function getOtherProjects(
  locale: Locale = DEFAULT_LOCALE,
): Promise<Project[]> {
  const all = await getLocalizedProjects(locale);
  return all
    .filter((p) => p.data.category === "other")
    .sort(
      (a, b) =>
        new Date(b.data.publishedDate).getTime() -
        new Date(a.data.publishedDate).getTime(),
    );
}

export async function getAdjacentProjects(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<{ prev: Project | null; next: Project | null }> {
  const all = await getAllProjects(locale);
  const target = canonicalSlug(slug);
  const idx = all.findIndex((p) => canonicalSlug(p.slug) === target);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export function statusLabel(
  status: Project["data"]["status"],
  locale: Locale = DEFAULT_LOCALE,
): string {
  return ui[locale][`status.${status}` as const];
}

export function statusTone(status: Project["data"]["status"]): string {
  return {
    production: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/30",
    beta: "bg-amber-500/10 text-amber-600 ring-amber-500/30",
    private: "bg-slate-500/10 text-slate-600 ring-slate-500/30",
    "self-hosted": "bg-violet-500/10 text-violet-600 ring-violet-500/30",
    wip: "bg-sky-500/10 text-sky-600 ring-sky-500/30",
  }[status];
}
