import { describe, it, expect } from 'vitest'
import { mkdtempSync, readdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { content } from '../content'
import {
  pluginReferencesDir,
  renderComponentsReference,
  renderTokensReference,
  syncPluginReferences,
} from './plugin'

const scratch = (): string => mkdtempSync(join(tmpdir(), 'plugin-refs-'))

describe('reference renderers', () => {
  it('groups every component under a heading', () => {
    const rendered = renderComponentsReference(content)
    expect(rendered).toContain('## Inputs & forms')
    for (const component of content.components) expect(rendered).toContain(`**${component.name}**`)
  })

  it('lists every token as a theme path', () => {
    const rendered = renderTokensReference(content)
    expect(rendered).toContain('`theme.palette.primary.main`')
    expect(rendered).toContain('## space')
  })

  it('marks both generated files as generated', () => {
    expect(renderComponentsReference(content)).toContain('Do not edit by hand')
    expect(renderTokensReference(content)).toContain('Do not edit by hand')
  })
})

describe('syncPluginReferences', () => {
  it('writes every reference into an empty directory', () => {
    const dir = scratch()
    const { stale } = syncPluginReferences(content, false, dir)
    expect(stale).toEqual([
      'components.md',
      'tokens.md',
      'setup.md',
      'layout-kit.md',
      'theme.ts',
      'providers.tsx',
    ])
    expect(readFileSync(join(dir, 'tokens.md'), 'utf8')).toContain('# Token contract')
  })

  it('reports nothing stale on a second run', () => {
    const dir = scratch()
    syncPluginReferences(content, false, dir)
    expect(syncPluginReferences(content, false, dir).stale).toEqual([])
  })

  it('in check mode reports drift without writing', () => {
    const dir = scratch()
    const { stale } = syncPluginReferences(content, true, dir)
    expect(stale.length).toBeGreaterThan(0)
    expect(() => readFileSync(join(dir, 'tokens.md'), 'utf8')).toThrow()
  })

  it('finds the committed references up to date', () => {
    // The gate the pre-commit hook runs: what is committed must match what the
    // pipeline renders right now.
    expect(syncPluginReferences(content, true).stale).toEqual([])
  })

  it('ships nothing that points into a machine or repo the reader does not have', () => {
    // The skills and the MCP content are read by agents on other people's machines: a local
    // path, a private repo or one of our own apps is a reference they cannot follow. Every
    // public skill counts, not only the one whose references this pipeline writes.
    const unreachable = [
      /diffchroma/i,
      /\bcore repo\b/i,
      /\bapps\/(web|dashboard)\b/,
      /\b[A-Z]:\\{1,2}[A-Za-z]/,
      /\/(Users|home)\/[a-z]/,
    ]
    const skillsDir = dirname(dirname(pluginReferencesDir()))
    const shipped = [
      ['the MCP content', JSON.stringify(content)],
      ...readdirSync(skillsDir, { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => {
          const path = join(entry.parentPath, entry.name)
          return [path, readFileSync(path, 'utf8')]
        }),
    ]
    const found = shipped.flatMap(([source, text]) =>
      unreachable.filter((pattern) => pattern.test(text)).map((pattern) => `${source}: ${pattern}`)
    )
    expect(found).toEqual([])
  })

  it('points at the plugin skill directory', () => {
    expect(pluginReferencesDir().replace(/\\/g, '/')).toMatch(
      /plugins\/soroush-design-system\/skills\/soroush-design-system\/references$/
    )
  })
})
