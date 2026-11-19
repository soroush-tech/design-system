// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { findLibraryConflict, LIBRARY_NAMES } from './libraries'

describe('findLibraryConflict', () => {
  it('lets libraries of different jobs go together', () => {
    expect(
      findLibraryConflict(
        LIBRARY_NAMES.filter((name) => !['swr', 'jotai', 'redux-toolkit'].includes(name))
      )
    ).toBeUndefined()
  })

  it('refuses two that fetch data, or two or three that hold global state', () => {
    expect(findLibraryConflict(['tanstack-query', 'swr'])).toBe(
      'TanStack Query and SWR both fetch and cache data: pick one.'
    )
    expect(findLibraryConflict(['zustand', 'jotai', 'redux-toolkit'])).toBe(
      'zustand, Jotai and Redux Toolkit all hold global state: pick one.'
    )
  })
})
