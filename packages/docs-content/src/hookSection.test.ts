import { describe, expect, it } from 'vitest'
import { hookSection } from './hookSection'

const readme = '# Hooks\n\nIntro.\n\n## useA\n\nA body.\n\n## useB\n\nB body.\n'

describe('hookSection', () => {
  it('cuts a section up to the next one, and turns its heading into the title', () => {
    expect(hookSection(readme, 'useA')).toBe('# useA\n\nA body.')
  })

  it('cuts the last section to the end', () => {
    expect(hookSection(readme, 'useB')).toBe('# useB\n\nB body.')
  })

  it('names the hook that has no section', () => {
    expect(() => hookSection(readme, 'useC')).toThrow('no section "useC"')
  })
})
