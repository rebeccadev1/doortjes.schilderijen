import { Link } from "react-router-dom";
import type { Schilderij } from "../types/schilderij";
import { Tag } from "./Tag";
import { getPublicUrl } from "../utils/publicUrl";

interface SchilderijDetailProps {
  schilderij: Schilderij;
}

export function SchilderijDetail({ schilderij }: SchilderijDetailProps) {
  return (
    <article>
      <Link
        to="/schilderijen"
        className="inline-flex items-center gap-2 text-palette-slate/70 hover:text-palette-slate text-sm mb-6"
      >
        ← Terug naar schilderijen
      </Link>
      <div className="max-w-3xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-transparent mb-6">
          <div className="absolute inset-1.5 flex min-h-0 min-w-0 items-center justify-center">
            <img
              src={getPublicUrl(schilderij.afbeeldingUrl)}
              alt={schilderij.titel}
              className="max-h-full max-w-full h-auto w-auto rounded-md object-contain"
            />
          </div>
        </div>
        <h1 className="font-title text-3xl font-semibold text-palette-slate mb-2">
          {schilderij.titel}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {schilderij.thema.map((t) => (
            <Tag key={t} label={t} variant="thema" />
          ))}
          <Tag label={schilderij.afmeting} variant="meta" />
          <Tag label={schilderij.materiaal} variant="meta" />
        </div>
        <p className="text-palette-slate/90 leading-relaxed whitespace-pre-line">
          {schilderij.beschrijving}
        </p>
      </div>
    </article>
  );
}
