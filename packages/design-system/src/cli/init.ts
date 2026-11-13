import { existsSync, realpathSync } from 'node:fs'
import { join } from 'node:path'
import { applyPlan, type ApplyError } from './apply/applyPlan'
import { nodeFileSystem, type FileSystem } from './apply/fileSystem'
import {
  detectPackageManager,
  findPackageFolder,
  findReactVersion,
  findRootFiles,
  findUnsupportedFramework,
  getDependency,
  getGitState,
  isWorkspaceRoot,
  needsParcelPackageExports,
  readPackageJson,
  readText,
  satisfiesRange,
  type PackageJson,
} from './detect/detect'
import type { Io } from './io'
import { formatPlan } from './plan/formatPlan'
import { isPlanEmpty, planInit, type InitFacts, type Plan } from './plan/planInit'
import type { Scheme } from './templates/templates'

export interface InitOptions {
  /** Applies without asking. */
  isConfirmed: boolean
  /** Prints the plan and exits. */
  isDryRun: boolean
  /** Runs outside git, or in a tree with uncommitted changes. */
  isForced: boolean
  scheme: Scheme | undefined
}

const SETUP_DOCS = 'https://docs.soroush.tech/design-system/getting-started/installation/'
const FONTS_DOCS = `${SETUP_DOCS}#fonts`

function formatClosing({ creates, manual }: Plan): string {
  const themes = creates.find((file) => /\/themes\.[jt]s$/.test(file.path))
  const themesStep = themes ? `\n  - Make the themes your own in ${themes.path}.` : ''
  const steps = manual.map((step) => `  - ${step}`).join('\n')
  const leftToYou = manual.length > 0 ? `\nStill left to you:\n${steps}\n` : ''
  return `Done: the design system is set up.
${leftToYou}
Next:
  - Use a component: import { Button } from '@soroush.tech/design-system/Button'${themesStep}
  - Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. To add them,
    see ${FONTS_DOCS}

For a coding agent, if you use one (any agent):
  - The house-style skill: npx skills add soroush-tech/design-system
  - The MCP server, for any MCP client: https://mcp.soroush.design/mcp
`
}

/** Why init refuses this app, or `undefined` when it can set it up. */
function findRefusal(
  root: string,
  packageJson: PackageJson,
  reactRange: string
): string | undefined {
  const framework = findUnsupportedFramework(packageJson)
  if (framework) {
    return `This looks like a ${framework} app. init sets up client-rendered React apps for now, so it changes nothing here. To set it up by hand, see ${SETUP_DOCS}`
  }
  const reactVersion = findReactVersion(root, packageJson)
  if (!reactVersion) {
    return 'init found no React in this app. Add react and react-dom first.'
  }
  if (!satisfiesRange(reactVersion, reactRange)) {
    return `This app has React ${reactVersion}, and the design system needs React ${reactRange}. init changes nothing, and never upgrades React.`
  }
  return undefined
}

function findGitRefusal(root: string, io: Io): string | undefined {
  const state = getGitState(root, io)
  if (state === 'not-a-repository') {
    return 'This folder is not in a git repository, so init could not show you its changes afterwards. Run git init and commit first, or run again with --force.'
  }
  if (state === 'dirty') {
    return "This folder has uncommitted changes. Commit or stash them first, so init's changes stand on their own, or run again with --force."
  }
  return undefined
}

interface App {
  root: string
  packageJson: PackageJson
  /** The files in the app that start it, by their path from its folder. */
  rootCandidates: string[]
  /** The app's folder from where init ran, when init ran in a workspace's root: `''` otherwise. */
  folder: string
}

/**
 * The app init sets up from `cwd`: the folder itself, or - in a workspace's root - the one package
 * in it that starts an app. A string says why there is none. A file in a nested package is never
 * taken for the app's own.
 */
function findApp(cwd: string): App | string {
  const packageJson = readPackageJson(cwd)
  if (!packageJson) return "There is no package.json in this folder. Run init in your app's folder."
  const rootFilesByFolder = new Map<string, string[]>()
  for (const path of findRootFiles(cwd)) {
    const folder = findPackageFolder(cwd, path)
    rootFilesByFolder.set(folder, [...(rootFilesByFolder.get(folder) ?? []), path])
  }
  if (!isWorkspaceRoot(cwd, packageJson)) {
    return { root: cwd, packageJson, rootCandidates: rootFilesByFolder.get('') ?? [], folder: '' }
  }
  const folders = [...rootFilesByFolder.keys()]
  if (folders.length === 0) {
    return "This is a workspace's root, and init found no app in it that calls createRoot(...).render( or ReactDOM.render(. Run init in your app's folder."
  }
  if (folders.length > 1) {
    const names = folders.map((folder) => folder || '.').join(', ')
    return `This is a workspace's root with more than one app (${names}). Run init in the one to set up, for example: cd ${folders.find(Boolean)}`
  }
  const [folder] = folders
  const root = join(cwd, folder)
  const rootCandidates = rootFilesByFolder
    .get(folder)!
    .map((path) => (folder ? path.slice(folder.length + 1) : path))
  return { root, packageJson: readPackageJson(root)!, rootCandidates, folder }
}

