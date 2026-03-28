/** Vaste volgorde voor het thema-filter op de overzichtspagina. */
export const THEMAS = [
  "Water/Land/Lucht",
  "Landschappen",
  "Bomen",
  "Dieren",
  "Bloemen",
  "Huis",
  "Van Alles Wat",
] as const;

export type Thema = (typeof THEMAS)[number];
