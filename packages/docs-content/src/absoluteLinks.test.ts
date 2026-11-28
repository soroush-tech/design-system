import { describe, it, expect } from 'vitest'
import { DOCS_URL, absoluteReadmeLink, absoluteReadmeLinks } from './absoluteLinks'

describe('absoluteReadmeLink', () => {
  it('resolves a sibling component link, with or without README.md', () => {
    expect(absoluteReadmeLink('../View/')).toBe(`${DOCS_URL}/react/View/`)
    expect(absoluteReadmeLink('../TextInput/README.md')).toBe(`${DOCS_URL}/react/TextInput/`)
  })

  it('resolves a component in another section', () => {
    expect(absoluteReadmeLink('../Preview/')).toBe(`${DOCS_URL}/react/markdown/Preview/`)
  })

  it('resolves the package doc pages', () => {
    expect(absoluteReadmeLink('../../docs/theming.md')).toBe(`${DOCS_URL}/react/theme/`)
    expect(absoluteReadmeLink('../../docs/customization.md')).toBe(
      `${DOCS_URL}/react/customization/`
    )
  })

  it('resolves the links the docs make to each other and to the README', () => {
    expect(absoluteReadmeLink('./customization.md')).toBe(`${DOCS_URL}/react/customization/`)
    expect(absoluteReadmeLink('./catalog.md')).toBe(`${DOCS_URL}/react/catalog/`)
    expect(absoluteReadmeLink('../README.md#component-defaults')).toBe(
      `${DOCS_URL}/react/#component-defaults`
    )
  })

  it('resolves a family member to its page under its entry', () => {
    expect(absoluteReadmeLink('../MenuList/README.md')).toBe(`${DOCS_URL}/react/Menu/MenuList/`)
    // From outside its family, through the family's folder.
    expect(absoluteReadmeLink('../Menu/MenuItems/README.md')).toBe(
      `${DOCS_URL}/react/Menu/MenuItems/`
    )
  })

  it('keeps the section a link ends in', () => {
    expect(absoluteReadmeLink('../../MenuItem/README.md#submenus')).toBe(
      `${DOCS_URL}/react/MenuItem/specs/#submenus`
    )
    expect(absoluteReadmeLink('../View/#props')).toBe(`${DOCS_URL}/react/View/specs/#props`)
    expect(absoluteReadmeLink('../../docs/customization.md#slot-props')).toBe(
      `${DOCS_URL}/react/customization/#slot-props`
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
      `See [View](${DOCS_URL}/react/View/) and ` +
        `[docs](${DOCS_URL}/react/theme/) and [ext](https://x.dev).`
    )
  })
})
