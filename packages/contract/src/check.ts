import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ensureBuilt } from './build'
import { isMet, judge, summary } from './expected'
import type { Expected, Result } from './expected'
import { checkList } from './lists'
import { listPrograms, runProgram } from './programs'

const contractDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const packagesDir = join(contractDir, '..')

/** The packages with an export list. */
export const LISTED = ['core', 'react-hooks', 'react', 'react-markdown']

/** The packages whose build the checks read, dependencies first: the four above, and what today's `react` builds on. */
export const BUILT = [
  'core',
  'react-hooks',
  'react-theme',
  'react-components',
  'react',
  'react-markdown',
]

/** Builds what is stale, then runs every export-list check and every type-test program, and holds the failing set to `expected-failures.json`. */
export const checkAll = async () => {
  const built = ensureBuilt(packagesDir, BUILT)
  const results: Result[] = LISTED.map((name) => {
    const problems = checkList(
      join(contractDir, 'exports', `${name}.json`),
      join(packagesDir, name)
    )
    return { name: `exports/${name}`, ok: !problems.length, detail: problems.join('\n') }
  })
  const programs = join(contractDir, 'type-tests')
  const typed = await Promise.all(listPrograms(programs).map((name) => runProgram(programs, name)))
  results.push(...typed.map((r) => ({ ...r, name: `types/${r.name}` })))
  const expected = JSON.parse(
    readFileSync(join(contractDir, 'expected-failures.json'), 'utf8')
  ) as Record<string, Expected>
  const verdict = judge(results, expected)
  return {
    built,
    results,
    expected,
    verdict,
    met: isMet(verdict),
    report: summary(verdict, expected, results),
  }
}
