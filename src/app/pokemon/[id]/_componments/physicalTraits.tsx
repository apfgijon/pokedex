import type { PokemonData } from "~/trpc/model/pokemon"

interface PokemonTraitsProps {
  pokemon: PokemonData
}

export default function PokemonTraits({ pokemon }: PokemonTraitsProps) {
  return <div className="grid grid-cols-2 gap-4">
    <div className="rounded-2xl bg-slate-50 p-4 text-center">
      <p className="text-xs font-medium text-slate-500">Height</p>
      <p className="text-xl font-bold text-slate-700">{pokemon.height / 10}m</p>
    </div>
    <div className="rounded-2xl bg-slate-50 p-4 text-center">
      <p className="text-xs font-medium text-slate-500">Weight</p>
      <p className="text-xl font-bold text-slate-700">{pokemon.weight / 10}kg</p>
    </div>
  </div>
}
