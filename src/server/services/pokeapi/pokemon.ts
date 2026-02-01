import type { PokemonData, PokemonId } from "~/trpc/model/pokemon";
import type { PokemonType } from "~/trpc/model/types";

interface FirstRequestPokemon {
  name: string;
  url: string;
}

interface FirstRequestPokemonFromType {
  // Really odd decision for PokeAPI but is wrapped
  pokemon: FirstRequestPokemon;
}

function getIdFromFirstRequest(info: FirstRequestPokemon): PokemonId {
  const url_parts = info.url.split("/").filter(Boolean).pop() ?? "";
  const id = parseInt(url_parts, 10)
   return {
    ...info,
    id
  }
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
