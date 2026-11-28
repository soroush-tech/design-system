import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { checkEngineImports, findEngineImports, isGuarded } from './engineImports'

describe('isGuarded', () => {
  it.each([
    'apps/docs/src/demos/scope.ts',
    'apps/next-fixture/package.json',
    'packages/cli/templates/vike/ts/base/src/pages/+onRenderHtml.tsx',
    'packages/cli/type-tests/create-vike/package.json',
    'packages/react/docs/engine.md',
    'packages/react/README.md',
    'packages/react/src/Paper/README.md',
    'packages/react/src/Paper/Paper.mdx',
    'packages/react/src/Button/Button.stories.tsx',
    'packages/mcp/README.md',
    'plugins/soroush-design-system/skills/soroush-design-system/references/setup.md',
  ])('guards %s', (path) => expect(isGuarded(path)).toBe(true))

  it.each([
    'packages/react/src/style/styled.ts',
    'packages/react/src/server/index.ts',
    'packages/react-markdown/src/Editor/Editor.tsx',
    'scripts/measure-app-cost/render-runner.mjs',
    'packages/react/package.json',
    'apps/docs/node_modules/x/index.js',
  ])('leaves %s alone', (path) => expect(isGuarded(path)).toBe(false))
})

describe('findEngineImports', () => {
  const file = (path: string, text: string) => ({ path, text })

  it.each([
    "import { css } from '@umber-style/css'",
    'import { styled } from "@umber-style/styled"',
    "const { css } = require('@umber-style/css')",
    "const m = await import('@umber-style/react')",
    "vi.mock('@umber-style/server/create-instance', () => ({}))",
    '  "@umber-style/server": "^0.8.0",',
  ])('names a guarded file with %s', (text) => {
    expect(findEngineImports([file('apps/docs/a.ts', text)])).toEqual([
      'apps/docs/a.ts imports @umber-style/*: use @gild-ui/react',
    ])
  })

  it('lets prose name the engine, and a file outside the list import it', () => {
    expect(
      findEngineImports([
        file('packages/react/README.md', 'The engine (the `@umber-style/*` packages) is internal.'),
        file('packages/react/src/style/styled.ts', "import { css } from '@umber-style/react'"),
      ])
    ).toEqual([])
  })
})

describe('checkEngineImports', () => {
  const root = mkdtempSync(join(tmpdir(), 'engine-imports-'))
  // Inside a commit hook git hands its own repository down (GIT_INDEX_FILE and the like): a git run
  // in the temporary repository would then write into the index of the commit being made.
  const inherited = Object.fromEntries(
    Object.keys(process.env)
      .filter((name) => name.startsWith('GIT_'))
      .map((name) => [name, process.env[name]])
  )
  beforeAll(() => {
    for (const name in inherited) delete process.env[name]
  })
  afterAll(() => {
    Object.assign(process.env, inherited)
    rmSync(root, { recursive: true, force: true })
  })

  it('reads the tracked files, and skips one that is gone', () => {
    const git = (...args: string[]) => execFileSync('git', args, { cwd: root, stdio: 'ignore' })
    mkdirSync(join(root, 'apps', 'web'), { recursive: true })
    writeFileSync(join(root, 'apps', 'web', 'bad.ts'), "import { css } from '@umber-style/css'\n")
    writeFileSync(join(root, 'apps', 'web', 'good.ts'), "import { css } from '@gild-ui/react'\n")
    writeFileSync(join(root, 'apps', 'web', 'gone.ts'), 'export {}\n')
    git('init', '-q')
    git('add', '-A')
    rmSync(join(root, 'apps', 'web', 'gone.ts'))
    expect(checkEngineImports(root)).toEqual([
      'apps/web/bad.ts imports @umber-style/*: use @gild-ui/react',
    ])
  })
})

describe('this repository', () => {
  it('has no app, template, doc, story or plugin file that imports the engine', () => {
    expect(checkEngineImports(join(import.meta.dirname, '..', '..', '..'))).toEqual([])
  })
})
