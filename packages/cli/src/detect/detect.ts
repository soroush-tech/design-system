import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, posix } from 'node:path'
import { compareText } from '../compareText'
import type { PackageManager, PackageManagerName } from '../plan/planInit'
import { isRootSource } from '../plan/rootEdit'

export interface PackageJson {
  name?: string
  version?: string
  packageManager?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  '@parcel/resolver-default'?: { packageExports?: boolean }
  workspaces?: string[] | { packages?: string[] }
}

/** A file's text, or `undefined` when it cannot be read. */
export function readText(path: string): string | undefined {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return undefined
  }
}

export function readPackageJson(directory: string): PackageJson | undefined {
  const text = readText(join(directory, 'package.json'))
  return text === undefined ? undefined : (JSON.parse(text) as PackageJson)
}

/** A dependency's declared range, from `dependencies` or `devDependencies`. */
export function getDependency(packageJson: PackageJson, name: string): string | undefined {
  return packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name]
}

const LOCKFILES: [string, PackageManagerName][] = [
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
  ['package-lock.json', 'npm'],
  ['npm-shrinkwrap.json', 'npm'],
]

/**
 * The app's package manager: its `packageManager` field, else the lockfile in its folder or the
 * nearest one above it inside the same repository (a workspace keeps one at its root), else npm.
 */
export function detectPackageManager(
  root: string,
  packageJson: PackageJson,
  fileExists: (path: string) => boolean = existsSync
): PackageManager {
  const declared = /^(npm|pnpm|yarn|bun)@(\d+)/.exec(packageJson.packageManager ?? '')
  if (declared) {
    const name = declared[1] as PackageManagerName
    return { name, isYarnBerry: name === 'yarn' && Number(declared[2]) >= 2 }
  }
  for (let directory = root; ; directory = dirname(directory)) {
    const lockfile = LOCKFILES.find(([file]) => fileExists(join(directory, file)))
    if (lockfile) {
      const name = lockfile[1]
      return { name, isYarnBerry: name === 'yarn' && fileExists(join(directory, '.yarnrc.yml')) }
    }
    if (fileExists(join(directory, '.git')) || dirname(directory) === directory) {
      return { name: 'npm', isYarnBerry: false }
    }
  }
}

/**
 * The version of `name` the app has installed - in its own node_modules or a workspace's above it.
 * Only node_modules folders are searched: a global folder or NODE_PATH says nothing about the app.
 */
export function findInstalledVersion(root: string, name: string): string | undefined {
  for (let directory = root; ; directory = dirname(directory)) {
    const installed = readPackageJson(join(directory, 'node_modules', name))
    if (installed) return installed.version
    if (dirname(directory) === directory) return undefined
  }
}

/**
 * The React version the app has installed, else the lowest its declared range allows.
 */
export function findReactVersion(root: string, packageJson: PackageJson): string | undefined {
  const installed = findInstalledVersion(root, 'react')
  if (installed) return installed
  const match = /(\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(getDependency(packageJson, 'react') ?? '')
  return match ? `${match[1]}.${match[2] ?? 0}.${match[3] ?? 0}` : undefined
}

/**
 * Whether `version` is in `range`. Only the shape Gild UI's peer ranges use is read:
 * caret ranges joined by `||`, such as `^18.0.0 || ^19.0.0`. Any other shape throws.
 */
export function satisfiesRange(version: string, range: string): boolean {
  const [major, minor, patch] = version.split(/[.-]/).map(Number)
  return range.split('||').some((part) => {
    const match = /^\s*\^(\d+)\.(\d+)\.(\d+)\s*$/.exec(part)
    if (!match) throw new Error(`init cannot read the range ${range}`)
    const [low, lowMinor, lowPatch] = match.slice(1).map(Number)
    return major === low && (minor > lowMinor || (minor === lowMinor && patch >= lowPatch))
  })
}

const SKIPPED_FOLDERS = new Set(['node_modules', 'dist', 'build', 'out', 'coverage', 'public'])
const MAX_DEPTH = 5

/**
 * Every file under the app's folder that starts a client-rendered app, by its path from the root.
 * Tests, stories, folders that hold output or dependencies, hidden folders and symbolic links are
 * not read.
 */
export function findRootFiles(root: string, folder = '', depth = 0): string[] {
  const found: string[] = []
  for (const entry of readdirSync(join(root, folder), { withFileTypes: true })) {
    const path = posix.join(folder, entry.name)
    if (entry.name.startsWith('.')) continue
    if (entry.isDirectory() && !SKIPPED_FOLDERS.has(entry.name) && depth < MAX_DEPTH) {
      found.push(...findRootFiles(root, path, depth + 1))
    } else if (
      entry.isFile() &&
      /\.m?[jt]sx?$/.test(entry.name) &&
      !/\.(test|spec|stories)\./.test(entry.name) &&
      isRootSource(readFileSync(join(root, path), 'utf8'))
    ) {
      found.push(path)
    }
  }
  return found
}

/**
 * Every file under the app's folder, by its path from the root, sorted. Hidden folders, the ones
 * that hold output or dependencies, and symbolic links are not listed.
 */
export function listAppFiles(root: string, folder = '', depth = 0): string[] {
  const found: string[] = []
  for (const entry of readdirSync(join(root, folder), { withFileTypes: true })) {
    const path = posix.join(folder, entry.name)
    if (entry.name.startsWith('.')) continue
    if (entry.isDirectory() && !SKIPPED_FOLDERS.has(entry.name) && depth < MAX_DEPTH) {
      found.push(...listAppFiles(root, path, depth + 1))
    } else if (entry.isFile()) {
      found.push(path)
    }
  }
  return found.sort(compareText)
}

/** Whether the folder is a workspace's root: pnpm's `pnpm-workspace.yaml`, or a `workspaces` field. */
export function isWorkspaceRoot(root: string, packageJson: PackageJson): boolean {
  return packageJson.workspaces !== undefined || existsSync(join(root, 'pnpm-workspace.yaml'))
}

/**
 * The folder of the package a file belongs to: the nearest one above it, inside `root`, with a
 * `package.json`, by its path from the root - `''` for the root itself.
 */
export function findPackageFolder(root: string, path: string): string {
  for (let folder = posix.dirname(path); folder !== '.'; folder = posix.dirname(folder)) {
    if (existsSync(join(root, folder, 'package.json'))) return folder
  }
  return ''
}

const UNSUPPORTED_FRAMEWORKS: [string, string][] = [
  ['next', 'Next.js'],
  ['vike', 'Vike'],
  ['@react-router/dev', 'React Router in framework mode'],
  ['@remix-run/react', 'Remix'],
  ['gatsby', 'Gatsby'],
  ['astro', 'Astro'],
  ['expo', 'Expo'],
  ['react-native', 'React Native'],
]

/** The framework an app is built on that init does not set up yet, if any. */
export function findUnsupportedFramework(packageJson: PackageJson): string | undefined {
  return UNSUPPORTED_FRAMEWORKS.find(([name]) => getDependency(packageJson, name))?.[1]
}

/**
 * Whether the app builds with Parcel and has not turned on its reading of package exports, which
 * every subpath of Gild UI (`/theme`, `/engine`, `/Button`, ...) needs.
 */
export function needsParcelPackageExports(packageJson: PackageJson): boolean {
  const isParcelApp = getDependency(packageJson, 'parcel') !== undefined
  return isParcelApp && packageJson['@parcel/resolver-default']?.packageExports !== true
}
