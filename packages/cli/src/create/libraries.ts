/** A library `create` can add to a new app, with its wiring and a small example. */
export type Library =
  | 'tanstack-query'
  | 'swr'
  | 'msw'
  | 'zustand'
  | 'jotai'
  | 'redux-toolkit'
  | 'react-hook-form'

/** Libraries of one group do the same job: an app takes one of them. */
export type LibraryGroup = 'data' | 'state'

interface LibraryInfo {
  name: Library
  /** What the question says of it: its name, then what it does. */
  label: string
  group?: LibraryGroup
}

/** The libraries, in the order create offers them. */
export const LIBRARIES: readonly LibraryInfo[] = [
  { name: 'tanstack-query', label: 'TanStack Query: fetching and caching data', group: 'data' },
  { name: 'swr', label: 'SWR: fetching and caching data', group: 'data' },
  { name: 'msw', label: 'msw: a mock API in the browser' },
  { name: 'zustand', label: 'zustand: a store of global state', group: 'state' },
  { name: 'jotai', label: 'Jotai: atoms of global state', group: 'state' },
  { name: 'redux-toolkit', label: 'Redux Toolkit: a store of global state', group: 'state' },
  { name: 'react-hook-form', label: 'React Hook Form + Zod: a form, validated' },
]

export const LIBRARY_NAMES: readonly Library[] = LIBRARIES.map(({ name }) => name)

/** What the libraries of each group do, as the refusal says it. */
const GROUP_JOBS: Readonly<Record<LibraryGroup, string>> = {
  data: 'fetch and cache data',
  state: 'hold global state',
}

/** The names a sentence lists: `a and b`, `a, b and c`. */
const listNames = (names: readonly string[]) =>
  `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`

/** Why `libraries` cannot go together, or `undefined` when they can. */
export function findLibraryConflict(libraries: readonly Library[]): string | undefined {
  for (const group of ['data', 'state'] as const) {
    const picked = LIBRARIES.filter(
      (library) => library.group === group && libraries.includes(library.name)
    )
    if (picked.length < 2) continue
    const names = picked.map(({ label }) => label.split(':')[0])
    const all = names.length === 2 ? 'both' : 'all'
    return `${listNames(names)} ${all} ${GROUP_JOBS[group]}: pick one.`
  }
  return undefined
}
