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

export async function getStackPokemonData(input: number[], includeEvolutions: boolean): Promise<PokemonData[]> {
  const promisePokemonData = input.map(pokeId => fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`, {
    next: { revalidate: 3600 }
  }).then(res => res.json()));

  let pokeInfoList = await Promise.all(promisePokemonData);
  
  let evolutionData: PokemonData[] = [];
  if (includeEvolutions) {
    const evolutionIds = await getEvolutionChainIds(input);
    const evoIdsNotInInput = evolutionIds.filter(id => !input.includes(id));
    if (evoIdsNotInInput.length > 0) {
      evolutionData = await getStackPokemonData(evoIdsNotInInput, false);
    }
  }
  
  return [...pokeInfoList, ...evolutionData];
}


interface PokemonSpeciesRet {
  evolution_chain: {
    url: string;
  }
}

//This is for avoid repeating evolve id enriched data request
async function getEvolutionChainIds(input: number[]): Promise<number[]> {
  const speciesPromises = input.map(id =>
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`, { next: { revalidate: 3600 } })
    .then(res => res.json() as Promise<PokemonSpeciesRet>)
  );
  const speciesResults = await Promise.all(speciesPromises);
  const uniqueChainUrls = [...new Set(speciesResults.map(s => s.evolution_chain.url))];

  const chainPromises = uniqueChainUrls.map(url =>
    fetch(url, { next: { revalidate: 3600 } }).then(res => res.json() as Promise<PokemonEvoTree>)
  );
  const chains = await Promise.all(chainPromises);
  const allIds = chains.flatMap(chain => FromTreeToArray(chain).map(p => p.id));
  return [...new Set(allIds)];
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

