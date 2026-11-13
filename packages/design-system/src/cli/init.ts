import { existsSync, realpathSync } from 'node:fs'
import { join } from 'node:path'
import { applyPlan, type ApplyError } from './apply/applyPlan'
import { nodeFileSystem, type FileSystem } from './apply/fileSystem'
import {
  detectPackageManager,
  findReactVersion,
  findRootFiles,
  findUnsupportedFramework,
  getDependency,
  getGitState,
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
  const leftToYou =
    manual.length > 0
      ? `\nStill left to you:\n${manual.map((step) => `  - ${step}`).join('\n')}\n`
      : ''
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

async function askScheme(io: Io): Promise<Scheme> {
  const answer = await io.ask('Default color scheme, light or dark? (light) ')
  return /^d(ark)?$/i.test(answer.trim()) ? 'dark' : 'light'
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
  const root = realpathSync(io.cwd)
  const packageJson = readPackageJson(root)
  if (!packageJson) {
    io.write("There is no package.json in this folder. Run init in your app's folder.\n")
    return 1
  }
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

  const rootCandidates = findRootFiles(root)
  const rootPath = rootCandidates.length === 1 ? rootCandidates[0] : undefined
  const facts: InitFacts = {
    isTypeScript: rootPath ? /\.m?tsx?$/.test(rootPath) : existsSync(join(root, 'tsconfig.json')),
    hasSrcFolder: existsSync(join(root, 'src')),
    root: rootPath ? { path: rootPath, source: readText(join(root, rootPath))! } : undefined,
    rootCandidates,
    hasDesignSystem: Boolean(getDependency(packageJson, '@soroush.tech/design-system')),
    needsParcelPackageExports: needsParcelPackageExports(packageJson),
    packageManager: detectPackageManager(root, packageJson),
    version: ownPackage.version!,
    scheme: options.scheme ?? 'light',
    readFile: (path) => readText(join(root, path)),
  }
  let plan = planInit(facts)
  const createsProviders = plan.creates.some((file) => /\/Providers\.[jt]s$/.test(file.path))
  if (createsProviders && !options.scheme && !isPreviewOnly && !options.isConfirmed) {
    plan = planInit({ ...facts, scheme: await askScheme(io) })
  }

  if (isPlanEmpty(plan)) {
    const leftovers = plan.skips.length + plan.manual.length > 0 ? `\n${formatPlan(plan)}` : ''
    io.write(`The design system is already set up here: init has nothing to change.\n${leftovers}`)
    return 0
  }
  io.write(
    `init will set up @soroush.tech/design-system in ${packageJson.name ?? 'this app'}:\n\n${formatPlan(plan)}\n`
  )
  if (options.isDryRun) {
    io.write('Dry run: nothing was changed.\n')
    return 0
  }
  if (isPreviewOnly) {
    io.write('Preview only: there is no terminal to answer in. Run again with --yes to apply.\n')
    return 0
  }
  if (
    !options.isConfirmed &&
    !/^y(es)?$/i.test((await io.ask('Apply these changes? (y/N) ')).trim())
  ) {
    io.write('Nothing was changed.\n')
    return 0
  }

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
      io.write(
        `\nThe install failed. The files are written; install the package yourself:\n  ${[command, ...args].join(' ')}\n`
      )
      return 1
    }
  }
  io.write(formatClosing(plan))
  return 0
}
