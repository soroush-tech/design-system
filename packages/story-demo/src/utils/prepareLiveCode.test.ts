import { describe, it, expect } from 'vitest'
import { prepareLiveCode } from './prepareLiveCode'

describe('prepareLiveCode', () => {
  it('drops single-line imports and unwraps the default export', () => {
    const code = [
      "import { Button } from '@soroush.tech/design-system/Button'",
      '',
      'export default function Demo() {',
      '  return <Button>Go</Button>',
      '}',
      '',
    ].join('\n')
    expect(prepareLiveCode(code)).toBe(
      ['function Demo() {', '  return <Button>Go</Button>', '}', '', 'render(<Demo />)', ''].join(
        '\n'
      )
    )
  })

  it('drops multi-line imports and unwraps exported helpers', () => {
    const code = [
      'import {',
      '  Button,',
      '  Flex,',
      "} from '@soroush.tech/design-system'",
      '',
      "export const label = 'go'",
      '',
      'export default function Example() {',
      '  return <Flex><Button>{label}</Button></Flex>',
      '}',
    ].join('\n')
    const live = prepareLiveCode(code)
    expect(live).not.toContain('import')
    expect(live).not.toContain('export')
    expect(live).toContain("const label = 'go'")
    expect(live).toContain('render(<Example />)')
  })

  it('falls back to rendering Demo when no default function is found', () => {
    expect(prepareLiveCode('const a = 1\r\nconst b = 2')).toBe(
      'const a = 1\nconst b = 2\n\nrender(<Demo />)\n'
    )
  })
})
