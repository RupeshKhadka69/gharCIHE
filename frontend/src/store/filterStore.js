import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  filters: {
    city: '',
    type: '',
    minPrice: 0,
    maxPrice: 10000
  },
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({
    filters: {
      city: '',
      type: '',
      minPrice: 0,
      maxPrice: 10000
    }
  })
}));
