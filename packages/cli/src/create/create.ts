import { lstatSync, mkdirSync, readdirSync, realpathSync } from 'node:fs'
import { join } from 'node:path'
import { applyPlan } from '../apply/applyPlan'
import { nodeFileSystem, type FileSystem } from '../apply/fileSystem'
import { AGENT_STEPS, FONTS_STEP } from '../closing'
import { APP_PACKAGE_VERSION } from '../designSystemPackage'
import { askScheme } from '../init'
import type { Io } from '../io'
import { formatPlan } from '../plan/formatPlan'
import type { PackageManager, PackageManagerName, Plan } from '../plan/planInit'
import type { Scheme } from '../templates/templates'
import {
  createAppInstallCommand,
  formatRunScript,
  PACKAGE_MANAGERS,
  readPackageManager,
} from './packageManager'
import {
  findLibraryConflict,
  LIBRARIES,
  LIBRARY_NAMES,
  type Library,
  type LibraryGroup,
} from './libraries'
import { RENDERINGS, STARTERS, type Rendering, type Starter } from './starters'
import { createWorkspaceFiles, LAYOUTS, toAppPackageName, type Layout } from './workspace'

export interface CreateOptions {
  /** The app's folder: asked for, or `my-app`, when missing. */
  name: string | undefined
  /** What the app's pages call it: asked for, or the name, when missing. */
  title: string | undefined
  /** The starter, by its name in `STARTERS`: the first one when missing. */
  framework: string | undefined
  /** TypeScript or JavaScript: asked for, or TypeScript, when missing. */
  isTypeScript: boolean | undefined
  /** The package manager to install with: asked for, or the one that ran create, when missing. */
  packageManager: PackageManagerName | undefined
  /** How the repository holds the app: asked for, or a workspace, when missing. */
  layout: Layout | undefined
  /** How the pages are rendered: asked for, or the first the framework renders, when missing. */
  rendering: Rendering | undefined
  /** The libraries to add: asked for, or none, when missing. */
  libraries: readonly Library[] | undefined
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

const YES_OR_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

async function askLanguage(io: Io): Promise<boolean> {
  const choices = [
    { value: 'ts', label: 'TypeScript (recommended)' },
    { value: 'js', label: 'JavaScript' },
  ]
  return (await io.select('Language', choices)) === 'ts'
}

/** Asks for the package manager, starting on the one that ran create. */
async function askPackageManager(io: Io, detected: PackageManagerName) {
  const choices = PACKAGE_MANAGERS.map((name) => ({
    value: name,
    label: name === detected ? `${name} (the one that ran create)` : name,
  }))
  const answer = await io.select('Package manager', choices, PACKAGE_MANAGERS.indexOf(detected))
  return answer as PackageManagerName
}

/**
 * The package manager to install with, or why it cannot be used: one other than the one that ran
 * create must answer `--version`, which also says whether a yarn is Berry.
 */
function resolvePackageManager(
  name: PackageManagerName,
  detected: PackageManager,
  io: Io
): PackageManager | { refusal: string } {
  if (name === detected.name) return detected
  const { status, stdout } = io.run(name, ['--version'], { cwd: io.cwd })
  if (status !== 0) {
    return { refusal: `${name} is not installed: install it, or pick another package manager.` }
  }
  return { name, isYarnBerry: name === 'yarn' && Number.parseInt(stdout, 10) >= 2 }
}

/** What the repository question says of each layout. */
const LAYOUT_LABELS: Readonly<Record<Layout, string>> = {
  workspace: 'Workspace (recommended): the app in apps/web, with room for more apps and services',
  standalone: 'Standalone: the app alone',
}

async function askLayout(io: Io): Promise<Layout> {
  const choices = LAYOUTS.map((value) => ({ value, label: LAYOUT_LABELS[value] }))
  return (await io.select('Repository', choices)) as Layout
}

async function askTitle(io: Io, name: string): Promise<string> {
  const answer = (await io.ask(`App title? (${name}) `)).trim()
  return answer || name
}

async function askName(io: Io): Promise<string> {
  const answer = (await io.ask(`App name? (${DEFAULT_NAME}) `)).trim()
  return answer || DEFAULT_NAME
}

/** What the rendering question says of each one. */
const RENDERING_LABELS: Readonly<Record<Rendering, string>> = {
  isomorphic: 'Isomorphic (recommended): HTML from the build, then no reload',
  ssr: 'SSR: HTML from a server, on each request, then no reload',
  spa: 'SPA: rendered in the browser',
  ssg: 'SSG: HTML only, no JavaScript',
}

async function askRendering(io: Io, renderings: readonly Rendering[]): Promise<Rendering> {
  const choices = renderings.map((value) => ({ value, label: RENDERING_LABELS[value] }))
  return (await io.select('Rendering', choices)) as Rendering
}

/** Asks for the framework, of the ones `names` lists. */
async function askFramework(
  io: Io,
  starters: Readonly<Record<string, Starter>>,
  names: readonly string[]
): Promise<string> {
  const choices = names.map((value) => ({ value, label: starters[value].label }))
  return io.select('Framework', choices)
}

/** The choices of one job's question: the libraries of `group`, or those of none. */
const getLibraryChoices = (group: LibraryGroup | undefined) =>
  LIBRARIES.filter((library) => library.group === group).map(({ name, label }) => ({
    value: name,
    label,
  }))

const NO_LIBRARY = { value: 'none', label: 'None' }

/**
 * Asks for the libraries by job: one that fetches data, one that holds state - each of them or
 * none - then the others, toggled. Returns them in the order create offers them.
 */
async function askLibraries(io: Io): Promise<Library[]> {
  const data = await io.select('Data fetching', [NO_LIBRARY, ...getLibraryChoices('data')])
  const state = await io.select('State management', [NO_LIBRARY, ...getLibraryChoices('state')])
  const more = await io.selectMany('More', getLibraryChoices(undefined))
  const picked = new Set([data, state, ...more])
  return LIBRARY_NAMES.filter((name) => picked.has(name))
}

async function askSampleData(io: Io): Promise<boolean> {
  return (await io.select('Add sample data pages?', YES_OR_NO, 1)) === 'yes'
}

/** Every choice the app is made from, asked or given. */
interface Choices {
  name: string
  packageName: string
  /** The app's folder, and whether create makes it. */
  target: string
  wasMissing: boolean
  title: string
  starter: Starter
  isTypeScript: boolean
  packageManager: PackageManager
  layout: Layout
  rendering: Rendering
  libraries: readonly Library[]
  scheme: Scheme
  hasSampleData: boolean
}

/** A question's label, as the summary says what was picked: with no "(recommended)". */
const toPicked = (label: string) => label.replace(' (recommended)', '')

/** The summary of every choice, one a line, which create shows before the files it writes. */
function formatChoices(choices: Choices): string {
  const libraries = LIBRARIES.filter(({ name }) => choices.libraries.includes(name))
  const rows: [string, string[]][] = [
    ['Title', [choices.title]],
    ['Framework', [toPicked(choices.starter.label)]],
    ['Language', [choices.isTypeScript ? 'TypeScript' : 'JavaScript']],
    ['Package manager', [choices.packageManager.name]],
    ['Repository', [toPicked(LAYOUT_LABELS[choices.layout])]],
    ['Rendering', [toPicked(RENDERING_LABELS[choices.rendering])]],
    ['Libraries', libraries.length ? libraries.map(({ label }) => label) : ['none']],
    ['Color scheme', [`${choices.scheme}, by default`]],
    [
      'Sample data pages',
      [choices.hasSampleData ? 'yes: /items and /items/<id>, from src/data/items' : 'no'],
    ],
  ]
  const width = Math.max(...rows.map(([key]) => key.length)) + 2
  return rows
    .flatMap(([key, values]) =>
      values.map((value, index) => `  ${(index === 0 ? key : '').padEnd(width)}${value}`)
    )
    .join('\n')
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
  const isYes = (await io.select('Create it?', YES_OR_NO)) === 'yes'
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

/** The answer given on the command line, else the person's when `isAsked`, else `fallback`. */
async function choose<T>(
  given: T | undefined,
  isAsked: boolean,
  ask: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (given !== undefined) return given
  return isAsked ? ask() : fallback
}

/** Refuses a --framework create has no starter for, or a create with no starter at all. */
function findStarterRefusal(
  starters: Readonly<Record<string, Starter>>,
  given: string | undefined
): string | undefined {
  const frameworks = Object.keys(starters)
  if (frameworks.length > 0 && (given === undefined || Object.hasOwn(starters, given))) {
    return undefined
  }
  const names = frameworks.join(', ') || 'none yet'
  return `create has no starter for ${given ?? 'any framework'}. It has: ${names}.`
}

/** The app's folder, new or empty, and its title: asked for, or given. */
async function readFolder(
  options: CreateOptions,
  io: Io,
  canAsk: boolean
): Promise<Pick<Choices, 'name' | 'target' | 'wasMissing' | 'title'> | { refusal: string }> {
  const name = await choose(options.name, canAsk, () => askName(io), DEFAULT_NAME)
  const nameRefusal = findNameRefusal(name)
  if (nameRefusal) return { refusal: nameRefusal }
  const target = join(realpathSync(io.cwd), name)
  const folder = getFolderState(target, name)
  if (typeof folder === 'object') return folder
  const title = (await choose(options.title, canAsk, () => askTitle(io, name), name)).trim() || name
  if (isRefusedTitle(title)) {
    return { refusal: `${title} is not a title create can use: it cannot hold \` $ { } < > or \\.` }
  }
  return { name, target, wasMissing: folder === 'missing', title }
}

/** Refuses a --render none of the starters in `pool` renders, naming the ones that do. */
function findRenderingRefusal(
  rendering: Rendering | undefined,
  offered: readonly Rendering[],
  pool: readonly string[],
  starters: Readonly<Record<string, Starter>>
): string | undefined {
  if (rendering === undefined || offered.includes(rendering)) return undefined
  const titles = pool.map((framework) => starters[framework].title).join(' or ')
  // The starters that do render it, which --framework would pick.
  const others = Object.keys(starters).filter((framework) =>
    starters[framework].renderings.includes(rendering)
  )
  const pointer = others.map((framework) => ` --framework ${framework} does.`).join('')
  return `${titles} does not render ${rendering}: it renders ${offered.join(' or ')}.${pointer}`
}

/** Refuses --with for an app that takes no library, or libraries that do not go together. */
function findLibraryRefusal(
  libraries: readonly Library[] | undefined,
  rendering: Rendering,
  starter: Starter
): string | undefined {
  if (!libraries?.length) return undefined
  // An SSG page has no JavaScript in the browser, where every library works.
  if (rendering === 'ssg') {
    return 'An SSG app has no JavaScript in the browser, so it takes no library: leave out --with.'
  }
  if (!starter.hasLibraries) return `${starter.title} takes no library yet: leave out --with.`
  return findLibraryConflict(libraries)
}

/** Every choice the app is made from: given, asked for when `canAsk`, or the default. */
async function readChoices(
  options: CreateOptions,
  io: Io,
  starters: Readonly<Record<string, Starter>>,
  userAgent: string | undefined,
  canAsk: boolean
): Promise<Choices | { refusal: string }> {
  const given = options.framework
  const starterRefusal = findStarterRefusal(starters, given)
  if (starterRefusal) return { refusal: starterRefusal }
  // The frameworks the app may be on: the one --framework names, else each one create has.
  const pool = given === undefined ? Object.keys(starters) : [given]
  const folder = await readFolder(options, io, canAsk)
  if ('refusal' in folder) return folder
  const isTypeScript = await choose(options.isTypeScript, canAsk, () => askLanguage(io), true)
  const detected = readPackageManager(userAgent)
  const packageManagerName = await choose(
    options.packageManager,
    canAsk,
    () => askPackageManager(io, detected.name),
    detected.name
  )
  const packageManager = resolvePackageManager(packageManagerName, detected, io)
  if ('refusal' in packageManager) return packageManager
  const layout = await choose(options.layout, canAsk, () => askLayout(io), LAYOUTS[0])
  const offered = RENDERINGS.filter((rendering) =>
    pool.some((framework) => starters[framework].renderings.includes(rendering))
  )
  const renderingRefusal = findRenderingRefusal(options.rendering, offered, pool, starters)
  if (renderingRefusal) return { refusal: renderingRefusal }
  const rendering = await choose(
    options.rendering,
    canAsk && offered.length > 1,
    () => askRendering(io, offered),
    offered[0]
  )
  // The framework comes after the rendering: the question offers the ones that render it.
  const candidates = pool.filter((framework) => starters[framework].renderings.includes(rendering))
  const framework =
    canAsk && candidates.length > 1 ? await askFramework(io, starters, candidates) : candidates[0]
  const starter = starters[framework]
  const libraryRefusal = findLibraryRefusal(options.libraries, rendering, starter)
  if (libraryRefusal) return { refusal: libraryRefusal }
  const takesLibraries = starter.hasLibraries && rendering !== 'ssg'
  const libraries = await choose(
    options.libraries,
    canAsk && takesLibraries,
    () => askLibraries(io),
    []
  )
  const scheme = await choose(options.scheme, canAsk, () => askScheme(io), 'light')
  const hasSampleData = await choose(options.hasSampleData, canAsk, () => askSampleData(io), false)
  return {
    ...folder,
    packageName: toPackageName(folder.name),
    starter,
    isTypeScript,
    packageManager,
    layout,
    rendering,
    libraries,
    scheme,
    hasSampleData,
  }
}

/** The line that says what create will make, and where. */
function formatHeadline({
  name,
  packageName,
  starter,
  isTypeScript,
  rendering,
  layout,
}: Choices): string {
  const article = /^[AEIOU]/.test(starter.title) ? 'an' : 'a'
  const language = isTypeScript ? 'TypeScript' : 'JavaScript'
  const packageNote = packageName === name ? '' : ` (package ${packageName})`
  const renderingName = rendering === 'isomorphic' ? rendering : rendering.toUpperCase()
  const workspaceNote = layout === 'workspace' ? 'in a workspace, ' : ''
  return `create will make ${name}${packageNote}, ${article} ${starter.title} app in ${language} (${renderingName}), ${workspaceNote}in ./${name}:`
}

/**
 * Starts a new app on Gild UI, in a new or empty folder in `io.cwd`: asks what it is
 * not told, plans with the starter, shows the plan, and writes and installs only after a yes.
 * Returns the exit code.
 */
export async function runCreate(
  options: CreateOptions,
  io: Io,
  {
    starters = STARTERS,
    fileSystem = nodeFileSystem,
    userAgent = process.env.npm_config_user_agent,
  }: CreateDependencies = {}
): Promise<number> {
  const isPreviewOnly = options.isDryRun || (!io.isInteractive && !options.isConfirmed)
  const canAsk = !isPreviewOnly && !options.isConfirmed
  const choices = await readChoices(options, io, starters, userAgent, canAsk)
  if ('refusal' in choices) {
    io.write(`${choices.refusal}\n`)
    return 1
  }
  const { name, packageName, title, layout, packageManager } = choices
  const isWorkspace = layout === 'workspace'
  const appFiles = choices.starter.createFiles({
    name,
    packageName: isWorkspace ? toAppPackageName(packageName) : packageName,
    title,
    isTypeScript: choices.isTypeScript,
    rendering: choices.rendering,
    libraries: choices.libraries,
    scheme: choices.scheme,
    hasSampleData: choices.hasSampleData,
    version: APP_PACKAGE_VERSION,
  })
  const plan: Plan = {
    creates: isWorkspace
      ? createWorkspaceFiles(appFiles, { packageName, title, packageManager: packageManager.name })
      : appFiles,
    edits: [],
    skips: [],
    manual: [],
    install: createAppInstallCommand(packageManager),
  }
  io.write(`${formatHeadline(choices)}\n\n`)
  io.write(`${formatChoices(choices)}\n\n`)
  io.write(`${formatPlan(plan)}\n`)
  if (!(await isApproved(options, isPreviewOnly, io))) return 0
  return writeAndInstall(
    { name, target: choices.target, wasMissing: choices.wasMissing, plan, packageManager },
    options,
    io,
    fileSystem
  )
}
