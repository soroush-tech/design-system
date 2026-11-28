import { spawn } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

/** What one type-test program did. */
export interface ProgramResult {
  name: string
  ok: boolean
  detail: string
}

const tsc = join(
  dirname(createRequire(import.meta.url).resolve('typescript/package.json')),
  'bin',
  'tsc'
)

/** The programs under `dir`: each folder with its own `tsconfig.json`. */
export const listPrograms = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(dir, entry.name, 'tsconfig.json')))
    .map((entry) => entry.name)
    .toSorted((a, b) => a.localeCompare(b))

/**
 * A program passes when `tsc` exits 0. One with an `expect-errors.txt` passes when `tsc` fails and
 * its output holds every line of that file - for a message `@ts-expect-error` cannot read.
 */
export const judgeProgram = (
  exitedClean: boolean,
  output: string,
  expectErrors: string | undefined
): boolean =>
  expectErrors === undefined
    ? exitedClean
    : !exitedClean &&
      expectErrors.split('\n').every((line) => !line.trim() || output.includes(line.trim()))

/** Type-checks one program with the workspace's `tsc`. */
export const runProgram = (dir: string, name: string): Promise<ProgramResult> =>
  new Promise((resolve) => {
    const expectFile = join(dir, name, 'expect-errors.txt')
    const expectErrors = existsSync(expectFile) ? readFileSync(expectFile, 'utf8') : undefined
    const child = spawn(
      process.execPath,
      [tsc, '-p', join(dir, name, 'tsconfig.json'), '--pretty', 'false'],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    )
    let output = ''
    for (const stream of [child.stdout, child.stderr])
      stream.on('data', (chunk) => (output += chunk))
    child.on('close', (code) =>
      resolve({ name, ok: judgeProgram(code === 0, output, expectErrors), detail: output.trim() })
    )
  })
