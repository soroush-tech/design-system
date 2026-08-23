import { describe, it, expect } from 'vitest'
import { tsToJs } from './tsToJs'

describe('tsToJs', () => {
  it('strips type annotations and as-const while keeping JSX', () => {
    const code = [
      "import { Flex } from '@soroush.tech/design-system/Flex'",
      '',
      'export default function Demo() {',
      '  return (',
      '    <Flex>',
      "      {(['sm', 'md'] as const).map((size: string) => (",
      '        <i key={size}>{size}</i>',
      '      ))}',
      '    </Flex>',
      '  )',
      '}',
      '',
    ].join('\n')
    const js = tsToJs(code)
    expect(js).toContain("(['sm', 'md'] ).map((size) => (")
    expect(js).toContain('<Flex>')
    expect(js).not.toContain('as const')
    expect(js).not.toContain(': string')
  })

  it('strips inline type specifiers and annotations, cleaning the import braces', () => {
    const code = [
      "import { ButtonGroup, type ButtonGroupProps } from '@x/ButtonGroup'",
      '',
      '// Grouping needs no fragment wrapper.',
      'export default function Demo() {',
      "  const args: Partial<ButtonGroupProps> = { 'aria-label': 'Group' }",
      '  return <ButtonGroup {...args} />',
      '}',
      '',
    ].join('\n')
    const js = tsToJs(code)
    expect(js).toContain("import { ButtonGroup } from '@x/ButtonGroup'")
    expect(js).not.toContain('Partial<')
    // Comments survive the transform.
    expect(js).toContain('// Grouping needs no fragment wrapper.')
  })

  it('keeps imports that only types used and collapses leftover blank lines', () => {
    const code = [
      "import { css } from '@emotion/css'",
      '',
      'type Props = { speed?: string }',
      '',
      '',
      'export default function Demo({ speed = "2s" }: Props = {}) {',
      '  return <i className={css({ animation: speed })} />',
      '}',
      '',
    ].join('\n')
    const js = tsToJs(code)
    expect(js).toContain("import { css } from '@emotion/css'")
    expect(js).not.toContain('type Props')
    expect(js).not.toContain('\n\n\n')
    expect(js.endsWith('}\n')).toBe(true)
  })
})
