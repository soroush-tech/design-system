// @vitest-environment node
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { nodeFileSystem, type FileSystem } from '../apply/fileSystem'
import { createTestApp, createTestIo } from '../testApp'
import { runMigrate, type MigrateOptions } from './migrate'
import type { MigrationStep } from './step'
import { STEP_TWO, TEST_APP_FILES, TEST_STEPS } from './testSteps'

const YES: MigrateOptions = { isConfirmed: true, isDryRun: false, isJson: false, to: undefined }
const read = (root: string, path: string) => readFileSync(join(root, path), 'utf8')
const dependencies = (root: string) => JSON.parse(read(root, 'package.json')).dependencies

/** The real file system, with `operation` failing from its `from`th call on, `count` times. */
const failingFrom = (operation: keyof FileSystem, from: number, count = Infinity): FileSystem => {
  let calls = 0
  return {
    ...nodeFileSystem,
    [operation]: (...args: never[]) => {
      calls += 1
      if (calls >= from && calls < from + count) throw new Error(`${operation} failed`)
      return (nodeFileSystem[operation] as (...args: never[]) => unknown)(...args)
    },
  }
}

describe('runMigrate', () => {
  it('moves the app through every step with --yes: the edits, the versions, one install, the checklist', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, commands, getOutput } = createTestIo(root)
    // Two items are left for a person: exit code 2.
    expect(await runMigrate(YES, io, TEST_STEPS)).toBe(2)

    expect(read(root, 'src/main.ts')).toBe(
      "import { latestName } from '@test/a'\nlatestName()\nlegacy()\n"
    )
    expect(read(root, 'src/generated.ts')).toBe('// 2 files\n')
    expect(dependencies(root)).toEqual({
      '@test/a': '^3.0.0',
      '@test/helper': '^1.0.0',
      react: '^19.0.0',
    })
    expect(commands.map(({ command, args }) => [command, ...args])).toEqual([
      ['npm', 'install', '--ignore-scripts'],
    ])
    expect(commands[0].options).toEqual({ cwd: root, env: {}, showOutput: true })
    const output = getOutput()
    expect(output).toContain(
      'migrate will move test-app from @test/a 1.2.0 to @test/a 3.0.0 in 2 steps:'
    )
    expect(output).toContain('Step 1 of 2: test-a-2.0.0 - oldName is newName')
    expect(output).toContain('Step 2 of 2: test-a-3.0.0')
    expect(output).toContain('Done: test-app is on @test/a 3.0.0.')
    expect(output).toContain(
      'Still left to you (2):\n  [ ] src/main.ts:3 legacy() has no successor: decide\n  [ ] src/main.ts check the build\n'
    )
  })

  it('has nothing to do on a second run, and writes nothing and installs nothing', async () => {
    const root = createTestApp(TEST_APP_FILES)
    await runMigrate(YES, createTestIo(root).io, TEST_STEPS)
    const paths = ['package.json', 'src/main.ts', 'src/generated.ts']
    const before = paths.map((path) => [read(root, path), statSync(join(root, path)).mtimeMs])
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runMigrate(YES, io, TEST_STEPS)).toBe(3)
    expect(getOutput()).toBe('Already on @test/a 3.0.0: migrate has nothing to do.\n')
    expect(commands).toEqual([])
    expect(paths.map((path) => [read(root, path), statSync(join(root, path)).mtimeMs])).toEqual(
      before
    )
  })

  it('stops at --to, and the next run goes on from there', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const first = createTestIo(root)
    expect(await runMigrate({ ...YES, to: '2.0.0' }, first.io, TEST_STEPS)).toBe(2)
    expect(read(root, 'src/main.ts')).toContain('newName')
    expect(dependencies(root)['@test/a']).toBe('^2.0.0')
    expect(first.getOutput()).toContain('in 1 step:')
    expect(first.getOutput()).not.toContain('Step 2')

    const second = createTestIo(root)
    expect(await runMigrate(YES, second.io, TEST_STEPS)).toBe(2)
    expect(second.getOutput()).toContain('from @test/a 2.0.0 to @test/a 3.0.0 in 1 step:')
    expect(read(root, 'src/main.ts')).toContain('latestName')
  })

  it('shows the plan and writes nothing on --dry-run', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runMigrate({ ...YES, isDryRun: true }, io, TEST_STEPS)).toBe(0)
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])
    expect(read(root, 'package.json')).toBe(TEST_APP_FILES['package.json'])
    expect(commands).toEqual([])
    expect(getOutput()).toContain('Step 1 of 2')
    expect(getOutput().endsWith('Dry run: nothing was changed.\n')).toBe(true)
  })

  it('shows the plan only, with no terminal and no --yes', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runMigrate({ ...YES, isConfirmed: false }, io, TEST_STEPS)).toBe(0)
    expect(getOutput()).toContain('Preview only: there is no terminal to answer in.')
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])
    expect(commands).toEqual([])
  })

  it('asks in a terminal: a no changes nothing, a yes applies', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const no = createTestIo(root, { isInteractive: true, answers: ['n'] })
    expect(await runMigrate({ ...YES, isConfirmed: false }, no.io, TEST_STEPS)).toBe(0)
    expect(no.getOutput()).toContain('Apply these changes? (y/N) Nothing was changed.')
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])

    const yes = createTestIo(root, { isInteractive: true, answers: ['y'] })
    expect(await runMigrate({ ...YES, isConfirmed: false }, yes.io, TEST_STEPS)).toBe(2)
    expect(read(root, 'src/main.ts')).toContain('latestName')
  })

  it('runs no git: not in a repository, not with changes, not at all', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, commands } = createTestIo(root, {
      run: (command) => ({ status: command === 'git' ? 128 : 0, stdout: ' M src/main.ts' }),
    })
    expect(await runMigrate(YES, io, TEST_STEPS)).toBe(2)
    expect(read(root, 'src/main.ts')).toContain('latestName')
    expect(commands.map(({ command }) => command)).toEqual(['npm'])
  })

  it('says so when the app is on no version a step starts from, when --to is no version, or no package is there', async () => {
    const root = createTestApp({
      'package.json': JSON.stringify({ dependencies: { '@test/a': '^0.5.0' } }),
    })
    const unsupported = createTestIo(root)
    expect(await runMigrate(YES, unsupported.io, TEST_STEPS)).toBe(1)
    expect(unsupported.getOutput()).toContain('migrate has no step for @test/a 0.5.0.')

    const app = createTestApp(TEST_APP_FILES)
    const bad = createTestIo(app)
    expect(await runMigrate({ ...YES, to: '9.9.9' }, bad.io, TEST_STEPS)).toBe(1)
    expect(bad.getOutput()).toContain('migrate has no step that ends at 9.9.9.')

    const none = createTestIo(createTestApp())
    expect(await runMigrate(YES, none.io, TEST_STEPS)).toBe(1)
    expect(none.getOutput()).toBe(
      'migrate found none of @test/a in package.json. Run it in the folder of the app to move.\n'
    )
  })

  it('says when there is no package.json, and when this release has no steps', async () => {
    const root = createTestApp()
    mkdirSync(join(root, 'empty'))
    const missing = createTestIo(join(root, 'empty'))
    expect(await runMigrate(YES, missing.io, TEST_STEPS)).toBe(1)
    expect(missing.getOutput()).toBe(
      "There is no package.json in this folder. Run migrate in your app's folder.\n"
    )
    const none = createTestIo(root)
    expect(await runMigrate(YES, none.io, [])).toBe(3)
    expect(none.getOutput()).toBe(
      'This release of migrate has no steps yet, so it changes nothing.\n'
    )
  })

  it('names the version it read from a range when nothing is installed', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, getOutput } = createTestIo(root)
    await runMigrate({ ...YES, isDryRun: true }, io, TEST_STEPS)
    expect(getOutput()).toContain(
      '@test/a is not installed here, so its version is the lowest ^1.2.0 allows.'
    )
  })

  it('reads the installed version, with no note, over the range', async () => {
    const root = createTestApp({
      ...TEST_APP_FILES,
      'node_modules/@test/a/package.json': JSON.stringify({ name: '@test/a', version: '2.3.0' }),
    })
    const { io, getOutput } = createTestIo(root)
    await runMigrate({ ...YES, isDryRun: true }, io, TEST_STEPS)
    expect(getOutput()).toContain('from @test/a 2.3.0 to @test/a 3.0.0 in 1 step:')
    expect(getOutput()).not.toContain('is not installed here')
  })

  it('reports a step that asks for what it may not, and changes nothing', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const broken: MigrationStep = {
      ...STEP_TWO,
      plan: () => [{ kind: 'edit', path: 'src/none.ts', after: '' }],
    }
    const { io, getOutput } = createTestIo(root)
    expect(await runMigrate(YES, io, [broken])).toBe(1)
    expect(getOutput()).toBe(
      'migrate stopped, and changed nothing: The step test-a-2.0.0 edits src/none.ts, which does not exist.\n'
    )
  })

  it('lets any other error through', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const broken: MigrationStep = {
      ...STEP_TWO,
      plan: () => {
        throw new Error('a bug in the step')
      },
    }
    await expect(runMigrate(YES, createTestIo(root).io, [broken])).rejects.toThrow(
      'a bug in the step'
    )
  })

  it('takes back the changes of every step when a write fails, and says so', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, commands, getOutput } = createTestIo(root)
    // Step 1 writes src/main.ts and package.json; step 2's first write is the third.
    expect(await runMigrate(YES, io, TEST_STEPS, failingFrom('writeFile', 3, 1))).toBe(1)
    expect(getOutput()).toContain(
      'migrate stopped: writeFile failed. Every change it made was taken back.'
    )
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])
    expect(read(root, 'package.json')).toBe(TEST_APP_FILES['package.json'])
    expect(commands).toEqual([])
  })

  it('says when it could not take every change back', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, getOutput } = createTestIo(root)
    // Every write from the second on fails, the undoing ones too.
    expect(await runMigrate(YES, io, TEST_STEPS, failingFrom('writeFile', 2))).toBe(1)
    expect(getOutput()).toContain('It could not take back every change.')
  })

  it('tells the install command when the install fails, with the files written', async () => {
    const root = createTestApp({ ...TEST_APP_FILES, 'pnpm-lock.yaml': '' })
    const { io, getOutput } = createTestIo(root, {
      run: (command) => ({ status: command === 'pnpm' ? 1 : 0, stdout: '' }),
    })
    expect(await runMigrate(YES, io, TEST_STEPS)).toBe(1)
    expect(getOutput()).toContain(
      'The install failed. The files are written; install yourself:\n  pnpm install --ignore-scripts\n'
    )
    expect(read(root, 'src/main.ts')).toContain('latestName')
  })

  it('prints no checklist when no step leaves anything to decide', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const quiet: MigrationStep = { ...STEP_TWO, plan: () => [] }
    const { io, getOutput } = createTestIo(root)
    expect(await runMigrate(YES, io, [quiet])).toBe(0)
    expect(getOutput()).toContain('Done: test-app is on @test/a 2.0.0.\n')
    expect(getOutput()).not.toContain('Still left to you')
    expect(dependencies(root)['@test/a']).toBe('^2.0.0')
  })

  it('names an app with no name', async () => {
    const root = createTestApp({
      'package.json': JSON.stringify({ dependencies: { '@test/a': '^2.0.0' } }),
      'src/main.ts': 'newName()',
    })
    const { io, getOutput } = createTestIo(root)
    await runMigrate({ ...YES, isDryRun: true }, io, TEST_STEPS)
    expect(getOutput()).toContain('migrate will move this app from')
    await runMigrate(YES, io, TEST_STEPS)
    expect(getOutput()).toContain('Done: the app is on @test/a 3.0.0.')
  })
})

