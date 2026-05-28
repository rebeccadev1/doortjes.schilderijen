import { getPublicUrl } from "../utils/publicUrl";

export function OverDoortjePagina() {
  return (
    <div className="flex flex-col sm:flex-row gap-12 items-start max-w-4xl mx-auto">
      <div className="flex-shrink-0 w-full sm:w-80 rounded-lg overflow-hidden aspect-square bg-palette-sage/30 shadow-sm">
        <img
          src={getPublicUrl("/schilderijen/placeholder-over-doortje.svg")}
          alt="Over Doortje"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-4 text-left">
        <h1 className="font-title text-3xl font-semibold text-palette-slate">Over Doortje</h1>
        <p className="text-palette-slate/90 max-w-[65ch]">
        Na mijn psychologiestudie in Amsterdam en werk in het gooi heb ik 20 jr lessen gevolgd aan de Gooische Academie bij Lex Goes en verschillende zomercursussen. Na de Corona jaren schilder ik in een klein groepje bij Ineke Onkenhout en wordt gestimuleerd om verschillende technieken te gebruiken, zoals schilderen met paletmes.
De natuur is en blijft mijn bron van inspiratie. Dat verveelt nooit.
Leuk dat je mijn schilderijen op de site komt bekijken.
<br />
<br />
Doortje de Koning-Franken
<br />
06-51287124
<br />
doortjedekoning@gmail.com        </p>
      </div>
    </div>
  );
}
