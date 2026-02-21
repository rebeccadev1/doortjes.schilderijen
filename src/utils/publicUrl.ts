/**
 * Geeft het volledige URL-pad voor een bestand in public/.
 * Nodig voor GitHub Pages waar de site onder een subpath staat (bijv. /doortjes.schilderijen/).
 */
export function getPublicUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return base + normalized;
}
