import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import {
  checkLockstep,
  checkLockstepAt,
  covers,
  lockstepRunProblem,
  type Manifest,
} from './lockstep'

const names = ['a', 'b']
const manifest = (name: string, version: string, extra: Partial<Manifest> = {}): Manifest => ({
  name,
  version,
  ...extra,
})

describe('covers', () => {
  it.each([
    ['workspace:^', '1.2.3', true],
    ['workspace:*', '1.2.3', true],
    ['workspace:~', '1.2.3', true],
    ['*', '1.2.3', true],
    ['1.2.3', '1.2.3', true],
    ['1.2.3', '1.2.4', false],
    ['^1.2.0', '1.9.0', true],
    ['^1.2.0', '1.1.9', false],
    ['^1.2.0', '2.0.0', false],
    ['^0.1.0', '0.1.0', true],
    ['^0.1.0', '0.2.0', false],
    ['^0.0.3', '0.0.3', true],
    ['^0.0.3', '0.0.4', false],
    ['~1.2.0', '1.2.9', true],
    ['~1.2.0', '1.3.0', false],
    ['workspace:^0.1.0', '0.1.0', true],
    ['>=1.0.0', '1.2.3', false],
  ])('%s covers %s: %s', (range, version, expected) => {
    expect(covers(range, version)).toBe(expected)
  })
})

describe('checkLockstep', () => {
  it('passes for one version and covering ranges', () => {
    const set = [
      manifest('a', '0.1.0'),
      manifest('b', '0.1.0', {
        dependencies: { a: 'workspace:^' },
        peerDependencies: { a: '^0.1.0' },
      }),
      manifest('outside', '9.0.0', { dependencies: { a: '^5.0.0' } }),
    ]
    expect(checkLockstep(set, names)).toEqual([])
  })

  it('names each package and version when they differ', () => {
    const problems = checkLockstep([manifest('a', '0.1.0'), manifest('b', '0.2.0')], names)
    expect(problems).toEqual(['the lockstep packages must share one version: a@0.1.0, b@0.2.0'])
  })

  it('fails a dependency or peer range that does not cover the shared version', () => {
    const set = [
      manifest('a', '0.1.0'),
      manifest('b', '0.1.0', { dependencies: { a: '^0.2.0' }, peerDependencies: { a: '^0.3.0' } }),
    ]
    expect(checkLockstep(set, names)).toEqual([
      'b@0.1.0: the dependency a "^0.2.0" does not cover 0.1.0',
      'b@0.1.0: the peer dependency a "^0.3.0" does not cover 0.1.0',
    ])
  })

  it('fails a member that is not a workspace package', () => {
    expect(checkLockstep([manifest('a', '0.1.0')], names)).toEqual([
      'b is in the lockstep set but is not a workspace package',
    ])
  })
})

describe('lockstepRunProblem', () => {
  it('accepts a run with none or all of the set', () => {
    expect(lockstepRunProblem(['x'], names)).toBeUndefined()
    expect(lockstepRunProblem(['x', 'b', 'a'], names)).toBeUndefined()
  })

  it('refuses a run with some of the set, naming what is missing', () => {
    expect(lockstepRunProblem(['a'], names)).toBe(
      'a publish with the whole lockstep set - missing: b'
    )
  })
})

describe('checkLockstepAt', () => {
  const root = mkdtempSync(join(tmpdir(), 'lockstep-'))
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  const repo = (name: string, versions: string[]) => {
    const dir = join(root, name)
    mkdirSync(join(dir, 'packages', 'not-a-package'), { recursive: true })
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ lockstep: ['a', 'b'] }))
    versions.forEach((version, index) => {
      const pkg = join(dir, 'packages', `p${index}`)
      mkdirSync(pkg)
      writeFileSync(join(pkg, 'package.json'), JSON.stringify({ name: 'ab'[index], version }))
    })
    return dir
  }

  it('passes for one version and fails, naming the packages, for two', () => {
    expect(checkLockstepAt(repo('same', ['0.1.0', '0.1.0']))).toEqual([])
    expect(checkLockstepAt(repo('apart', ['0.1.0', '0.2.0']))).toEqual([
      'the lockstep packages must share one version: a@0.1.0, b@0.2.0',
    ])
  })
})

describe('scripts/check-lockstep.mjs', () => {
  const script = join(__dirname, '..', '..', '..', 'scripts', 'check-lockstep.mjs')

  it('passes on this repository', () => {
    expect(
      execFileSync(process.execPath, [script], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      })
    ).toContain('share one version')
  })
})
