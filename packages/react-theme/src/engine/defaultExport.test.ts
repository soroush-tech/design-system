import { describe, expect, it } from 'vitest'
import { defaultExport } from './defaultExport'

describe('defaultExport', () => {
  const fn = () => 1

  it('returns the function of a default import', () => {
    expect(defaultExport(fn)).toBe(fn)
  })

  it('returns the default member of a CommonJS module', () => {
    expect(defaultExport({ default: fn })).toBe(fn)
  })
})
