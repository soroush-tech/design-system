import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const dist = join(root, 'dist')
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

const files = readdirSync(dist, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => join(entry.parentPath, entry.name))

// What the package may not depend on: a framework or a styling engine.
const forbidden = /^(react|react-dom|react-native|vue|@umber-style\/.*)$/

describe('the package needs no framework', () => {
  it('declares no dependency, and no peer', () => {
    expect(manifest.dependencies).toBeUndefined()
    expect(manifest.peerDependencies).toBeUndefined()
    expect(Object.keys(manifest.devDependencies).filter((name) => forbidden.test(name))).toEqual([])
  })

  it('has built files to read', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  it.each(files)('%s imports only its own chunks', (file) => {
    const source = readFileSync(file, 'utf8')
    const specifiers = [...source.matchAll(/(?:from|require\(|import\()\s*["']([^"']+)["']/g)].map(
      (match) => match[1]
    )
    expect(
      specifiers.filter((specifier) => !specifier.startsWith('./') && !specifier.startsWith('../'))
    ).toEqual([])
    expect(source).not.toMatch(/reference lib="dom/)
  })
})
