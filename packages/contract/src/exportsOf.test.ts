import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { exportsOf } from './exportsOf'

const dir = mkdtempSync(join(tmpdir(), 'contract-exports-'))
afterAll(() => rmSync(dir, { recursive: true, force: true }))

const write = (name: string, source: string) => {
  mkdirSync(dir, { recursive: true })
  const file = join(dir, name)
  writeFileSync(file, source)
  return file
}

describe('exportsOf', () => {
  it('separates values from types, follows re-exports, and keeps names that are both', () => {
    const chunk = write(
      'chunk.d.mts',
      'export declare const a: number\nexport interface Shape { x: number }\n'
    )
    const entry = write(
      'entry.d.mts',
      [
        "import { a, Shape } from './chunk.d.mts'",
        'declare class Box {}',
        'declare const Both: number',
        'interface Both { y: number }',
        'type Alias = string',
        'declare function run(): void',
        'export { a, type Shape, Box, Both, type Alias, run as default }',
        "export { a as renamed } from './chunk.d.mts'",
        '',
      ].join('\n')
    )
    const lists = exportsOf([chunk, entry])
    expect(lists[entry]).toEqual({
      values: ['a', 'Both', 'Box', 'default', 'renamed'],
      types: ['Alias', 'Both', 'Box', 'Shape'],
    })
    expect(lists[chunk]).toEqual({ values: ['a'], types: ['Shape'] })
  })

  it('reads a file that is not a module as exporting nothing', () => {
    const script = write('script.d.ts', 'declare const loose: number\n')
    expect(exportsOf([script])[script]).toEqual({ values: [], types: [] })
  })
})
