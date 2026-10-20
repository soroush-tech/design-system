import { describe, it, expect } from 'vitest'
import { DOCS_URL, absoluteReadmeLink, absoluteReadmeLinks } from './absoluteLinks'

describe('absoluteReadmeLink', () => {
  it('resolves a sibling component link, with or without README.md', () => {
    expect(absoluteReadmeLink('../View/')).toBe(`${DOCS_URL}/design-system/components/view/`)
    expect(absoluteReadmeLink('../TextInput/README.md')).toBe(
      `${DOCS_URL}/design-system/components/text-input/`
    )
  })

  it('resolves a component in another package', () => {
    expect(absoluteReadmeLink('../Preview/')).toBe(`${DOCS_URL}/markdown/components/preview/`)
  })

  it('resolves the package doc pages', () => {
    expect(absoluteReadmeLink('../../docs/theming.md')).toBe(
      `${DOCS_URL}/design-system/customization/theming/`
    )
    expect(absoluteReadmeLink('../../docs/customization.md')).toBe(
      `${DOCS_URL}/design-system/customization/how-to/`
    )
  })

  it('resolves a family member to its API page', () => {
    expect(absoluteReadmeLink('../MenuList/README.md')).toBe(
      `${DOCS_URL}/design-system/api/menu-list/`
    )
    // From outside its family, through the family's folder.
    expect(absoluteReadmeLink('../Menu/MenuItems/README.md')).toBe(
      `${DOCS_URL}/design-system/api/menu-items/`
    )
  })

  it('keeps the section a link ends in', () => {
    expect(absoluteReadmeLink('../../MenuItem/README.md#submenus')).toBe(
      `${DOCS_URL}/design-system/api/menu-item/#submenus`
    )
    expect(absoluteReadmeLink('../View/#props')).toBe(`${DOCS_URL}/design-system/api/view/#props`)
    expect(absoluteReadmeLink('../../docs/customization.md#slot-props')).toBe(
      `${DOCS_URL}/design-system/customization/how-to/#slot-props`
    )
  })

  it('passes through absolute URLs, anchors, and unknown targets', () => {
    expect(absoluteReadmeLink('https://example.com')).toBe('https://example.com')
    expect(absoluteReadmeLink('#anchor')).toBe('#anchor')
    expect(absoluteReadmeLink('../NotAComponent/')).toBe('../NotAComponent/')
    expect(absoluteReadmeLink('../../docs/unknown.md')).toBe('../../docs/unknown.md')
  })
})

describe('absoluteReadmeLinks', () => {
  it('rewrites every link in a document', () => {
    const source =
      'See [View](../View/) and [docs](../../docs/theming.md) and [ext](https://x.dev).'
    expect(absoluteReadmeLinks(source)).toBe(
      `See [View](${DOCS_URL}/design-system/components/view/) and ` +
        `[docs](${DOCS_URL}/design-system/customization/theming/) and [ext](https://x.dev).`
    )
  })
})
