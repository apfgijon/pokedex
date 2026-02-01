
interface PokemonAbilitiesProps {
  abilities: {
    ability: {
      name: string
    }
  }[];
}

export default function PokemonAbilities({abilities}: PokemonAbilitiesProps) {
    return <article className="grid grid-cols-2 gap-4">
    {abilities.map(ability => (
      <div key={ability.ability.name} className="rounded-2xl text-xs bg-slate-50 p-1 text-center truncate">
        {ability.ability.name}
      </div>
    ))}
  </article>
}
