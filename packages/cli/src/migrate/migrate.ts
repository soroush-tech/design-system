import { createHash } from 'node:crypto'
import { readFileSync, realpathSync } from 'node:fs'
import { join } from 'node:path'
import { applyPlans, type ApplyError } from '../apply/applyPlan'
import { nodeFileSystem, type FileSystem } from '../apply/fileSystem'
import { compareText } from '../compareText'
import { detectPackageManager, listAppFiles, readPackageJson, readText } from '../detect/detect'
import { isApproved } from '../init'
import type { Io } from '../io'
import { createInstallAllCommand, type PackageManager } from '../plan/planInit'
import { detectAppVersion } from './detectVersion'
import { buildChain, orderSteps } from './chain'
import { formatChecklist, formatStepPlans } from './formatMigration'
import { planChain, StepError, type StepPlan } from './simulate'
import type { AppVersion, MigrationStep } from './step'
import { STEPS } from './steps'

export interface MigrateOptions {
  /** Applies without asking. */
  isConfirmed: boolean
  /** Prints the plan and exits. */
  isDryRun: boolean
  /** Prints one JSON object on stdout and no other text there; never asks. */
  isJson?: boolean
  /** The version to stop at; the latest step's when not given. */
  to: string | undefined
}

type Version = { package: string; version: string }

/** What a run did, as `--json` prints it. */
export interface MigrationReport {
  /** The version the app was on, and the one the chain ends on: `null` when not known. */
  from: Version | null
  to: Version | null
  status: 'applied' | 'planned' | 'nothing' | 'rolledBack' | 'refused'
  steps: {
    id: string
    summary: string
    dependencies: {
      name: string
      from?: string
      to?: string
      action: 'add' | 'remove' | 'change'
    }[]
    files: { path: string; action: 'edit' | 'create' | 'delete' | 'rename'; to?: string }[]
    items: { file: string; line: number; column?: number; message: string; code: string }[]
  }[]
  /** The files of every step, by path from the app's folder, once each. */
  changedFiles: string[]
  /** Whether the install ran and succeeded. */
  installed: boolean
  /** Whether the app's lockfile differs after the run from before. */
  lockfileChanged: boolean
  /** Why it was refused or stopped: the step's id, or `null` when it is no step's. */
  error?: { step: string | null; message: string }
}

/** The packages the steps start from or end on, the newest first. */
function listPackages(steps: readonly MigrationStep[]): string[] {
  const names = orderSteps(steps)
    .reverse()
    .flatMap((step) => [step.to.package, step.from.package])
  return [...new Set(names)]
}

/** Plans the chain on the app in `root`: the plans, or the step error that stopped it. */
function planOnDisk(
  chain: readonly MigrationStep[],
  root: string,
  packageManager: PackageManager,
  detected: AppVersion
): StepPlan[] | StepError {
  const disk = {
    readFile: (path: string) => readText(join(root, path)),
    listFiles: () => listAppFiles(root),
  }
  try {
    return planChain(chain, disk, packageManager, detected)
  } catch (error) {
    if (!(error instanceof StepError)) throw error
    return error
  }
}

/** Writes every plan to the app; `undefined` when it went through, else why it stopped. */
function applyOnDisk(
  plans: readonly StepPlan[],
  root: string,
  fileSystem: FileSystem
): ApplyError | undefined {
  try {
    applyPlans(
      plans.map(({ plan }) => plan),
      root,
      fileSystem,
      'migrate'
    )
    return undefined
  } catch (error) {
    return error as ApplyError
  }
}

/** One step of the plan, as the report has it. */
function reportStep({ step, plan, dependencies, reports }: StepPlan): MigrationReport['steps'][0] {
  return {
    id: step.id,
    summary: step.summary,
    dependencies: dependencies.map(({ action, name, range, previous }) => ({
      name,
      from: previous,
      to: range,
      action: action === 'update' ? 'change' : action,
    })),
    files: [
      ...plan.creates.map(({ path }) => ({ path, action: 'create' as const })),
      ...plan.edits.map(({ path }) => ({ path, action: 'edit' as const })),
    ],
    items: reports.map(({ path, line = 1, code, message }) => ({
      file: path,
      line,
      message,
      code,
    })),
  }
}

const LOCKFILES = ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lock', 'bun.lockb']

/** What the app's lockfiles hold, as one text to compare: a hash of each that exists. */
function readLockfiles(root: string): string {
  return LOCKFILES.map((name) => {
    try {
      return createHash('sha1')
        .update(readFileSync(join(root, name)))
        .digest('hex')
    } catch {
      return ''
    }
  }).join()
}

/** The exit code of a run: see the command's help. */
function getExitCode({ status, error, steps }: MigrationReport): number {
  if (status === 'nothing') return 3
  if (status === 'planned') return 0
  if (status !== 'applied' || error) return 1
  return steps.some((step) => step.items.length > 0) ? 2 : 0
}

