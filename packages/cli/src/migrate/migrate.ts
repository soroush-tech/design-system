import { realpathSync } from 'node:fs'
import { join } from 'node:path'
import { applyPlans, type ApplyError } from '../apply/applyPlan'
import { nodeFileSystem, type FileSystem } from '../apply/fileSystem'
import {
  detectPackageManager,
  getGitState,
  listAppFiles,
  readPackageJson,
  readText,
} from '../detect/detect'
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
  /** The version to stop at; the latest step's when not given. */
  to: string | undefined
}

/** The packages the steps start from or end on, the newest first. */
function listPackages(steps: readonly MigrationStep[]): string[] {
  const names = orderSteps(steps)
    .reverse()
    .flatMap((step) => [step.to.package, step.from.package])
  return [...new Set(names)]
}

function findGitRefusal(root: string, io: Io): string | undefined {
  const state = getGitState(root, io)
  if (state === 'not-a-repository') {
    return 'This folder is not in a git repository, so migrate could not show you its changes afterwards. Run git init and commit first.'
  }
  if (state === 'dirty') {
    return "This folder has uncommitted changes. Commit or stash them first, so migrate's changes stand on their own."
  }
  return undefined
}

/** Plans the chain on the app in `root`: the plans, or what stopped it, as a message. */
function planOnDisk(
  chain: readonly MigrationStep[],
  root: string,
  packageManager: PackageManager,
  detected: AppVersion
): StepPlan[] | string {
  const disk = {
    readFile: (path: string) => readText(join(root, path)),
    listFiles: () => listAppFiles(root),
  }
  try {
    return planChain(chain, disk, packageManager, detected)
  } catch (error) {
    if (!(error instanceof StepError)) throw error
    return `migrate stopped, and changed nothing: ${error.message}\n`
  }
}

/** Writes every plan to the app; `undefined` when it went through, else why it stopped. */
function applyOnDisk(
  plans: readonly StepPlan[],
  root: string,
  fileSystem: FileSystem
): string | undefined {
  try {
    applyPlans(
      plans.map(({ plan }) => plan),
      root,
      fileSystem,
      'migrate'
    )
    return undefined
  } catch (error) {
    const { message, isUndone } = error as ApplyError
    const outcome = isUndone
      ? 'Every change it made was taken back.'
      : 'It could not take back every change: check git status.'
    return `migrate stopped: ${message}. ${outcome}\n`
  }
}

/**
 * Moves the app in `io.cwd` forward: finds the version it is on, builds the chain of `steps` to the
 * target, plans every step on the app as the steps before it leave it, shows the plan, and applies
 * it only after a yes - step by step, then one install. Returns the exit code.
 */
export async function runMigrate(
  options: MigrateOptions,
  io: Io,
  steps: readonly MigrationStep[] = STEPS,
  fileSystem: FileSystem = nodeFileSystem
): Promise<number> {
  const root = realpathSync(io.cwd)
  const packageJson = readPackageJson(root)
  if (!packageJson) {
    io.write("There is no package.json in this folder. Run migrate in your app's folder.\n")
    return 1
  }
  if (steps.length === 0) {
    io.write('This release of migrate has no steps yet, so it changes nothing.\n')
    return 0
  }
  const detected = detectAppVersion(root, packageJson, listPackages(steps))
  if (typeof detected === 'string') {
    io.write(`${detected}\n`)
    return 1
  }
  const result = buildChain(steps, detected, options.to)
  if ('message' in result) {
    io.write(`${result.message}\n`)
    return result.code
  }
  const isPreviewOnly = options.isDryRun || (!io.isInteractive && !options.isConfirmed)
  const gitRefusal = isPreviewOnly ? undefined : findGitRefusal(root, io)
  if (gitRefusal) {
    io.write(`${gitRefusal}\n`)
    return 1
  }

  const packageManager = detectPackageManager(root, packageJson)
  const plans = planOnDisk(result.chain, root, packageManager, detected)
  if (typeof plans === 'string') {
    io.write(plans)
    return 1
  }
  const last = result.chain.at(-1)!.to
  const count = plans.length === 1 ? '1 step' : `${plans.length} steps`
  const note = detected.note ? `${detected.note}\n` : ''
  io.write(
    `${note}migrate will move ${packageJson.name ?? 'this app'} from ${detected.package} ${detected.version} to ${last.package} ${last.version} in ${count}:\n\n${formatStepPlans(plans)}\n`
  )
  if (!(await isApproved(options, isPreviewOnly, io))) return 0

  const stopped = applyOnDisk(plans, root, fileSystem)
  if (stopped) {
    io.write(stopped)
    return 1
  }
  const { command, args, env } = createInstallAllCommand(packageManager)
  io.write(`\nInstalling with ${command}:\n`)
  if (io.run(command, args, { cwd: root, env, showOutput: true }).status !== 0) {
    const commandLine = [command, ...args].join(' ')
    io.write(`\nThe install failed. The files are written; install yourself:\n  ${commandLine}\n`)
    return 1
  }
  io.write(`\nDone: ${packageJson.name ?? 'the app'} is on ${last.package} ${last.version}.\n`)
  const checklist = formatChecklist(plans)
  if (checklist) io.write(`\n${checklist}`)
  return 0
}
