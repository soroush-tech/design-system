import { lstatSync, mkdirSync, readdirSync, realpathSync } from 'node:fs'
import { join } from 'node:path'
import { applyPlan } from '../apply/applyPlan'
import { nodeFileSystem, type FileSystem } from '../apply/fileSystem'
import { AGENT_STEPS, FONTS_STEP } from '../closing'
import type { PackageJson } from '../detect/detect'
import { askScheme } from '../init'
import type { Io } from '../io'
import { formatPlan } from '../plan/formatPlan'
import type { PackageManager, Plan } from '../plan/planInit'
import type { Scheme } from '../templates/templates'
import { createAppInstallCommand, formatRunScript, readPackageManager } from './packageManager'
import { STARTERS, type Starter } from './starters'

export interface CreateOptions {
  /** The app's folder: asked for, or `my-app`, when missing. */
  name: string | undefined
  /** What the app's pages call it: asked for, or the name, when missing. */
  title: string | undefined
  /** The starter, by its name in `STARTERS`: the first one when missing. */
  framework: string | undefined
  /** TypeScript or JavaScript: asked for, or TypeScript, when missing. */
  isTypeScript: boolean | undefined
  scheme: Scheme | undefined
  /** Adds the pages that read sample data: asked for, or not, when missing. */
  hasSampleData: boolean | undefined
  /** Creates without asking. */
  isConfirmed: boolean
  /** Prints the plan and exits. */
  isDryRun: boolean
  /** Runs `git init` in the new folder, unless it is inside a repository already. */
  isGit: boolean
}

export interface CreateDependencies {
  starters?: Readonly<Record<string, Starter>>
  fileSystem?: FileSystem
  /** Who ran `create`, which says the package manager to install with. */
  userAgent?: string
}

