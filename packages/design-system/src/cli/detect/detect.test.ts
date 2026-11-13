// @vitest-environment node
import { mkdirSync, symlinkSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createTestApp, createTestIo, VITE_ROOT } from '../testApp'
import {
  detectPackageManager,
  findReactVersion,
  findRootFiles,
  findUnsupportedFramework,
  getDependency,
  getGitState,
  needsParcelPackageExports,
  readOwnPackage,
  readPackageJson,
  readText,
  satisfiesRange,
} from './detect'

describe('readText and readPackageJson', () => {
  it('reads a file, and gives undefined when there is none', () => {
    const root = createTestApp({ 'a.txt': 'text' })
    expect(readText(join(root, 'a.txt'))).toBe('text')
    expect(readText(join(root, 'missing.txt'))).toBeUndefined()
    expect(readPackageJson(root)?.name).toBe('test-app')
    expect(readPackageJson(join(root, 'missing'))).toBeUndefined()
  })
})

describe('getDependency', () => {
  it('reads dependencies, then devDependencies', () => {
    expect(getDependency({ dependencies: { a: '1' }, devDependencies: { b: '2' } }, 'a')).toBe('1')
    expect(getDependency({ devDependencies: { b: '2' } }, 'b')).toBe('2')
    expect(getDependency({}, 'c')).toBeUndefined()
  })
})

describe('detectPackageManager', () => {
  it('reads the packageManager field first', () => {
    const root = createTestApp({ 'package-lock.json': '{}' })
    expect(detectPackageManager(root, { packageManager: 'pnpm@10.0.0' })).toEqual({
      name: 'pnpm',
      isYarnBerry: false,
    })
    expect(detectPackageManager(root, { packageManager: 'yarn@4.5.0' })).toEqual({
      name: 'yarn',
      isYarnBerry: true,
    })
    expect(detectPackageManager(root, { packageManager: 'yarn@1.22.0' })).toEqual({
      name: 'yarn',
      isYarnBerry: false,
    })
  })

  it.each([
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['bun.lock', 'bun'],
    ['bun.lockb', 'bun'],
    ['package-lock.json', 'npm'],
    ['npm-shrinkwrap.json', 'npm'],
  ])('reads %s as %s', (lockfile, name) => {
    expect(detectPackageManager(createTestApp({ [lockfile]: '' }), {}).name).toBe(name)
  })

  it('tells Yarn 2 and later by its .yarnrc.yml', () => {
    const root = createTestApp({ 'yarn.lock': '', '.yarnrc.yml': '' })
    expect(detectPackageManager(root, {})).toEqual({ name: 'yarn', isYarnBerry: true })
  })

  it("finds a workspace's lockfile above the app, and stops at the repository's root", () => {
    const workspace = createTestApp({ 'pnpm-lock.yaml': '', 'apps/web/package.json': '{}' })
    const app = join(workspace, 'apps/web')
    expect(detectPackageManager(app, {}).name).toBe('pnpm')
    // The app's own .git folder ends the search: npm, by default.
    expect(detectPackageManager(createTestApp(), {}).name).toBe('npm')
  })

  it('stops at the top of the file system', () => {
    expect(detectPackageManager('/', {}, () => false)).toEqual({ name: 'npm', isYarnBerry: false })
  })
})

describe('findReactVersion', () => {
  it('reads the installed React first', () => {
    const root = createTestApp({
      'node_modules/react/package.json': JSON.stringify({ name: 'react', version: '18.3.1' }),
      'node_modules/react/index.js': '',
    })
    expect(findReactVersion(root, { dependencies: { react: '^19.0.0' } })).toBe('18.3.1')
  })

  it('falls back to the lowest version the declared range allows', () => {
    const root = createTestApp()
    expect(findReactVersion(root, { dependencies: { react: '^19.2.1' } })).toBe('19.2.1')
    expect(findReactVersion(root, { dependencies: { react: '~18.2' } })).toBe('18.2.0')
    expect(findReactVersion(root, { devDependencies: { react: '17' } })).toBe('17.0.0')
    expect(findReactVersion(root, { dependencies: { react: 'latest' } })).toBeUndefined()
    expect(findReactVersion(root, {})).toBeUndefined()
  })
})

