import { getStatColor } from "~/utils/pokemon/stats";

interface PokemonStats {
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export default function PokemonStats({ stats }: PokemonStats) {
  return <div className="space-y-3">
    {stats.map((stat) => {
      const percentage = Math.min((stat.base_stat / 200) * 100, 100);
      return (
        <div key={stat.stat.name} className="group flex items-center gap-4">
          <span className="w-20 text-[10px] font-black uppercase tracking-tighter text-slate-400">
            {stat.stat.name
              .replace("special-attack", "sp. atk")
              .replace("special-defense", "sp. def")
              .replace("hp", "hp")}
          </span>
          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 shadow-inner">
            <div
              className={`h-full rounded-full bg-linear-to-r transition-all duration-1000 ease-out ${getStatColor(stat.base_stat)}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="w-8 text-right text-xs font-bold text-slate-600">
            {stat.base_stat}
          </span>
        </div>
      );
    })}
  </div>;
}
