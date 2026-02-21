/**
 * Geeft het volledige URL-pad voor een bestand in public/.
 * In productie staat de site op /doortjes.schilderijen/, lokaal op /.
 */
export function getPublicUrl(path: string): string {
  const base = import.meta.env.PROD ? "/doortjes.schilderijen" : "";
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return base ? `${base}/${normalized}` : `/${normalized}`;
}
