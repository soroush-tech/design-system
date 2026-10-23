import { describe, it, expect } from 'vitest'
import type { SearchEntry } from 'src/common/nav'
import { filterEntries } from './filterEntries'

const entry = (label: string, group = 'Components'): SearchEntry => ({
  label,
  group,
  href: `/${label.toLowerCase().replace(/\s+/g, '-')}/`,
})

const entries = [
  entry('Table'),
  entry('Button'),
  entry('ButtonGroup'),
  entry('Button specs', 'Specs'),
  entry('Tabs'),
  entry('Floating Button'),
]

const labels = (found: SearchEntry[]) => found.map((item) => item.label)

describe('filterEntries', () => {
  it('finds nothing for an empty or blank query', () => {
    expect(filterEntries(entries, '')).toEqual([])
    expect(filterEntries(entries, '   ')).toEqual([])
  })

  it('matches in any case', () => {
    expect(labels(filterEntries(entries, 'TABLE'))).toEqual(['Table'])
  })

  it('wants every word of the query, in the label or the group', () => {
    expect(labels(filterEntries(entries, 'button specs'))).toEqual(['Button specs'])
    expect(labels(filterEntries(entries, 'floating specs'))).toEqual([])
  })

  it('puts the labels that start with the query first, then keeps the docs order', () => {
    expect(labels(filterEntries(entries, 'button'))).toEqual([
      'Button',
      'ButtonGroup',
      'Button specs',
      'Floating Button',
    ])
  })

  it('stops at twenty results', () => {
    const many = Array.from({ length: 30 }, (_, index) => entry(`Item ${index}`))
    expect(filterEntries(many, 'item')).toHaveLength(20)
  })
})