describe('satisfiesRange', () => {
  const range = '^18.0.0 || ^19.0.0'

  it('accepts a version on each side of the floor as it should', () => {
    expect(satisfiesRange('18.0.0', range)).toBe(true)
    expect(satisfiesRange('18.3.1', range)).toBe(true)
    expect(satisfiesRange('19.3.1', range)).toBe(true)
    expect(satisfiesRange('17.0.2', range)).toBe(false)
    expect(satisfiesRange('20.0.0', range)).toBe(false)
  })

  it('compares the minor and patch above the floor of a part', () => {
    expect(satisfiesRange('18.2.0', '^18.2.1')).toBe(false)
    expect(satisfiesRange('18.2.1', '^18.2.1')).toBe(true)
    expect(satisfiesRange('18.1.9', '^18.2.0')).toBe(false)
    expect(satisfiesRange('18.3.0', '^18.2.5')).toBe(true)
  })

  it("reads this package's own peer range, and throws on a shape it does not read", () => {
    const { peerDependencies } = readOwnPackage(join(process.cwd(), 'src/cli/bin.ts'))
    expect(satisfiesRange('19.0.0', peerDependencies!.react)).toBe(true)
    expect(() => satisfiesRange('19.0.0', '>=18')).toThrow('init cannot read the range >=18')
  })
})

describe('getGitState', () => {
  it('tells a clean tree, a dirty one, and a folder outside git apart', () => {
    const answer = (status: number | null, stdout: string) =>
      createTestIo('.', { run: () => ({ status, stdout }) }).io
    expect(getGitState('.', answer(0, ''))).toBe('clean')
    expect(getGitState('.', answer(0, ' M src/main.tsx\n'))).toBe('dirty')
    expect(getGitState('.', answer(128, ''))).toBe('not-a-repository')
    expect(getGitState('.', answer(null, ''))).toBe('not-a-repository')
  })

  it('asks git, in the app', () => {
    const { io, commands } = createTestIo('.')
    getGitState('/app', io)
    expect(commands).toEqual([
      { command: 'git', args: ['status', '--porcelain'], options: { cwd: '/app' } },
    ])
  })
})

describe('findRootFiles', () => {
  it('finds the file that renders the app, wherever it is', () => {
    const root = createTestApp({
      'src/main.tsx': VITE_ROOT,
      'src/App.tsx': 'export default function App() { return null }',
      'src/index.css': 'root.render(',
    })
    expect(findRootFiles(root)).toEqual(['src/main.tsx'])
  })

  it('reads no tests, stories, output, dependencies or hidden folders', () => {
    const root = createTestApp({
      'src/main.test.tsx': VITE_ROOT,
      'src/main.stories.tsx': VITE_ROOT,
      'src/main.spec.jsx': VITE_ROOT,
      'dist/main.js': VITE_ROOT,
      'build/main.js': VITE_ROOT,
      'node_modules/x/index.js': VITE_ROOT,
      '.cache/main.js': VITE_ROOT,
      'a/b/c/d/e/f/main.js': VITE_ROOT,
    })
    expect(findRootFiles(root)).toEqual([])
  })

  it('finds every root, so several can be reported', () => {
    const root = createTestApp({ 'index.jsx': VITE_ROOT, 'src/admin.mjs': VITE_ROOT })
    expect(findRootFiles(root).sort()).toEqual(['index.jsx', 'src/admin.mjs'])
  })

  it('does not follow a symbolic link', () => {
    const root = createTestApp()
    const elsewhere = createTestApp({ 'main.tsx': VITE_ROOT })
    mkdirSync(join(root, 'src'))
    symlinkSync(elsewhere, join(root, 'src/linked'), 'junction')
    expect(findRootFiles(root)).toEqual([])
  })
})

describe('readOwnPackage', () => {
  it("finds this package's package.json above a file in it", () => {
    expect(readOwnPackage(join(process.cwd(), 'src/cli/detect/detect.ts')).name).toBe(
      '@soroush.tech/design-system'
    )
  })

  it('throws when there is none', () => {
    expect(() => readOwnPackage(join(createTestApp(), 'bin.mjs'))).toThrow(
      'init cannot find its own package.json'
    )
  })
})

describe('findUnsupportedFramework', () => {
  it('names a framework init does not set up yet', () => {
    expect(findUnsupportedFramework({ dependencies: { next: '15.0.0' } })).toBe('Next.js')
    expect(findUnsupportedFramework({ devDependencies: { '@react-router/dev': '7.0.0' } })).toBe(
      'React Router in framework mode'
    )
    expect(
      findUnsupportedFramework({ dependencies: { react: '19.0.0', vite: '7.0.0' } })
    ).toBeUndefined()
  })
})

describe('needsParcelPackageExports', () => {
  it('asks a Parcel app to read package exports, until it does', () => {
    expect(needsParcelPackageExports({ devDependencies: { parcel: '^2.15.0' } })).toBe(true)
    expect(
      needsParcelPackageExports({
        devDependencies: { parcel: '^2.15.0' },
        '@parcel/resolver-default': { packageExports: true },
      })
    ).toBe(false)
    expect(needsParcelPackageExports({ devDependencies: { vite: '^8.0.0' } })).toBe(false)
  })
})
