import type { PokemonId } from "~/trpc/model/pokemon";

export interface FirstRequestPokemon {
  name: string;
  url: string;
}
export function getIdFromFirstRequest(info: FirstRequestPokemon): PokemonId {
  const url_parts = info.url.split("/").filter(Boolean).pop() ?? "";
  const id = parseInt(url_parts, 10)
   return {
    ...info,
    id
  }
}
