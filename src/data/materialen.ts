/** Vaste opties voor type / materiaal + filter op de overzichtspagina. */
export const MATERIALEN = [
  "Acryl op doek",
  "Acryl op hout",
  "Acryl op papier",
  "Houtskool op papier",
  "Divers",
  "Onbekend",
] as const;

export type Materiaal = (typeof MATERIALEN)[number];