describe('runMigrate --json', () => {
  const JSON_YES: MigrateOptions = { ...YES, isJson: true }

  /** Runs with --json: the exit code, and the one object stdout holds. */
  async function runJson(
    root: string,
    options: Partial<MigrateOptions> = {},
    steps: readonly MigrationStep[] = TEST_STEPS,
    setup: Parameters<typeof createTestIo>[1] = {},
    fileSystem?: FileSystem
  ) {
    const test = createTestIo(root, setup)
    const code = await runMigrate({ ...JSON_YES, ...options }, test.io, steps, fileSystem)
    const output = test.getOutput()
    // Exactly one line, which is exactly one JSON object.
    expect(output.endsWith('\n') && output.indexOf('\n') === output.length - 1).toBe(true)
    const report = JSON.parse(output)
    return { code, report, commands: test.commands }
  }

  it('plans on --dry-run: the shape, no writes, no git, exit 0', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { code, report, commands } = await runJson(root, { isDryRun: true })
    expect(code).toBe(0)
    expect(commands).toEqual([])
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])
    expect(report).toEqual({
      from: { package: '@test/a', version: '1.2.0' },
      to: { package: '@test/a', version: '3.0.0' },
      status: 'planned',
      steps: [
        {
          id: 'test-a-2.0.0',
          summary: 'oldName is newName',
          dependencies: [
            { name: '@test/helper', to: '^1.0.0', action: 'add' },
            { name: '@test/old', from: '^1.0.0', action: 'remove' },
            { name: '@test/a', from: '^1.2.0', to: '^2.0.0', action: 'change' },
          ],
          files: [
            { path: 'src/main.ts', action: 'edit' },
            { path: 'package.json', action: 'edit' },
          ],
          items: [
            {
              file: 'src/main.ts',
              line: 3,
              message: 'legacy() has no successor: decide',
              code: 'T-LEGACY',
            },
          ],
        },
        {
          id: 'test-a-3.0.0',
          summary: 'newName is latestName',
          dependencies: [{ name: '@test/a', from: '^2.0.0', to: '^3.0.0', action: 'change' }],
          files: [
            { path: 'src/generated.ts', action: 'create' },
            { path: 'src/main.ts', action: 'edit' },
            { path: 'package.json', action: 'edit' },
          ],
          items: [{ file: 'src/main.ts', line: 1, message: 'check the build', code: 'T-BUILD' }],
        },
      ],
      changedFiles: ['package.json', 'src/generated.ts', 'src/main.ts'],
      installed: false,
      lockfileChanged: false,
    })
  })

  it('is a preview without --yes, and never asks, in a terminal too', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { code, report, commands } = await runJson(root, { isConfirmed: false }, TEST_STEPS, {
      isInteractive: true,
      answers: ['y'],
    })
    expect(code).toBe(0)
    expect(report.status).toBe('planned')
    expect(commands).toEqual([])
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])
  })

  it('applies: installed, lockfileChanged from the lockfile itself, exit 2 for items left', async () => {
    const root = createTestApp({ ...TEST_APP_FILES, 'package-lock.json': '{}' })
    const { code, report, commands } = await runJson(root, {}, TEST_STEPS, {
      run: () => {
        writeFileSync(join(root, 'package-lock.json'), '{"changed":true}')
        return { status: 0, stdout: '' }
      },
    })
    expect(code).toBe(2)
    expect(report).toMatchObject({ status: 'applied', installed: true, lockfileChanged: true })
    expect(report.error).toBeUndefined()
    expect(commands.map(({ command }) => command)).toEqual(['npm'])
    // The install's own output stays off stdout.
    expect(commands[0].options.showOutput).toBe(false)
    expect(read(root, 'src/main.ts')).toContain('latestName')
  })

  it('says the lockfile is unchanged when the install leaves it, or there is none', async () => {
    const withLock = createTestApp({ ...TEST_APP_FILES, 'yarn.lock': '# lock\n' })
    expect((await runJson(withLock)).report.lockfileChanged).toBe(false)
    const without = createTestApp(TEST_APP_FILES)
    expect((await runJson(without)).report.lockfileChanged).toBe(false)
  })

  it('exits 0 when it applied and nothing is left for a person', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const quiet: MigrationStep = { ...STEP_TWO, plan: () => [] }
    const { code, report } = await runJson(root, {}, [quiet])
    expect(code).toBe(0)
    expect(report.status).toBe('applied')
  })

  it('says nothing is to migrate: exit 3, with --dry-run too', async () => {
    const root = createTestApp(TEST_APP_FILES)
    await runJson(root)
    const again = await runJson(root)
    expect(again.code).toBe(3)
    expect(again.report).toMatchObject({
      status: 'nothing',
      from: { package: '@test/a', version: '3.0.0' },
      to: { package: '@test/a', version: '3.0.0' },
      steps: [],
      changedFiles: [],
    })
    expect((await runJson(root, { isDryRun: true })).code).toBe(3)
    expect((await runJson(root, {}, [])).report).toMatchObject({ status: 'nothing', from: null })
  })

  it('refuses, with the reason: no package.json, no version, a gap, a target out of reach', async () => {
    const empty = createTestApp()
    mkdirSync(join(empty, 'empty'))
    const missing = await runJson(join(empty, 'empty'))
    expect(missing.code).toBe(1)
    expect(missing.report).toMatchObject({ status: 'refused', from: null, to: null })
    expect(missing.report.error.message).toContain('There is no package.json')
    expect(missing.report.error.step).toBeNull()

    const unsupported = createTestApp({
      'package.json': JSON.stringify({ dependencies: { '@test/a': '^0.5.0' } }),
    })
    const gap = await runJson(unsupported)
    expect(gap.code).toBe(1)
    expect(gap.report.from).toEqual({ package: '@test/a', version: '0.5.0' })
    expect(gap.report.error.message).toContain('migrate has no step for @test/a 0.5.0.')

    const none = await runJson(createTestApp())
    expect(none.report).toMatchObject({ status: 'refused', from: null })

    const far = await runJson(createTestApp(TEST_APP_FILES), { to: '9.9.9' })
    expect(far.code).toBe(1)
    expect(far.report).toMatchObject({ status: 'refused', to: null })
    expect(far.report.error.message).toContain('no step that ends at 9.9.9')
  })

  it('refuses with the step id when a step asks for what it may not, and writes nothing', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const broken: MigrationStep = {
      ...STEP_TWO,
      plan: () => [{ kind: 'edit', path: 'src/none.ts', after: '' }],
    }
    const { code, report } = await runJson(root, {}, [broken])
    expect(code).toBe(1)
    expect(report).toMatchObject({ status: 'refused', error: { step: 'test-a-2.0.0' } })
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])
  })

  it('reports rolledBack with the step whose write failed, and the files as they were', async () => {
    const root = createTestApp(TEST_APP_FILES)
    // Step 1 writes src/main.ts and package.json; step 2's first write is the third.
    const { code, report, commands } = await runJson(
      root,
      {},
      TEST_STEPS,
      {},
      failingFrom('writeFile', 3, 1)
    )
    expect(code).toBe(1)
    expect(report).toMatchObject({
      status: 'rolledBack',
      steps: [],
      changedFiles: [],
      installed: false,
      lockfileChanged: false,
      error: {
        step: 'test-a-3.0.0',
        message: 'writeFile failed. Every change it made was taken back.',
      },
    })
    expect(commands).toEqual([])
    expect(read(root, 'src/main.ts')).toBe(TEST_APP_FILES['src/main.ts'])
  })

  it('keeps the plan and the error when it could not take every change back', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { code, report } = await runJson(root, {}, TEST_STEPS, {}, failingFrom('writeFile', 2))
    expect(code).toBe(1)
    expect(report.status).toBe('applied')
    expect(report.installed).toBe(false)
    expect(report.error.message).toContain('It could not take back every change.')
    expect(report.changedFiles).toEqual(['package.json', 'src/generated.ts', 'src/main.ts'])
  })

  it('applies with installed false and an error when the install fails: exit 1', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { code, report } = await runJson(root, {}, TEST_STEPS, {
      run: () => ({ status: 1, stdout: '' }),
    })
    expect(code).toBe(1)
    expect(report).toMatchObject({
      status: 'applied',
      installed: false,
      error: { step: 'install', message: 'The install failed: npm install --ignore-scripts' },
    })
    expect(read(root, 'src/main.ts')).toContain('latestName')
  })

  it('writes the human text, and no JSON, without --json', async () => {
    const root = createTestApp(TEST_APP_FILES)
    const { io, getOutput } = createTestIo(root)
    expect(await runMigrate({ ...YES, isDryRun: true }, io, TEST_STEPS)).toBe(0)
    expect(getOutput()).toContain('migrate will move')
    expect(getOutput()).not.toContain('"status"')
  })
})
