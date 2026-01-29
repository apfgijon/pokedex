

export async function getPokemons(offset: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`);
  return (await res.json()).results;
}
