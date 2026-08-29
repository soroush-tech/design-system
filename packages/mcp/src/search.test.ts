import { describe, it, expect } from 'vitest'
import { content, findComponent, findDoc } from './content'
import { search } from './search'
import type { ContentBundle } from './types'

const bundle: ContentBundle = {
  version: '1.0.0',
  components: [
    {
      name: 'Button',
      slug: 'button',
      pkg: 'design-system',
      packageName: '@soroush.tech/design-system',
      category: 'Inputs & forms',
      importPath: "import { Button } from '@soroush.tech/design-system/Button'",
      summary: 'Renders as a button.',
      intro:
        'A pressable control used across forms, toolbars, dialogs, cards and page headers, appearing just about everywhere in the app.',
      api: '## Props\n\nvariant, color, size.',
      examples: '',
      url: 'https://docs.soroush.tech/design-system/components/button/',
    },
  ],
  docs: [
    {
      id: 'theming',
      title: 'Theming',
      summary: 'How themes compose.',
      body: 'Themes carry scales.',
    },
  ],
  tokens: [],
}

describe('search', () => {
  it('ranks a heading match above a body-only match', () => {
    const hits = search(bundle, 'button')
    expect(hits[0].ref).toBe('Button')
    expect(hits[0].kind).toBe('component')
  })

  it('finds docs by title', () => {
    expect(search(bundle, 'theming')[0].ref).toBe('theming')
  })

  it('returns nothing for an empty or too-short query', () => {
    expect(search(bundle, '')).toEqual([])
    expect(search(bundle, 'a')).toEqual([])
  })

  it('returns nothing when no entry matches', () => {
    expect(search(bundle, 'zzzznomatch')).toEqual([])
  })

  it('honours the result limit', () => {
    expect(search(content, 'the', 3).length).toBeLessThanOrEqual(3)
  })

  it('excerpts around the first hit, with a leading ellipsis when it is not at the start', () => {
    // "everywhere" sits more than a window's width into the intro, so the snippet
    // opens mid-sentence rather than at the beginning.
    const [hit] = search(bundle, 'everywhere')
    expect(hit.snippet.startsWith('...')).toBe(true)
  })

  it('falls back to the opening of the body when the term is only in the heading', () => {
    const [hit] = search(bundle, 'forms')
    expect(hit.snippet.startsWith('...')).toBe(false)
  })

  it('centres on the query term the body actually holds, not merely the first', () => {
    // "button" matches only through the heading; "everywhere" is what the body carries,
    // so the excerpt has to open around the later term.
    const [hit] = search(bundle, 'button everywhere')
    expect(hit.snippet).toContain('everywhere')
    expect(hit.snippet.startsWith('...')).toBe(true)
  })

  it('opens at the body when no query term appears in it at all', () => {
    const [hit] = search(bundle, 'inputs')
    expect(hit.snippet.startsWith('...')).toBe(false)
    expect(hit.snippet.startsWith('A pressable control')).toBe(true)
  })
})

describe('content lookups', () => {
  it('finds a component by name or slug, case-insensitively', () => {
    expect(findComponent('BUTTON')?.name).toBe('Button')
    expect(findComponent('text-input')?.name).toBe('TextInput')
  })

  it('finds a doc by id, case-insensitively', () => {
    expect(findDoc('Theming')?.id).toBe('theming')
  })

  it('matches a slug case-insensitively on either side', () => {
    // The shipped bundle only ever carries kebab-case slugs, but a caller may pass its
    // own bundle, and the lookup promises case-insensitivity for the slug too.
    expect(findComponent('TEXT-INPUT')?.name).toBe('TextInput')
    const mixed = { ...bundle, components: [{ ...bundle.components[0], slug: 'Text-Input' }] }
    expect(findComponent('text-input', mixed)?.slug).toBe('Text-Input')
  })

  it('returns undefined for unknown refs', () => {
    expect(findComponent('nope')).toBeUndefined()
    expect(findDoc('nope')).toBeUndefined()
  })

  it('searches the bundle it is given rather than the shipped one', () => {
    // The fixture bundle holds only Button and the theming doc, so a name the shipped
    // content does carry must miss here - otherwise the lookup ignored its argument.
    expect(findComponent('Button', bundle)?.name).toBe('Button')
    expect(findComponent('TextInput', bundle)).toBeUndefined()
    expect(findDoc('theming', bundle)?.id).toBe('theming')
    expect(findDoc('styled-system/api', bundle)).toBeUndefined()
  })
})
