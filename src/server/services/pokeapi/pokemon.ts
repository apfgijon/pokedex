import type { Pokemon } from "~/trpc/model/pokemon";

interface FirstRequestPokemon {
  name: string;
  url: string;
}

export async function getPokemons(offset: number): Promise<Pokemon[]> {
  const resPokelist = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`);
  const pokeList = (await resPokelist.json()).results as FirstRequestPokemon[];
  const pokeInfoPromises = pokeList.map(pokemon => fetch(pokemon.url).then(res => res.json())); 
  const pokeInfoList = await Promise.all(pokeInfoPromises);

  return pokeInfoList;
}
