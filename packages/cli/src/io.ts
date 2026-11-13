import { spawnSync } from 'node:child_process'
import { createInterface } from 'node:readline/promises'
import type { Readable, Writable } from 'node:stream'

export interface RunOptions {
  cwd: string
  env?: Record<string, string>
  /** Shows the command's own output, as an install's progress, instead of capturing it. */
  showOutput?: boolean
}

export interface RunResult {
  /** The exit code, or `null` when the command could not start or was killed. */
  status: number | null
  stdout: string
}

/** Everything init reaches outside itself for, other than files: a seam for tests. */
export interface Io {
  cwd: string
  /** Whether a person can answer a question: both stdin and stdout are a terminal. */
  isInteractive: boolean
  write: (text: string) => void
  ask: (question: string) => Promise<string>
  run: (command: string, args: readonly string[], options: RunOptions) => RunResult
}

// Arguments init passes are its own constants and a version, never input. Checking them still
// keeps the Windows command line below free of anything cmd.exe would read as syntax.
const PLAIN_ARGUMENT = /^[\w@./:^=+-]+$/

/**
 * The command line for cmd.exe, which Windows needs to start a package manager's `.cmd` shim.
 * Each argument is quoted: inside quotes, cmd.exe reads `^` as itself, not as its escape.
 */
export function toWindowsCommandLine(command: string, args: readonly string[]): string {
  for (const part of [command, ...args]) {
    if (!PLAIN_ARGUMENT.test(part)) throw new Error(`init does not run the argument ${part}`)
  }
  return [command, ...args.map((arg) => `"${arg}"`)].join(' ')
}

interface NodeIoOptions {
  stdin?: Readable & { isTTY?: boolean }
  stdout?: Writable & { isTTY?: boolean }
  platform?: NodeJS.Platform
  cwd?: string
}

export function createNodeIo({
  stdin = process.stdin,
  stdout = process.stdout,
  platform = process.platform,
  cwd = process.cwd(),
}: NodeIoOptions = {}): Io {
  return {
    cwd,
    isInteractive: Boolean(stdin.isTTY && stdout.isTTY),
    write: (text) => {
      stdout.write(text)
    },
    ask: async (question) => {
      const prompt = createInterface({ input: stdin, output: stdout })
      try {
        return await prompt.question(question)
      } finally {
        prompt.close()
      }
    },
    run: (command, args, { cwd: directory, env = {}, showOutput = false }) => {
      const options = {
        cwd: directory,
        env: { ...process.env, ...env },
        encoding: 'utf8' as const,
        stdio: showOutput ? ('inherit' as const) : ('pipe' as const),
      }
      const result =
        platform === 'win32'
          ? spawnSync(toWindowsCommandLine(command, args), { ...options, shell: true })
          : spawnSync(command, args, options)
      return { status: result.status, stdout: result.stdout ?? '' }
    },
  }
}
