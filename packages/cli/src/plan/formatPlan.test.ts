// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { formatPlan } from './formatPlan'

describe('formatPlan', () => {
  it('lists the files to create, each edit as a diff, and the install', () => {
    const text = formatPlan({
      creates: [{ path: 'src/theme/themes.ts', content: '' }],
      edits: [{ path: 'src/main.tsx', before: 'a\nb', after: 'a\nB' }],
      skips: [],
      manual: [],
      install: { command: 'pnpm', args: ['add', 'x', '--ignore-scripts'], env: {} },
    })
    expect(text).toBe(`Create:
  src/theme/themes.ts

Edit src/main.tsx:
      a
    - b
    + B

Install:
  pnpm add x --ignore-scripts
`)
  })

  it('shows the environment an install runs with, what it skips, and what it leaves to you', () => {
    const text = formatPlan({
      creates: [],
      edits: [],
      skips: [{ path: 'src/theme/themes.ts', reason: 'exists' }],
      manual: ['Do this.'],
      install: { command: 'yarn', args: ['add', 'x'], env: { YARN_ENABLE_SCRIPTS: 'false' } },
    })
    expect(text).toBe(`Install:
  YARN_ENABLE_SCRIPTS=false yarn add x

Skip:
  src/theme/themes.ts: exists

Left to you:
  - Do this.
`)
  })
})
