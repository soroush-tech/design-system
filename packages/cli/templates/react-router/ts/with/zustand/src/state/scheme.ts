import { create } from 'zustand'

interface SchemeState {
  scheme: 'light' | 'dark'
  setScheme: (scheme: 'light' | 'dark') => void
}

/** The color scheme the app is drawn in: a zustand store, which any component can read. */
// @if ts
export const useScheme = create<SchemeState>()((set) => ({
  scheme: '__SCHEME__',
  setScheme: (scheme) => set({ scheme }),
}))
// @else
export const useScheme = create((set) => ({
  scheme: '__SCHEME__',
  setScheme: (scheme) => set({ scheme }),
}))
// @endif
