import { describe, it, expect } from 'vitest'
import { snippetToModule } from './snippetToModule'

const CONTEXT = {
  importsText: "import { Sample } from '@x/Sample'",
  helpersText: 'const items = [1, 2]',
}

describe('snippetToModule', () => {
  it('wraps a trailing JSX statement in the Demo return, setup above it', () => {
    const visible = "const args = { size: 'sm' }\n\n<Sample {...args}>{items}</Sample>"
    expect(snippetToModule(visible, CONTEXT)).toBe(
      [
        "import { Sample } from '@x/Sample'",
        '',
        'const items = [1, 2]',
        '',
        'export default function Demo() {',
        "  const args = { size: 'sm' }",
        '  return (',
        '    <Sample {...args}>{items}</Sample>',
        '  )',
        '}',
        '',
      ].join('\n')
    )
  })

  it('wraps a bare JSX buffer without a setup section', () => {
    expect(snippetToModule('<Sample />', { importsText: '', helpersText: '' })).toBe(
      ['export default function Demo() {', '  return (', '    <Sample />', '  )', '}', ''].join(
        '\n'
      )
    )
  })

  it('treats a buffer without top-level JSX as a complete function body', () => {
    const visible = "const heading = 'block'\nreturn <Sample>{heading}</Sample>"
    expect(snippetToModule(visible, { importsText: '', helpersText: '' })).toBe(
      [
        'export default function Demo() {',
        "  const heading = 'block'",
        '  return <Sample>{heading}</Sample>',
        '}',
        '',
      ].join('\n')
    )
  })

  it('renders nothing for an empty buffer', () => {
    expect(snippetToModule('  \n', { importsText: '', helpersText: '' })).toContain('return null')
  })

  it('passes an expanded buffer with a default export through untouched', () => {
    const module = 'export default function Demo() {\n  return <i />\n}\n'
    expect(snippetToModule(module, CONTEXT)).toBe(module)
  })

  it('normalizes CRLF buffers', () => {
    expect(snippetToModule('<i />\r\n', { importsText: '', helpersText: '' })).toContain(
      '    <i />'
    )
  })
})
