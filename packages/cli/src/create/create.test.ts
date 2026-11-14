// @vitest-environment node
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { nodeFileSystem, type FileSystem } from '../apply/fileSystem'
import type { RunOptions, RunResult } from '../io'
import { createTestIo } from '../testApp'
import { runCreate, toPackageName, type CreateDependencies, type CreateOptions } from './create'
import type { Starter, StarterFacts } from './starters'

const DESIGN_SYSTEM = { name: '@soroush.tech/design-system', version: '2.3.0' }

const YES: CreateOptions = {
  name: 'my-app',
  title: undefined,
  framework: undefined,
  isTypeScript: undefined,
  packageManager: undefined,
  rendering: undefined,
  scheme: undefined,
  hasSampleData: undefined,
  isConfirmed: true,
  isDryRun: false,
  isGit: true,
}
const ASK: CreateOptions = { ...YES, name: undefined, isConfirmed: false }

/** A starter that writes a package.json and the themes, and keeps what it was told. */
function createTestStarter() {
  const createFiles = vi.fn(({ name, isTypeScript }: StarterFacts) => [
    { path: 'package.json', content: JSON.stringify({ name }) },
    { path: `src/theme/themes.${isTypeScript ? 'ts' : 'js'}`, content: 'export default {}\n' },
  ])
  const starter: Starter = { title: 'Test', createFiles }
  return { starter, createFiles }
}

const BARE: Starter = {
  title: 'Bare',
  createFiles: () => [{ path: 'package.json', content: '{}' }],
}

/** A new, empty folder to run create in. */
const createWorkspace = () => realpathSync(mkdtempSync(join(tmpdir(), 'design-system-create-')))

/** A git that is not inside a repository, and an install that works. */
const runOutsideGit = (command: string, args: readonly string[]): RunResult =>
  command === 'git' && args[0] === 'rev-parse'
    ? { status: 128, stdout: '' }
    : { status: 0, stdout: '' }

interface Setup {
  isInteractive?: boolean
  answers?: string[]
  run?: (command: string, args: readonly string[], options: RunOptions) => RunResult
  dependencies?: CreateDependencies
}

function setUp({ isInteractive, answers, run = runOutsideGit, dependencies }: Setup = {}) {
  const cwd = createWorkspace()
  const { starter, createFiles } = createTestStarter()
  const test = createTestIo(cwd, { isInteractive, answers, run })
  const create = (options: CreateOptions) =>
    runCreate(options, test.io, DESIGN_SYSTEM, {
      starters: { test: starter, bare: BARE },
      userAgent: 'npm/11.4.0 node/v24.1.0 linux x64',
      ...dependencies,
    })
  const listCommands = () => test.commands.map(({ command, args }) => [command, ...args].join(' '))
  return { cwd, createFiles, create, listCommands, getOutput: test.getOutput, test }
}

const read = (path: string) => readFileSync(path, 'utf8')

