// The step's data against the packages it moves an app to: every module the import map names must
// be an entry the workspace's package has, so the map cannot name a path that does not exist.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { REACT_ENTRIES, resolveName, ruleOfPath } from './data'
import imports from './inventory/imports.json'
import inventory from './inventory/inventory.json'

const PACKAGES = join(import.meta.dirname, '../../../../..')

const exportsOf = (folder: string): string[] => {
  const manifest = JSON.parse(readFileSync(join(PACKAGES, folder, 'package.json'), 'utf8'))
  return Object.keys(manifest.exports)
}

const ENTRIES: Record<string, string[]> = {
  '@gild-ui/react': exportsOf('react'),
  '@gild-ui/core': exportsOf('core'),
  '@gild-ui/hooks': exportsOf('hooks'),
  '@gild-ui/react-markdown': exportsOf('react-markdown'),
  '@soroush.tech/styled-system': exportsOf('react/node_modules/@soroush.tech/styled-system'),
}

/** Whether a module specifier is an entry of the package it names. */
function isEntry(specifier: string): boolean {
  const name = Object.keys(ENTRIES).find(
    (key) => specifier === key || specifier.startsWith(`${key}/`)
  )!
  return ENTRIES[name].includes(`.${specifier.slice(name.length)}`)
}

describe('the import map', () => {
  it('names only entries the workspace packages have', () => {
    const missing = new Set<string>()
    for (const { from, exports } of imports.paths as {
      from: string
      exports: { name: string }[]
    }[]) {
      for (const { name } of exports) {
        const result = resolveName(from, name)!
        if ('to' in result && !isEntry(result.to)) missing.add(result.to)
      }
      const rule = ruleOfPath(from)
      if (rule?.kind === 'uniform' && !isEntry(rule.to)) missing.add(rule.to)
    }
    expect([...missing]).toEqual([])
  })

  it('has the entry of each styling-system name', () => {
    expect(REACT_ENTRIES.filter((entry) => !isEntry(`@gild-ui/react/${entry}`))).toEqual([])
  })

  it('gives every path a rule, and every name an answer', () => {
    for (const { from } of imports.paths) expect(ruleOfPath(from)?.kind).not.toBe('unknown')
    expect(resolveName('@soroush.tech/design-system/Button', 'Button')).toEqual({
      to: '@gild-ui/react/Button',
    })
  })
})

describe('the inventory', () => {
  it('has an item for every id the step reports', () => {
    const ids = new Set((inventory as { id: string }[]).map((item) => item.id))
    const used = [
      'IMP-DYNAMIC',
      'IMP-EMOTION',
      'EXP-001',
      'EXP-002',
      'EXP-003',
      'EXP-004',
      'THM-001',
      'THM-003',
      'THM-005',
      'THM-006',
      'THM-007',
      'CMP-001',
      'CMP-003',
      'CMP-005',
      'STY-001',
      'STY-002',
      'STY-003',
      'STY-004',
      'STY-005',
      'STY-007',
      'STY-008',
      'STY-009',
      'STY-010',
      'STY-011',
      'STY-012',
      'DEP-003',
      'DEP-006',
      'DEP-008',
      'DEP-009',
      'OUT-004',
      'OUT-005',
    ]
    expect(used.filter((id) => !ids.has(id))).toEqual([])
  })
})
