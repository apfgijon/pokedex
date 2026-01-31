export interface PokemonId {
  id: number,
  name: string,
  url: string,
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
  }[]
  sprites: {
    front_default: string;
    versions?: {
      "generation-iii"?: {
        emerald?: {
          front_default: string;
        }
      }
    }
  }
}
