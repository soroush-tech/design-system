import { describe, it, expect } from 'vitest'
import { leadOf, splitAccessibility } from './readmeText'

describe('splitAccessibility', () => {
  const readme = [
    '# Tabs',
    '',
    'A row of tabs.',
    '',
    '## Props',
    '',
    '| a | b |',
    '',
    '## Accessibility',
    '',
    'A tablist.',
    '',
    '### Keyboard',
    '',
    'Arrow keys.',
    '',
    '## Examples',
    '',
    'None.',
  ].join('\n')

  it('moves the accessibility sections, with their sub-sections, out of the README', () => {
    const { rest, accessibility } = splitAccessibility(readme)
    expect(accessibility).toBe('## Accessibility\n\nA tablist.\n\n### Keyboard\n\nArrow keys.')
    expect(rest).toBe('# Tabs\n\nA row of tabs.\n\n## Props\n\n| a | b |\n\n## Examples\n\nNone.')
  })

  it('takes each of Accessibility, Keyboard, Focus and ARIA at their own level', () => {
    const source = '## Keyboard\nk\n## Focus\nf\n## ARIA\na\n## Other\no'
    const { rest, accessibility } = splitAccessibility(source)
    expect(accessibility).toBe('## Keyboard\nk\n## Focus\nf\n## ARIA\na')
    expect(rest).toBe('## Other\no')
  })

  it('ends a section at the next heading of its level or a higher one', () => {
    const source = '### Keyboard\nk\n### Notes\nn\n## Next\nx'
    const { rest, accessibility } = splitAccessibility(source)
    expect(accessibility).toBe('### Keyboard\nk')
    expect(rest).toBe('### Notes\nn\n## Next\nx')
  })

  it('does not take a heading inside a code fence for a heading', () => {
    const source = '## Usage\n```md\n## Accessibility\n```\n## Other\no'
    const { rest, accessibility } = splitAccessibility(source)
    expect(accessibility).toBe('')
    expect(rest).toBe(source)
  })

  it('does not take the title, or a heading that only starts like one, for a section', () => {
    expect(splitAccessibility('# Accessibility\nx').accessibility).toBe('')
    expect(splitAccessibility('## Accessibilityish\nx').accessibility).toBe('')
  })

  it('has no accessibility text for a README without the sections', () => {
    expect(splitAccessibility('# A\n\ntext')).toEqual({ rest: '# A\n\ntext', accessibility: '' })
  })

  it('drops a closing rule from the section and collapses the gap it leaves', () => {
    const source = '## Props\n\np\n\n---\n\n## Accessibility\n\na\n\n---\n\n## Examples\n\ne'
    const { rest, accessibility } = splitAccessibility(source)
    expect(accessibility).toBe('## Accessibility\n\na')
    expect(rest).toBe('## Props\n\np\n\n---\n\n## Examples\n\ne')
  })
})

describe('leadOf', () => {
  it('is the first paragraph, as plain text', () => {
    const source = [
      '# Button',
      '',
      '![badge](x.svg)',
      '',
      'A **button** that runs an [action](./a.md), with `variant`.',
      '',
      'Second paragraph.',
    ].join('\n')
    expect(leadOf(source)).toBe('A button that runs an action, with variant.')
  })

  it('skips headings, rules, code, tables, lists and tags', () => {
    const source =
      '# T\n\n---\n\n```ts\nx\n```\n\n| a |\n\n- item\n\n1. one\n\n<Tag />\n\nThe lead.'
    expect(leadOf(source)).toBe('The lead.')
  })

  it('joins the lines of a paragraph', () => {
    expect(leadOf('# T\n\nOne line\nand another.')).toBe('One line and another.')
  })

  it('is empty when there is no paragraph', () => {
    expect(leadOf('# T\n\n## U')).toBe('')
    expect(leadOf('')).toBe('')
  })

  it('stops at the first sentence that is long enough to say what the component is', () => {
    const long = 'A scrolling area whose scrollbars are drawn over its content, not beside it.'
    expect(leadOf(`# T\n\n${long} Another sentence. And a third.`)).toBe(long)
  })

  it('takes a second sentence when the first is short', () => {
    expect(
      leadOf('# T\n\nExtends View. Renders as a div with display flex by default. More.')
    ).toBe('Extends View. Renders as a div with display flex by default.')
  })

  it('does not end a sentence at an abbreviation before a lower-case word', () => {
    expect(
      leadOf('# T\n\nA tag, e.g. a label for a thing, that is placed over another element.')
    ).toBe('A tag, e.g. a label for a thing, that is placed over another element.')
  })

  it('cuts a long sentence at a word, with three dots', () => {
    const lead = leadOf(`# T\n\n${'word '.repeat(80)}end.`)
    expect(lead.endsWith('word...')).toBe(true)
    expect(lead.length).toBeLessThanOrEqual(203)
  })
})
