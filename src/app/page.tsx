import { ListPokemon } from "~/app/_components/shellClientPokelist";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <ListPokemon />
    </HydrateClient>
  );
}
