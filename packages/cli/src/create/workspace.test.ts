// @vitest-environment node
import { describe, expect, it } from 'vitest'
import type { PackageManagerName } from '../plan/planInit'
import type { StarterFile } from './starters'
import { createWorkspaceFiles, toAppPackageName, type WorkspaceFacts } from './workspace'

const FACTS: WorkspaceFacts = {
  packageName: 'test-app',
  title: 'Test App',
  packageManager: 'npm',
}
const APP_SCRIPTS = { dev: 'vite', build: 'vite build', preview: 'vite preview', typecheck: 'tsc' }
const APP_PACKAGE = JSON.stringify({ name: '@test-app/web', scripts: APP_SCRIPTS })
const APP_FILES = [
  { path: 'package.json', content: APP_PACKAGE },
  { path: 'src/pages/index/+Page.tsx', content: 'export default 1\n' },
]

const createFiles = (
  facts: Partial<WorkspaceFacts> = {},
  appFiles: readonly StarterFile[] = APP_FILES
) =>
  new Map(
    createWorkspaceFiles(appFiles, { ...FACTS, ...facts }).map((file) => [file.path, file.content])
  )

const readScripts = (files: Map<string, string>) =>
  JSON.parse(files.get('package.json')!).scripts as Record<string, string>

describe('the workspace', () => {
  it('names the app after the workspace', () => {
    expect(toAppPackageName('test-app')).toBe('@test-app/web')
  })

  it('holds the app in apps/web, with an empty services folder, a README and a .gitignore', () => {
    const files = createFiles()
    expect([...files.keys()]).toEqual([
      'package.json',
      '.gitignore',
      'README.md',
      'services/.gitkeep',
      'apps/web/package.json',
      'apps/web/src/pages/index/+Page.tsx',
    ])
    expect(files.get('apps/web/package.json')).toBe(APP_PACKAGE)
    expect(files.get('services/.gitkeep')).toBe('')
    expect(files.get('README.md')).toMatch(/^# Test App\n/)
    expect(files.get('README.md')).toContain('`apps/web/` is the web app, `@test-app/web`')
    expect(files.get('README.md')).toContain('From here, `npm run dev` starts the web app')
    expect(JSON.parse(files.get('package.json')!)).toEqual({
      name: 'test-app',
      private: true,
      workspaces: ['apps/*', 'services/*'],
      scripts: {
        dev: 'npm run dev --workspace=@test-app/web',
        build: 'npm run build --workspace=@test-app/web',
        preview: 'npm run preview --workspace=@test-app/web',
        typecheck: 'npm run typecheck --workspace=@test-app/web',
      },
    })
  })

  it("runs the app's scripts with each package manager's workspace command", () => {
    const commands: Record<PackageManagerName, string> = {
      npm: 'npm run build --workspace=@test-app/web',
      pnpm: 'pnpm --filter @test-app/web build',
      yarn: 'yarn workspace @test-app/web build',
      bun: 'bun run --filter @test-app/web build',
    }
    for (const [packageManager, command] of Object.entries(commands)) {
      const files = createFiles({ packageManager: packageManager as PackageManagerName })
      expect(readScripts(files).build).toBe(command)
    }
  })

  it('lists the workspaces in pnpm-workspace.yaml for pnpm, and in package.json for the others', () => {
    const pnpm = createFiles({ packageManager: 'pnpm' })
    expect(pnpm.get('pnpm-workspace.yaml')).toBe('packages:\n  - apps/*\n  - services/*\n')
    expect(JSON.parse(pnpm.get('package.json')!)).not.toHaveProperty('workspaces')
    expect(pnpm.get('README.md')).toContain('`pnpm dev` starts the web app')
    for (const packageManager of ['npm', 'yarn', 'bun'] as const) {
      expect(createFiles({ packageManager }).has('pnpm-workspace.yaml')).toBe(false)
    }
    expect(createFiles({ packageManager: 'bun' }).get('README.md')).toContain('`bun run dev`')
  })

  it('runs each script the app has, by its own name, and none the app lacks', () => {
    const scripts = { dev: 'vite', build: 'vite build', start: 'node dist/server/index.mjs' }
    const app = [{ path: 'package.json', content: JSON.stringify({ scripts }) }]
    expect(readScripts(createFiles({}, app))).toEqual({
      dev: 'npm run dev --workspace=@test-app/web',
      build: 'npm run build --workspace=@test-app/web',
      start: 'npm run start --workspace=@test-app/web',
    })
    expect(readScripts(createFiles({}, [{ path: 'package.json', content: '{}' }]))).toEqual({})
    expect(readScripts(createFiles({}, []))).toEqual({})
  })
})
