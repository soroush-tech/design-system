import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it, vi } from 'vitest'
import { ensureBuilt, isStale } from './build'

const root = mkdtempSync(join(tmpdir(), 'contract-build-'))
afterAll(() => rmSync(root, { recursive: true, force: true }))

const at = (file: string, seconds: number) => utimesSync(file, seconds, seconds)

/** A package whose manifest and sources date from `source`, and whose newest output dates from `output`. */
const pkg = (name: string, source: number, output?: number) => {
  const dir = join(root, name)
  mkdirSync(join(dir, 'src', 'nested'), { recursive: true })
  writeFileSync(join(dir, 'package.json'), '{}')
  writeFileSync(join(dir, 'src', 'nested', 'a.ts'), '')
  at(join(dir, 'package.json'), source)
  at(join(dir, 'src', 'nested', 'a.ts'), source)
  if (output !== undefined) {
    mkdirSync(join(dir, 'dist', 'sub'), { recursive: true })
    writeFileSync(join(dir, 'dist', 'index.mjs'), '')
    writeFileSync(join(dir, 'dist', 'sub', 'later.mjs'), '')
    at(join(dir, 'dist', 'index.mjs'), output)
    at(join(dir, 'dist', 'sub', 'later.mjs'), output + 1000)
  }
  return dir
}

describe('isStale', () => {
  it('is stale with no build, with sources newer than the output, and fresh otherwise', () => {
    expect(isStale(pkg('unbuilt', 100))).toBe(true)
    expect(isStale(pkg('old-output', 200, 100))).toBe(true)
    expect(isStale(pkg('fresh', 100, 200))).toBe(false)
  })
})

describe('ensureBuilt', () => {
  it('builds only the stale packages, in the order given', () => {
    pkg('a', 100, 200)
    pkg('b', 300, 200)
    pkg('c', 100)
    const exec = vi.fn()
    expect(ensureBuilt(root, ['a', 'b', 'c'], exec as never)).toEqual(['b', 'c'])
    expect(exec.mock.calls.map(([, args]) => args)).toEqual([
      ['--filter', '@soroush.design/b', 'build'],
      ['--filter', '@soroush.design/c', 'build'],
    ])
  })
})
