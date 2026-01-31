import type { PokemonData } from "~/trpc/model/pokemon"
import { Type } from "./type/Type";

interface PokemonSlotProps {
  pokemon: PokemonData
}
export default function PokemonSlot({ pokemon }: PokemonSlotProps) {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return <section className="group w-sm relative flex items-center gap-4 overflow-hidden rounded-full bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-2 hover:ring-blue-400">

    <article className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-blue-50">
      <img
        src={pokemon.sprites.versions?.["generation-iii"]?.emerald?.front_default ?? pokemon.sprites.front_default}
        alt={name}
        className="h-16 w-16 object-contain"
      />
    </article>

    <article className="flex flex-col">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>
        <span className="ms-1">
          {pokemon.types.map(item =>
            <span key={item.type.name} className="mx-0.5">
              <Type name={item.type.name} />
            </span>
          )}
        </span>
      </div>
      <h2 className="text-xl font-bold text-slate-700">
        {name}
      </h2>
    </article>
  </section>
}
