import type { PokemonType } from "~/trpc/model/types";

const POKEMON_TYPE_COLORS: Record<PokemonType, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export function Type({name}: {name: string}) {
  const backgroundColor = POKEMON_TYPE_COLORS[name as PokemonType];
  return <span
    style={{backgroundColor}}
    className="text-white px-2 py-1 text-xs rounded-full"
  >{name}</span>
}
