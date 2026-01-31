import type { PokemonData, PokemonId } from "~/trpc/model/pokemon";

interface FirstRequestPokemon {
  name: string;
  url: string;
}

function getIdFromFirstRequest(info: FirstRequestPokemon): PokemonId {
  const url_parts = info.url.split("/").filter(Boolean).pop() ?? "";
  const id = parseInt(url_parts, 10)
   return {
    ...info,
    id
  }
}

export async function getPokemons(): Promise<PokemonId[]> {
  const resPokelist = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0`, {
    next: { revalidate: 3600 }
  });
  const pokeList = (await resPokelist.json()).results as FirstRequestPokemon[];
  return pokeList.map(poke => getIdFromFirstRequest(poke));
}

export async function getStackPokemonData(input: number[]): Promise<PokemonData[]> {
  const promisePokemonData = input.map(pokeId => fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`, {
    next: { revalidate: 3600 }
  }).then(res => res.json()));

  const pokeInfoList = await Promise.all(promisePokemonData);
  
  return pokeInfoList;
}
