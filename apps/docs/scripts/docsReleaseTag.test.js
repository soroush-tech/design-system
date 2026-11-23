import { describe, it, expect, afterEach, vi } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { gitTags, readSection, releaseTag } from '../../../scripts/docs-release-tag.mjs'

const SCRIPT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../../scripts/docs-release-tag.mjs'
)

const roots = []
afterEach(() => {
  while (roots.length) rmSync(roots.pop(), { recursive: true, force: true })
  vi.unstubAllEnvs()
})

const CURRENT = 'react-components@'
const description = {
  tagPrefix: `@soroush.design/${CURRENT}`,
  formerTagPrefixes: ['@soroush.tech/design-system@'],
}
const tags = [
  '@soroush.tech/design-system@1.0.0',
  '@soroush.tech/design-system@2.2.0',
  '@soroush.tech/design-system@3.0.0-rc.1',
  '@soroush.design/react-components@0.1.0',
  '@soroush.design/react-components@0.10.0',
  '@soroush.design/react-components@0.9.0',
  '@soroush.design/react-components@0.11.0-rc.1',
  '@soroush.tech/markdown@9.9.9',
]

describe('releaseTag', () => {
  it('takes the newest stable release under the current prefix, whatever a former one reached', () => {
    expect(releaseTag(description, tags)).toBe('@soroush.design/react-components@0.10.0')
  })

  it('ranks versions as numbers, not as text', () => {
    const only = ['@a/b@1.9.0', '@a/b@1.10.0', '@a/b@1.2.0']
    expect(releaseTag({ tagPrefix: '@a/b@', formerTagPrefixes: [] }, only)).toBe('@a/b@1.10.0')
  })

  it('finds nothing before the current prefix has a release', () => {
    expect(releaseTag(description, tags.slice(0, 3))).toBeUndefined()
    expect(releaseTag({ tagPrefix: '@x/y@', formerTagPrefixes: [] }, tags)).toBeUndefined()
  })

  it('finds a version under the current prefix, or else under a former one', () => {
    expect(releaseTag(description, tags, '0.9.0')).toBe('@soroush.design/react-components@0.9.0')
    expect(releaseTag(description, tags, '2.2.0')).toBe('@soroush.tech/design-system@2.2.0')
    expect(releaseTag(description, tags, '7.0.0')).toBeUndefined()
  })

  it('prefers the current prefix when both hold the version', () => {
    const both = ['@soroush.tech/design-system@1.0.0', '@soroush.design/react-components@1.0.0']
    expect(releaseTag(description, both, '1.0.0')).toBe('@soroush.design/react-components@1.0.0')
  })
})

describe('readSection', () => {
  it('reads a section of the docs-content description', () => {
    expect(readSection('cli')).toEqual({
      dir: 'cli',
      npm: '@soroush.design/cli',
      tagPrefix: '@soroush.design/cli@',
      formerTagPrefixes: [],
    })
  })

  it('fails on a section it does not list', () => {
    expect(() => readSection('toString')).toThrow('unknown docs section: toString')
    expect(() => readSection('nope')).toThrow('unknown docs section: nope')
  })
})

// A repository of its own, so the command line reads tags that are known.
const repoWith = (names) => {
  const dir = mkdtempSync(join(tmpdir(), 'docs-tags-'))
  roots.push(dir)
  const git = (...args) =>
    execFileSync(
      'git',
      [
        '-c',
        'commit.gpgsign=false',
        '-c',
        'tag.gpgsign=false',
        '-c',
        'user.name=t',
        '-c',
        'user.email=t@t',
        ...args,
      ],
      { cwd: dir, stdio: 'pipe' }
    )
  git('init', '-q')
  writeFileSync(join(dir, 'file'), 'x')
  git('add', 'file')
  git('commit', '-q', '-m', 'one')
  for (const name of names) git('tag', name)
  return dir
}

describe('from the command line', () => {
  it('lists the tags of the repository it runs in', () => {
    vi.stubEnv('GIT_DIR', join(repoWith(['@soroush.tech/markdown@1.0.0']), '.git'))
    expect(gitTags()).toEqual(['@soroush.tech/markdown@1.0.0'])
  })

  it('prints the newest release of the section it is given', async () => {
    vi.stubEnv(
      'GIT_DIR',
      join(repoWith(['@soroush.tech/markdown@1.0.0', '@soroush.tech/markdown@1.3.0']), '.git')
    )
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const argv = process.argv
    process.argv = [argv[0], SCRIPT, 'markdown']
    try {
      await import(`${pathToFileURL(SCRIPT).href}?latest`)
    } finally {
      process.argv = argv
    }
    expect(log).toHaveBeenCalledWith('@soroush.tech/markdown@1.3.0')
    log.mockRestore()
  })

  it('prints nothing when the section has no release', async () => {
    vi.stubEnv('GIT_DIR', join(repoWith(['@soroush.tech/design-system@1.0.0']), '.git'))
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const argv = process.argv
    process.argv = [argv[0], SCRIPT, 'cli', '0.1.0']
    try {
      await import(`${pathToFileURL(SCRIPT).href}?none`)
    } finally {
      process.argv = argv
    }
    expect(log).not.toHaveBeenCalled()
    log.mockRestore()
  })
})
