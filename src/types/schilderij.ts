import type { Materiaal } from "../data/materialen";

export interface Schilderij {
  id: string;
  titel: string;
  beschrijving: string;
  /** Bijv. "30 × 40 cm" of "Onbekend" */
  afmeting: string;
  materiaal: Materiaal;
  thema: string[];
  afbeeldingUrl: string;
}
