// @vitest-environment node
import { existsSync, readFileSync, symlinkSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { Plan } from '../plan/planInit'
import { createTestApp } from '../testApp'
import { applyPlan, ApplyError } from './applyPlan'
import {
  findMissingDirectories,
  nodeFileSystem,
  resolveInside,
  type FileSystem,
} from './fileSystem'

function createPlan(overrides: Partial<Plan> = {}): Plan {
  return {
    creates: [
      { path: 'src/theme/themes.ts', content: 'themes' },
      { path: 'src/theme/Providers.ts', content: 'providers' },
    ],
    edits: [{ path: 'src/main.tsx', before: 'root', after: 'wrapped root' }],
    skips: [],
    manual: [],
    install: undefined,
    ...overrides,
  }
}

/** The real file system, with one operation failing on its `failOn`th call. */
function failing(
  operation: keyof FileSystem,
  failOn: number,
  base: FileSystem = nodeFileSystem
): FileSystem {
  let calls = 0
  return {
    ...base,
    [operation]: (...args: never[]) => {
      calls += 1
      if (calls === failOn) throw new Error(`${operation} failed`)
      return (base[operation] as (...args: never[]) => unknown)(...args)
    },
  }
}

const read = (root: string, path: string) => readFileSync(join(root, path), 'utf8')

describe('applyPlan', () => {
  it('creates the files with their folders, and edits the root', () => {
    const root = createTestApp({ 'src/main.tsx': 'root' })
    applyPlan(createPlan(), root)
    expect(read(root, 'src/theme/themes.ts')).toBe('themes')
    expect(read(root, 'src/theme/Providers.ts')).toBe('providers')
    expect(read(root, 'src/main.tsx')).toBe('wrapped root')
  })

  it('takes every change back when a write fails, leaving the app as it was', () => {
    const root = createTestApp({ 'src/main.tsx': 'root' })
    const fileSystem = failing('writeFile', 1)
    expect(() => applyPlan(createPlan(), root, fileSystem)).toThrow(
      expect.objectContaining({ name: 'ApplyError', message: 'writeFile failed', isUndone: true })
    )
    expect(read(root, 'src/main.tsx')).toBe('root')
    expect(existsSync(join(root, 'src/theme'))).toBe(false)
  })

  it('never overwrites a file that appears after the plan was made', () => {
    const root = createTestApp({ 'src/main.tsx': 'root', 'src/theme/Providers.ts': 'theirs' })
    expect(() => applyPlan(createPlan(), root)).toThrow(ApplyError)
    expect(read(root, 'src/theme/Providers.ts')).toBe('theirs')
    expect(existsSync(join(root, 'src/theme/themes.ts'))).toBe(false)
  })

  it('stops when the root changed since the plan was made', () => {
    const root = createTestApp({ 'src/main.tsx': 'changed root' })
    expect(() => applyPlan(createPlan(), root)).toThrow(
      'src/main.tsx changed while init was running'
    )
    expect(read(root, 'src/main.tsx')).toBe('changed root')
  })

  it('checks each edit by reading it back', () => {
    const root = createTestApp({ 'src/main.tsx': 'root' })
    let reads = 0
    const fileSystem: FileSystem = {
      ...nodeFileSystem,
      // The second read is the read-back: it finds something other than what was written.
      readFile: (path) => (++reads === 2 ? 'something else' : nodeFileSystem.readFile(path)),
    }
    expect(() => applyPlan(createPlan(), root, fileSystem)).toThrow(
      'src/main.tsx did not read back as init wrote it'
    )
    expect(read(root, 'src/main.tsx')).toBe('root')
  })

  it('says when it could not take every change back', () => {
    const root = createTestApp({ 'src/main.tsx': 'root' })
    const fileSystem = failing('removeFile', 1, failing('writeFile', 1))
    expect(() => applyPlan(createPlan(), root, fileSystem)).toThrow(
      expect.objectContaining({ isUndone: false })
    )
  })

  it('refuses a path that leaves the app, or goes through a symbolic link', () => {
    const root = createTestApp()
    expect(() =>
      applyPlan(createPlan({ creates: [{ path: '../outside.ts', content: '' }], edits: [] }), root)
    ).toThrow("../outside.ts is outside the app's folder")
    const elsewhere = createTestApp()
    // A junction needs no extra rights on Windows, and is a plain symbolic link elsewhere.
    symlinkSync(elsewhere, join(root, 'src'), 'junction')
    expect(() => applyPlan(createPlan({ edits: [] }), root)).toThrow(
      'src/theme/themes.ts goes through a symbolic link, which init does not follow'
    )
    expect(existsSync(join(elsewhere, 'theme'))).toBe(false)
  })
})

describe('resolveInside', () => {
  it('refuses the root itself and an absolute path elsewhere', () => {
    const root = createTestApp()
    expect(() => resolveInside(root, '.', nodeFileSystem)).toThrow("is outside the app's folder")
    expect(() => resolveInside(root, createTestApp(), nodeFileSystem)).toThrow(
      "is outside the app's folder"
    )
  })
})

describe('findMissingDirectories', () => {
  it('lists the folders to make, outermost first, and none that exist', () => {
    const root = createTestApp({ 'src/main.tsx': '' })
    expect(findMissingDirectories(root, join(root, 'src/theme/deep'), nodeFileSystem)).toEqual([
      join(root, 'src/theme'),
      join(root, 'src/theme/deep'),
    ])
    expect(findMissingDirectories(root, join(root, 'src'), nodeFileSystem)).toEqual([])
  })
})
