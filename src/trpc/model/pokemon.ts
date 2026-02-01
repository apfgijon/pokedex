export interface PokemonId {
  id: number;
  name: string;
  url: string;
}

export interface PokemonData {
  id: number;
  name: string;
  url: string;
  types: {
    slot: number;
    type: {
      name: string
    }
  }[];
  sprites: {
    front_default: string;
    versions?: {
      "generation-iii"?: {
        emerald?: {
          front_default: string;
        }
      }
    }
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string
    }
  }[];
  species: {
    name: string;
  }
}

export interface evolvesTo {
  species: {
    name: string;
    url: string;
  },
  evolves_to: evolvesTo[]
}

export interface PokemonEvoTree {
  chain: evolvesTo;
}
