import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, describe, expect, it } from 'vitest'
import { LISTED } from './check'
import { checkList, diffLists, publishedDeclarations } from './lists'
import type { ListFile } from './lists'

const contractDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = mkdtempSync(join(tmpdir(), 'contract-lists-'))
afterAll(() => rmSync(dir, { recursive: true, force: true }))

const want = { values: ['a', 'b'], types: ['T'] }

describe('diffLists', () => {
  it('is empty when the lists match', () => {
    expect(diffLists({ '.': want }, { '.': want })).toEqual([])
  })

  it('names what is missing, what is extra, and the entry points on one side only', () => {
    const problems = diffLists(
      { '.': want, './gone': want },
      { '.': { values: ['a', 'c'], types: [] }, './extra': want, './gone': undefined }
    )
    expect(problems).toEqual([
      '.: values missing: b',
      '.: values not in the contract: c',
      '.: types missing: T',
      './gone: entry point is not built',
      './extra: entry point is not in the contract',
    ])
  })
})

describe('checkList', () => {
  it('reads the package declarations, and reports an entry point that is not built', () => {
    const pkg = join(dir, 'pkg')
    mkdirSync(join(pkg, 'dist'), { recursive: true })
    writeFileSync(
      join(pkg, 'package.json'),
      JSON.stringify({
        publishConfig: {
          exports: {
            '.': { import: { types: './dist/index.d.mts' } },
            './gone': { import: { types: './dist/gone.d.mts' } },
          },
        },
      })
    )
    writeFileSync(join(pkg, 'dist', 'index.d.mts'), 'export declare const a: number\n')
    expect(publishedDeclarations(pkg)).toEqual({
      '.': join(pkg, 'dist', 'index.d.mts'),
      './gone': join(pkg, 'dist', 'gone.d.mts'),
    })
    const list: ListFile = {
      package: 'pkg',
      entries: { '.': { values: ['a'], types: [] }, './gone': want },
    }
    writeFileSync(join(dir, 'pkg.json'), JSON.stringify(list))
    expect(checkList(join(dir, 'pkg.json'), pkg)).toEqual(['./gone: entry point is not built'])
  })
})

describe('the lists of the contract', () => {
  const read = (name: string) =>
    JSON.parse(readFileSync(join(contractDir, 'exports', `${name}.json`), 'utf8')) as ListFile

  it.each(LISTED)('%s is sorted, without duplicates, and named for its package', (name) => {
    const list = read(name)
    expect(list.package).toBe(`@gild-ui/${name}`)
    for (const { values, types } of Object.values(list.entries)) {
      expect(values).toEqual([...new Set(values)].sort())
      expect(types).toEqual([...new Set(types)].sort())
    }
  })

  it('@gild-ui/react has no entry point the owner removed', () => {
    const entries = Object.keys(read('react').entries)
    for (const removed of ['./theme', './style', './utils']) expect(entries).not.toContain(removed)
    expect(
      entries.some((entry) => entry.startsWith('./hooks') || entry.startsWith('./markdown'))
    ).toBe(false)
  })

  it('the paths program imports the root and every subpath of @gild-ui/react', () => {
    const program = readFileSync(join(contractDir, 'type-tests', 'paths', 'index.ts'), 'utf8')
    for (const entry of Object.keys(read('react').entries)) {
      expect(program).toContain(`'@gild-ui/react${entry === '.' ? '' : entry.slice(1)}'`)
    }
  })
})
