import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { repoRoot } from './node/repoRoot'
import { entryGuides, allDocComponents, reactHooks } from './registry'
import {
  appInstallLine,
  componentImportLine,
  entryImportLines,
  hookImportLine,
  HOOKS_PACKAGE,
  type ImportLine,
} from './importLine'

interface ContractEntries {
  package: string
  entries: Record<string, { values: string[]; types: string[] }>
}

// The packages' export lists, as data: the contract holds each package to it.
const contract = new Map(
  ['react', 'react-hooks', 'react-markdown', 'core'].map((file) => {
    const data: ContractEntries = JSON.parse(
      readFileSync(join(repoRoot(), 'packages/contract/exports', `${file}.json`), 'utf8')
    )
    return [data.package, data.entries] as const
  })
)

// A page's lines name the package whose export list holds the entry point, and every name it imports.
const expectReal = (line: ImportLine) => {
  const entries = contract.get(line.npm)
  expect(entries, `${line.npm} is a package of the contract`).toBeDefined()
  const entry = entries![line.subpath ? `./${line.subpath}` : '.']
  expect(entry, `${line.statement}: no such entry point`).toBeDefined()
  for (const name of line.names) {
    expect([...entry.values, ...entry.types], `${line.statement}: ${name}`).toContain(name)
  }
  expect(line.install).toBe(`npm i ${line.npm}`)
  expect(line.statement).toBe(
    `import { ${line.names.join(', ')} } from '${line.npm}${line.subpath ? `/${line.subpath}` : ''}'`
  )
}

describe('the import line of a page', () => {
  it('names, for every component and member, the package whose export map has its entry point', () => {
    for (const item of allDocComponents) expectReal(componentImportLine(item))
    expect(componentImportLine(allDocComponents.find((item) => item.name === 'Editor')!).npm).toBe(
      '@soroush.design/react-markdown'
    )
    expect(
      componentImportLine(allDocComponents.find((item) => item.name === 'TableCell')!)
    ).toMatchObject({
      npm: '@soroush.design/react',
      subpath: 'Table',
    })
  })

  it('names the hooks library for every hook', () => {
    for (const hook of reactHooks) expectReal(hookImportLine(hook))
    expect(hookImportLine('useDebounce').npm).toBe(HOOKS_PACKAGE)
  })

  it('has a line for every lowercase entry page, in the package that holds what it documents', () => {
    expect(Object.keys(entryImportLines).sort()).toEqual(Object.keys(entryGuides).sort())
    for (const line of Object.values(entryImportLines)) expectReal(line)
    expect(entryImportLines.theme.npm).toBe('@soroush.design/core')
  })
})

describe('the install line of an app', () => {
  it('installs the React package and the theme package', () => {
    expect(appInstallLine).toBe('npm i @soroush.design/react @soroush.design/core')
  })
})
