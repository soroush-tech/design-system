// @vitest-environment node
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

// The theme library's `ThemeComponents` starts empty. Each component adds its slots with a
// `declare module` block in its own source file, and the declaration build must keep that block in
// what the entry point's `.d.ts` imports: an app that imports `.../Button` sees
// `theme.components.Button` typed, with no other entry point of the library in its program.
const root = process.cwd()
const src = join(root, 'src')
const dist = join(root, 'dist')
const AUGMENTATION = /declare module '@soroush\.design\/react-theme\/theme' \{([\s\S]*?)\n\}/g

const sourceFiles = (folder: string): string[] =>
  readdirSync(folder, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sourceFiles(join(folder, entry.name))
      : /\.tsx?$/.test(entry.name) && !/\.(test|spec|stories)\./.test(entry.name)
        ? [join(folder, entry.name)]
        : []
  )

/** Per component folder: the keys its source adds to `ThemeComponents`. */
const declared = new Map<string, Set<string>>()
for (const file of sourceFiles(src)) {
  const folder = file.slice(src.length + 1).split(sep)[0]
  for (const [, body] of readFileSync(file, 'utf8').matchAll(AUGMENTATION)) {
    const keys = [...body.matchAll(/^ {4}(\w+)\?:/gm)].map(([, key]) => key)
    declared.set(folder, new Set([...(declared.get(folder) ?? []), ...keys]))
  }
}

/** The declaration files an entry point's `.d.mts` reaches, itself included. */
const closure = (entry: string): string[] => {
  const seen = new Set<string>()
  const visit = (file: string) => {
    if (seen.has(file) || !existsSync(join(dist, file))) return
    seen.add(file)
    const source = readFileSync(join(dist, file), 'utf8')
    for (const [, specifier] of source.matchAll(/from "\.\/([^"]+)\.mjs"/g)) {
      visit(`${specifier}.d.mts`)
    }
  }
  visit(`${entry}.d.mts`)
  return [...seen]
}

const augmentedKeys = (files: string[]) =>
  new Set(
    files.flatMap((file) =>
      [...readFileSync(join(dist, file), 'utf8').matchAll(AUGMENTATION)].flatMap(([, body]) =>
        [...body.matchAll(/^ {4}(\w+)\?:/gm)].map(([, key]) => key)
      )
    )
  )

describe('theme.components typing in the built declarations', () => {
  it('has a block for the components of most folders', () => {
    expect(declared.size).toBeGreaterThan(40)
  })

  it.each([...declared])('%s adds its keys, and its entry point reaches them', (folder, keys) => {
    const reached = augmentedKeys(closure(folder))
    for (const key of keys) expect(reached, `${folder}.d.mts reaches no ${key}`).toContain(key)
  })
})
