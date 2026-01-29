"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function ListPokemon() {
  
  const [pokemons] = api.pokeapi.pokemon.pokemon.useSuspenseQuery({ offset: 0});
  console.log(pokemons);
  return <ul>{pokemons.map((pokemon: any) => <li>{pokemon.name}</li>)}</ul>
}
