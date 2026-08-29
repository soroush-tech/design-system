import { describe, it, expect } from 'vitest'
import { allDocComponents } from 'src/common/nav'
import { readmeForSlug } from './readmeSources'

describe('readmeSources', () => {
  it('resolves a non-empty README for every registered component', () => {
    for (const item of allDocComponents) {
      expect(readmeForSlug(item.slug), `${item.slug} README empty`).toBeTruthy()
    }
  })

  it('throws for an unknown slug', () => {
    expect(() => readmeForSlug('nope')).toThrow('No README for component slug "nope"')
  })
})
