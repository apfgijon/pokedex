import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { PokemonData, PokemonEvoTree, PokemonId } from "~/trpc/model/pokemon";
import { getChainPokemonData, getPokemons, getStackPokemonData } from "~/server/services/pokeapi/pokemon";
import { AVAILABLE_TYPES } from "~/trpc/model/types";


export const pokemonRouter = createTRPCRouter({
  names: publicProcedure
  .input(z.object({
    pType: z.enum(['all', ...AVAILABLE_TYPES])
  }))
  .query(async ({input}): Promise<PokemonId[]> => {
    return await getPokemons(input.pType);
  }),
  stackData: publicProcedure
  .input(z.array(z.number().int().min(1).max(1025)))
  .query(async ({input}): Promise<PokemonData[]> => {
    return await getStackPokemonData(input);
  }),
  chainEvo: publicProcedure
  .input(z.array(z.number().int().min(1).max(1025)))
  .query(async ({input}): Promise<PokemonId[][]> => {
    return await getChainPokemonData(input);
  }),
})
