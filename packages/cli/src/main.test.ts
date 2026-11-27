// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { runCreate } from './create/create'
import { runInit } from './init'
import { runMigrate } from './migrate/migrate'
import { STARTERS } from './create/starters'
import { HELP, main, USAGE } from './main'
import { CancelledError } from './prompt'
import { createTestIo } from './testApp'

vi.mock('./init', () => ({ runInit: vi.fn(async () => 0) }))
vi.mock('./migrate/migrate', () => ({ runMigrate: vi.fn(async () => 0) }))
vi.mock('./create/create', () => ({ runCreate: vi.fn(async () => 0) }))

const DESIGN_SYSTEM = { name: '@gild-ui/react' }

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
      'Shop',
      '--pm',
      'pnpm',
      '--render',
      'ssg',
      '--with',
      'tanstack-query, msw'
    )
    expect(code).toBe(0)
    expect(runCreate).toHaveBeenLastCalledWith(
      {
        name: 'my-app',
        title: 'Shop',
        framework: 'vike',
        isTypeScript: false,
        packageManager: 'pnpm',
        layout: undefined,
        rendering: 'ssg',
        libraries: ['tanstack-query', 'msw'],
        scheme: 'dark',
        hasSampleData: true,
        isConfirmed: true,
        isDryRun: true,
        isGit: false,
      },
      io
    )
    await runMain('create', '--ts')
    expect(runCreate).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: undefined, isTypeScript: true, isGit: true }),
      expect.anything()
    )
    await runMain('create')
    expect(runCreate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isTypeScript: undefined,
        framework: undefined,
        hasSampleData: undefined,
      }),
      expect.anything()
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

  it('takes no library for an empty --with, and refuses one create does not know', async () => {
    await runMain('create', '--with', '')
    expect(runCreate).toHaveBeenLastCalledWith(
      expect.objectContaining({ libraries: [] }),
      expect.anything()
    )
    expect(await runMain('create', '--with', 'msw,redux')).toMatchObject({
      code: 1,
      output:
        '--with takes tanstack-query, swr, msw, zustand, jotai, redux-toolkit, react-hook-form, not redux.\n',
    })
  })

  it('takes a layout, and refuses one create does not know', async () => {
    await runMain('create', '--layout', 'standalone')
    expect(runCreate).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: 'standalone' }),
      expect.anything()
    )
    expect(await runMain('create', '--layout', 'monorepo')).toMatchObject({
      code: 1,
      output: '--layout is workspace, standalone, not monorepo.\n',
    })
    expect(HELP.create).toContain('--layout <name>')
  })

  it('refuses a rendering create does not know', async () => {
    expect(await runMain('create', '--render', 'edge')).toMatchObject({
      code: 1,
      output: '--render is isomorphic, ssr, spa, ssg, not edge.\n',
    })
  })

  it('refuses a package manager create does not know', async () => {
    expect(await runMain('create', '--pm', 'pip')).toMatchObject({
      code: 1,
      output: '--pm is npm, pnpm, yarn, bun, not pip.\n',
    })
    expect(await runMain('init', '--pm', 'npm')).toMatchObject({ code: 1 })
  })

  it('stops with 130 and says nothing was written, when a question is stopped', async () => {
    vi.mocked(runCreate).mockRejectedValueOnce(new CancelledError())
    expect(await runMain('create')).toMatchObject({
      code: 130,
      output: 'Stopped: nothing was written.\n',
    })
    vi.mocked(runInit).mockRejectedValueOnce(new Error('the disk is full'))
    await expect(runMain('init')).rejects.toThrow('the disk is full')
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

  it('runs migrate with its options, and describes it', async () => {
    const { code, io } = await runMain('migrate', '-y', '--dry-run', '--to', '0.1.0')
    expect(code).toBe(0)
    expect(runMigrate).toHaveBeenLastCalledWith(
      { isConfirmed: true, isDryRun: true, to: '0.1.0' },
      io
    )
    await runMain('migrate')
    expect(runMigrate).toHaveBeenLastCalledWith(
      { isConfirmed: false, isDryRun: false, to: undefined },
      expect.anything()
    )
    expect(await runMain('migrate', '-h')).toMatchObject({ code: 0, output: HELP.migrate })
    expect(USAGE).toContain('migrate ')
    for (const option of ['--to <version>', '--dry-run', '--yes']) {
      expect(HELP.migrate).toContain(option)
    }
    expect(HELP.init).not.toContain('--to')
  })

  it('refuses an option migrate does not take, and --to elsewhere', async () => {
    expect(await runMain('migrate', '--force')).toMatchObject({
      code: 1,
      output: `--force is an option of init, not of migrate.

${HELP.migrate}`,
    })
    expect(await runMain('migrate', '--scheme', 'dark')).toMatchObject({
      code: 1,
      output: `--scheme is an option of init and create, not of migrate.

${HELP.migrate}`,
    })
    expect(await runMain('init', '--to', '0.1.0')).toMatchObject({
      code: 1,
      output: `--to is an option of migrate, not of init.

${HELP.init}`,
    })
    expect(await runMain('migrate', 'now')).toMatchObject({ code: 1 })
  })
})
