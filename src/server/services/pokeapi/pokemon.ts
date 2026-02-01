import type { PokemonData, PokemonEvoTree, PokemonId } from "~/trpc/model/pokemon";
import type { PokemonType } from "~/trpc/model/types";
import { FromTreeToArray } from "~/utils/pokemon/evolutions";
import { getIdFromFirstRequest, type FirstRequestPokemon } from "~/utils/pokemon/url";


interface FirstRequestPokemonFromType {
  // Really odd decision for PokeAPI but is wrapped
  pokemon: FirstRequestPokemon;
}

// 
export async function getPokemons(pType: PokemonType | 'all'): Promise<PokemonId[]> {
  let pokeList: FirstRequestPokemon[];
  if (pType === 'all') {
    const resPokelist = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0", {
      next: { revalidate: 3600 }
    });
    pokeList = (await resPokelist.json()).results as FirstRequestPokemon[];
  } else {

    const resPokelist = await fetch(`https://pokeapi.co/api/v2/type/${pType}`, {
      next: { revalidate: 3600 }
    });
    const pokeListWrapped = (await resPokelist.json()).pokemon as FirstRequestPokemonFromType[];
    pokeList = pokeListWrapped.map(poke => poke.pokemon);
  }
  //Additional filter to do not show alternative pokemon forms
  return pokeList.map(poke => getIdFromFirstRequest(poke)).filter(poke => poke.id < 1026);
}

export async function getStackPokemonData(input: number[]): Promise<PokemonData[]> {
  const promisePokemonData = input.map(pokeId => fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`, {
    next: { revalidate: 3600 }
  }).then(res => res.json()));

  const pokeInfoList = await Promise.all(promisePokemonData);
  
  return pokeInfoList;
}

interface PokemonSpeciesRet {
  evolution_chain: {
    url: string;
  }
}

export async function getChainPokemonData(input: number[]): Promise<PokemonId[][]> {
  const promisePokemonSpecies = input.map(pokeId => fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`, {
    next: { revalidate: 3600 }
  }).then(res => res.json()));
  const pokeInfoSpeciesList = Array.from(new Set((await Promise.all(promisePokemonSpecies) as PokemonSpeciesRet[]).map(evol => evol.evolution_chain.url)));
  const promisePokemonEvoChain = pokeInfoSpeciesList.map(url => fetch(url, {
    next: { revalidate: 3600 }
  }).then(res => res.json()));
  const pokeEvoChainList = await Promise.all(promisePokemonEvoChain) as PokemonEvoTree[];
  return pokeEvoChainList.map(chain => FromTreeToArray(chain));
}

