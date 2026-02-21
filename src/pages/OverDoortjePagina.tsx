export function OverDoortjePagina() {
  return (
    <div className="flex flex-col sm:flex-row gap-12 items-start max-w-4xl mx-auto">
      <div className="flex-shrink-0 w-full sm:w-80 rounded-lg overflow-hidden aspect-square bg-palette-sage/30 shadow-sm">
        <img
          src="/schilderijen/placeholder-over-doortje.svg"
          alt="Over Doortje"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-4 text-left">
        <h1 className="font-title text-3xl font-semibold text-palette-slate">Over Doortje</h1>
        <p className="text-palette-slate/90 max-w-[65ch]">
          Tekst over Doortje en haar werk komt hier. Dit is een placeholder die je later kunt invullen met informatie over de kunstenaar, haar achtergrond en wat haar inspireert.
        </p>
      </div>
    </div>
  );
}
