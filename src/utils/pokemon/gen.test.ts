import { describe, it, expect } from 'vitest';
import { checkPokemonGen, getGeneration } from './gen';

describe('Pokemon Gen Utility Functions', () => {
  
  describe('checkPokemonGen', () => {
    it('should return true for valid ID in Gen 1', () => {
      expect(checkPokemonGen(1, 1)).toBe(true);
      expect(checkPokemonGen(151, '1')).toBe(true);
    });

    it('should return false for ID outside the generation', () => {
      expect(checkPokemonGen(152, 1)).toBe(false);
    });

    it('should return false for a non-existent generation', () => {
      expect(checkPokemonGen(1, 99)).toBe(false);
    });

    it('should handle boundary values correctly (Edge Cases)', () => {
      expect(checkPokemonGen(152, 2)).toBe(true);
      expect(checkPokemonGen(251, 2)).toBe(true);
    });
  });

  describe('getGeneration', () => {
    it('should return "I" for Bulbasaur (ID 1)', () => {
      expect(getGeneration(1)).toBe('I');
    });

    it('should return the correct Roman numeral for boundaries', () => {
      expect(getGeneration(151)).toBe('I');
      expect(getGeneration(152)).toBe('II');
      expect(getGeneration(905)).toBe('VIII');
      expect(getGeneration(906)).toBe('IX');
    });

    it('should return "IX" for very high IDs', () => {
      expect(getGeneration(2000)).toBe('IX');
    });
  });
});
