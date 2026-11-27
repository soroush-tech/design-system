// Plans a chain of steps without writing: each step is given the app as the steps before it will
// leave it, which is kept in memory over the files on disk.
import type { PackageJson } from '../detect/detect'
import type { Plan, PackageManager } from '../plan/planInit'
import type { AppVersion, Change, DependencySection, MigrationStep } from './step'
import { toDeclaredRange } from './versions'

/** A step asked for something it may not. */
export class StepError extends Error {
  constructor(step: MigrationStep, problem: string) {
    super(`The step ${step.id} ${problem}`)
    this.name = 'StepError'
  }
}

/** A dependency change that changes package.json, as it will be made. */
export interface AppliedDependency {
  action: 'add' | 'update' | 'remove'
  name: string
  /** The range it is set to; none for a removal. */
  range?: string
  /** The range it had; none for an addition. */
  previous?: string
}

/** Something only a person can decide. */
export interface Report {
  path: string
  line?: number
  message: string
}

/** What one step does to the app. */
export interface StepPlan {
  step: MigrationStep
  /** The app's package and version before the step. */
  from: AppVersion
  /** The files the step creates and edits - package.json among them - as init's plan has them. */
  plan: Plan
  dependencies: AppliedDependency[]
  reports: Report[]
}

/** The app on disk: what a plan reads, and never writes. */
export interface AppFiles {
  readFile: (path: string) => string | undefined
  listFiles: () => string[]
}

const SECTIONS: DependencySection[] = ['dependencies', 'devDependencies']

type DependencyChange = Extract<Change, { kind: 'dependency' }>

const sortKeys = (record: Record<string, string>) =>
  Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)))

/** Applies the dependency changes to package.json's text, keeping its indent and line breaks. */
export function editDependencies(
  text: string,
  changes: readonly DependencyChange[]
): { text: string; applied: AppliedDependency[] } {
  const json = JSON.parse(text) as Record<DependencySection, Record<string, string> | undefined>
  const applied: AppliedDependency[] = []
  for (const change of changes) {
    const { name } = change
    const holders = SECTIONS.filter((section) => json[section]?.[name] !== undefined)
    if (change.action === 'remove') {
      if (holders.length === 0) continue
      applied.push({ action: 'remove', name, previous: json[holders[0]]![name] })
      for (const section of holders) delete json[section]![name]
      continue
    }
    const section =
      holders[0] ?? (change.action === 'add' ? (change.section ?? 'dependencies') : undefined)
    if (section === undefined) continue
    const previous = json[section]?.[name]
    if (previous === change.range) continue
    json[section] = sortKeys({ ...json[section], [name]: change.range })
    const action = previous === undefined ? 'add' : 'update'
    applied.push({ action, name, range: change.range, previous })
  }
  if (applied.length === 0) return { text, applied }
  const indent = /^([ \t]+)"/m.exec(text)?.[1] ?? '  '
  let out = JSON.stringify(json, null, indent) + (text.endsWith('\n') ? '\n' : '')
  if (text.includes('\r\n')) out = out.replaceAll('\n', '\r\n')
  return { text: out, applied }
}

/** The section the app lists `name` in: devDependencies only when it is not in dependencies. */
function findSection(packageJson: PackageJson, name: string): DependencySection {
  const isDevOnly =
    packageJson.devDependencies?.[name] !== undefined &&
    packageJson.dependencies?.[name] === undefined
  return isDevOnly ? 'devDependencies' : 'dependencies'
}

/**
 * Plans each step of `chain` on the app as the steps before it leave it: the files and
 * package.json are kept in memory over `disk`, and nothing is written. After a step's own changes
 * the app is moved to the step's `to`: its package takes the step's version in the section the
 * former package was in, and the former package goes.
 */
export function planChain(
  chain: readonly MigrationStep[],
  disk: AppFiles,
  packageManager: PackageManager,
  start: AppVersion
): StepPlan[] {
  const overlay = new Map<string, string>()
  const read = (path: string) => overlay.get(path) ?? disk.readFile(path)
  const diskFiles = disk.listFiles()
  const plans: StepPlan[] = []
  let current: AppVersion = start
  for (const step of chain) {
    // path -> the text it had before this step, or `undefined` for a file the step creates.
    const touched = new Map<string, string | undefined>()
    const touch = (path: string) => {
      if (!touched.has(path)) touched.set(path, read(path))
    }
    const packageJson = JSON.parse(read('package.json')!) as PackageJson
    const changes = step.plan({
      packageJson,
      packageManager,
      readFile: read,
      listFiles: () => [...new Set([...diskFiles, ...overlay.keys()])].sort(),
    })
    const dependencyChanges: DependencyChange[] = []
    const reports: Report[] = []
    for (const change of changes) {
      if (change.kind === 'dependency') {
        dependencyChanges.push(change)
      } else if (change.kind === 'report') {
        reports.push({ path: change.path, line: change.line, message: change.message })
      } else if (change.kind === 'create') {
        if (read(change.path) !== undefined)
          throw new StepError(step, `creates ${change.path}, which exists.`)
        touch(change.path)
        overlay.set(change.path, change.content)
      } else {
        if (change.path === 'package.json') {
          throw new StepError(
            step,
            'edits package.json: it changes dependencies with dependency changes.'
          )
        }
        if (read(change.path) === undefined)
          throw new StepError(step, `edits ${change.path}, which does not exist.`)
        touch(change.path)
        overlay.set(change.path, change.after)
      }
    }
    dependencyChanges.push({
      kind: 'dependency',
      action: 'add',
      name: step.to.package,
      range: toDeclaredRange(step.to.version),
      section: findSection(packageJson, step.from.package),
    })
    if (step.from.package !== step.to.package) {
      dependencyChanges.push({ kind: 'dependency', action: 'remove', name: step.from.package })
    }
    touch('package.json')
    const edited = editDependencies(read('package.json')!, dependencyChanges)
    overlay.set('package.json', edited.text)

    const plan: Plan = { creates: [], edits: [], skips: [], manual: [], install: undefined }
    for (const [path, before] of touched) {
      const after = overlay.get(path)!
      if (before === undefined) plan.creates.push({ path, content: after })
      else if (after !== before) plan.edits.push({ path, before, after })
    }
    plans.push({ step, from: current, plan, dependencies: edited.applied, reports })
    current = { package: step.to.package, version: step.to.version }
  }
  return plans
}
