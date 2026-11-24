import { describe, expect, it } from 'vitest'
import { deepMerge } from './deepMerge'

describe('deepMerge', () => {
  it('recurses into plain objects and replaces arrays and functions wholesale', () => {
    const fn = () => 1
    expect(
      deepMerge({ a: { b: 1, c: [1, 2] }, d: 1 }, { a: { b: 2, c: [3], f: fn }, e: 2 })
    ).toEqual({ a: { b: 2, c: [3], f: fn }, d: 1, e: 2 })
  })

  it('ignores undefined overrides and mutates neither argument', () => {
    const base = { a: { b: 1 } }
    const overrides = { a: { b: undefined }, c: undefined }
    expect(deepMerge(base, overrides)).toEqual({ a: { b: 1 } })
    expect(base).toEqual({ a: { b: 1 } })
  })
})
