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