async function askScheme(io: Io): Promise<Scheme> {
  const answer = await io.ask('Default color scheme, light or dark? (light) ')
  return /^d(ark)?$/i.test(answer.trim()) ? 'dark' : 'light'
}

function collectFacts(app: App, scheme: Scheme | undefined, ownPackage: PackageJson): InitFacts {
  const { root, packageJson, rootCandidates } = app
  const rootPath = rootCandidates.length === 1 ? rootCandidates[0] : undefined
  return {
    isTypeScript: rootPath ? /\.m?tsx?$/.test(rootPath) : existsSync(join(root, 'tsconfig.json')),
    hasSrcFolder: existsSync(join(root, 'src')),
    root: rootPath ? { path: rootPath, source: readText(join(root, rootPath))! } : undefined,
    rootCandidates,
    hasDesignSystem: Boolean(getDependency(packageJson, '@soroush.tech/design-system')),
    needsParcelPackageExports: needsParcelPackageExports(packageJson),
    packageManager: detectPackageManager(root, packageJson),
    version: ownPackage.version!,
    scheme: scheme ?? 'light',
    readFile: (path) => readText(join(root, path)),
  }
}

/** Plans, asking for the default scheme first when init creates the providers and may ask. */
async function planWithScheme(facts: InitFacts, canAsk: boolean, io: Io): Promise<Plan> {
  const plan = planInit(facts)
  const createsProviders = plan.creates.some((file) => /\/Providers\.[jt]s$/.test(file.path))
  return createsProviders && canAsk ? planInit({ ...facts, scheme: await askScheme(io) }) : plan
}

/** Whether to apply the plan: never on a dry run or with no terminal, else on --yes or a yes. */
async function isApproved(options: InitOptions, isPreviewOnly: boolean, io: Io): Promise<boolean> {
  if (options.isDryRun) {
    io.write('Dry run: nothing was changed.\n')
    return false
  }
  if (isPreviewOnly) {
    io.write('Preview only: there is no terminal to answer in. Run again with --yes to apply.\n')
    return false
  }
  if (options.isConfirmed) return true
  const isYes = /^y(es)?$/i.test((await io.ask('Apply these changes? (y/N) ')).trim())
  if (!isYes) io.write('Nothing was changed.\n')
  return isYes
}

/** Writes the plan, then installs the package. Returns the exit code. */
function applyAndInstall(plan: Plan, root: string, io: Io, fileSystem: FileSystem): number {
  try {
    applyPlan(plan, root, fileSystem)
  } catch (error) {
    const { message, isUndone } = error as ApplyError
    const outcome = isUndone
      ? 'Every change it made was taken back.'
      : 'It could not take back every change: check git status.'
    io.write(`init stopped: ${message}. ${outcome}\n`)
    return 1
  }
  if (plan.install) {
    const { command, args, env } = plan.install
    io.write(`\nInstalling with ${command}:\n`)
    if (io.run(command, args, { cwd: root, env, showOutput: true }).status !== 0) {
      const commandLine = [command, ...args].join(' ')
      io.write(
        `\nThe install failed. The files are written; install the package yourself:\n  ${commandLine}\n`
      )
      return 1
    }
  }
  io.write(formatClosing(plan))
  return 0
}

/**
 * Sets up the design system in the app in `io.cwd`: checks, plans, shows the plan, and applies it
 * only after a yes. Returns the exit code.
 */
export async function runInit(
  options: InitOptions,
  io: Io,
  ownPackage: PackageJson,
  fileSystem: FileSystem = nodeFileSystem
): Promise<number> {
  const app = findApp(realpathSync(io.cwd))
  if (typeof app === 'string') {
    io.write(`${app}\n`)
    return 1
  }
  const { root, packageJson, folder } = app
  if (folder) io.write(`This is a workspace's root: init sets up the app in ${folder}.\n\n`)
  const refusal = findRefusal(root, packageJson, ownPackage.peerDependencies!.react)
  if (refusal) {
    io.write(`${refusal}\n`)
    return 1
  }
  const isPreviewOnly = options.isDryRun || (!io.isInteractive && !options.isConfirmed)
  const gitRefusal = isPreviewOnly || options.isForced ? undefined : findGitRefusal(root, io)
  if (gitRefusal) {
    io.write(`${gitRefusal}\n`)
    return 1
  }

  const facts = collectFacts(app, options.scheme, ownPackage)
  const canAsk = !options.scheme && !isPreviewOnly && !options.isConfirmed
  const plan = await planWithScheme(facts, canAsk, io)

  if (isPlanEmpty(plan)) {
    const leftovers = plan.skips.length + plan.manual.length > 0 ? `\n${formatPlan(plan)}` : ''
    io.write(`The design system is already set up here: init has nothing to change.\n${leftovers}`)
    return 0
  }
  const appName = packageJson.name ?? 'this app'
  io.write(`init will set up @soroush.tech/design-system in ${appName}:\n\n${formatPlan(plan)}\n`)
  if (!(await isApproved(options, isPreviewOnly, io))) return 0
  return applyAndInstall(plan, root, io, fileSystem)
}
