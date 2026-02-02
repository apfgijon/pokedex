import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { PokemonData, PokemonId } from "~/trpc/model/pokemon";
import { getChainPokemonData, getPokemons, getStackPokemonData } from "~/server/services/pokeapi/pokemon";
import { AVAILABLE_TYPES } from "~/trpc/model/types";
import { TRPCError } from "@trpc/server";


//Just basic exception management due to time
export const pokemonRouter = createTRPCRouter({
  names: publicProcedure
    .input(z.object({
      pType: z.enum(['all', ...AVAILABLE_TYPES])
    }))
    .query(async ({ input }): Promise<PokemonId[]> => {
      try {
        return await getPokemons(input.pType);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch data from PokéAPI',
          cause: error,
        });
      }
    }),
  stackData: publicProcedure
    .input(z.object({
      ids: z.array(z.number().int().min(1).max(1025)),
      includeEvolutions: z.boolean().optional().default(false),
    }))
    .query(async ({ input }): Promise<PokemonData[]> => {
      try {
        return await getStackPokemonData(input.ids, input.includeEvolutions);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch data from PokéAPI',
          cause: error,
        });
      }
    }),
  chainEvo: publicProcedure
    .input(z.array(z.number().int().min(1).max(1025)))
    .query(async ({ input }): Promise<PokemonId[][]> => {
      try {
        return await getChainPokemonData(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch data from PokéAPI',
          cause: error,
        });
      }
    }),
})
