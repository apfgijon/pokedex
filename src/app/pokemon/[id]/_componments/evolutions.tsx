"use client";

import type { PokemonData } from "~/trpc/model/pokemon";
import { api } from "~/trpc/react";
import Link from "next/link";

interface PokemonEvoProps {
  pokemon: PokemonData;
}

export default function PokemonEvolutions({ pokemon }: PokemonEvoProps) {
  const { data: pokeEvoTrees, isLoading } = api.pokeapi.pokemon.chainEvo.useQuery([pokemon.id], {
    staleTime: 3600,
  });
  const pokeEvoTree = pokeEvoTrees?.[0] ?? [];
  if (isLoading) {
    return <section></section>;
  }
  if (pokeEvoTree.length <= 1) {
    return (
      <p className="mt-6 text-center text-sm font-medium text-slate-400">
        This Pokémon does not evolve.
      </p>
    );
  }
  return (
    <section className="mt-6 flex flex-wrap justify-center gap-3 md:gap-6">
      {pokeEvoTree.map((evo) => {
        const isCurrent = evo.id === pokemon.id;
        
        const spriteUrl = evo.id <= 386 
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${evo.id}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`;
        return (
          <Link
            key={evo.id}
            href={`/pokemon/${evo.id}`}
            className={`group relative flex w-28 flex-col items-center rounded-2xl p-3 transition-all duration-300 md:w-32 ${
              isCurrent 
                ? "bg-white shadow-lg shadow-blue-200/50 ring-2 ring-blue-500/20" 
                : "hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100"
            }`}
          >
            <span className="absolute left-2 top-2 text-[10px] font-black text-slate-300">
              #{evo.id.toString().padStart(3, '0')}
            </span>

            <div className="relative mt-2 h-20 w-20 md:h-24 md:w-24">
              {isCurrent && (
                <div className="absolute inset-0 animate-pulse rounded-full bg-blue-400/10 blur-xl" />
              )}
              <img
                src={spriteUrl}
                alt={evo.name}
                className={`[image-rendering:pixelated] rendering-crisp-edges mix-blend-multiply relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                  !isCurrent && "grayscale-[0.3] group-hover:grayscale-0"
                }`}
              />
            </div>
            <span className={`mt-3 text-center text-xs font-bold uppercase tracking-tight transition-colors ${
              isCurrent ? "text-blue-600" : "text-slate-500 group-hover:text-slate-900"
            }`}>
              {evo.name}
            </span>
            {isCurrent && (
              <div className="mt-1 h-1 w-1 rounded-full bg-blue-500" />
            )}
          </Link>
        );
      })}
    </section>
  );
}
