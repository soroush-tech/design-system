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
    const names = libraries.map(({ package: name }) => name.replace(/[./]/g, '\\$&')).join('|')
    const lines = new RegExp(`^export (\\*|\\{ default \\}) from '(${names})[\\w/]*'$`)
    for (const file of filesUnder('src')) {
      const content = read(file).trimEnd().split('\n')
      expect(content.length, file).toBeLessThanOrEqual(2)
      for (const line of content) expect(line, file).toMatch(lines)
    }
  })

  it('lists each library it points at as a dependency, or an optional peer when it is optional', () => {
    for (const { package: name, optional } of libraries) {
      if (!optional) {
        expect(manifest.dependencies[name], name).toBe('workspace:^')
        continue
      }
      // An optional library is the app's to install: no dependency of ours pulls it in, the peer
      // range is an explicit one (never frozen from the workspace), and the workspace has it as a
      // dev dependency.
      expect(manifest.dependencies[name], name).toBeUndefined()
      expect(manifest.peerDependencies[name], name).toMatch(/^\^\d/)
      expect(manifest.peerDependenciesMeta[name], name).toEqual({ optional: true })
      expect(manifest.devDependencies[name], name).toBe('workspace:*')
    }
  })

  it('publishes the same entry points it serves from source', () => {
    expect(Object.keys(manifest.publishConfig.exports)).toEqual(Object.keys(manifest.exports))
  })
})
