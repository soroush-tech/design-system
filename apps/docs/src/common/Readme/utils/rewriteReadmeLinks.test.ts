import { describe, it, expect } from 'vitest'
import { rewriteReadmeLink, rewriteReadmeLinks } from './rewriteReadmeLinks'

describe('rewriteReadmeLink', () => {
  it('maps package docs links to customization routes', () => {
    expect(rewriteReadmeLink('../../docs/customization.md')).toBe('/react/customization/')
    expect(rewriteReadmeLink('../../docs/theming.md')).toBe('/react/theme/')
  })

  it('maps sibling component READMEs to component routes at any depth', () => {
    expect(rewriteReadmeLink('../Pressable/README.md')).toBe('/react/Pressable/')
    expect(rewriteReadmeLink('../../Pressable/README.md')).toBe('/react/Pressable/')
    expect(rewriteReadmeLink('../TextInput/README.md')).toBe('/react/TextInput/')
  })

  it("resolves a family member to its API page, and keeps a link's section", () => {
    expect(rewriteReadmeLink('../MenuList/README.md')).toBe('/react/Menu/MenuList/')
    expect(rewriteReadmeLink('../Menu/MenuItems/README.md')).toBe('/react/Menu/MenuItems/')
    expect(rewriteReadmeLink('../../MenuItem/README.md#submenus')).toBe(
      '/react/MenuItem/specs/#submenus'
    )
    expect(rewriteReadmeLink('../Menu/')).toBe('/react/Menu/')
    expect(rewriteReadmeLink('../../docs/customization.md#slot-props')).toBe(
      '/react/customization/#slot-props'
    )
  })

  it('maps the links between the library docs, and to its README', () => {
    expect(rewriteReadmeLink('./customization.md')).toBe('/react/customization/')
    expect(rewriteReadmeLink('./catalog.md')).toBe('/react/catalog/')
    expect(rewriteReadmeLink('../README.md#component-defaults')).toBe('/react/#component-defaults')
  })

  it('resolves a linked component to its own package section', () => {
    expect(rewriteReadmeLink('../Mermaid/README.md')).toBe('/react/markdown/Mermaid/')
  })

  it('passes through absolute URLs, anchors, and unknown targets', () => {
    expect(rewriteReadmeLink('https://example.com/page')).toBe('https://example.com/page')
    expect(rewriteReadmeLink('#props')).toBe('#props')
    expect(rewriteReadmeLink('../../docs/unknown.md')).toBe('../../docs/unknown.md')
    expect(rewriteReadmeLink('../Unregistered/README.md')).toBe('../Unregistered/README.md')
    expect(rewriteReadmeLink('./local-file.ts')).toBe('./local-file.ts')
  })
})

describe('rewriteReadmeLinks', () => {
  it('rewrites every link target in a source string', () => {
    const source = 'See [Sidebar](../Sidebar/README.md) and [theming](../../docs/theming.md).'
    expect(rewriteReadmeLinks(source)).toBe(
      'See [Sidebar](/react/Sidebar/) and [theming](/react/theme/).'
    )
  })

  it('leaves text without links unchanged', () => {
    expect(rewriteReadmeLinks('No links here.')).toBe('No links here.')
  })
})
