import { describe, it, expect } from 'vitest'
import { rewriteReadmeLink, rewriteReadmeLinks } from './rewriteReadmeLinks'

describe('rewriteReadmeLink', () => {
  it('maps package docs links to customization routes', () => {
    expect(rewriteReadmeLink('../../docs/customization.md')).toBe(
      '/design-system/customization/how-to/'
    )
    expect(rewriteReadmeLink('../../docs/theming.md')).toBe('/design-system/customization/theming/')
  })

  it('maps sibling component READMEs to component routes at any depth', () => {
    expect(rewriteReadmeLink('../Pressable/README.md')).toBe('/design-system/components/pressable/')
    expect(rewriteReadmeLink('../../Pressable/README.md')).toBe(
      '/design-system/components/pressable/'
    )
    expect(rewriteReadmeLink('../TextInput/README.md')).toBe(
      '/design-system/components/text-input/'
    )
  })

  it('resolves a linked component to its own package section', () => {
    expect(rewriteReadmeLink('../Mermaid/README.md')).toBe('/markdown/components/mermaid/')
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
      'See [Sidebar](/design-system/components/sidebar/) and [theming](/design-system/customization/theming/).'
    )
  })

  it('leaves text without links unchanged', () => {
    expect(rewriteReadmeLinks('No links here.')).toBe('No links here.')
  })
})
