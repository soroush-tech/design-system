import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import {
  findFormerNames,
  FORMER,
  isHistorical,
  manifestVersion,
  MOVED,
  trackedFiles,
} from './names'

// The names are written in two pieces, so this file is not a former name itself.
const scope = '@soroush' + '.design/'
const site = 'docs.soroush' + '.design'

const versions: Record<string, string> = { cli: '0.3.0' }
const versionOf = (directory: string) => versions[directory]

describe('FORMER', () => {
  it.each(MOVED)('matches %s in the old scope, alone or with a subpath', (name) => {
    expect(`from '${scope}${name}'`.match(FORMER)).toEqual([`${scope}${name}`])
    expect(`from '${scope}${name}/Button'`.match(FORMER)).toEqual([`${scope}${name}`])
  })

  it('matches the old site address, with a path or not', () => {
    expect(`https://${site}/react/`.match(FORMER)).toEqual([site])
  })

  it('leaves the packages that kept the scope, and the new ones', () => {
    for (const text of [
      `${scope}cli`,
      `${scope}mcp`,
      `${scope}react-native`,
      `${scope}core-extra`,
      '@gild-ui/react',
      'https://gild-ui.soroush.design/',
      'https://mcp.soroush.design/mcp',
    ]) {
      expect(text.match(FORMER)).toBeNull()
    }
  })
})

describe('isHistorical', () => {
  it('is the notes of a version below the current one', () => {
    expect(isHistorical('packages/cli/release-notes/0.2.0.md', versionOf)).toBe(true)
    expect(isHistorical('packages/cli/release-notes/0.2.9.md', versionOf)).toBe(true)
  })

  it('is not the notes of the current version, of a later one, or of an unknown package', () => {
    expect(isHistorical('packages/cli/release-notes/0.3.0.md', versionOf)).toBe(false)
    expect(isHistorical('packages/cli/release-notes/0.4.0.md', versionOf)).toBe(false)
    expect(isHistorical('packages/none/release-notes/0.1.0.md', versionOf)).toBe(false)
  })

  it('is not a file that is no release note', () => {
    expect(isHistorical('packages/cli/README.md', versionOf)).toBe(false)
  })
})

describe('findFormerNames', () => {
  const content: Record<string, string> = {
    'a.md': `use ${scope}react and ${scope}cli`,
    'b.md': 'nothing',
    'packages/cli/release-notes/0.2.0.md': `${scope}core`,
    'packages/cli/release-notes/0.3.0.md': `see ${site}`,
  }

  it('lists each former name by file, and skips historical release notes', () => {
    expect(findFormerNames(Object.keys(content), (file) => content[file], versionOf)).toEqual([
      `a.md: ${scope}react`,
      `packages/cli/release-notes/0.3.0.md: ${site}`,
    ])
  })
})

describe('the repository', () => {
  const root = join(__dirname, '..', '..', '..')

  it('names no package by its former scope, and no site by its former address', () => {
    const files = trackedFiles(root)
    expect(files).toContain('package.json')
    const found = findFormerNames(
      files,
      (file) => readFileSync(join(root, file), 'utf8'),
      (directory) => manifestVersion(root, directory)
    )
    expect(found).toEqual([])
  })
})

describe('manifestVersion', () => {
  const root = mkdtempSync(join(tmpdir(), 'names-'))
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  it('reads the version of a package, and is none for a folder without a manifest', () => {
    const file = join(root, 'packages', 'a', 'package.json')
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, JSON.stringify({ version: '1.2.3' }))
    expect(manifestVersion(root, 'a')).toBe('1.2.3')
    expect(manifestVersion(root, 'b')).toBeUndefined()
  })
})
