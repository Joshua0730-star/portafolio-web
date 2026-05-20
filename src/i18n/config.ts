export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export function getLocaleFromUrl(url: URL): Locale {
  const seg = url.pathname.split("/").filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(seg)
    ? (seg as Locale)
    : DEFAULT_LOCALE;
}

/** Build a localized path. Default locale has no prefix. */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/** Strip locale prefix to get the canonical (default-locale) path. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && (LOCALES as readonly string[]).includes(parts[0])) {
    parts.shift();
  }
  return "/" + parts.join("/");
}
