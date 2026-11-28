import { describe, expect, it } from 'vitest'
import { editDependencies, planChain, StepError, type AppFiles } from './simulate'
import type { Change, MigrationStep } from './step'
import { STEP_THREE, STEP_TWO, TEST_APP_FILES, TEST_STEPS } from './testSteps'

const NPM = { name: 'npm' as const, isYarnBerry: false }
const START = { package: '@test/a', version: '1.2.0' }

function createDisk(files: Record<string, string>): AppFiles {
  return { readFile: (path) => files[path], listFiles: () => Object.keys(files).sort() }
}

const plan = (steps: readonly MigrationStep[], files: Record<string, string> = TEST_APP_FILES) =>
  planChain(steps, createDisk(files), NPM, START)

/** A step that answers with `changes`, whatever the app is. */
const stepWith = (changes: Change[], to = '2.0.0'): MigrationStep => ({
  ...STEP_TWO,
  to: { package: '@test/a', version: to },
  plan: () => changes,
})

describe('planChain', () => {
  it('plans a step: its edits, its reports, its dependencies and the move to its version', () => {
    const [first] = plan([STEP_TWO])
    expect(first.from).toEqual(START)
    expect(first.plan.creates).toEqual([])
    expect(first.plan.edits.map(({ path }) => path)).toEqual(['src/main.ts', 'package.json'])
    expect(first.plan.edits[0].after).toBe(
      "import { newName } from '@test/a'\nnewName()\nlegacy()\n"
    )
    expect(first.reports).toEqual([
      {
        path: 'src/main.ts',
        line: 3,
        code: 'T-LEGACY',
        message: 'legacy() has no successor: decide',
      },
    ])
    expect(first.dependencies).toEqual([
      { action: 'add', name: '@test/helper', range: '^1.0.0', previous: undefined },
      { action: 'remove', name: '@test/old', previous: '^1.0.0' },
      { action: 'update', name: '@test/a', range: '^2.0.0', previous: '^1.2.0' },
    ])
    const packageJson = JSON.parse(first.plan.edits[1].after)
    expect(packageJson.dependencies).toEqual({
      '@test/a': '^2.0.0',
      '@test/helper': '^1.0.0',
      react: '^19.0.0',
    })
    expect(first.plan.edits[1].after.endsWith('}\n')).toBe(true)
  })

  it("gives step 2 the app as step 1 leaves it, and keeps each step's own before and after", () => {
    const [first, second] = plan(TEST_STEPS)
    expect(second.from).toEqual({ package: '@test/a', version: '2.0.0' })
    // Step 2 read newName, which only step 1's edit has written.
    expect(second.plan.edits[0]).toEqual({
      path: 'src/main.ts',
      before: first.plan.edits[0].after,
      after: "import { latestName } from '@test/a'\nlatestName()\nlegacy()\n",
    })
    expect(second.plan.edits[1].before).toBe(first.plan.edits[1].after)
    // And its listing holds what step 1 left: package.json and src/main.ts, not yet generated.ts.
    expect(second.plan.creates).toEqual([{ path: 'src/generated.ts', content: '// 2 files\n' }])
    expect(second.reports).toEqual([
      { path: 'src/main.ts', code: 'T-BUILD', message: 'check the build' },
    ])
    expect(second.dependencies).toEqual([
      { action: 'update', name: '@test/a', range: '^3.0.0', previous: '^2.0.0' },
    ])
  })

  it('lists a file an earlier step created, and edits one it created', () => {
    const create = stepWith([{ kind: 'create', path: 'src/new.ts', content: 'a' }])
    const edit: MigrationStep = {
      ...STEP_THREE,
      plan: (app) => [
        { kind: 'edit', path: 'src/new.ts', after: `${app.readFile('src/new.ts')}b` },
        { kind: 'report', path: app.listFiles().at(-1)!, code: 'T', message: 'last file' },
      ],
    }
    const [, second] = plan([create, edit])
    expect(second.plan.edits[0]).toEqual({ path: 'src/new.ts', before: 'a', after: 'ab' })
    expect(second.reports[0].path).toBe('src/new.ts')
  })

  it('keeps the first text of a file a step edits twice, and drops an edit that changes nothing', () => {
    const twice = stepWith([
      { kind: 'edit', path: 'src/main.ts', after: 'one' },
      { kind: 'edit', path: 'src/main.ts', after: 'two' },
      { kind: 'edit', path: 'readme.md', after: 'same' },
    ])
    const [only] = plan([twice], { ...TEST_APP_FILES, 'readme.md': 'same' })
    expect(only.plan.edits.map(({ path, before, after }) => [path, before, after])).toEqual([
      ['src/main.ts', TEST_APP_FILES['src/main.ts'], 'two'],
      ['package.json', TEST_APP_FILES['package.json'], expect.any(String)],
    ])
  })

  it('moves the dependency to the section the former package was in, and swaps a package', () => {
    const swap: MigrationStep = {
      ...STEP_TWO,
      from: { package: '@test/former', range: '1.x' },
      to: { package: '@test/a', version: '2.0.0' },
      plan: () => [],
    }
    const files = {
      'package.json': JSON.stringify({ devDependencies: { '@test/former': '^1.0.0' } }),
    }
    const [only] = planChain([swap], createDisk(files), NPM, {
      package: '@test/former',
      version: '1.0.0',
    })
    expect(JSON.parse(only.plan.edits[0].after)).toEqual({
      devDependencies: { '@test/a': '^2.0.0' },
    })
    expect(only.dependencies.map(({ action, name }) => `${action} ${name}`)).toEqual([
      'add @test/a',
      'remove @test/former',
    ])
  })

  it('refuses a step that edits a missing file, creates an existing one, or edits package.json', () => {
    const run = (change: Change) => () => plan([stepWith([change])])
    expect(run({ kind: 'edit', path: 'src/none.ts', after: '' })).toThrow(
      new StepError(STEP_TWO, 'edits src/none.ts, which does not exist.')
    )
    expect(run({ kind: 'create', path: 'src/main.ts', content: '' })).toThrow(
      'The step test-a-2.0.0 creates src/main.ts, which exists.'
    )
    expect(run({ kind: 'edit', path: 'package.json', after: '{}' })).toThrow(
      'edits package.json: it changes dependencies with dependency changes.'
    )
    expect(new StepError(STEP_TWO, 'x').name).toBe('StepError')
  })

  it('plans nothing for no steps', () => {
    expect(plan([])).toEqual([])
  })
})

