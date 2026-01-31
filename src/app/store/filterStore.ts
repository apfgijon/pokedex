import { create } from 'zustand';

interface Filters {
  search: string;
  type: string;
  gen: string;
}

interface FilterState {
  filters: Filters;
  setFilter: (name: keyof Filters, value: string) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: { 
    search: '', 
    type: 'all', 
    gen: 'all'
  },
  setFilter: (name, value) => 
    set((state) => ({ 
      filters: { 
        ...state.filters, 
        [name]: value 
      } 
    })),
  reset: () => set({ 
    filters: { search: '', type: 'all', gen: 'all' } 
  }),
}));
