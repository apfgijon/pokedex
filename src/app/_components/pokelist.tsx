"use client";

import { api } from "~/trpc/react";
import PokemonSlot from "./pokelist/pokemon_slot";
import { FilterBar } from "./pokelist/filter";
import { usePokemonManager } from "../hooks/usePokemonManager";

export function ListPokemon() {
  const [pokemonList] = api.pokeapi.pokemon.names.useSuspenseQuery();
  const {displayList, hasMore, isFetching, ref} = usePokemonManager(pokemonList);
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-800 md:text-4xl">
          Pokédex
        </h1>
        <FilterBar />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {displayList?.map((pokemon) => (
            <PokemonSlot key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <div ref={ref} className="mt-12 flex flex-col items-center justify-center pb-20">
        {hasMore ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-12 w-12 animate-spin overflow-hidden rounded-full border-4 border-slate-800 bg-white">
              <div className="absolute top-0 h-1/2 w-full bg-red-500" />
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-slate-800" />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-800 bg-white" />
            </div>
            <p className="text-sm font-medium text-slate-500 animate-pulse">
              Searching the tall grass...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <div className="h-0.5 w-24 bg-slate-200 mb-2" />
            <p className="font-semibold text-slate-500">End of the Pokedex</p>
            <p className="text-sm">You've caught 'em all!</p>
          </div>
        )}
      </div>
    </main>
  );
}
