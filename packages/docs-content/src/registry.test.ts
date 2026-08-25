import { describe, it, expect } from 'vitest'
import {
  allComponents,
  allDocComponents,
  categoryOf,
  componentBySlug,
  componentCategories,
  markdownComponents,
  styledSystemDocSlug,
  styledSystemDocs,
  styledSystemGuides,
} from './registry'
import { listComponentReadmes, packageDir } from './node/loadReadme'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

// The registry is only useful if it matches what is actually on disk - these are the
// guards the docs app used to carry in nav.test.ts, now next to the registry itself.
const designSystemReadmes = new Set(listComponentReadmes('design-system'))
const markdownReadmes = new Set(listComponentReadmes('markdown'))

const isPascalCase = (segment: string): boolean => /^[A-Z][A-Za-z0-9]*$/.test(segment)

describe('component registry', () => {
  it('every registered component has its README on disk', () => {
    for (const item of allComponents) {
      expect(designSystemReadmes.has(item.readmePath), `${item.readmePath} missing`).toBe(true)
    }
  })

  it('every top-level component README on disk is registered', () => {
    const registered = new Set(allComponents.map((item) => item.readmePath))
    const containerPrimaries = new Set(
      [...designSystemReadmes]
        .map((suffix) => suffix.split('/'))
        .filter((parts) => parts.length === 3 && parts[0] === parts[1])
        .map((parts) => parts[0])
    )
    for (const suffix of designSystemReadmes) {
      const parts = suffix.split('/')
      // A component page exists for src/<Name>/README.md and container primaries
      // src/<Name>/<Name>/README.md. Deeper sub-component READMEs render inside
      // their container's page content, not as pages of their own.
      const isTopLevel = parts.length === 2 && isPascalCase(parts[0])
      const isPrimary = parts.length === 3 && parts[0] === parts[1]
      if ((isTopLevel && !containerPrimaries.has(parts[0])) || isPrimary) {
        expect(registered.has(suffix), `${suffix} not registered`).toBe(true)
      }
    }
  })

  it('every registered component has its MDX page beside its README', () => {
    // Component pages are mandatory: the docs route renders the MDX and nothing else,
    // so a missing page fails the prerender. Catch it here instead.
    for (const item of allComponents) {
      const mdxPath = item.readmePath.replace(/README\.md$/, `${item.name}.mdx`)
      expect(
        existsSync(join(packageDir('design-system'), 'src', mdxPath)),
        `${mdxPath} missing`
      ).toBe(true)
    }
  })

  it('every registered markdown component has its README on disk', () => {
    for (const item of markdownComponents) {
      expect(markdownReadmes.has(item.readmePath), `${item.readmePath} missing`).toBe(true)
    }
  })

  it('every styled-system doc and guide file exists on disk', () => {
    for (const { file } of [...styledSystemDocs, ...styledSystemGuides]) {
      expect(existsSync(join(packageDir('styled-system'), 'docs', file)), `${file} missing`).toBe(
        true
      )
    }
  })

  it('slugs are unique across packages', () => {
    expect(componentBySlug.size).toBe(allDocComponents.length)
  })

  it('reports the category a component sits under', () => {
    expect(categoryOf(componentBySlug.get('button')!)).toBe('Inputs & forms')
    expect(categoryOf(componentBySlug.get('preview')!)).toBeUndefined()
  })

  it('maps styled-system doc files to URL segments', () => {
    expect(styledSystemDocSlug('api.md')).toBe('api')
    expect(styledSystemDocSlug('guides/array-props.md')).toBe('guides/array-props')
    expect(styledSystemDocSlug('guides/index.md')).toBe('guides')
  })

  it('groups every design-system component into exactly one category', () => {
    const counted = componentCategories.flatMap((category) => category.items)
    expect(counted.length).toBe(new Set(counted).size)
    expect(counted.length).toBe(allComponents.length)
  })
})