describe('editDependencies', () => {
  const text = '{\n    "name": "x",\n    "dependencies": {\n        "b": "1.0.0"\n    }\n}'
  const dependency = (change: {
    name?: string
    range?: string
    action?: 'add' | 'update'
    section?: 'dependencies' | 'devDependencies'
  }): Extract<Change, { kind: 'dependency' }> => ({
    kind: 'dependency',
    action: 'add',
    name: 'a',
    range: '^1.0.0',
    ...change,
  })

  it('sets, adds and removes, keeping the file indent and the end of file', () => {
    const { text: out, applied } = editDependencies(text, [
      dependency({ name: 'a' }),
      dependency({ name: 'c', section: 'devDependencies' }),
      dependency({ name: 'b', range: '2.0.0', action: 'update' }),
    ])
    expect(out).toBe(
      '{\n    "name": "x",\n    "dependencies": {\n        "a": "^1.0.0",\n        "b": "2.0.0"\n    },\n    "devDependencies": {\n        "c": "^1.0.0"\n    }\n}'
    )
    expect(applied.map(({ action, name }) => `${action} ${name}`)).toEqual([
      'add a',
      'add c',
      'update b',
    ])
  })

  it('removes a package from both sections, and does nothing for one that is not there', () => {
    const both = JSON.stringify({ dependencies: { a: '1' }, devDependencies: { a: '2' } })
    const { text: out, applied } = editDependencies(both, [
      { kind: 'dependency', action: 'remove', name: 'a' },
      { kind: 'dependency', action: 'remove', name: 'missing' },
    ])
    expect(JSON.parse(out)).toEqual({ dependencies: {}, devDependencies: {} })
    expect(applied).toEqual([{ action: 'remove', name: 'a', previous: '1' }])
  })

  it('leaves the text alone when nothing changes: the same range, or an update of a package not there', () => {
    const changes = [
      dependency({ name: 'b', range: '1.0.0' }),
      dependency({ name: 'z', action: 'update' }),
    ]
    expect(editDependencies(text, changes)).toEqual({ text, applied: [] })
  })

  it('keeps Windows line breaks', () => {
    const crlf = '{\r\n  "dependencies": {}\r\n}\r\n'
    expect(editDependencies(crlf, [dependency({})]).text).toBe(
      '{\r\n  "dependencies": {\r\n    "a": "^1.0.0"\r\n  }\r\n}\r\n'
    )
  })

  it('writes a minified file with two spaces, and no end of line it did not have', () => {
    expect(editDependencies('{}', [dependency({})]).text).toBe(
      '{\n  "dependencies": {\n    "a": "^1.0.0"\n  }\n}'
    )
  })
})
