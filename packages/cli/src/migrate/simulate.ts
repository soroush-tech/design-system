// Plans a chain of steps without writing: each step is given the app as the steps before it will
// leave it, which is kept in memory over the files on disk.
import type { PackageJson } from '../detect/detect'
import type { Plan, PackageManager } from '../plan/planInit'
import type { AppVersion, Change, DependencySection, MigrationStep } from './step'
import { compareText } from '../compareText'
import { toDeclaredRange } from './versions'

/** A step asked for something it may not. */
export class StepError extends Error {
  readonly stepId: string

  constructor(step: MigrationStep, problem: string) {
    super(`The step ${step.id} ${problem}`)
    this.name = 'StepError'
    this.stepId = step.id
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
  /** The stable code of its kind. */
  code: string
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

type PackageSections = Record<DependencySection, Record<string, string> | undefined>

/** Applies one dependency change to the parsed package.json; what it changed, or `undefined`. */
function applyDependency(
  json: PackageSections,
  change: DependencyChange
): AppliedDependency | undefined {
  const { name } = change
  const holders = SECTIONS.filter((section) => json[section]?.[name] !== undefined)
  if (change.action === 'remove') {
    if (holders.length === 0) return undefined
    const previous = json[holders[0]]![name]
    for (const section of holders) delete json[section]![name]
    return { action: 'remove', name, previous }
  }
  const section =
    holders[0] ?? (change.action === 'add' ? (change.section ?? 'dependencies') : undefined)
  if (section === undefined) return undefined
  const previous = json[section]?.[name]
  if (previous === change.range) return undefined
  json[section] = sortKeys({ ...json[section], [name]: change.range })
  const action = previous === undefined ? 'add' : 'update'
  return { action, name, range: change.range, previous }
}

/** Applies the dependency changes to package.json's text, keeping its indent and line breaks. */
export function editDependencies(
  text: string,
  changes: readonly DependencyChange[]
): { text: string; applied: AppliedDependency[] } {
  const json = JSON.parse(text) as PackageSections
  const applied = changes.flatMap((change) => applyDependency(json, change) ?? [])
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

/** The app as the steps leave it: the files on disk with the changes made so far laid over them. */
interface Memory {
  read: (path: string) => string | undefined
  /** Notes the text a file had before the step touches it. */
  touch: (path: string) => void
  write: (path: string, text: string) => void
}

/** Lays one `create` or `edit` of `step` over the app, or throws when it asks for what it may not. */
function applyFile(
  step: MigrationStep,
  change: Extract<Change, { kind: 'create' | 'edit' }>,
  memory: Memory
): void {
  if (change.kind === 'create') {
    if (memory.read(change.path) !== undefined) {
      throw new StepError(step, `creates ${change.path}, which exists.`)
    }
    memory.touch(change.path)
    memory.write(change.path, change.content)
    return
  }
  if (change.path === 'package.json') {
    throw new StepError(
      step,
      'edits package.json: it changes dependencies with dependency changes.'
    )
  }
  if (memory.read(change.path) === undefined) {
    throw new StepError(step, `edits ${change.path}, which does not exist.`)
  }
  memory.touch(change.path)
  memory.write(change.path, change.after)
}

/** The files a step created and edited, from the text each had before it. */
function planFiles(touched: Map<string, string | undefined>, memory: Memory): Plan {
  const plan: Plan = { creates: [], edits: [], skips: [], manual: [], install: undefined }
  for (const [path, before] of touched) {
    const after = memory.read(path)!
    if (before === undefined) plan.creates.push({ path, content: after })
    else if (after !== before) plan.edits.push({ path, before, after })
  }
  return plan
}

/** The dependency changes that move the app to the step's package and version. */
function moveDependencies(step: MigrationStep, packageJson: PackageJson): DependencyChange[] {
  const moves: DependencyChange[] = [
    {
      kind: 'dependency',
      action: 'add',
      name: step.to.package,
      range: toDeclaredRange(step.to.version),
      section: findSection(packageJson, step.from.package),
    },
  ]
  if (step.from.package !== step.to.package) {
    moves.push({ kind: 'dependency', action: 'remove', name: step.from.package })
  }
  return moves
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
    const memory: Memory = {
      read,
      touch: (path) => {
        if (!touched.has(path)) touched.set(path, read(path))
      },
      write: (path, text) => overlay.set(path, text),
    }
    const packageJson = JSON.parse(read('package.json')!) as PackageJson
    const changes = step.plan({
      packageJson,
      packageManager,
      readFile: read,
      listFiles: () => [...new Set([...diskFiles, ...overlay.keys()])].sort(compareText),
    })
    const dependencyChanges: DependencyChange[] = []
    const reports: Report[] = []
    for (const change of changes) {
      if (change.kind === 'dependency') {
        dependencyChanges.push(change)
      } else if (change.kind === 'report') {
        reports.push({
          path: change.path,
          line: change.line,
          code: change.code,
          message: change.message,
        })
      } else {
        applyFile(step, change, memory)
      }
    }
    dependencyChanges.push(...moveDependencies(step, packageJson))
    memory.touch('package.json')
    const edited = editDependencies(read('package.json')!, dependencyChanges)
    overlay.set('package.json', edited.text)

    const plan = planFiles(touched, memory)
    plans.push({ step, from: current, plan, dependencies: edited.applied, reports })
    current = { package: step.to.package, version: step.to.version }
  }
  return plans
}
