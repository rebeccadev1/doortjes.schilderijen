import { useEffect, useMemo, useRef, useState } from "react";
import { schilderijen } from "../data/schilderijen";
import { SchilderijKaart } from "../components/SchilderijKaart";
import { Tag } from "../components/Tag";
import type { Schilderij } from "../types/schilderij";

const ALLE = "alle";

export function Overzichtspagina() {
  const [jaartalFilter, setJaartalFilter] = useState<string>(ALLE);
  const [themaFilter, setThemaFilter] = useState<string>(ALLE);
  const [expandedSchilderij, setExpandedSchilderij] = useState<Schilderij | null>(null);
  const [zoomMode, setZoomMode] = useState(false);
  const [magnifier, setMagnifier] = useState<{
    clientX: number;
    clientY: number;
    localX: number;
    localY: number;
    width: number;
    height: number;
  } | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expandedSchilderij) {
      setZoomMode(false);
      setMagnifier(null);
    }
  }, [expandedSchilderij]);

  const jaartallen = useMemo(
    () =>
      Array.from(new Set(schilderijen.map((s) => s.jaartal))).sort(
        (a, b) => b - a
      ),
    []
  );
  const themas = useMemo(
    () =>
      Array.from(new Set(schilderijen.flatMap((s) => s.thema))).sort(),
    []
  );

  const gefilterd = useMemo(() => {
    return schilderijen.filter((s) => {
      const matchJaartal =
        jaartalFilter === ALLE || String(s.jaartal) === jaartalFilter;
      const matchThema =
        themaFilter === ALLE || s.thema.includes(themaFilter);
      return matchJaartal && matchThema;
    });
  }, [jaartalFilter, themaFilter]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-palette-slate mb-6">
        Schilderijen
      </h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="jaartal" className="text-sm text-palette-slate/80">
            Jaartal
          </label>
          <select
            id="jaartal"
            value={jaartalFilter}
            onChange={(e) => setJaartalFilter(e.target.value)}
            className="rounded-md border border-palette-sage bg-palette-beige/50 px-3 py-2 text-sm text-palette-slate"
          >
            <option value={ALLE}>Alle jaren</option>
            {jaartallen.map((j) => (
              <option key={j} value={String(j)}>
                {j}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="thema" className="text-sm text-palette-slate/80">
            Thema
          </label>
          <select
            id="thema"
            value={themaFilter}
            onChange={(e) => setThemaFilter(e.target.value)}
            className="rounded-md border border-palette-sage bg-palette-beige/50 px-3 py-2 text-sm text-palette-slate"
          >
            <option value={ALLE}>Alle thema's</option>
            {themas.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gefilterd.map((s) => (
          <SchilderijKaart
            key={s.id}
            schilderij={s}
            onSelect={setExpandedSchilderij}
          />
        ))}
      </div>
      {gefilterd.length === 0 && (
        <p className="text-palette-slate/70">Geen schilderijen gevonden met deze filters.</p>
      )}

      {expandedSchilderij && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="expanded-card-title"
        >
          <button
            type="button"
            onClick={() => setExpandedSchilderij(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            aria-label="Sluiten"
          />
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-palette-sage/60 bg-palette-beige shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedSchilderij(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-palette-slate/90 text-white p-2 hover:bg-palette-slate transition-colors"
              aria-label="Sluiten"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6 md:p-8">
              <div
                ref={imageContainerRef}
                className="relative max-h-[28rem] aspect-[4/3] w-full max-w-xl mx-auto rounded-lg overflow-hidden bg-palette-sage/30 mb-6"
              >
                <img
                  src={expandedSchilderij.afbeeldingUrl}
                  alt={expandedSchilderij.titel}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomMode((z) => {
                      if (z) setMagnifier(null);
                      return !z;
                    });
                  }}
                  className={`absolute bottom-2 right-2 z-10 rounded-full p-2 shadow-md transition-colors ${
                    zoomMode
                      ? "bg-palette-slate text-white"
                      : "bg-white/90 text-palette-slate hover:bg-white"
                  }`}
                  aria-label={zoomMode ? "Zoom uit" : "Zoom in"}
                  title={zoomMode ? "Zoom uit" : "Zoom in"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
                {zoomMode && (
                  <div
                    className="absolute inset-0 cursor-crosshair z-[5]"
                    onMouseMove={(e) => {
                      if (!imageContainerRef.current) return;
                      const rect = imageContainerRef.current.getBoundingClientRect();
                      const localX = e.clientX - rect.left;
                      const localY = e.clientY - rect.top;
                      setMagnifier({
                        clientX: e.clientX,
                        clientY: e.clientY,
                        localX,
                        localY,
                        width: rect.width,
                        height: rect.height,
                      });
                    }}
                    onMouseLeave={() => setMagnifier(null)}
                    aria-hidden
                  />
                )}
              </div>
              {zoomMode && magnifier && (
                <div
                  className="fixed pointer-events-none rounded-full border-2 border-white shadow-xl overflow-hidden"
                  style={{
                    zIndex: 9999,
                    width: "280px",
                    height: "280px",
                    left: `${magnifier.clientX - 140}px`,
                    top: `${magnifier.clientY - 140}px`,
                    backgroundImage: `url(${expandedSchilderij.afbeeldingUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${magnifier.width * 2.5}px ${magnifier.height * 2.5}px`,
                    backgroundPosition: `${140 - magnifier.localX * 2.5}px ${140 - magnifier.localY * 2.5}px`,
                  }}
                  aria-hidden
                />
              )}
              <h2 id="expanded-card-title" className="text-2xl font-semibold text-palette-slate mb-2">
                {expandedSchilderij.titel}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag label={String(expandedSchilderij.jaartal)} variant="jaartal" />
                {expandedSchilderij.thema.map((t) => (
                  <Tag key={t} label={t} variant="thema" />
                ))}
              </div>
              <p className="text-palette-slate/90 leading-relaxed whitespace-pre-line">
                {expandedSchilderij.beschrijving}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
