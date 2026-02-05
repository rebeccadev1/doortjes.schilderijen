import { Link } from "react-router-dom";

export function Homepagina() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto rounded-lg overflow-hidden aspect-[16/9] bg-palette-sage/30 mb-8">
        <img
          src="/schilderijen/placeholder-home.svg"
          alt="Doortjes schilderijen"
          className="w-full h-full object-cover"
        />
      </div>
      <section className="text-center py-4">
        <h1 className="text-4xl font-semibold text-palette-slate mb-4">
          Welkom bij Doortjes schilderijen
        </h1>
        <p className="text-lg text-palette-slate/90 max-w-2xl mx-auto leading-relaxed">
          Ontdek een collectie schilderijen waarin rust, kleur en sfeer centraal staan.
        </p>
        <Link
          to="/schilderijen"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-palette-sage/60 text-palette-slate font-medium hover:bg-palette-sage/80 transition-colors"
        >
          Bekijk de schilderijen
        </Link>
      </section>
    </div>
  );
}
