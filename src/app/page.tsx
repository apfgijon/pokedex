import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { ListPokemon } from "~/app/_components/pokelist";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.pokeapi.pokemon.names.prefetch();
  void api.pokeapi.pokemon.stackData.prefetch(Array.from({ length: 30 }, (_, i) => i + 1));

  return (
    <HydrateClient>
      <ListPokemon />
    </HydrateClient>
  );
}
