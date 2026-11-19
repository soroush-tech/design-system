import { create } from 'zustand'

interface SchemeState {
  scheme: 'light' | 'dark'
  setScheme: (scheme: 'light' | 'dark') => void
}

/** The color scheme the app is drawn in: a zustand store, which any component can read. */
export const useScheme = create<SchemeState>()((set) => ({
  scheme: 'light',
  setScheme: (scheme) => set({ scheme }),
}))
