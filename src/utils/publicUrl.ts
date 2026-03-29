/**
 * Geeft het volledige URL-pad voor een bestand in public/.
 * Volgt Vite `base` (custom domain = `/`, anders bijv. `/repo/`).
 */
export function getPublicUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "";
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return base ? `${base}/${normalized}` : `/${normalized}`;
}
