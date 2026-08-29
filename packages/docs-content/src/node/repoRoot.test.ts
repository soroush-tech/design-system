import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { findRepoRoot, repoRoot } from './repoRoot'

// `resolve` makes paths absolute per platform (`/a/b` becomes `C:\a\b` on Windows), so
// the marker predicate matches on a normalized suffix rather than a literal path.
const endsWith = (suffix: string) => (dir: string) => dir.replace(/\\/g, '/').endsWith(suffix)

describe('findRepoRoot', () => {
  it('returns the first ancestor holding the marker', () => {
    const root = findRepoRoot('/a/b/c', endsWith('/a'))
    expect(root.replace(/\\/g, '/')).toMatch(/\/a$/)
  })

  it('returns the start directory when it holds the marker', () => {
    const root = findRepoRoot('/a/b', endsWith('/a/b'))
    expect(root.replace(/\\/g, '/')).toMatch(/\/a\/b$/)
  })

  it('throws when no ancestor holds the marker', () => {
    expect(() => findRepoRoot('/a/b/c', () => false)).toThrow(/not inside the monorepo/)
  })
})

describe('repoRoot', () => {
  it('resolves the workspace root and is memoized', () => {
    const first = repoRoot()
    expect(existsSync(join(first, 'pnpm-workspace.yaml'))).toBe(true)
    expect(repoRoot()).toBe(first)
  })
})
