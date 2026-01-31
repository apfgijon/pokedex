"use client";

import { api } from "~/trpc/react";
import PokemonSlot from "./pokelist/pokemon_slot";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useMemo } from "react";
import type { PokemonData } from "~/trpc/model/pokemon";

export function ListPokemon() {
  const POKEMON_BATCH = 30;
  const [pokemonList] = api.pokeapi.pokemon.names.useSuspenseQuery();
  const [pokemonEnrichedList, setPokemonEnrichedList] = useState<PokemonData[]>([]);
  const { ref, inView } = useInView({
    rootMargin: '400px',
  });

  const newPokes = useMemo(() => {
    const currentPokesListed = pokemonEnrichedList.length;
    return pokemonList.slice(currentPokesListed, currentPokesListed + POKEMON_BATCH).map(poke => poke.id);
  }, [pokemonEnrichedList.length, pokemonList]);

  const { data: inComingPokeBatch, isFetching } = api.pokeapi.pokemon.stackData.useQuery(newPokes, {
    enabled: newPokes.length > 0 && inView,
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (inComingPokeBatch && inComingPokeBatch.length > 0) {
      setPokemonEnrichedList(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newInfo = inComingPokeBatch.filter(p => !existingIds.has(p.id));
        if (newInfo.length === 0) return prev;
        return [...prev, ...newInfo];
      })
    }
  })

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-800 md:text-4xl">
          Pokédex
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {pokemonEnrichedList?.map((pokemon) => (
            <PokemonSlot key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
      {pokemonEnrichedList.length < pokemonList.length && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          <p>Loading more from memory...</p>
        </div>
      )}
    </main>
  );
}
