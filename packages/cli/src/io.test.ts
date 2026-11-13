// @vitest-environment node
import { PassThrough } from 'node:stream'
import { describe, expect, it } from 'vitest'
import { createNodeIo, toWindowsCommandLine } from './io'

function createStreams(isTTY: boolean) {
  const stdin = Object.assign(new PassThrough(), { isTTY })
  const stdout = Object.assign(new PassThrough(), { isTTY })
  let written = ''
  stdout.on('data', (chunk: Buffer) => {
    written += chunk.toString()
  })
  return { stdin, stdout, getWritten: () => written }
}

describe('createNodeIo', () => {
  it('is interactive only when both ends are a terminal', () => {
    expect(createNodeIo({ ...createStreams(true), cwd: '.' }).isInteractive).toBe(true)
    expect(createNodeIo({ ...createStreams(false), cwd: '.' }).isInteractive).toBe(false)
    expect(createNodeIo().cwd).toBe(process.cwd())
  })

  it('writes, and asks a question on the terminal', async () => {
    const { stdin, stdout, getWritten } = createStreams(true)
    const io = createNodeIo({ stdin, stdout })
    io.write('hello\n')
    const answer = io.ask('Apply? ')
    stdin.write('yes\n')
    expect(await answer).toBe('yes')
    // A terminal also gets readline's cursor codes around the question.
    expect(getWritten()).toMatch(/^hello\n[\s\S]*Apply\? /)
  })

  it.each(['linux', 'win32'] as const)(
    'runs a command and captures its output on %s',
    (platform) => {
      const io = createNodeIo({ platform })
      const result = io.run('node', ['--version'], { cwd: process.cwd() })
      // On Windows, through cmd.exe; elsewhere, the same line runs in sh.
      expect(result.status).toBe(0)
      expect(result.stdout.trim()).toBe(process.version)
    }
  )

  it('passes the environment it is given, and shows output it is told to', () => {
    const io = createNodeIo({ platform: 'linux' })
    const result = io.run('node', ['--version'], {
      cwd: process.cwd(),
      env: { A: '1' },
      showOutput: true,
    })
    // Shown output is not captured.
    expect(result).toEqual({ status: 0, stdout: '' })
  })

  it('reports a command that cannot start', () => {
    const io = createNodeIo({ platform: 'linux' })
    expect(io.run('no-such-command-for-init', [], { cwd: process.cwd() }).status).toBeNull()
  })
})

describe('toWindowsCommandLine', () => {
  it('quotes each argument, so cmd.exe reads a caret as itself', () => {
    expect(
      toWindowsCommandLine('pnpm', [
        'add',
        '@soroush.tech/design-system@^2.2.0',
        '--ignore-scripts',
      ])
    ).toBe('pnpm "add" "@soroush.tech/design-system@^2.2.0" "--ignore-scripts"')
  })

  it('refuses anything cmd.exe could read as syntax', () => {
    expect(() => toWindowsCommandLine('npm', ['install', 'a & del x'])).toThrow(
      'init does not run the argument a & del x'
    )
    expect(() => toWindowsCommandLine('npm', ['"x"'])).toThrow()
    expect(() => toWindowsCommandLine('npm', ['%PATH%'])).toThrow()
  })
})
