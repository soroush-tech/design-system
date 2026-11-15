import { create } from 'zustand'
/** The color scheme the app is drawn in: a zustand store, which any component can read. */
export const useScheme = create()((set) => ({
  scheme: 'light',
  setScheme: (scheme) => set({ scheme }),
}))
