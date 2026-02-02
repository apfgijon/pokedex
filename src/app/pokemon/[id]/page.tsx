import Link from "next/link";
import { api } from "~/trpc/server";
import { getGeneration } from "~/utils/pokemon/gen";
import { Type } from "~/app/_components/pokelist/type/Type";
import PokemonStats from "./_componments/stats";
import PokemonTraits from "./_componments/physicalTraits";
import PokemonAbilities from "./_componments/abilities";
import PokemonEvolutions from "./_componments/evolutions";
import NotFound from "~/app/not-found";


export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  try {
    const { id } = await params;
    const pokemon = (await api.pokeapi.pokemon.stackData({ ids: [Number(id)] }))?.at(0);

    if (!pokemon) return <main className="min-h-screen bg-slate-50"></main>;

    const name = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);
    return (
      <main className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition-colors"
          >
            Back to Pokedex
          </Link>

          <section className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50">
            <div className="relative bg-linear-to-br from-blue-50 to-slate-50 p-8 md:p-12">
              <div className="absolute right-8 top-8 font-black text-slate-300/50 md:text-8xl">
                #{pokemon.id.toString().padStart(3, '0')}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
                <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white shadow-inner md:h-64 md:w-64">
                  <img
                    style={{ viewTransitionName: `poke-img-${pokemon.id}` }}
                    src={pokemon.sprites.versions?.["generation-iii"]?.emerald?.front_default ?? pokemon.sprites.front_default}
                    alt={name}
                    className="h-40 w-40 object-contain md:h-52 md:w-52 [image-rendering:pixelated] rendering-crisp-edges mix-blend-multiply"
                  />
                </div>

                <div className="text-center md:text-left">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-tighter text-blue-600">
                    Gen {getGeneration(pokemon.id)}
                  </span>
                  <h1 className="mt-2 text-4xl font-black text-slate-800 md:text-6xl">
                    {name}
                  </h1>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                    {pokemon.types.map((t) => (
                      <Type key={t.type.name} name={t.type.name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <section className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
              <article className="p-8">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Physical Traits</h3>
                <PokemonTraits pokemon={pokemon} />
                <h3 className="my-4 text-sm font-bold uppercase tracking-widest text-slate-400">Abilities</h3>
                <PokemonAbilities abilities={pokemon.abilities} />
              </article>
              <article className="p-8">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Base Stats</h3>
                <PokemonStats stats={pokemon.stats} />
              </article>
            </section>
            <div className="border-t border-slate-100 bg-slate-50/50 p-8">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-300">Evolution Chain</p>
              <PokemonEvolutions pokemon={pokemon} />
            </div>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    return <NotFound />
  }
}
