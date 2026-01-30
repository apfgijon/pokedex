import { z } from "zod";
  
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Pokemon } from "~/trpc/model/pokemon";
import { getPokemons } from "~/server/services/pokeapi/pokemon";


export const pokemonRouter = createTRPCRouter({
  pokemon: publicProcedure.input(
    z.object({
      offset: z.number(),
    })
  ).query(async (opts): Promise<Pokemon[]> => {
    const offset = opts.input.offset;
    return await getPokemons(offset);
  })
})
