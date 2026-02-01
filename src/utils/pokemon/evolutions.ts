import type { evolvesTo, PokemonEvoTree, PokemonId } from "~/trpc/model/pokemon";
import { getIdFromFirstRequest } from "./url";

function flattenEvolutionChain(chain: evolvesTo): PokemonId[] {
  const result: PokemonId[] = [];

  function traverse(node: evolvesTo) {
    result.push(getIdFromFirstRequest(node.species));

    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach(nextEvolution => traverse(nextEvolution));
    }
  }

  traverse(chain);
  return result;
}

export function FromTreeToArray(evoTree: PokemonEvoTree): PokemonId[] {
  return flattenEvolutionChain(evoTree.chain);
}
