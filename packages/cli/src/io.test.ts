// @vitest-environment node
import { PassThrough } from 'node:stream'
import { describe, expect, it } from 'vitest'
import { createNodeIo, toWindowsCommandLine } from './io'
import { CancelledError } from './prompt'

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

  it('picks a choice with the arrow keys, in raw mode only while it is open', async () => {
    const { stdin, stdout, getWritten } = createStreams(true)
    const modes: boolean[] = []
    const terminal = Object.assign(stdin, {
      isRaw: false,
      setRawMode: (mode: boolean) => modes.push(mode),
    })
    const io = createNodeIo({ stdin: terminal, stdout })
    const choices = [
      { value: 'ts', label: 'TypeScript' },
      { value: 'js', label: 'JavaScript' },
    ]
    const answer = io.select('Language', choices)
    // Down, a key it ignores, then Enter.
    stdin.write('\u001B[B')
    stdin.write('x')
    stdin.write('\r')
    expect(await answer).toBe('js')
    expect(modes).toEqual([true, false])
    expect(getWritten()).toContain('? Language  (arrows to move, enter to pick)\n> TypeScript')
    expect(getWritten()).toContain('? Language: JavaScript\n')
  })

  it('toggles choices with space in a choice of several', async () => {
    const { stdin, stdout, getWritten } = createStreams(true)
    const io = createNodeIo({ stdin, stdout })
    const choices = [
      { value: 'query', label: 'TanStack Query' },
      { value: 'msw', label: 'msw' },
    ]
    const answer = io.selectMany('Libraries', choices, ['query'])
    stdin.write(' ')
    stdin.write('\u001B[A')
    stdin.write(' ')
    stdin.write('\r')
    expect(await answer).toEqual(['msw'])
    expect(getWritten()).toContain('? Libraries: msw\n')
    const none = io.selectMany('Libraries', choices)
    stdin.write('\r')
    expect(await none).toEqual([])
    expect(getWritten()).toContain('? Libraries: none\n')
  })

  it('stops a choice on Ctrl+C or Escape, with nothing picked', async () => {
    const { stdin, stdout } = createStreams(true)
    const io = createNodeIo({ stdin, stdout })
    const choices = [{ value: 'light', label: 'light' }]
    const stopped = io.select('Scheme', choices)
    stdin.write('\u0003')
    await expect(stopped).rejects.toBeInstanceOf(CancelledError)
    const escaped = io.select('Scheme', choices)
    stdin.write('\u001B')
    await expect(escaped).rejects.toBeInstanceOf(CancelledError)
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
