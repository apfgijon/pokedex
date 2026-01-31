import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { PokemonData, PokemonId } from "~/trpc/model/pokemon";
import { getPokemons, getStackPokemonData } from "~/server/services/pokeapi/pokemon";


export const pokemonRouter = createTRPCRouter({
  names: publicProcedure.query(async (): Promise<PokemonId[]> => {
    return await getPokemons();
  }),
  stackData: publicProcedure
  .input(z.array(z.number().int()))
  .query(async ({input}): Promise<PokemonData[]> => {
    return await getStackPokemonData(input);
  }),
})
