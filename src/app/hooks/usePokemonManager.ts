"use client";

import { useState, useEffect, useMemo } from "react";
import { useFilterStore } from "~/app/store/filterStore";
import type { PokemonData } from "~/trpc/model/pokemon";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";
import { checkPokemonGen } from "~/utils/pokemon/gen";

export function usePokemonManager() {
  const filters = useFilterStore((state) => state.filters);
  const POKEMON_BATCH = filters.search !== "" ? 5:15;
  let [pokemonEnrichedList, setPokemonEnrichedList] = useState<PokemonData[]>([]);

  const { data: allPokemonNames, isLoading: isLoadingNames } = api.pokeapi.pokemon.names.useQuery(
    { pType: filters.type },
    { staleTime: Infinity },
  );

  const masterFilteredIds = useMemo(() => {
    if (!allPokemonNames) return [];
    return allPokemonNames
      .filter(p => {
        const matchesName = p.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesGen = filters.gen === 'all' || checkPokemonGen(p.id, filters.gen);
        return matchesName && matchesGen;
      })
      .map(p => p.id);
  }, [allPokemonNames, filters.search, filters.gen]);

  useEffect(() => {
    setPokemonEnrichedList([]);
  }, [masterFilteredIds]);

  const { ref, inView } = useInView({ rootMargin: '400px' });

  const idsToFetch = useMemo(() => {
    const currentCount = pokemonEnrichedList.length;
    return masterFilteredIds.slice(currentCount, currentCount + POKEMON_BATCH);
  }, [pokemonEnrichedList.length, masterFilteredIds]);

  const { data: pokemonNewEnrichedBatch, isLoading: isLoadingEnriched } = api.pokeapi.pokemon.stackData.useQuery(
    {
      ids:idsToFetch,
      includeEvolutions:filters.search !== ""
    }, 
    {
    enabled: idsToFetch.length > 0 && (inView || pokemonEnrichedList.length === 0),
    staleTime: 1000,
  });

  useEffect(() => {
    if (pokemonNewEnrichedBatch && pokemonNewEnrichedBatch.length > 0) {
      setPokemonEnrichedList(prev => {
        const expectedIds = masterFilteredIds.slice(prev.length, prev.length + POKEMON_BATCH);
        const firstIdReceived = pokemonNewEnrichedBatch[0]?.id;

        if (!expectedIds.includes(firstIdReceived!)) {
          return prev;
        }

        const existingIds = new Set(prev.map(p => p.id));
        if (filters.search !== "") {
          const pokeEnrichedUnique = [...new Map(pokemonNewEnrichedBatch.map(poke => [poke.id, poke])).values()];
          const newItems = pokeEnrichedUnique.filter(p => !existingIds.has(p.id));
          return [...prev, ...newItems].sort((poke1, poke2) => poke1.id - poke2.id);
        }
        const newItems = pokemonNewEnrichedBatch.filter(p => !existingIds.has(p.id));
        return [...prev, ...newItems].sort((poke1, poke2) => poke1.id - poke2.id);
      });
    }
  }, [pokemonNewEnrichedBatch, masterFilteredIds]);

  return {
    displayList: pokemonEnrichedList,
    hasMore: pokemonEnrichedList.length < masterFilteredIds.length,
    isLoading: isLoadingEnriched || isLoadingNames,
    ref: ref
  };
}
