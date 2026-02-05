import type { Schilderij } from "../types/schilderij";
import { Tag } from "./Tag";

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
      className="group block w-full text-left bg-palette-beige/50 rounded-lg border border-palette-sage/60 overflow-hidden shadow-sm hover:shadow-md hover:border-palette-sage transition-all duration-200"
    >
      <div className="aspect-[4/3] bg-palette-sage/30 overflow-hidden">
        <img
          src={schilderij.afbeeldingUrl}
          alt={schilderij.titel}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <Tag label={String(schilderij.jaartal)} variant="jaartal" />
          {schilderij.thema.slice(0, 2).map((t) => (
            <Tag key={t} label={t} variant="thema" />
          ))}
        </div>
      </div>
    </button>
  );
}