/**
 * Moves the app in `io.cwd` forward: finds the version it is on, builds the chain of `steps` to the
 * target, plans every step on the app as the steps before it leave it, shows the plan, and applies
 * it only after a yes - step by step, then one install. It runs no git. With `--json` it prints
 * the run as one JSON object and nothing else on stdout, and never asks. Returns the exit code.
 */
export async function runMigrate(
  options: MigrateOptions,
  io: Io,
  steps: readonly MigrationStep[] = STEPS,
  fileSystem: FileSystem = nodeFileSystem
): Promise<number> {
  // With --json what a person would read is not written: the one object is.
  const quiet: Io = options.isJson ? { ...io, write: () => {} } : io
  const report = await migrate(options, quiet, steps, fileSystem)
  if (options.isJson) io.write(`${JSON.stringify(report)}\n`)
  return getExitCode(report)
}

async function migrate(
  options: MigrateOptions,
  io: Io,
  steps: readonly MigrationStep[],
  fileSystem: FileSystem
): Promise<MigrationReport> {
  const report: MigrationReport = {
    from: null,
    to: null,
    status: 'refused',
    steps: [],
    changedFiles: [],
    installed: false,
    lockfileChanged: false,
  }
  const refuse = (message: string, step: string | null = null): MigrationReport => {
    io.write(`${message}\n`)
    return { ...report, error: { step, message } }
  }
  const root = realpathSync(io.cwd)
  const packageJson = readPackageJson(root)
  if (!packageJson) {
    return refuse("There is no package.json in this folder. Run migrate in your app's folder.")
  }
  if (steps.length === 0) {
    io.write('This release of migrate has no steps yet, so it changes nothing.\n')
    return { ...report, status: 'nothing' }
  }
  const detected = detectAppVersion(root, packageJson, listPackages(steps))
  if (typeof detected === 'string') return refuse(detected)
  report.from = { package: detected.package, version: detected.version }
  const goal = options.to ?? orderSteps(steps).at(-1)!.to.version
  report.to = steps.find((step) => step.to.version === goal)?.to ?? null
  const result = buildChain(steps, detected, options.to)
  if ('message' in result) {
    if (result.code !== 0) return refuse(result.message)
    io.write(`${result.message}\n`)
    return { ...report, status: 'nothing' }
  }
  const canAsk = io.isInteractive && !options.isJson
  const isPreviewOnly = options.isDryRun || (!canAsk && !options.isConfirmed)

  const packageManager = detectPackageManager(root, packageJson)
  const plans = planOnDisk(result.chain, root, packageManager, detected)
  if (plans instanceof StepError) {
    return refuse(`migrate stopped, and changed nothing: ${plans.message}`, plans.stepId)
  }
  const last = result.chain.at(-1)!.to
  const count = plans.length === 1 ? '1 step' : `${plans.length} steps`
  const note = detected.note ? `${detected.note}\n` : ''
  io.write(
    `${note}migrate will move ${packageJson.name ?? 'this app'} from ${detected.package} ${detected.version} to ${last.package} ${last.version} in ${count}:\n\n${formatStepPlans(plans)}\n`
  )
  const planned: MigrationReport = { ...report, status: 'planned', steps: plans.map(reportStep) }
  planned.changedFiles = [
    ...new Set(planned.steps.flatMap((step) => step.files.map(({ path }) => path))),
  ].sort(compareText)
  if (!(await isApproved(options, isPreviewOnly, io))) return planned

  const lockfileBefore = readLockfiles(root)
  const failure = applyOnDisk(plans, root, fileSystem)
  if (failure) {
    const outcome = failure.isUndone
      ? 'Every change it made was taken back.'
      : 'It could not take back every change.'
    const message = `${failure.message}. ${outcome}`
    io.write(`migrate stopped: ${message}\n`)
    const error = { step: plans[failure.planIndex].step.id, message }
    return failure.isUndone
      ? { ...report, status: 'rolledBack', error }
      : { ...planned, status: 'applied', error }
  }
  const { command, args, env } = createInstallAllCommand(packageManager)
  io.write(`\nInstalling with ${command}:\n`)
  const install = io.run(command, args, { cwd: root, env, showOutput: !options.isJson })
  const applied: MigrationReport = {
    ...planned,
    status: 'applied',
    installed: install.status === 0,
    lockfileChanged: readLockfiles(root) !== lockfileBefore,
  }
  if (!applied.installed) {
    const commandLine = [command, ...args].join(' ')
    io.write(`\nThe install failed. The files are written; install yourself:\n  ${commandLine}\n`)
    return { ...applied, error: { step: 'install', message: `The install failed: ${commandLine}` } }
  }
  io.write(`\nDone: ${packageJson.name ?? 'the app'} is on ${last.package} ${last.version}.\n`)
  const checklist = formatChecklist(plans)
  if (checklist) io.write(`\n${checklist}`)
  return applied
}
