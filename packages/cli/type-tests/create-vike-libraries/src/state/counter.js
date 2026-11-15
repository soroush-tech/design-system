import { create } from 'zustand'
/** The home page's count: a zustand store, which any component can read. */
export const useCounter = create()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
