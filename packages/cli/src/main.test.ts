// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { runCreate } from './create/create'
import { runInit } from './init'
import { STARTERS } from './create/starters'
import { HELP, main, USAGE } from './main'
import { createTestIo } from './testApp'

vi.mock('./init', () => ({ runInit: vi.fn(async () => 0) }))
vi.mock('./create/create', () => ({ runCreate: vi.fn(async () => 0) }))

const DESIGN_SYSTEM = { name: '@soroush.tech/design-system', version: '2.2.0' }

async function runMain(...argv: string[]) {
  const { io, getOutput } = createTestIo('.')
  const code = await main(argv, io, DESIGN_SYSTEM)
  return { code, output: getOutput(), io }
}

describe('main', () => {
  it('runs init with its options', async () => {
    const { code, io } = await runMain('init', '-y', '--dry-run', '--force', '--scheme', 'dark')
    expect(code).toBe(0)
    expect(runInit).toHaveBeenLastCalledWith(
      { isConfirmed: true, isDryRun: true, isForced: true, scheme: 'dark' },
      io,
      DESIGN_SYSTEM
    )
    await runMain('init')
    expect(runInit).toHaveBeenLastCalledWith(
      { isConfirmed: false, isDryRun: false, isForced: false, scheme: undefined },
      expect.anything(),
      DESIGN_SYSTEM
    )
  })

  it('runs create with its options', async () => {
    const argv = ['create', 'my-app', '-y', '--dry-run', '--framework', 'vike', '--js', '--no-git']
    const { code, io } = await runMain(
      ...argv,
      '--scheme',
      'dark',
      '--sample-data',
      '--title',
      'Shop'
    )
    expect(code).toBe(0)
    expect(runCreate).toHaveBeenLastCalledWith(
      {
        name: 'my-app',
        title: 'Shop',
        framework: 'vike',
        isTypeScript: false,
        scheme: 'dark',
        hasSampleData: true,
        isConfirmed: true,
        isDryRun: true,
        isGit: false,
      },
      io,
      DESIGN_SYSTEM
    )
    await runMain('create', '--ts')
    expect(runCreate).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: undefined, isTypeScript: true, isGit: true }),
      expect.anything(),
      DESIGN_SYSTEM
    )
    await runMain('create')
    expect(runCreate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isTypeScript: undefined,
        framework: undefined,
        hasSampleData: undefined,
      }),
      expect.anything(),
      DESIGN_SYSTEM
    )
  })

  it("prints a command's own help for --help, and the usage with no command", async () => {
    expect(await runMain('--help')).toMatchObject({ code: 0, output: USAGE })
    expect(await runMain('init', '-h')).toMatchObject({ code: 0, output: HELP.init })
    expect(await runMain('create', 'my-app', '--help')).toMatchObject({
      code: 0,
      output: HELP.create,
    })
    expect(await runMain('--help', 'build')).toMatchObject({ code: 0, output: USAGE })
    expect(await runMain()).toMatchObject({ code: 1, output: USAGE })
  })

  it("lists each command's own options, and the starters create has", () => {
    expect(USAGE).toContain('create --help')
    expect(HELP.init).toContain('--force')
    expect(HELP.init).not.toContain('--framework')
    for (const option of ['--framework', '--ts, --js', '--sample-data', '--no-git', '--scheme']) {
      expect(HELP.create).toContain(option)
    }
    expect(HELP.create).not.toContain('--force')
    const [first, ...others] = Object.keys(STARTERS)
    expect(HELP.create).toContain(
      `the app's framework: ${[`${first} (the default)`, ...others].join(', ')}\n`
    )
  })

  it('refuses an unknown command, an unknown option and an unknown scheme', async () => {
    expect(await runMain('build')).toMatchObject({
      code: 1,
      output: `Unknown command: build\n\n${USAGE}`,
    })
    expect(await runMain('toString')).toMatchObject({ code: 1 })
    expect(await runMain('init', 'now')).toMatchObject({
      code: 1,
      output: `Unknown command: init now\n\n${HELP.init}`,
    })
    expect(await runMain('create', 'one', 'two')).toMatchObject({
      code: 1,
      output: `Unknown command: create one two\n\n${HELP.create}`,
    })
    const unknownOption = await runMain('init', '--colour')
    expect(unknownOption.code).toBe(1)
    expect(unknownOption.output).toMatch(/^Unknown option '--colour'/)
    expect(unknownOption.output.endsWith(HELP.init)).toBe(true)
    expect((await runMain('--colour')).output.endsWith(USAGE)).toBe(true)
    expect(await runMain('init', '--scheme', 'blue')).toMatchObject({
      code: 1,
      output: '--scheme is light or dark, not blue.\n',
    })
  })

  it('refuses an option of the other command, and --ts with --js', async () => {
    expect(await runMain('init', '--js')).toMatchObject({
      code: 1,
      output: `--js is an option of create, not of init.\n\n${HELP.init}`,
    })
    expect(await runMain('create', 'my-app', '--force')).toMatchObject({
      code: 1,
      output: `--force is an option of init, not of create.\n\n${HELP.create}`,
    })
    expect(await runMain('create', '--ts', '--js')).toMatchObject({
      code: 1,
      output: '--ts and --js do not go together: give one.\n',
    })
  })
})
