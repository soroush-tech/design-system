import { describe, it, expect } from 'vitest'
import { splitReadme } from './splitReadme'

describe('splitReadme', () => {
  it('splits intro, props reference, and examples', () => {
    const source =
      '# Button\n\nIntro.\n\n---\n\n## Button-specific props\n\n### `variant`\n\n---\n\n## Examples\n\n```tsx\n<Button />\n```'
    const { intro, api, examples } = splitReadme(source)
    expect(intro).toBe('# Button\n\nIntro.')
    expect(api).toBe('## Button-specific props\n\n### `variant`')
    expect(examples).toBe('## Examples\n\n```tsx\n<Button />\n```')
  })

  it('splits at a plain Props heading without examples', () => {
    const { intro, api, examples } = splitReadme('Intro.\n\n## Props\n\nTable.')
    expect(intro).toBe('Intro.')
    expect(api).toBe('## Props\n\nTable.')
    expect(examples).toBe('')
  })

  it('returns everything as intro when no props heading exists', () => {
    const { intro, api, examples } = splitReadme('Just prose.')
    expect(intro).toBe('Just prose.')
    expect(api).toBe('')
    expect(examples).toBe('')
  })
})
