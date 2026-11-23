import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { libraries } from '../libraries'
import { run } from '../scripts/generate'

const root = process.cwd()
const read = (file: string) => readFileSync(join(root, file), 'utf8')
const manifest = JSON.parse(read('package.json'))

const filesUnder = (folder: string): string[] =>
  readdirSync(join(root, folder), { withFileTypes: true }).flatMap((item) =>
    item.isDirectory() ? filesUnder(`${folder}/${item.name}`) : [`${folder}/${item.name}`]
  )

describe('the package', () => {
  it('has no source file that is not generated', () => {
    expect(run({ root, libraries, check: true }).problems).toEqual([])
  })

  it('holds nothing in src/ but one-line re-exports of a library', () => {
    const lines = /^export (\*|\{ default \}) from '@soroush\.design\/react-components[\w/]*'$/
    for (const file of filesUnder('src')) {
      const content = read(file).trimEnd().split('\n')
      expect(content.length, file).toBeLessThanOrEqual(2)
      for (const line of content) expect(line, file).toMatch(lines)
    }
  })

  it('lists each library it points at as a dependency', () => {
    for (const { package: name } of libraries) {
      expect(manifest.dependencies[name]).toBe('workspace:^')
    }
  })

  it('publishes the same entry points it serves from source', () => {
    expect(Object.keys(manifest.publishConfig.exports)).toEqual(Object.keys(manifest.exports))
  })
})