describe('runCreate', () => {
  it('creates the app with --yes: the files, the install, git init, then the closing message', async () => {
    const { cwd, createFiles, create, listCommands, getOutput, test } = setUp()
    expect(await create(YES)).toBe(0)

    const app = join(cwd, 'my-app')
    expect(read(join(app, 'package.json'))).toBe('{"name":"my-app"}')
    expect(existsSync(join(app, 'src/theme/themes.ts'))).toBe(true)
    expect(createFiles).toHaveBeenCalledWith({
      name: 'my-app',
      packageName: 'my-app',
      title: 'my-app',
      isTypeScript: true,
      rendering: 'isomorphic',
      scheme: 'light',
      hasSampleData: false,
      version: '2.3.0',
    })
    expect(listCommands()).toEqual([
      'npm install --ignore-scripts',
      'git rev-parse --is-inside-work-tree',
      'git init',
    ])
    expect(test.commands[0].options).toEqual({ cwd: app, env: {}, showOutput: true })
    expect(test.commands[2].options).toEqual({ cwd: app })

    const output = getOutput()
    expect(output).toContain(
      'create will make my-app, a Test app in TypeScript (isomorphic), in ./my-app:'
    )
    expect(output).toContain('Create:\n  package.json\n  src/theme/themes.ts')
    expect(output).toContain('Install:\n  npm install --ignore-scripts')
    expect(output).toContain('Done: my-app is ready. Start it with:\n  cd my-app\n  npm run dev')
    expect(output).toContain('Make the themes your own in src/theme/themes.ts.')
    expect(output).toContain('installation/#fonts')
    expect(output).toContain('npx skills add soroush-tech/design-system')
    expect(output).toContain('https://mcp.soroush.design/mcp')
  })

  it('installs with the package manager that ran it', async () => {
    const { create, listCommands, getOutput } = setUp({
      dependencies: { userAgent: 'pnpm/10.4.1 npm/? node/v24.1.0 linux x64' },
    })
    expect(await create(YES)).toBe(0)
    expect(listCommands()[0]).toBe('pnpm install --ignore-scripts')
    expect(getOutput()).toContain('  cd my-app\n  pnpm dev')
  })

  it('skips git init inside a repository, and with --no-git', async () => {
    const inside = setUp({ run: () => ({ status: 0, stdout: 'true\n' }) })
    expect(await inside.create(YES)).toBe(0)
    expect(inside.listCommands()).toEqual([
      'npm install --ignore-scripts',
      'git rev-parse --is-inside-work-tree',
    ])

    const noGit = setUp()
    expect(await noGit.create({ ...YES, isGit: false })).toBe(0)
    expect(noGit.listCommands()).toEqual(['npm install --ignore-scripts'])
  })

  it('keeps the app, and says so, when git init fails', async () => {
    const { cwd, create, getOutput } = setUp({
      run: (command, args) =>
        command === 'git' ? { status: null, stdout: '' } : runOutsideGit(command, args),
    })
    expect(await create(YES)).toBe(0)
    expect(getOutput()).toContain('git init failed, so the app has no repository.')
    expect(existsSync(join(cwd, 'my-app/package.json'))).toBe(true)
  })

  it('writes in an empty folder', async () => {
    const { cwd, create } = setUp()
    mkdirSync(join(cwd, 'my-app'))
    expect(await create(YES)).toBe(0)
    expect(existsSync(join(cwd, 'my-app/package.json'))).toBe(true)
  })

  it('refuses a folder that holds anything, a file, and a name it cannot use', async () => {
    const { cwd, create, getOutput, listCommands } = setUp()
    mkdirSync(join(cwd, 'full'))
    writeFileSync(join(cwd, 'full/notes.txt'), 'mine')
    writeFileSync(join(cwd, 'file'), 'mine')

    expect(await create({ ...YES, name: 'full' })).toBe(1)
    expect(getOutput()).toContain('The folder full is not empty.')
    expect(read(join(cwd, 'full/notes.txt'))).toBe('mine')

    expect(await create({ ...YES, name: 'file' })).toBe(1)
    expect(getOutput()).toContain('file exists, and is not a folder.')

    for (const name of ['my app', '.hidden', '../up', '-dash', 'a'.repeat(215), 'aB'.repeat(72)]) {
      expect(await create({ ...YES, name })).toBe(1)
      expect(getOutput()).toContain(`${name} is not a name create can use`)
    }
    expect(listCommands()).toEqual([])
  })

  it('keeps the name as typed for the folder, and makes its package name and title from it', async () => {
    const { cwd, createFiles, create, getOutput } = setUp()
    expect(await create({ ...YES, name: 'testApp' })).toBe(0)
    expect(getOutput()).toContain('create will make testApp (package test-app), a Test app')
    expect(createFiles).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'testApp', packageName: 'test-app', title: 'testApp' })
    )
    expect(existsSync(join(cwd, 'testApp/package.json'))).toBe(true)

    expect(await create({ ...YES, name: 'shop', title: ' My Shop ' })).toBe(0)
    expect(getOutput()).toContain('create will make shop, a Test app')
    expect(createFiles).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: 'shop', packageName: 'shop', title: 'My Shop' })
    )
    expect(await create({ ...YES, name: 'blank', title: '  ' })).toBe(0)
    expect(createFiles).toHaveBeenLastCalledWith(expect.objectContaining({ title: 'blank' }))
  })

  it('refuses a title that code or HTML would read as its own', async () => {
    const { cwd, create, getOutput } = setUp()
    for (const title of ['A <b>', 'a `b`', '${x}', 'a\\b', 'line\nbreak']) {
      expect(await create({ ...YES, title })).toBe(1)
      expect(getOutput()).toContain('is not a title create can use')
    }
    expect(existsSync(join(cwd, 'my-app'))).toBe(false)
  })

  it('makes a package name npm takes from a folder name', () => {
    expect(toPackageName('testApp')).toBe('test-app')
    expect(toPackageName('MyShop')).toBe('my-shop')
    expect(toPackageName('app2Go')).toBe('app2-go')
    expect(toPackageName('my-app')).toBe('my-app')
    expect(toPackageName('API')).toBe('api')
  })

  it('takes the new folder away when a write fails', async () => {
    let writes = 0
    const fileSystem: FileSystem = {
      ...nodeFileSystem,
      createFile: (path, content) => {
        writes += 1
        if (writes === 2) throw new Error('the disk is full')
        nodeFileSystem.createFile(path, content)
      },
    }
    const { cwd, create, getOutput, listCommands } = setUp({ dependencies: { fileSystem } })
    expect(await create(YES)).toBe(1)
    expect(getOutput()).toContain('create stopped: the disk is full. my-app was taken away.')
    expect(existsSync(join(cwd, 'my-app'))).toBe(false)
    expect(listCommands()).toEqual([])
  })

  it('takes the new folder away when the install fails, and empties a folder it was given', async () => {
    const run = (command: string, args: readonly string[], options: RunOptions) => {
      writeFileSync(join(options.cwd, 'npm-debug.log'), 'half installed')
      return { status: 1, stdout: '' }
    }
    const created = setUp({ run })
    expect(await created.create(YES)).toBe(1)
    expect(created.getOutput()).toContain(
      'create stopped: the install failed. my-app was taken away.'
    )
    expect(existsSync(join(created.cwd, 'my-app'))).toBe(false)

    const given = setUp({ run })
    mkdirSync(join(given.cwd, 'my-app'))
    expect(await given.create(YES)).toBe(1)
    expect(readdirSync(join(given.cwd, 'my-app'))).toEqual([])
    expect(given.listCommands()).toEqual(['npm install --ignore-scripts'])
  })

  it('says so when it cannot take the app away', async () => {
    const fileSystem: FileSystem = {
      ...nodeFileSystem,
      removeTree: () => {
        throw new Error('busy')
      },
    }
    const { create, getOutput } = setUp({
      run: () => ({ status: 1, stdout: '' }),
      dependencies: { fileSystem },
    })
    expect(await create(YES)).toBe(1)
    expect(getOutput()).toContain('It could not take my-app away: remove that folder yourself.')
  })

  it('prints the plan and exits on --dry-run, asking nothing', async () => {
    const { cwd, create, getOutput, listCommands } = setUp({ isInteractive: true })
    expect(await create({ ...ASK, isDryRun: true })).toBe(0)
    expect(getOutput()).toContain(
      'create will make my-app, a Test app in TypeScript (isomorphic), in ./my-app:'
    )
    expect(getOutput()).toContain('Dry run: nothing was written.')
    expect(getOutput()).not.toContain('?')
    expect(listCommands()).toEqual([])
    expect(existsSync(join(cwd, 'my-app'))).toBe(false)
  })

  it('previews only, with no terminal and no --yes', async () => {
    const { cwd, create, getOutput } = setUp()
    expect(await create(ASK)).toBe(0)
    expect(getOutput()).toContain(
      'Preview only: there is no terminal to answer in. Run again with --yes to create.'
    )
    expect(existsSync(join(cwd, 'my-app'))).toBe(false)
  })

  it('asks what it was not told in a terminal, in its order, typing only the name and title', async () => {
    const { cwd, createFiles, create, getOutput } = setUp({
      isInteractive: true,
      answers: ['', '', 'js', '', 'ssg', 'dark', 'yes', ''],
    })
    expect(await create(ASK)).toBe(0)
    const output = getOutput()
    const questions = [
      'App name? (my-app) ',
      'App title? (my-app) ',
      '? Language\n',
      '? Package manager\n',
      '? Rendering\n',
      '? Default color scheme\n',
      '? Add sample data pages?\n',
      '? Create it?\n',
    ]
    const positions = questions.map((question) => output.indexOf(question))
    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(output).toContain('a Test app in JavaScript (SSG)')
    expect(createFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'my-app',
        isTypeScript: false,
        scheme: 'dark',
        hasSampleData: true,
      })
    )
    expect(existsSync(join(cwd, 'my-app/src/theme/themes.js'))).toBe(true)
  })

  it('takes the name and title it is given, and the choices each start on', async () => {
    const { cwd, createFiles, create } = setUp({
      isInteractive: true,
      answers: [' shop ', ' Shop ', '', '', '', '', ''],
    })
    expect(await create(ASK)).toBe(0)
    expect(createFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'shop',
        title: 'Shop',
        isTypeScript: true,
        scheme: 'light',
        hasSampleData: false,
      })
    )
    expect(existsSync(join(cwd, 'shop/package.json'))).toBe(true)
  })

  it('installs with the package manager picked, once it answers --version', async () => {
    const versions: Record<string, RunResult> = {
      pnpm: { status: 0, stdout: '10.4.1\n' },
      bun: { status: null, stdout: '' },
    }
    const run = (command: string, args: readonly string[]) =>
      args[0] === '--version' ? versions[command] : runOutsideGit(command, args)
    const { cwd, create, getOutput, listCommands } = setUp({
      isInteractive: true,
      answers: ['', '', '', 'pnpm', '', '', ''],
      run,
    })
    expect(await create(ASK)).toBe(0)
    expect(listCommands()).toEqual([
      'pnpm --version',
      'pnpm install --ignore-scripts',
      'git rev-parse --is-inside-work-tree',
      'git init',
    ])
    expect(getOutput()).toContain('  pnpm dev')

    expect(await create({ ...YES, name: 'other', packageManager: 'bun' })).toBe(1)
    expect(getOutput()).toContain(
      'bun is not installed: install it, or pick another package manager.'
    )
    expect(existsSync(join(cwd, 'other'))).toBe(false)
  })

  it('tells a yarn Berry from a classic yarn by its version', async () => {
    let yarnVersion = '4.5.0'
    const run = (command: string, args: readonly string[]) =>
      args[0] === '--version' ? { status: 0, stdout: yarnVersion } : runOutsideGit(command, args)
    const { create, test } = setUp({ run })
    expect(await create({ ...YES, packageManager: 'yarn' })).toBe(0)
    expect(test.commands[1]).toMatchObject({
      command: 'yarn',
      args: ['install'],
      options: { env: { YARN_ENABLE_SCRIPTS: 'false' } },
    })
    yarnVersion = '1.22.22'
    expect(await create({ ...YES, name: 'classic', packageManager: 'yarn' })).toBe(0)
    expect(test.commands.at(-3)).toMatchObject({
      command: 'yarn',
      args: ['install', '--ignore-scripts'],
    })
  })

  it('writes nothing without a yes', async () => {
    const { cwd, create, getOutput, listCommands } = setUp({ isInteractive: true, answers: ['no'] })
    const options = {
      ...ASK,
      name: 'my-app',
      title: 'my-app',
      isTypeScript: true,
      packageManager: 'npm' as const,
      rendering: 'spa' as const,
      scheme: 'light' as const,
      hasSampleData: false,
    }
    expect(await create(options)).toBe(0)
    expect(getOutput()).toContain('Nothing was written.')
    expect(listCommands()).toEqual([])
    expect(existsSync(join(cwd, 'my-app'))).toBe(false)
  })

  it('takes the starter --framework names, and refuses one it does not have', async () => {
    const { cwd, create, getOutput } = setUp()
    expect(await create({ ...YES, framework: 'bare' })).toBe(0)
    expect(getOutput()).toContain('a Bare app')
    expect(getOutput()).not.toContain('Make the themes your own')
    expect(readdirSync(join(cwd, 'my-app'))).toEqual(['package.json'])

    for (const framework of ['next', 'toString', '__proto__']) {
      expect(await create({ ...YES, name: 'other', framework })).toBe(1)
      expect(getOutput()).toContain(`create has no starter for ${framework}. It has: test, bare.`)
    }
    expect(existsSync(join(cwd, 'other'))).toBe(false)
  })

  it('says when it has no starter at all', async () => {
    const cwd = createWorkspace()
    const { io, getOutput } = createTestIo(cwd)
    expect(await runCreate(YES, io, DESIGN_SYSTEM, { starters: {} })).toBe(1)
    expect(getOutput()).toBe('create has no starter for any framework. It has: none yet.\n')
    expect(await runCreate({ ...YES, framework: 'next' }, io, DESIGN_SYSTEM)).toBe(1)
    expect(getOutput()).toContain('create has no starter for next. It has: vike.')
  })
})
