/** Vaste opties voor type / materiaal + filter op de overzichtspagina. */
export const MATERIALEN = [
  "Acryl op doek",
  "Acryl op hout",
  "Houtskool op papier",
  "Onbekend",
] as const;

export type Materiaal = (typeof MATERIALEN)[number];
