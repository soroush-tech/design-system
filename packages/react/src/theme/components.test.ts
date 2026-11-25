// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
// @ts-expect-error -- a plain script of the package, with no declarations
import { generate } from '../../scripts/gen-theme-components.mjs'

// `ThemeComponents` is generated from the component folders. Every root a component styles with a
// `name` must be one of its keys, and every `slot` it names must be in that key's `Slot` union.
const src = join(process.cwd(), 'src')

const files = (folder: string): string[] =>
  readdirSync(folder, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(folder, entry.name))
      : /\.tsx?$/.test(entry.name)
        ? [join(folder, entry.name)]
        : []
  )

const all = files(src)

/** Per key, the slots of its `<Key>Slot` union, from the `*.types.ts` files. */
const slotsOf = new Map<string, Set<string>>()
for (const file of all.filter((name) => name.endsWith('.types.ts'))) {
  for (const [, key, union] of readFileSync(file, 'utf8').matchAll(
    /export type (\w+)Slot =([^;]*?)\r?\n\r?\n/g
  )) {
    slotsOf.set(key, new Set([...union.matchAll(/'(\w+)'/g)].map(([, slot]) => slot)))
  }
}

const STYLED = /styled\(\s*[^,]+,\s*\{\s*name:\s*'(\w+)'(?:,\s*slot:\s*'(\w+)')?/g
const roots = all
  .filter((file) => !/\.(test|spec|stories)\./.test(file))
  .flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(STYLED)].map(([, name, slot]) => ({
      file: file.slice(src.length + 1),
      name,
      slot: slot ?? 'root',
    }))
  )

describe('ThemeComponents', () => {
  it('is the file the component folders generate', () => {
    expect(readFileSync(join(src, 'theme', 'components.ts'), 'utf8')).toBe(generate())
  })

  it('lists a component for every name a styled root takes', () => {
    expect(roots.length).toBeGreaterThan(100)
    for (const { file, name } of roots) {
      expect(slotsOf.has(name), `${file}: no ${name}ThemeConfig in a *.types.ts file`).toBe(true)
    }
  })

  it("names only slots its component's Slot type has", () => {
    for (const { file, name, slot } of roots) {
      expect(slotsOf.get(name), `${file}: ${name} has no slot '${slot}'`).toContain(slot)
    }
  })
})
