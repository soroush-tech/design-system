import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { repoRoot } from './node/repoRoot'
import {
  allComponents,
  componentByName,
  entryGuides,
  markdownComponents,
  membersOf,
  reactHooks,
} from './registry'
import { REDIRECT_LIMIT, caseRedirects, docsPages, renderRedirects } from './routes'

// The umbrella's entry points, as it publishes them: what an app can import is what the docs
// have a page for, at the same path.
const umbrella = (
  JSON.parse(readFileSync(join(repoRoot(), 'packages', 'react', 'package.json'), 'utf8')) as {
    exports: Record<string, unknown>
  }
).exports
const entries = Object.keys(umbrella)
  .filter((subpath) => subpath !== '.')
  .map((subpath) => subpath.slice(2))

const pages = docsPages(() => true)
const paths = pages.map(({ path }) => path)

describe('the docs routes are the import paths', () => {
  it('gives every entry point of the umbrella exactly one page, at its path', () => {
    for (const entry of entries) {
      const matching = paths.filter((path) => path === `/react/${entry}/`)
      expect(
        matching,
        `soroush.design/react/${entry} has no docs page at /react/${entry}/`
      ).toHaveLength(1)
    }
  })

  it('has no capitalised page that is not an entry point or an export of one', () => {
    for (const { path, kind } of pages) {
      const [, platform, first, second] = path.split('/')
      if (platform !== 'react' || !/^[A-Z]/.test(first ?? '')) continue
      expect(entries, `${path} is not an entry point of the umbrella`).toContain(first)
      if (kind === 'member') {
        const member = componentByName.get(second)
        expect(member?.family, `${path}: ${second} is not an export of ${first}`).toBe(first)
      }
    }
  })

  it('has a lowercase page only for what an entry point or a library says', () => {
    const lowercase = entries.filter((entry) => /^[a-z]/.test(entry) && !entry.includes('/'))
    expect(lowercase.sort()).toEqual([...Object.keys(entryGuides), 'hooks', 'markdown'].sort())
  })

  it('gives each library mounted under the platform a page for each of its entry points', () => {
    const under = (library: string) =>
      entries.filter((entry) => entry.startsWith(`${library}/`)).map((entry) => entry.split('/')[1])
    expect(under('hooks').sort()).toEqual([...reactHooks].sort())
    expect(under('markdown').sort()).toEqual(markdownComponents.map(({ name }) => name).sort())
  })

  it('never lets a tab take the name of an export', () => {
    for (const item of allComponents) {
      for (const member of membersOf(item))
        expect(['specs', 'accessibility']).not.toContain(member.name)
    }
  })

  it('has no two pages whose paths differ only by case', () => {
    const lower = new Map<string, string>()
    for (const path of paths) {
      const taken = lower.get(path.toLowerCase())
      expect(taken, `${path} and ${taken} differ only by case`).toBeUndefined()
      lower.set(path.toLowerCase(), path)
    }
  })

  it('redirects the lowercase form of every capitalised page, and no more', () => {
    const redirects = caseRedirects(pages)
    expect(redirects).toContainEqual(['/react/button/', '/react/Button/'])
    expect(redirects).toContainEqual(['/react/table/tablecell/', '/react/Table/TableCell/'])
    expect(redirects).toContainEqual(['/react/hooks/usedebounce/', '/react/hooks/useDebounce/'])
    for (const [from, to] of redirects) {
      expect(paths).toContain(to)
      expect(paths).not.toContain(from)
    }
    expect(redirects.length).toBe(paths.filter((path) => path !== path.toLowerCase()).length)
  })
})

describe('renderRedirects', () => {
  const file = renderRedirects(pages)
  const rules = file.trim().split('\n')

  it('writes a permanent rule for the lowercase path, with the slash and without', () => {
    expect(rules).toContain('/react/button/ /react/Button/ 301')
    expect(rules).toContain('/react/button /react/Button/ 301')
    expect(rules).toContain('/react/markdown/editor /react/markdown/Editor/ 301')
  })

  it('stays within what the host takes', () => {
    expect(rules.length).toBeLessThan(REDIRECT_LIMIT)
    expect(rules.every((rule) => /^\/\S+ \/\S+\/ 301$/.test(rule))).toBe(true)
  })

  it('fails, rather than lose the file, past the limit', () => {
    const many = Array.from({ length: REDIRECT_LIMIT }, (_, index) => ({
      path: `/A${index}/`,
      kind: 'component' as const,
    }))
    expect(() => renderRedirects(many)).toThrow(`${REDIRECT_LIMIT * 2} redirects`)
  })
})

describe('docsPages', () => {
  it('lists an accessibility page only for what the caller says has notes', () => {
    const withNotes = (name: string) =>
      docsPages((item) => item.name === name).map(({ path }) => path)
    expect(withNotes('Fab')).toContain('/react/Fab/accessibility/')
    expect(withNotes('Fab')).not.toContain('/react/Button/accessibility/')
    expect(docsPages(() => false).some(({ kind }) => kind === 'accessibility')).toBe(false)
  })
})
