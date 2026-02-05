export function OverDoortjePagina() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="max-w-md mx-auto rounded-lg overflow-hidden aspect-square bg-palette-sage/30 mb-6">
        <img
          src="/schilderijen/placeholder-over-doortje.svg"
          alt="Over Doortje"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-2xl font-semibold text-palette-slate">Over Doortje</h1>
      <p className="text-palette-slate/90 leading-relaxed">
        Tekst over Doortje en haar werk komt hier. Dit is een placeholder die je later kunt invullen met informatie over de kunstenaar, haar achtergrond en wat haar inspireert.
      </p>
    </div>
  );
}
