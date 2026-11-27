import { describe, it, expect } from 'vitest'
import {
  allComponents,
  allDocComponents,
  categoryOf,
  componentAccessibilityPath,
  componentBySlug,
  sitePath,
  componentCategories,
  componentLinkPath,
  componentPagePath,
  componentSpecsPath,
  IMPORT_PACKAGE,
  importPackageOf,
  importSubpathOf,
  markdownComponents,
  memberComponents,
  membersOf,
  reactHooks,
} from './registry'
import { listComponentReadmes, packageDir } from './node/loadReadme'
import { repoRoot } from './node/repoRoot'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// The registry is only useful if it matches what is actually on disk - these are the
// guards the docs app used to carry in nav.test.ts, now next to the registry itself.
const designSystemReadmes = new Set(listComponentReadmes('react'))
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

  it('every family member has its README on disk', () => {
    for (const item of memberComponents) {
      expect(designSystemReadmes.has(item.readmePath), `${item.readmePath} missing`).toBe(true)
    }
  })

  it("every member README on disk is registered under its folder's family", () => {
    const registered = new Set(memberComponents.map((item) => item.readmePath))
    for (const suffix of designSystemReadmes) {
      const [family, member, file] = suffix.split('/')
      // A member's README sits beside its family's primary; hooks/ and the like are not members.
      if (file && family !== member && isPascalCase(member)) {
        expect(registered.has(suffix), `${suffix} not registered`).toBe(true)
      }
    }
  })

  it('every registered component has its MDX page beside its README', () => {
    // Component pages are mandatory: the docs route renders the MDX and nothing else,
    // so a missing page fails the prerender. Catch it here instead.
    for (const item of allComponents) {
      const mdxPath = item.readmePath.replace(/README\.md$/, `${item.name}.mdx`)
      expect(existsSync(join(packageDir('react'), 'src', mdxPath)), `${mdxPath} missing`).toBe(true)
    }
  })

  it('every registered markdown component has its README on disk', () => {
    for (const item of markdownComponents) {
      expect(markdownReadmes.has(item.readmePath), `${item.readmePath} missing`).toBe(true)
    }
  })

  it('every hook of the hooks library has an entry point and a README section, and the reverse', () => {
    const folder = join(repoRoot(), 'packages', 'react-hooks')
    const { exports } = JSON.parse(readFileSync(join(folder, 'package.json'), 'utf8')) as {
      exports: Record<string, string>
    }
    const entries = Object.keys(exports)
      .filter((subpath) => subpath !== '.')
      .map((subpath) => subpath.slice(2))
    const readme = readFileSync(join(folder, 'README.md'), 'utf8')
    const sectionsOfReadme = [...readme.matchAll(/^## (.+)$/gm)].map(([, heading]) => heading)
    expect([...reactHooks].sort()).toEqual(entries.sort())
    expect([...reactHooks].sort()).toEqual(sectionsOfReadme.sort())
  })

  it('slugs are unique across packages', () => {
    expect(componentBySlug.size).toBe(allDocComponents.length)
  })

  it('reports the category a component sits under', () => {
    expect(categoryOf(componentBySlug.get('button')!)).toBe('Inputs & forms')
    expect(categoryOf(componentBySlug.get('preview')!)).toBeUndefined()
  })

  it("files a member under its family's category, its subpath and its page", () => {
    const menuList = componentBySlug.get('menu-list')!
    const menu = componentBySlug.get('menu')!
    expect(membersOf(menu)).toContain(menuList)
    expect(membersOf(componentBySlug.get('button')!)).toEqual([])
    expect(categoryOf(menuList)).toBe(categoryOf(menu))
    expect(importSubpathOf(menuList)).toBe('Menu')
    expect(importSubpathOf(menu)).toBe('Menu')
    expect(componentPagePath(menuList)).toBe('/Menu/MenuList/')
    expect(componentPagePath(menu)).toBe('/Menu/')
    expect(componentSpecsPath(menuList)).toBe('/Menu/MenuList/')
    expect(componentSpecsPath(menu)).toBe('/Menu/specs/')
  })

  it('imports a component from its own package, so the line on a page is the real one', () => {
    expect(IMPORT_PACKAGE).toBe('@soroush.design/react')
    expect(importPackageOf(componentBySlug.get('button')!)).toBe('@soroush.design/react')
    expect(importSubpathOf(componentBySlug.get('button')!)).toBe('Button')
    expect(importPackageOf(componentBySlug.get('preview')!)).toBe('@soroush.design/react-markdown')
    expect(importSubpathOf(componentBySlug.get('preview')!)).toBe('Preview')
    expect(importSubpathOf(componentBySlug.get('menu-list')!)).toBe('Menu')
  })

  it("sends a link to a README's section to the page that shows it", () => {
    const menuItem = componentBySlug.get('menu-item')!
    const preview = componentBySlug.get('preview')!
    expect(componentLinkPath(menuItem)).toBe('/MenuItem/')
    expect(componentLinkPath(menuItem, '#submenus')).toBe('/MenuItem/specs/#submenus')
    expect(componentLinkPath(componentBySlug.get('menu-list')!, '#props')).toBe(
      '/Menu/MenuList/#props'
    )
    expect(componentLinkPath(preview, '#props')).toBe('/Preview/#props')
  })

  it('puts a page at its section route, and the accessibility page under its component', () => {
    expect(sitePath('react', '/')).toBe('/react/')
    expect(sitePath('markdown', '/Editor/')).toBe('/react/markdown/Editor/')
    expect(componentAccessibilityPath(componentBySlug.get('button')!)).toBe(
      '/Button/accessibility/'
    )
  })

  it('groups every design-system component into exactly one category', () => {
    const counted = componentCategories.flatMap((category) => category.items)
    expect(counted).toHaveLength(new Set(counted).size)
    expect(counted).toHaveLength(allComponents.length)
  })
})
