import { describe, it, expect } from 'vitest'
import { componentCategories } from '@soroush.tech/docs-content'
import { catalog, type ExampleNode } from './index'
import { catalogSources } from './sources'

const listed = componentCategories
  .flatMap((category) => category.items)
  .filter((item) => item.pkg === 'react')
  .map((item) => item.name)

const entries = Object.values(catalog.components)

// Every node of an example, the root included.
const nodesOf = (example: ExampleNode): ExampleNode[] => [
  example,
  ...example.children.flatMap((child) => (typeof child === 'string' ? [] : nodesOf(child))),
]
const examplesOf = (entry: (typeof entries)[number]) => [
  entry.example,
  ...entry.variants.map((variant) => variant.example),
]

describe('catalog', () => {
  it("lists the docs' categories, in order, with the design system's components", () => {
    expect(catalog.categories.map((category) => category.label)).toEqual(
      componentCategories.map((category) => category.label)
    )
    expect(catalog.categories.flatMap((category) => category.components)).toEqual(listed)
  })

  it('has an entry for every component the docs list', () => {
    expect(listed.filter((name) => !(name in catalog.components))).toEqual([])
  })

  it('has no entry the docs list neither as a component nor as a family', () => {
    const unlisted = Object.entries(catalogSources).filter(
      ([name, source]) => !listed.includes(source.family ?? name)
    )
    expect(unlisted.map(([name]) => name)).toEqual([])
  })

  it.each(entries)('gives $name a name, a subpath and a category of the docs', (entry) => {
    expect(catalog.components[entry.name]).toBe(entry)
    expect(entry.subpath).toMatch(/^[A-Z][A-Za-z]*$/)
    expect(catalog.categories.map((category) => category.label)).toContain(entry.category)
  })

  it.each(entries)("builds $name's examples from components the catalog has", (entry) => {
    const names = examplesOf(entry)
      .flatMap(nodesOf)
      .map((node) => node.component)
    expect(names.filter((name) => !(name in catalog.components))).toEqual([])
    expect(entry.example.component).toBe(entry.name)
  })

  it.each(entries)("names each of $name's looks", (entry) => {
    for (const variant of entry.variants) {
      expect(variant.name).not.toBe('')
      expect(variant.label).toEqual(expect.any(String))
      expect(variant.label).not.toBe('')
    }
  })

  it('is pure data - it survives JSON unchanged', () => {
    expect(JSON.parse(JSON.stringify(catalog))).toEqual(catalog)
  })

  it("maps styled-system props to the theme's scales, the design system's own props last", () => {
    expect(catalog.styleScales).toMatchObject({
      p: 'space',
      m: 'space',
      gap: 'space',
      width: 'sizes',
      borderRadius: 'radii',
      fontSize: 'fontSizes',
      color: 'text',
      bg: 'background',
      backgroundColor: 'background',
      borderColor: 'border',
    })
    expect(catalog.styleScales).not.toHaveProperty('display')
  })
})
