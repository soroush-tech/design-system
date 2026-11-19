import { spawnSync } from 'node:child_process'
import { emitKeypressEvents } from 'node:readline'
import { createInterface } from 'node:readline/promises'
import type { Readable, Writable } from 'node:stream'
import {
  CancelledError,
  formatAnswer,
  formatChoice,
  getAnswer,
  readChoiceKey,
  updateChoice,
  type Choice,
  type ChoiceState,
} from './prompt'

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
  /**
   * Asks for one of `choices`, picked with the arrow keys, starting on `initial`. Rejects with a
   * `CancelledError` on Ctrl+C or Escape.
   */
  select: (question: string, choices: readonly Choice[], initial?: number) => Promise<string>
  /** Asks for any of `choices`, toggled with space, starting with `initial` picked. */
  selectMany: (
    question: string,
    choices: readonly Choice[],
    initial?: readonly string[]
  ) => Promise<string[]>
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

type Terminal = Readable & {
  isTTY?: boolean
  isRaw?: boolean
  setRawMode?: (mode: boolean) => unknown
}

// The ANSI sequences a choice is drawn with: hide and show the cursor, and take back lines drawn.
const HIDE_CURSOR = '\u001B[?25l'
const SHOW_CURSOR = '\u001B[?25h'
const eraseLines = (count: number) => (count > 0 ? `\u001B[${count}A\r\u001B[J` : '')

/**
 * Draws a choice on the terminal and redraws it on each key, until Enter answers it or Ctrl+C or
 * Escape stops it. The terminal is in raw mode only while the choice is open.
 */
function runChoice(
  stdin: Terminal,
  stdout: Writable,
  question: string,
  choices: readonly Choice[],
  start: ChoiceState
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    let state = start
    let drawnLines = 0
    const draw = (text: string) => {
      stdout.write(eraseLines(drawnLines) + text)
      drawnLines = text.split('\n').length - 1
    }
    const wasRaw = Boolean(stdin.isRaw)
    const close = (text: string) => {
      stdin.off('keypress', onKeypress)
      stdin.setRawMode?.(wasRaw)
      stdin.pause()
      draw(text)
      stdout.write(SHOW_CURSOR)
    }
    function onKeypress(_text: string | undefined, key: { name?: string; ctrl?: boolean }) {
      const action = readChoiceKey(key)
      if (action === 'none') return
      if (action === 'cancel') {
        close(`? ${question}\n`)
        reject(new CancelledError())
      } else if (action === 'submit') {
        const answer = getAnswer(state, choices)
        close(formatAnswer(question, answer, choices))
        resolve(answer)
      } else {
        state = updateChoice(state, action, choices)
        draw(formatChoice(question, state, choices))
      }
    }
    emitKeypressEvents(stdin)
    stdin.setRawMode?.(true)
    stdin.on('keypress', onKeypress)
    stdin.resume()
    stdout.write(HIDE_CURSOR)
    draw(formatChoice(question, state, choices))
  })
}

interface NodeIoOptions {
  stdin?: Terminal
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
    select: async (question, choices, initial = 0) => {
      const start = { cursor: initial, picked: undefined }
      const [value] = await runChoice(stdin, stdout, question, choices, start)
      return value
    },
    selectMany: (question, choices, initial = []) =>
      runChoice(stdin, stdout, question, choices, { cursor: 0, picked: initial }),
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
