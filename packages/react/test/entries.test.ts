import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { libraries } from '../libraries'

const root = process.cwd()
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  exports: Record<string, string>
}
const [{ package: library }] = libraries

const filesUnder = (folder: string): string[] =>
  readdirSync(join(root, folder), { withFileTypes: true }).flatMap((item) =>
    item.isDirectory() ? filesUnder(`${folder}/${item.name}`) : [`./${folder}/${item.name}`]
  )

// Importing an entry point runs its file, which is what covers it.
describe('entry points', () => {
  it('has a source file for each export, and no other', () => {
    expect(filesUnder('src').sort()).toEqual(Object.values(manifest.exports).sort())
  })

  it.each(Object.entries(manifest.exports))(
    '%s exports the same names as its library',
    async (subpath, file) => {
      const umbrella = await import(/* @vite-ignore */ join(root, file))
      const target = await import(/* @vite-ignore */ `${library}${subpath.slice(1)}`)
      expect(Object.keys(umbrella).sort()).toEqual(Object.keys(target).sort())
      expect(Object.keys(umbrella).length).toBeGreaterThan(0)
      // The same bindings, not copies of them.
      for (const name of Object.keys(target)) expect(umbrella[name]).toBe(target[name])
    }
  )
})
