import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { catalog as core } from '@soroush.design/core/catalog'
import { baseTheme } from '../theme/themes'
import { catalog } from './index'
import { DESIGN_SYSTEM_SCALES, readStyleScales } from './styleScales'

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))

const entries = Object.values(catalog.components)

describe('catalog', () => {
  it("is the core's catalog, each entry with the module this library serves it from", () => {
    expect(catalog.categories).toBe(core.categories)
    expect(catalog.styleScales).toBe(core.styleScales)
    expect(Object.keys(catalog.components)).toEqual(Object.keys(core.components))
    for (const entry of entries) {
      const { subpath, ...neutral } = core.components[entry.name]
      const { module, ...rest } = entry
      expect(module).toBe(`@soroush.design/react/${subpath}`)
      expect(rest).toEqual(neutral)
    }
  })

  it('writes the keys of an entry in the order a consumer has always read them', () => {
    for (const entry of entries) {
      expect(Object.keys(entry).slice(-3)).toEqual(['name', 'module', 'category'])
    }
  })

  it.each(entries)("names $name's module, which the package exports, and its category", (entry) => {
    const subpath = entry.module.replace('@soroush.design/react', '.')
    expect(pkg.exports[subpath]).toBeDefined()
    expect(catalog.categories.map((category) => category.label)).toContain(entry.category)
  })

  it.each(entries)("draws $name's options from scales the theme has", (entry) => {
    for (const option of Object.values(entry.options)) {
      if (option.scale) expect(baseTheme).toHaveProperty(option.scale)
    }
  })

  it('is pure data - it survives JSON unchanged', () => {
    expect(JSON.parse(JSON.stringify(catalog))).toEqual(catalog)
  })

  it("maps styled-system props to the theme's scales, as the parsers read them", () => {
    expect(catalog.styleScales).toEqual(readStyleScales())
    expect(catalog.styleScales).toMatchObject(DESIGN_SYSTEM_SCALES)
    for (const scale of Object.values(catalog.styleScales)) {
      expect(baseTheme).toHaveProperty(scale)
    }
    expect(catalog.styleScales).not.toHaveProperty('display')
  })
})
