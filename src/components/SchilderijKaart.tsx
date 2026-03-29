import type { Schilderij } from "../types/schilderij";
import { Tag } from "./Tag";
import { getPublicUrl } from "../utils/publicUrl";

interface SchilderijKaartProps {
  schilderij: Schilderij;
  onSelect?: (schilderij: Schilderij) => void;
}

function korteBeschrijving(beschrijving: string, maxLength = 120) {
  if (beschrijving.length <= maxLength) return beschrijving;
  return beschrijving.slice(0, maxLength).trim() + "…";
}

export function SchilderijKaart({ schilderij, onSelect }: SchilderijKaartProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(schilderij)}
      className="group flex w-full flex-col p-0 text-left bg-palette-beige/50 rounded-lg border border-palette-sage/40 overflow-hidden shadow-sm hover:shadow-md hover:border-palette-sage transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-sage"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-lg bg-palette-sage/30">
        <img
          src={getPublicUrl(schilderij.afbeeldingUrl)}
          alt={schilderij.titel}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-palette-slate group-hover:text-palette-brown transition-colors">
          {schilderij.titel}
        </h2>
        <p className="text-sm text-palette-slate/80 mt-1 line-clamp-2">
          {korteBeschrijving(schilderij.beschrijving)}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {schilderij.thema.slice(0, 2).map((t) => (
            <Tag key={t} label={t} variant="thema" />
          ))}
          <Tag label={schilderij.afmeting} variant="meta" />
          <Tag label={schilderij.materiaal} variant="meta" />
        </div>
      </div>
    </button>
  );
}
