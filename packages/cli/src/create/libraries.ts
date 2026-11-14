/** A library `create` can add to a new app, with its wiring and a small example. */
export type Library = 'tanstack-query' | 'msw' | 'zustand' | 'jotai'

interface LibraryInfo {
  name: Library
  /** What the question says of it. */
  label: string
  /** Libraries of one group do the same job: an app takes one of them. */
  group?: 'state'
}

/** The libraries, in the order create offers them. */
export const LIBRARIES: readonly LibraryInfo[] = [
  { name: 'tanstack-query', label: 'TanStack Query: fetching and caching data' },
  { name: 'msw', label: 'msw: a mock API in the browser' },
  { name: 'zustand', label: 'zustand: a store of global state', group: 'state' },
  { name: 'jotai', label: 'Jotai: atoms of global state', group: 'state' },
]

export const LIBRARY_NAMES: readonly Library[] = LIBRARIES.map(({ name }) => name)

/** Why `libraries` cannot go together, or `undefined` when they can. */
export function findLibraryConflict(libraries: readonly Library[]): string | undefined {
  const state = LIBRARIES.filter(({ name, group }) => group === 'state' && libraries.includes(name))
  if (state.length < 2) return undefined
  const names = state.map(({ label }) => label.split(':')[0])
  return `${names.join(' and ')} both hold global state: pick one.`
}
