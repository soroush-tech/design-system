import { describe, it, expect } from 'vitest'
import { allDocComponents } from '@soroush.tech/docs-content'
import { buildComponents, importPathFor, summarize } from './components'
import { buildDocs } from './docs'
import { buildTokens, flatten, themeScaleNames } from './tokens'
import { buildContent, designSystemVersion } from './build'

// These run against the real repo, so they double as a lint on the docs sources: a
// component whose README loses its shape, or a doc file that moves, fails here.

describe('component pipeline', () => {
  const components = buildComponents()

  it('covers every registered component', () => {
    expect(components).toHaveLength(allDocComponents.length)
  })

  it('gives every component a summary, an import line, and a docs URL', () => {
    for (const component of components) {
      expect(component.summary, `${component.name} has no summary`).not.toBe('')
      expect(component.importPath).toContain(`from '${component.packageName}/${component.name}'`)
      expect(component.url.startsWith('https://docs.soroush.design/')).toBe(true)
    }
  })

  it('splits a props reference out of every README that has one', () => {
    // Backdrop and Toolbar document defaults/controls rather than props, so their
    // whole README stays in the intro - everything else exposes an api section.
    const withoutApi = components.filter((component) => !component.api).map((c) => c.name)
    expect(withoutApi.sort()).toEqual(['Backdrop', 'Toolbar'])
  })

  it('strips the leading heading out of the intro', () => {
    const button = components.find((component) => component.name === 'Button')!
    expect(button.intro.startsWith('# Button')).toBe(false)
  })

  it('categorizes design-system components and leaves markdown ones uncategorized', () => {
    expect(components.find((c) => c.name === 'Button')!.category).toBe('Inputs & forms')
    expect(components.find((c) => c.name === 'Preview')!.category).toBeUndefined()
  })

  it('builds the subpath import for a component', () => {
    expect(importPathFor(allDocComponents.find((item) => item.name === 'Card')!)).toBe(
      "import { Card } from '@soroush.tech/design-system/Card'"
    )
  })
})

describe('summarize', () => {
  it('takes the first prose sentence, skipping chrome', () => {
    expect(summarize('# Title\n[![b](i)](u)\n\nDoes a thing. And more.')).toBe('Does a thing.')
  })

  it('collapses whitespace and falls back to the whole line without punctuation', () => {
    expect(summarize('A  line\twith   spaces')).toBe('A line with spaces')
  })

  it('returns empty when there is no prose at all', () => {
    expect(summarize('# Only a heading\n\n> quote\n\n```\ncode\n```')).toBe('')
  })
})

describe('doc pipeline', () => {
  const docs = buildDocs()

  it('gives every doc a unique id and a non-empty body', () => {
    expect(new Set(docs.map((doc) => doc.id)).size).toBe(docs.length)
    for (const doc of docs) expect(doc.body.trim(), `${doc.id} is empty`).not.toBe('')
  })

  it('fences the copy-verbatim source references', () => {
    expect(docs.find((doc) => doc.id === 'brand-theme')!.body).toContain('```ts')
    expect(docs.find((doc) => doc.id === 'providers')!.body).toContain('```tsx')
  })

  it('includes the styled-system docs and guides under a prefix', () => {
    expect(docs.some((doc) => doc.id === 'styled-system/api')).toBe(true)
    expect(docs.some((doc) => doc.id === 'styled-system/guides/spacing')).toBe(true)
  })

  it('omits the url for references that have no page on the site', () => {
    expect(docs.find((doc) => doc.id === 'layout-kit')!.url).toBeUndefined()
    expect(docs.find((doc) => doc.id === 'theming')!.url).toBeTruthy()
  })
})

describe('token pipeline', () => {
  it('flattens nested scales to dotted leaf paths', () => {
    expect(flatten({ a: { b: 'x' }, c: 1 })).toEqual([
      { path: 'a.b', value: 'x' },
      { path: 'c', value: 1 },
    ])
  })

  it('flattens arrays by index', () => {
    expect(flatten([12, 14])).toEqual([
      { path: '0', value: 12 },
      { path: '1', value: 14 },
    ])
  })

  it('serializes every theme scale except the theme identity fields', async () => {
    const [scales, names] = await Promise.all([buildTokens(), themeScaleNames()])
    const serialized = new Set(scales.map((scale) => scale.name))
    const skipped = names.filter((name) => !serialized.has(name))
    // A new scale added to baseTheme must appear here with no other change.
    expect(skipped.sort()).toEqual(['colorScheme', 'name'])
  })

  it('carries real token values', async () => {
    const palette = (await buildTokens()).find((scale) => scale.name === 'palette')!
    expect(palette.tokens.some((token) => token.path === 'primary.main')).toBe(true)
  })
})

describe('buildContent', () => {
  it('assembles the whole bundle at the design-system version', async () => {
    const bundle = await buildContent()
    expect(bundle.version).toBe(designSystemVersion())
    expect(bundle.components.length).toBeGreaterThan(0)
    expect(bundle.docs.length).toBeGreaterThan(0)
    expect(bundle.tokens.length).toBeGreaterThan(0)
  })
})
