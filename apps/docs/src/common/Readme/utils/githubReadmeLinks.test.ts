import { describe, it, expect } from 'vitest'
import { githubReadmeLinks } from './githubReadmeLinks'

describe('githubReadmeLinks', () => {
  it("points a relative link at the package's folder on GitHub", () => {
    expect(githubReadmeLinks('See [the licence](./LICENSE).', 'ui-spec')).toBe(
      'See [the licence](https://github.com/soroush-tech/design-system/tree/main/packages/ui-spec/LICENSE).'
    )
  })

  it('leaves absolute links and anchors as they are', () => {
    const source = '[a](https://example.com/x) [b](#top) [c](../other)'
    expect(githubReadmeLinks(source, 'mcp')).toBe(source)
  })
})
