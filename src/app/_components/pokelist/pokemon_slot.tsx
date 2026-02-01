"use client";

import type { PokemonData } from "~/trpc/model/pokemon"
import { Type } from "./type/Type";
import { getGeneration } from "~/utils/pokemon/gen";

interface PokemonSlotProps {
  pokemon: PokemonData
}
export default function PokemonSlot({ pokemon }: PokemonSlotProps) {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return <section className="cursor-pointer group w-sm relative flex items-center gap-4 overflow-visible rounded-full bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-2 hover:ring-blue-400">
<div className="absolute -bottom-2 right-10 z-10 select-none 
    rounded-full border border-slate-100 bg-white/80 px-2 py-0.5 
    text-[8px] font-black uppercase tracking-tighter text-slate-400 
    shadow-sm backdrop-blur-sm transition-all duration-300 
    group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:shadow-md">
        gen {getGeneration(pokemon.id)}
      </div>
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
