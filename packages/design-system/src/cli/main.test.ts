// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { runInit } from './init'
import { main, USAGE } from './main'
import { createTestIo } from './testApp'

vi.mock('./init', () => ({ runInit: vi.fn(async () => 0) }))

const OWN_PACKAGE = { name: '@soroush.tech/design-system', version: '2.2.0' }

async function runMain(...argv: string[]) {
  const { io, getOutput } = createTestIo('.')
  const code = await main(argv, io, OWN_PACKAGE)
  return { code, output: getOutput(), io }
}

describe('main', () => {
  it('runs init with its options', async () => {
    const { code, io } = await runMain('init', '-y', '--dry-run', '--force', '--scheme', 'dark')
    expect(code).toBe(0)
    expect(runInit).toHaveBeenLastCalledWith(
      { isConfirmed: true, isDryRun: true, isForced: true, scheme: 'dark' },
      io,
      OWN_PACKAGE
    )
    await runMain('init')
    expect(runInit).toHaveBeenLastCalledWith(
      { isConfirmed: false, isDryRun: false, isForced: false, scheme: undefined },
      expect.anything(),
      OWN_PACKAGE
    )
  })

  it('prints the usage for --help, and for no command', async () => {
    expect(await runMain('--help')).toMatchObject({ code: 0, output: USAGE })
    expect(await runMain('init', '-h')).toMatchObject({ code: 0, output: USAGE })
    expect(await runMain()).toMatchObject({ code: 1, output: USAGE })
  })

  it('refuses an unknown command, an unknown option and an unknown scheme', async () => {
    expect(await runMain('create')).toMatchObject({
      code: 1,
      output: `Unknown command: create\n\n${USAGE}`,
    })
    expect(await runMain('init', 'now')).toMatchObject({
      code: 1,
      output: `Unknown command: init now\n\n${USAGE}`,
    })
    const unknownOption = await runMain('init', '--colour')
    expect(unknownOption.code).toBe(1)
    expect(unknownOption.output).toMatch(/^Unknown option '--colour'[\s\S]*Usage:/)
    expect(await runMain('init', '--scheme', 'blue')).toMatchObject({
      code: 1,
      output: '--scheme is light or dark, not blue.\n',
    })
  })
})
