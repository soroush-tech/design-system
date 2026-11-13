// Test helpers for the command line: a throwaway app folder, and an Io that records what init
// prints and runs instead of touching a terminal or starting a process.
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import type { Io, RunOptions, RunResult } from './io'

export const VITE_ROOT = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`

/**
 * A new app folder with `files` in it, by path. It gets a `package.json` with React 19 unless
 * `files` brings one, and an empty `.git` folder, so a search for a lockfile stops at the app.
 */
export function createTestApp(files: Record<string, string> = {}): string {
  const root = realpathSync(mkdtempSync(join(tmpdir(), 'design-system-init-')))
  mkdirSync(join(root, '.git'))
  const allFiles = {
    'package.json': JSON.stringify({
      name: 'test-app',
      dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' },
    }),
    ...files,
  }
  for (const [path, content] of Object.entries(allFiles)) {
    mkdirSync(dirname(join(root, path)), { recursive: true })
    writeFileSync(join(root, path), content)
  }
  return root
}

interface TestIoOptions {
  isInteractive?: boolean
  /** Answers to the questions init asks, in order. */
  answers?: string[]
  run?: (command: string, args: readonly string[], options: RunOptions) => RunResult
}

/** An Io for `cwd` that keeps what init writes and the commands it runs. */
export function createTestIo(
  cwd: string,
  { isInteractive = false, answers = [], run }: TestIoOptions = {}
) {
  const output: string[] = []
  const commands: { command: string; args: readonly string[]; options: RunOptions }[] = []
  const io: Io = {
    cwd,
    isInteractive,
    write: (text) => {
      output.push(text)
    },
    ask: async (question) => {
      output.push(question)
      return answers.shift() ?? ''
    },
    run: (command, args, options) => {
      commands.push({ command, args, options })
      return run ? run(command, args, options) : { status: 0, stdout: '' }
    },
  }
  return { io, commands, getOutput: () => output.join('') }
}