const DEFAULT_NAME = 'my-app'
// A folder name that is safe in a path and on a command line, and that npm's rules turn into a
// package name.
const APP_NAME = /^[A-Za-z0-9][A-Za-z0-9._~-]*$/
const MAX_NAME_LENGTH = 214
// What a title cannot hold, besides a control character: it is written into code and HTML as it is.
const TITLE_REFUSED = /[`${}<>\\]/

/** Whether `title` holds a character create cannot write into code and HTML as it is. */
const isRefusedTitle = (title: string) =>
  TITLE_REFUSED.test(title) || [...title].some((character) => character < ' ')

/**
 * The package name of the app in the folder `name`: lowercase, as npm takes it, with a `-` where a
 * capital started a word (`testApp` -> `test-app`).
 */
export function toPackageName(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/** Why `name` cannot name a new app, or `undefined` when it can. */
function findNameRefusal(name: string): string | undefined {
  if (APP_NAME.test(name) && toPackageName(name).length <= MAX_NAME_LENGTH) return undefined
  return `${name} is not a name create can use: it names the folder, so it takes letters, digits, and . _ ~ -, and starts with a letter or a digit.`
}

/**
 * The state of the folder the app goes in: `missing` or `empty`, the two create writes in, or why
 * it refuses it. It never writes in a folder that holds anything.
 */
function getFolderState(target: string, name: string): 'missing' | 'empty' | { refusal: string } {
  let stats
  try {
    stats = lstatSync(target)
  } catch {
    return 'missing'
  }
  if (!stats.isDirectory()) return { refusal: `${name} exists, and is not a folder.` }
  if (readdirSync(target).length > 0) {
    return { refusal: `The folder ${name} is not empty. create writes only in a new or empty one.` }
  }
  return 'empty'
}

/**
 * Takes the new app away after a failure: the folder create made, or what it wrote in the empty
 * one it was given. Returns whether that worked.
 */
function removeApp(target: string, wasMissing: boolean, fileSystem: FileSystem): boolean {
  try {
    if (wasMissing) {
      fileSystem.removeTree(target)
    } else {
      for (const entry of readdirSync(target)) fileSystem.removeTree(join(target, entry))
    }
    return true
  } catch {
    return false
  }
}

/** Whether `folder` is inside a git work tree. */
function isInsideRepository(folder: string, io: Io): boolean {
  const { status, stdout } = io.run('git', ['rev-parse', '--is-inside-work-tree'], { cwd: folder })
  return status === 0 && stdout.trim() === 'true'
}

async function askLanguage(io: Io): Promise<boolean> {
  const answer = await io.ask('TypeScript or JavaScript? (TypeScript) ')
  return !/^j(s|avascript)?$/i.test(answer.trim())
}

async function askTitle(io: Io, name: string): Promise<string> {
  const answer = (await io.ask(`App title? (${name}) `)).trim()
  return answer || name
}

async function askName(io: Io): Promise<string> {
  const answer = (await io.ask(`App name? (${DEFAULT_NAME}) `)).trim()
  return answer || DEFAULT_NAME
}

async function askSampleData(io: Io): Promise<boolean> {
  const answer = await io.ask('Add sample data pages? (y/N) ')
  return /^y(es)?$/i.test(answer.trim())
}

/** Whether to create the app: never on a dry run or with no terminal, else on --yes or a yes. */
async function isApproved(options: CreateOptions, isPreviewOnly: boolean, io: Io) {
  if (options.isDryRun) {
    io.write('Dry run: nothing was written.\n')
    return false
  }
  if (isPreviewOnly) {
    io.write('Preview only: there is no terminal to answer in. Run again with --yes to create.\n')
    return false
  }
  if (options.isConfirmed) return true
  const answer = (await io.ask('Create it? (Y/n) ')).trim()
  const isYes = answer === '' || /^y(es)?$/i.test(answer)
  if (!isYes) io.write('Nothing was written.\n')
  return isYes
}

function formatClosing(name: string, plan: Plan, packageManager: PackageManager): string {
  const themes = plan.creates.find((file) => /\/themes\.[jt]s$/.test(file.path))
  const themesStep = themes ? `  - Make the themes your own in ${themes.path}.\n` : ''
  return `
Done: ${name} is ready. Start it with:
  cd ${name}
  ${formatRunScript(packageManager, 'dev')}

Next:
${themesStep}${FONTS_STEP}

${AGENT_STEPS}`
}

interface CreateRun {
  name: string
  target: string
  wasMissing: boolean
  plan: Plan
  packageManager: PackageManager
}

/** Writes the app, installs it, then starts its repository. Returns the exit code. */
function writeAndInstall(
  { name, target, wasMissing, plan, packageManager }: CreateRun,
  options: CreateOptions,
  io: Io,
  fileSystem: FileSystem
): number {
  const fail = (reason: string) => {
    const outcome = removeApp(target, wasMissing, fileSystem)
      ? `${name} was taken away.`
      : `It could not take ${name} away: remove that folder yourself.`
    io.write(`create stopped: ${reason}. ${outcome}\n`)
    return 1
  }
  try {
    if (wasMissing) mkdirSync(target)
    applyPlan(plan, target, fileSystem)
  } catch (error) {
    return fail((error as Error).message)
  }
  const { command, args, env } = plan.install!
  io.write(`\nInstalling with ${command}:\n`)
  if (io.run(command, args, { cwd: target, env, showOutput: true }).status !== 0) {
    return fail('the install failed')
  }
  if (options.isGit && !isInsideRepository(target, io)) {
    if (io.run('git', ['init'], { cwd: target }).status !== 0) {
      io.write('\ngit init failed, so the app has no repository. Run git init there yourself.\n')
    }
  }
  io.write(formatClosing(name, plan, packageManager))
  return 0
}

/**
 * Starts a new app on the design system, in a new or empty folder in `io.cwd`: asks what it is
 * not told, plans with the starter, shows the plan, and writes and installs only after a yes.
 * `designSystem` is the package it installs. Returns the exit code.
 */
export async function runCreate(
  options: CreateOptions,
  io: Io,
  designSystem: PackageJson,
  {
    starters = STARTERS,
    fileSystem = nodeFileSystem,
    userAgent = process.env.npm_config_user_agent,
  }: CreateDependencies = {}
): Promise<number> {
  const isPreviewOnly = options.isDryRun || (!io.isInteractive && !options.isConfirmed)
  const canAsk = !isPreviewOnly && !options.isConfirmed

  const framework = options.framework ?? Object.keys(starters)[0]
  const starter = framework && Object.hasOwn(starters, framework) ? starters[framework] : undefined
  if (!starter) {
    const names = Object.keys(starters).join(', ') || 'none yet'
    io.write(`create has no starter for ${framework ?? 'any framework'}. It has: ${names}.\n`)
    return 1
  }
  const name = options.name ?? (canAsk ? await askName(io) : DEFAULT_NAME)
  const nameRefusal = findNameRefusal(name)
  if (nameRefusal) {
    io.write(`${nameRefusal}\n`)
    return 1
  }
  const title = (options.title ?? (canAsk ? await askTitle(io, name) : name)).trim() || name
  if (isRefusedTitle(title)) {
    io.write(`${title} is not a title create can use: it cannot hold \` $ { } < > or \\.\n`)
    return 1
  }
  const packageName = toPackageName(name)
  const target = join(realpathSync(io.cwd), name)
  const folder = getFolderState(target, name)
  if (typeof folder === 'object') {
    io.write(`${folder.refusal}\n`)
    return 1
  }
  const isTypeScript = options.isTypeScript ?? (canAsk ? await askLanguage(io) : true)
  const scheme = options.scheme ?? (canAsk ? await askScheme(io) : 'light')
  const hasSampleData = options.hasSampleData ?? (canAsk ? await askSampleData(io) : false)

  const packageManager = readPackageManager(userAgent)
  const plan: Plan = {
    creates: starter.createFiles({
      name,
      packageName,
      title,
      isTypeScript,
      scheme,
      hasSampleData,
      version: designSystem.version!,
    }),
    edits: [],
    skips: [],
    manual: [],
    install: createAppInstallCommand(packageManager),
  }
  const language = isTypeScript ? 'TypeScript' : 'JavaScript'
  const packageNote = packageName === name ? '' : ` (package ${packageName})`
  io.write(
    `create will make ${name}${packageNote}, a ${starter.title} app in ${language}, in ./${name}:\n\n`
  )
  io.write(`${formatPlan(plan)}\n`)
  if (!(await isApproved(options, isPreviewOnly, io))) return 0
  return writeAndInstall(
    { name, target, wasMissing: folder === 'missing', plan, packageManager },
    options,
    io,
    fileSystem
  )
}
