import { describe, it, expect } from 'vitest'
import { rewriteDocLinks } from './rewriteDocLinks'

const files = ['theming.md', 'guides/index.md', 'guides/spacing.md']

describe('rewriteDocLinks', () => {
  it('points a sibling of the same folder at its route', () => {
    expect(rewriteDocLinks('[Spacing](./spacing.md)', 'guides/index.md', files)).toBe(
      '[Spacing](/styled-system/docs/guides/spacing/)'
    )
  })

  it('goes up a folder, and keeps a #section', () => {
    expect(rewriteDocLinks('[Theming](../theming.md#scales)', 'guides/index.md', files)).toBe(
      '[Theming](/styled-system/docs/theming/#scales)'
    )
  })

  it('reaches a folder from the docs root, an index as its folder', () => {
    expect(rewriteDocLinks('[Guides](./guides/index.md)', 'theming.md', files)).toBe(
      '[Guides](/styled-system/docs/guides/)'
    )
  })

  it('leaves what is not a doc of the site as it is', () => {
    const source =
      '[a](./missing.md) [b](https://example.com/x.md) [c](#top) [d](./spacing.md.txt) [e](./spacing.md)'
    expect(rewriteDocLinks(source, 'guides/index.md', files)).toBe(
      '[a](./missing.md) [b](https://example.com/x.md) [c](#top) [d](./spacing.md.txt) [e](/styled-system/docs/guides/spacing/)'
    )
  })
})
