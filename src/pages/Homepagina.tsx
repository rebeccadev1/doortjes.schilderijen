import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schilderijen } from "../data/schilderijen";
import { Tag } from "../components/Tag";
import { getPublicUrl } from "../utils/publicUrl";

const uitgelicht = schilderijen.slice(0, 3);
const WISSEL_SECONDEN = 4;

export function Homepagina() {
  const [index, setIndex] = useState(0);
  const [zoekTerm, setZoekTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % uitgelicht.length);
    }, WISSEL_SECONDEN * 1000);
    return () => clearInterval(id);
  }, []);

  const huidige = uitgelicht[index];
  const gaVorige = () => setIndex((i) => (i - 1 + uitgelicht.length) % uitgelicht.length);
  const gaVolgende = () => setIndex((i) => (i + 1) % uitgelicht.length);

  return (
    <div className="space-y-4">
      <section className="text-center py-4 space-y-4">
        <h1 className="font-title text-3xl font-semibold text-palette-slate">
          Welkom bij Doortjes schilderijen
        </h1>
        <p className="text-lg text-palette-slate/90 max-w-[65ch] mx-auto">
          Ontdek een collectie schilderijen waarin rust, kleur en sfeer centraal staan.
        </p>
        <form
          className="max-w-xl mx-auto pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            const term = zoekTerm.trim();
            if (term) {
              navigate(`/schilderijen?zoek=${encodeURIComponent(term)}`);
            } else {
              navigate("/schilderijen");
            }
          }}
          role="search"
          aria-label="Zoek een schilderij"
        >
          <div className="flex gap-2">
            <label htmlFor="home-zoek" className="sr-only">
              Zoek op titel, beschrijving of thema
            </label>
            <input
              id="home-zoek"
              type="search"
              value={zoekTerm}
              onChange={(e) => setZoekTerm(e.target.value)}
              placeholder="Zoek op titel, beschijving of thema..."
              className="flex-1 rounded-lg border-2 border-palette-sage bg-palette-beige/50 px-4 py-2.5 text-palette-slate placeholder:text-palette-slate/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-sage focus-visible:ring-offset-2"
              aria-label="Zoek een schilderij"
            />
            <button
              type="submit"
              className="rounded-lg bg-palette-sage px-4 py-2.5 font-medium text-white hover:bg-palette-sage/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-sage focus-visible:ring-offset-2"
            >
              Zoeken
            </button>
          </div>
        </form>
      </section>

      <section className="pt-2 pb-6" aria-label="Uitgelichte schilderijen">
        <h2 className="font-title text-xl font-semibold text-palette-slate mb-4 text-center">
          Uitgelichte schilderijen
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-palette-sage rounded-xl p-3 sm:p-4 bg-palette-beige/40 shadow-md">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={gaVorige}
                aria-label="Vorig schilderij"
className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-palette-slate hover:bg-palette-sage/30 hover:text-palette-slate transition-colors flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-sage"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 w-full sm:w-[45%] min-h-[200px]">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-palette-sage/30">
                  {uitgelicht.map((s, i) => (
                    <Link
                      key={s.id}
                      to={`/schilderijen?open=${s.id}`}
                      className={`absolute inset-0 block transition-opacity duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-sage ${
                        i === index ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                      }`}
                      aria-hidden={i !== index}
                    >
                      <img
                        src={getPublicUrl(s.afbeeldingUrl)}
                        alt={s.titel}
                        className="w-full h-full object-cover object-top"
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="font-title font-semibold text-palette-slate text-lg sm:text-xl mb-2">
                  {huidige.titel}
                </h3>
                <p className="text-palette-slate/90 text-sm sm:text-base leading-relaxed mb-3 line-clamp-4 sm:line-clamp-none">
                  {huidige.beschrijving}
                </p>
                <div className="flex flex-wrap gap-2">
                  {huidige.thema.map((t) => (
                    <Tag key={t} label={t} variant="thema" />
                  ))}
                  <Tag label={huidige.afmeting} variant="meta" />
                  <Tag label={huidige.materiaal} variant="meta" />
                </div>
              </div>
            </div>
              </div>
              <button
                type="button"
                onClick={gaVolgende}
                aria-label="Volgend schilderij"
                className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-palette-slate hover:bg-palette-sage/30 hover:text-palette-slate transition-colors flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-sage"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-palette-sage/60" role="tablist" aria-label="Kies schilderij">
              {uitgelicht.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Schilderij ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-sage ${
                    i === index ? "bg-palette-sage scale-110" : "bg-palette-sage/50 hover:bg-palette-sage/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
