export const checkPokemonGen = (id: number, gen: number | string): boolean => {
  const g = typeof gen === 'string' ? parseInt(gen) : gen;
  const ranges: Record<number, [number, number]> = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1025]
  };
  const range = ranges[g];
  if (!range) return false;
  return id >= range[0] && id <= range[1];
};

export const getGeneration = (id: number): string => {
  if (id <= 151) return "I";
  if (id <= 251) return "II";
  if (id <= 386) return "III";
  if (id <= 493) return "IV";
  if (id <= 649) return "V";
  if (id <= 721) return "VI";
  if (id <= 809) return "VII";
  if (id <= 905) return "VIII";
  return "IX";
};
