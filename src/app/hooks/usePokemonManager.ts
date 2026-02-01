"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useFilterStore } from "~/app/store/filterStore";
import type { PokemonData } from "~/trpc/model/pokemon";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

const checkPokemonGen = (id: number, gen: number | string): boolean => {
  const g = typeof gen === 'string' ? parseInt(gen) : gen;
  const ranges: Record<number, [number, number]> = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1025]
  };
  const range = ranges[g];
  if (!range) return false;
  return id >= range[0] && id <= range[1];
};

export function usePokemonManager() {
  const POKEMON_BATCH = 30;
  const filters = useFilterStore((state) => state.filters);
  const [pokemonEnrichedList, setPokemonEnrichedList] = useState<PokemonData[]>([]);

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

  const { data: pokemonNewEnrichedBatch, isLoading: isLoadingEnriched } = api.pokeapi.pokemon.stackData.useQuery(idsToFetch, {
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
        const newItems = pokemonNewEnrichedBatch.filter(p => !existingIds.has(p.id));
        return [...prev, ...newItems];
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
