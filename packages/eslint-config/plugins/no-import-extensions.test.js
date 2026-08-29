import { describe, expect, it, vi } from 'vitest'
import plugin from './no-import-extensions.js'

/** Drive the rule's `ImportDeclaration` visitor over one import source. */
const visit = (value) => {
  const report = vi.fn()
  const source = { type: 'Literal', value }
  plugin.rules['no-import-extensions'].create({ report }).ImportDeclaration({ source })
  return { report, source }
}

describe('local/no-import-extensions', () => {
  it('registers under the local plugin namespace', () => {
    expect(plugin.meta.name).toBe('local')
    expect(Object.keys(plugin.rules)).toEqual(['no-import-extensions'])
  })

  it.each(['./x.ts', './x.tsx', './x.js', './x.jsx', '../deep/path/mod.ts'])(
    'reports %s',
    (value) => {
      const { report, source } = visit(value)
      expect(report).toHaveBeenCalledWith({
        node: source,
        message: 'Do not include .ts, .tsx, .js or .jsx extensions in import paths.',
      })
    }
  )

  it.each(['./y', 'react', '@soroush.tech/design-system/Button', './styles.css', './data.json'])(
    'allows %s',
    (value) => {
      expect(visit(value).report).not.toHaveBeenCalled()
    }
  )

  // A dependency's own exports map decides its layout, and some published ESM
  // packages resolve only with the extension spelled out.
  it.each([
    '@modelcontextprotocol/sdk/server/mcp.js',
    '@modelcontextprotocol/sdk/server/stdio.js',
    'some-pkg/entry.js',
  ])('allows the bare package specifier %s', (value) => {
    expect(visit(value).report).not.toHaveBeenCalled()
  })

  it('still reports an absolute path with an extension', () => {
    expect(visit('/abs/mod.ts').report).toHaveBeenCalled()
  })
})
