import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { componentCategories } from '@soroush.tech/docs-content'
import { baseTheme } from '../theme/themes'
import { catalog, type ExampleNode } from './index'
import { catalogSources } from './sources'
import { DESIGN_SYSTEM_SCALES } from './styleScales'

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
const listed = componentCategories
  .flatMap((category) => category.items)
  .filter((item) => item.pkg === 'design-system')
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

  it.each(entries)("names $name's module, which the package exports, and its category", (entry) => {
    const subpath = entry.module.replace('@soroush.tech/design-system', '.')
    expect(pkg.exports[subpath]).toBeDefined()
    expect(catalog.categories.map((category) => category.label)).toContain(entry.category)
  })

  it.each(entries)("draws $name's options from scales the theme has", (entry) => {
    for (const option of Object.values(entry.options)) {
      if (option.scale) expect(baseTheme).toHaveProperty(option.scale)
    }
  })

  it.each(entries)("builds $name's examples from components the catalog has", (entry) => {
    const names = examplesOf(entry)
      .flatMap(nodesOf)
      .map((node) => node.component)
    expect(names.filter((name) => !(name in catalog.components))).toEqual([])
    expect(entry.example.component).toBe(entry.name)
  })

  it('is pure data - it survives JSON unchanged', () => {
    expect(JSON.parse(JSON.stringify(catalog))).toEqual(catalog)
  })

  it("maps styled-system props to the theme's scales, the design system's own props first", () => {
    expect(catalog.styleScales).toMatchObject({
      p: 'space',
      m: 'space',
      gap: 'space',
      width: 'sizes',
      borderRadius: 'radii',
      fontSize: 'fontSizes',
      ...DESIGN_SYSTEM_SCALES,
    })
    for (const scale of Object.values(catalog.styleScales)) {
      expect(baseTheme).toHaveProperty(scale)
    }
    expect(catalog.styleScales).not.toHaveProperty('display')
  })
})
