"use client";

import { api } from "~/trpc/react";
import PokemonSlot from "./pokelist/pokemon_slot";

export function ListPokemon() {
  const [pokemons] = api.pokeapi.pokemon.pokemon.useSuspenseQuery({ offset: 0 });

  console.log(pokemons);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-800 md:text-4xl">
          Pokédex
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokemons.map((pokemon) => (
            <PokemonSlot key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </main>
  );
}
