import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
}

/** The home page's count: a zustand store, which any component can read. */
// @if ts
export const useCounter = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
// @else
export const useCounter = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
// @endif
