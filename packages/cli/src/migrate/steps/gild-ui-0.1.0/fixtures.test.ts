// The step over each fixture app: `fixtures/<name>/before` is an app on @soroush.tech/design-system
// 2.2.0, `after` is what the step must make of it, and `reports.json` is what it must leave to the
// person (path, line and the inventory item), exactly. `UPDATE_FIXTURES=1 vitest run` writes the
// `after` and `reports.json` of every fixture from the step's output, to be read in the diff.
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, posix } from 'node:path'
import { describe, expect, it } from 'vitest'
import { planChain } from '../../simulate'
import { runMigrate } from '../../migrate'
import { createTestApp, createTestIo } from '../../../testApp'
import inventory from './inventory/inventory.json'
import { step } from './index'

const ROOT = join(import.meta.dirname, 'fixtures')
const NAMES = ['docs-app', 'init-templates', 'synthetic']
const PM = { name: 'pnpm', isYarnBerry: false } as const
const START = { package: '@soroush.tech/design-system', version: '2.2.0' }

type Tree = Record<string, string>

function readTree(folder: string, prefix = ''): Tree {
  const tree: Tree = {}
  for (const entry of readdirSync(join(folder, prefix), { withFileTypes: true })) {
    const path = posix.join(prefix, entry.name)
    if (entry.isDirectory()) Object.assign(tree, readTree(folder, path))
    else tree[path] = readFileSync(join(folder, path), 'utf8')
  }
  return tree
}

function writeTree(folder: string, tree: Tree): void {
  rmSync(folder, { recursive: true, force: true })
  for (const [path, text] of Object.entries(tree)) {
    mkdirSync(dirname(join(folder, path)), { recursive: true })
    writeFileSync(join(folder, path), text)
  }
}

interface Outcome {
  tree: Tree
  reports: { path: string; line: number | undefined; id: string; message: string }[]
}

/** The step planned by the runner over `before`, as the files it leaves and the reports. */
function runOver(before: Tree): Outcome {
  const disk = {
    readFile: (path: string) => before[path],
    listFiles: () => Object.keys(before).sort(),
  }
  const [result] = planChain([step], disk, PM, START)
  const tree = { ...before }
  for (const edit of result.plan.edits) tree[edit.path] = edit.after
  for (const file of result.plan.creates) tree[file.path] = file.content
  const reports = result.reports.map(({ path, line, message }) => ({
    path,
    line,
    id: /^\[([A-Z0-9-]+)\]/.exec(message)?.[1] ?? 'CHECK',
    message,
  }))
  return { tree, reports }
}

const summary = ({ reports }: Outcome) => reports.map(({ path, line, id }) => ({ path, line, id }))

describe.each(NAMES)('the step over the fixture %s', (name) => {
  const folder = join(ROOT, name)
  const before = readTree(join(folder, 'before'))
  const outcome = runOver(before)

  if (process.env.UPDATE_FIXTURES) {
    writeTree(join(folder, 'after'), outcome.tree)
    writeFileSync(join(folder, 'reports.json'), `${JSON.stringify(summary(outcome), null, 2)}\n`)
  }

  it('makes exactly the files of after', () => {
    expect(Object.keys(outcome.tree).sort()).toEqual(
      Object.keys(readTree(join(folder, 'after'))).sort()
    )
    expect(outcome.tree).toEqual(readTree(join(folder, 'after')))
  })

  it('reports exactly the places of reports.json, in the inventory words', () => {
    expect(summary(outcome)).toEqual(JSON.parse(readFileSync(join(folder, 'reports.json'), 'utf8')))
    const items = new Map(
      (inventory as { id: string; how: string }[]).map((item) => [item.id, item.how])
    )
    for (const { id, message } of outcome.reports) {
      if (items.has(id)) expect(message).toContain(items.get(id))
    }
  })

  it('has nothing left to edit in the files it made', () => {
    const [result] = planChain(
      [step],
      { readFile: (path) => outcome.tree[path], listFiles: () => Object.keys(outcome.tree).sort() },
      PM,
      START
    )
    expect(result.plan.edits).toEqual([])
    expect(result.plan.creates).toEqual([])
  })

  it('moves a copy through the runner, and a second run changes nothing', async () => {
    const root = createTestApp(before)
    const first = createTestIo(root)
    expect(
      await runMigrate({ isConfirmed: true, isDryRun: false, to: undefined }, first.io, [step])
    ).toBe(2)
    expect(readTree(root, '')).toMatchObject(
      Object.fromEntries(Object.entries(outcome.tree).filter(([path]) => path !== 'package.json'))
    )
    const written = readTree(root)
    const mtimes = Object.keys(written).map((path) => statSync(join(root, path)).mtimeMs)
    const second = createTestIo(root)
    expect(
      await runMigrate({ isConfirmed: true, isDryRun: false, to: undefined }, second.io, [step])
    ).toBe(3)
    expect(second.getOutput()).toBe('Already on @gild-ui/react 0.1.0: migrate has nothing to do.\n')
    expect(second.commands).toEqual([])
    expect(readTree(root)).toEqual(written)
    expect(Object.keys(written).map((path) => statSync(join(root, path)).mtimeMs)).toEqual(mtimes)
  })
})
