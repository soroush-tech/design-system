// @vitest-environment node
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { nodeFileSystem } from './apply/fileSystem'
import { runInit, type InitOptions } from './init'
import { MARKER } from './templates/templates'
import { createTestApp, createTestIo, VITE_ROOT } from './testApp'

const OWN_PACKAGE = {
  name: '@soroush.tech/design-system',
  version: '2.2.0',
  peerDependencies: { react: '^18.0.0 || ^19.0.0' },
}

const YES: InitOptions = { isConfirmed: true, isDryRun: false, isForced: false, scheme: undefined }
const ASK: InitOptions = { ...YES, isConfirmed: false }

const createViteApp = (files: Record<string, string> = {}) =>
  createTestApp({ 'src/main.tsx': VITE_ROOT, 'pnpm-lock.yaml': '', ...files })

const read = (root: string, path: string) => readFileSync(join(root, path), 'utf8')

/** Every file and folder in the app, but its .git folder. */
const listApp = (root: string) =>
  readdirSync(root, { recursive: true })
    .map((path) => String(path).replaceAll('\\', '/'))
    .filter((path) => !path.startsWith('.git'))
    .sort()

describe('runInit', () => {
  it('sets up the app with --yes: the files, the root, the install, then the closing message', async () => {
    const root = createViteApp()
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(0)

    expect(read(root, 'src/theme/themes.ts').startsWith(MARKER)).toBe(true)
    expect(read(root, 'src/theme/Providers.ts')).toContain('{ theme: themes.light }')
    expect(read(root, 'src/main.tsx')).toContain("import { Providers } from './theme/Providers.ts'")
    expect(commands.map(({ command, args, options }) => [command, args, options])).toEqual([
      ['git', ['status', '--porcelain'], { cwd: root }],
      [
        'pnpm',
        ['add', '@soroush.tech/design-system@^2.2.0', '--ignore-scripts'],
        { cwd: root, env: {}, showOutput: true },
      ],
    ])
    const output = getOutput()
    expect(output).toContain('init will set up @soroush.tech/design-system in test-app:')
    expect(output).toContain('npx skills add soroush-tech/design-system')
    expect(output).toContain('https://mcp.soroush.design/mcp')
    expect(output).toContain(
      'https://docs.soroush.tech/design-system/getting-started/installation/#fonts'
    )
    expect(output).toContain('Make the themes your own in src/theme/themes.ts.')
    expect(output).not.toContain('Still left to you')
  })

  it('writes no agent folder: only the theme, the providers and the root change', async () => {
    const root = createViteApp()
    const before = listApp(root)
    await runInit(YES, createTestIo(root).io, OWN_PACKAGE)
    expect(listApp(root).filter((path) => !before.includes(path))).toEqual([
      'src/theme',
      'src/theme/Providers.ts',
      'src/theme/themes.ts',
    ])
  })

  it('changes nothing on a second run', async () => {
    const root = createViteApp()
    await runInit(YES, createTestIo(root).io, OWN_PACKAGE)
    // A real install lists the package in package.json; the test's install ran nothing.
    const dependencies = { react: '19.0.0', '@soroush.tech/design-system': '^2.2.0' }
    writeFileSync(join(root, 'package.json'), JSON.stringify({ dependencies }))
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).toBe(
      'The design system is already set up here: init has nothing to change.\n'
    )
    expect(commands.map(({ command }) => command)).toEqual(['git'])
  })

  it('reports what it skipped even when there is nothing left to change', async () => {
    const root = createViteApp({
      'package.json': JSON.stringify({
        dependencies: { react: '19.0.0', '@soroush.tech/design-system': '2.2.0' },
      }),
      'src/theme/themes.ts': 'export default {}',
    })
    const { io, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).toContain('Skip:\n  src/theme/themes.ts: exists, and init did not write it')
    expect(read(root, 'src/theme/themes.ts')).toBe('export default {}')
  })

  it('previews only, with no terminal and no --yes, and does not ask git', async () => {
    const root = createViteApp()
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runInit(ASK, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).toContain(
      'Preview only: there is no terminal to answer in. Run again with --yes to apply.'
    )
    expect(getOutput()).toContain('Edit src/main.tsx:')
    expect(commands).toEqual([])
    expect(existsSync(join(root, 'src/theme'))).toBe(false)
  })

  it('prints the plan and exits on --dry-run, even outside git', async () => {
    const root = createViteApp()
    const { io, commands, getOutput } = createTestIo(root, { isInteractive: true })
    expect(await runInit({ ...YES, isDryRun: true }, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).toContain('Create:\n  src/theme/themes.ts\n  src/theme/Providers.ts')
    expect(getOutput()).toContain('Dry run: nothing was changed.')
    expect(commands).toEqual([])
    expect(existsSync(join(root, 'src/theme'))).toBe(false)
  })

  it('asks for the scheme and a yes in a terminal', async () => {
    const root = createViteApp()
    const { io, getOutput } = createTestIo(root, { isInteractive: true, answers: ['dark', 'y'] })
    expect(await runInit(ASK, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).toContain('Default color scheme, light or dark? (light) ')
    expect(getOutput()).toContain('Apply these changes? (y/N) ')
    expect(read(root, 'src/theme/Providers.ts')).toContain('{ theme: themes.dark }')
  })

  it('writes nothing without a yes', async () => {
    const root = createViteApp()
    const { io, commands, getOutput } = createTestIo(root, { isInteractive: true })
    expect(await runInit(ASK, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).toContain('Nothing was changed.')
    expect(commands.map(({ command }) => command)).toEqual(['git'])
    expect(read(root, 'src/main.tsx')).toBe(VITE_ROOT)
    expect(existsSync(join(root, 'src/theme'))).toBe(false)
  })

  it('does not ask for a scheme it was given', async () => {
    const root = createViteApp()
    const { io, getOutput } = createTestIo(root, { isInteractive: true, answers: ['yes'] })
    expect(await runInit({ ...ASK, scheme: 'dark' }, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).not.toContain('Default color scheme')
    expect(read(root, 'src/theme/Providers.ts')).toContain('{ theme: themes.dark }')
  })

  it('refuses a tree with uncommitted changes, or outside git, unless --force', async () => {
    const dirty = createTestIo(createViteApp(), {
      run: () => ({ status: 0, stdout: '?? notes.txt\n' }),
    })
    expect(await runInit(YES, dirty.io, OWN_PACKAGE)).toBe(1)
    expect(dirty.getOutput()).toMatch(/^This folder has uncommitted changes\./)

    const outside = createTestIo(createViteApp(), { run: () => ({ status: 128, stdout: '' }) })
    expect(await runInit(YES, outside.io, OWN_PACKAGE)).toBe(1)
    expect(outside.getOutput()).toMatch(/^This folder is not in a git repository/)
    expect(existsSync(join(outside.io.cwd, 'src/theme'))).toBe(false)

    const forced = createTestIo(createViteApp(), {
      run: (command) => ({ status: command === 'git' ? 128 : 0, stdout: '' }),
    })
    expect(await runInit({ ...YES, isForced: true }, forced.io, OWN_PACKAGE)).toBe(0)
    expect(existsSync(join(forced.io.cwd, 'src/theme/themes.ts'))).toBe(true)
  })

  it('refuses a folder with no package.json, an app with no React, and a framework it does not set up yet', async () => {
    const cases: [Record<string, string>, RegExp][] = [
      [{ 'package.json': '' }, /^There is no package.json in this folder/],
      [
        { 'package.json': JSON.stringify({ dependencies: {} }) },
        /^init found no React in this app/,
      ],
      [
        { 'package.json': JSON.stringify({ dependencies: { react: '19.0.0', next: '15.0.0' } }) },
        /^This looks like a Next.js app\. init sets up client-rendered React apps for now/,
      ],
    ]
    for (const [files, message] of cases) {
      const root = createTestApp(files)
      if (files['package.json'] === '') rmSync(join(root, 'package.json'))
      const { io, getOutput } = createTestIo(root)
      expect(await runInit(YES, io, OWN_PACKAGE)).toBe(1)
      expect(getOutput()).toMatch(message)
    }
  })

  it('accepts React on the floor, and refuses React below it without changing anything', async () => {
    const app = (react: string) =>
      createViteApp({
        'package.json': JSON.stringify({ dependencies: { react, 'react-dom': react } }),
      })
    const accepted = createTestIo(app('18.0.0'))
    expect(await runInit({ ...YES, isDryRun: true }, accepted.io, OWN_PACKAGE)).toBe(0)

    const refused = createTestIo(app('17.0.2'))
    expect(await runInit(YES, refused.io, OWN_PACKAGE)).toBe(1)
    expect(refused.getOutput()).toBe(
      'This app has React 17.0.2, and the design system needs React ^18.0.0 || ^19.0.0. init changes nothing, and never upgrades React.\n'
    )
    expect(existsSync(join(refused.io.cwd, 'src/theme'))).toBe(false)
  })

  it('leaves the app unchanged when a write fails', async () => {
    const root = createViteApp()
    const { io, commands, getOutput } = createTestIo(root)
    let writes = 0
    const fileSystem = {
      ...nodeFileSystem,
      // The edit's write fails; the write that restores the original then succeeds.
      writeFile: (path: string, content: string) => {
        writes += 1
        if (writes === 1) throw new Error('disk full')
        nodeFileSystem.writeFile(path, content)
      },
    }
    expect(await runInit(YES, io, OWN_PACKAGE, fileSystem)).toBe(1)
    expect(getOutput()).toContain('init stopped: disk full. Every change it made was taken back.')
    expect(read(root, 'src/main.tsx')).toBe(VITE_ROOT)
    expect(existsSync(join(root, 'src/theme'))).toBe(false)
    // The install runs last, so it never ran.
    expect(commands.map(({ command }) => command)).toEqual(['git'])
  })

  it('says so when it could not take a change back', async () => {
    const root = createViteApp()
    const fileSystem = {
      ...nodeFileSystem,
      writeFile: () => {
        throw new Error('disk full')
      },
      removeFile: () => {
        throw new Error('locked')
      },
    }
    const { io, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE, fileSystem)).toBe(1)
    expect(getOutput()).toContain('It could not take back every change: check git status.')
  })

  it('keeps the files and prints the command when the install fails', async () => {
    const root = createViteApp()
    const { io, getOutput } = createTestIo(root, {
      run: (command) => ({ status: command === 'git' ? 0 : 1, stdout: '' }),
    })
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(1)
    expect(getOutput()).toContain(
      'The install failed. The files are written; install the package yourself:\n  pnpm add @soroush.tech/design-system@^2.2.0 --ignore-scripts'
    )
    expect(existsSync(join(root, 'src/theme/themes.ts'))).toBe(true)
  })

  it('names what is left to do in the closing message, for an app with no root it can edit', async () => {
    const root = createTestApp({
      'package.json': JSON.stringify({
        dependencies: { react: '19.0.0', '@soroush.tech/design-system': '2.2.0' },
      }),
      'tsconfig.json': '{}',
    })
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(0)
    expect(existsSync(join(root, 'src/theme/themes.ts'))).toBe(true)
    expect(getOutput()).toContain(
      'Still left to you:\n  - init found no file that calls createRoot'
    )
    expect(getOutput()).toContain('init will set up @soroush.tech/design-system in this app:')
    // Already a dependency: no install.
    expect(commands.map(({ command }) => command)).toEqual(['git'])
  })

  it('writes JavaScript in an app with no root and no tsconfig.json', async () => {
    const root = createTestApp({
      'package.json': JSON.stringify({ dependencies: { react: '19.0.0' } }),
    })
    expect(await runInit(YES, createTestIo(root).io, OWN_PACKAGE)).toBe(0)
    expect(existsSync(join(root, 'src/theme/themes.js'))).toBe(true)
  })

  it('keeps a theme it wrote before, and adds what is missing', async () => {
    const root = createViteApp({ 'src/theme/themes.ts': `${MARKER} edited` })
    const { io, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(0)
    expect(read(root, 'src/theme/themes.ts')).toBe(`${MARKER} edited`)
    expect(existsSync(join(root, 'src/theme/Providers.ts'))).toBe(true)
    expect(getOutput()).not.toContain('Make the themes your own')
  })

  it('skips the scheme question when it creates no providers', async () => {
    const root = createViteApp({ 'src/theme/Providers.ts': `${MARKER}` })
    const { io, getOutput } = createTestIo(root, { isInteractive: true, answers: ['y'] })
    expect(await runInit(ASK, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).not.toContain('Default color scheme')
  })
})

describe('runInit in a workspace', () => {
  const REACT_APP = JSON.stringify({
    name: '@acme/web',
    dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' },
  })
  // A workspace's root, as pnpm keeps it: no React of its own, and its apps under apps/.
  const createWorkspace = (files: Record<string, string> = {}) =>
    createTestApp({
      'package.json': JSON.stringify({ name: 'acme', private: true }),
      'pnpm-workspace.yaml': "packages:\n  - 'apps/*'\n",
      'pnpm-lock.yaml': '',
      ...files,
    })

  it('sets up the one app in it, from its root, and installs in that app', async () => {
    const root = createWorkspace({
      'apps/web/package.json': REACT_APP,
      'apps/web/src/main.tsx': VITE_ROOT,
      'packages/utils/package.json': JSON.stringify({ name: '@acme/utils' }),
    })
    const app = join(root, 'apps/web')
    const { io, commands, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(0)

    expect(getOutput()).toMatch(
      /^This is a workspace's root: init sets up the app in apps\/web\.\n\ninit will set up @soroush\.tech\/design-system in @acme\/web:/
    )
    expect(read(app, 'src/theme/themes.ts').startsWith(MARKER)).toBe(true)
    expect(read(app, 'src/main.tsx')).toContain("import { Providers } from './theme/Providers.ts'")
    expect(existsSync(join(root, 'src'))).toBe(false)
    // pnpm adds the package to the app it runs in, not to the workspace's root.
    expect(commands.at(-1)).toEqual({
      command: 'pnpm',
      args: ['add', '@soroush.tech/design-system@^2.2.0', '--ignore-scripts'],
      options: { cwd: app, env: {}, showOutput: true },
    })
  })

  it('refuses a root with more than one app, or none, and names where to run it', async () => {
    const several = createWorkspace({
      'apps/web/package.json': REACT_APP,
      'apps/web/src/main.tsx': VITE_ROOT,
      'src/main.tsx': VITE_ROOT,
    })
    const { io, getOutput } = createTestIo(several)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(1)
    expect(getOutput()).toBe(
      "This is a workspace's root with more than one app (apps/web, .). Run init in the one to set up, for example: cd apps/web\n"
    )
    expect(listApp(several)).not.toContain('apps/web/src/theme')

    const none = createTestIo(createWorkspace({ 'apps/web/package.json': REACT_APP }))
    expect(await runInit(YES, none.io, OWN_PACKAGE)).toBe(1)
    expect(none.getOutput()).toMatch(/^This is a workspace's root, and init found no app in it/)
  })

  it("sets up a workspace's root that is the app itself", async () => {
    const root = createViteApp({
      'package.json': JSON.stringify({
        name: 'acme',
        workspaces: ['packages/*'],
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' },
      }),
    })
    const { io, getOutput } = createTestIo(root)
    expect(await runInit(YES, io, OWN_PACKAGE)).toBe(0)
    expect(getOutput()).toMatch(/^init will set up @soroush\.tech\/design-system in acme:/)
    expect(existsSync(join(root, 'src/theme/themes.ts'))).toBe(true)
  })

  it("never takes a nested package's root for the app's own", async () => {
    const root = createViteApp({
      'examples/demo/package.json': REACT_APP,
      'examples/demo/src/main.tsx': VITE_ROOT,
    })
    expect(await runInit(YES, createTestIo(root).io, OWN_PACKAGE)).toBe(0)
    expect(read(root, 'src/main.tsx')).toContain('<Providers>')
    expect(read(root, 'examples/demo/src/main.tsx')).toBe(VITE_ROOT)
  })
})
