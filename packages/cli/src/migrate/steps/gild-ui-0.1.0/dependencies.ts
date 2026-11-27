// package.json: the packages the app needs after the move, and the ones it no longer does. The
// runner itself puts `@gild-ui/react` where `@soroush.tech/design-system` was, so this adds the
// rest: what the imports now reach, and takes out what the old packages brought in.
import type { PackageJson } from '../../../detect/detect'
import { compareVersions, readRangeMinimum } from '../../versions'
import type { Change, DependencySection } from '../../step'
import type { FileReport } from './imports'
import {
  CORE,
  HOOKS,
  inventoryMessage,
  MARKDOWN,
  PREVIOUS_ENGINE,
  REACT,
  STYLED_SYSTEM,
  STYLED_SYSTEM_RANGE,
} from './data'

const GILD_RANGE = '^0.1.0'
const REACT_RANGE = '^19.2.8'
const REACT_MINIMUM = '19.2.8'

type Manifest = PackageJson & {
  scripts?: Record<string, string>
  overrides?: Record<string, unknown>
  resolutions?: Record<string, unknown>
  pnpm?: { overrides?: Record<string, unknown> }
}

/** What the files of the app say, collected for the package.json that goes with them. */
export interface AppFacts {
  /** Every module of a Gild UI package, or of styled-system, the app imports after the step. */
  modules: Set<string>
  /** The text of every source file, to tell whether a package of the previous engine is still imported. */
  sources: string[]
}

const dependencyIn = (packageJson: PackageJson, name: string): DependencySection | undefined =>
  (['dependencies', 'devDependencies'] as const).find(
    (section) => packageJson[section]?.[name] !== undefined
  )

/** The line of a quoted key in package.json, for a report. */
function lineOfKey(text: string, key: string): number {
  return text.split('\n').findIndex((line) => line.includes(`"${key}"`)) + 1
}

function planPackages(packageJson: PackageJson, facts: AppFacts): Change[] {
  const changes: Change[] = []
  const designSystem = dependencyIn(packageJson, '@soroush.tech/design-system') ?? 'dependencies'
  const isUsed = (name: string) =>
    [...facts.modules].some((module) => module === name || module.startsWith(`${name}/`))
  const add = (name: string, range: string, section: DependencySection) =>
    changes.push({ kind: 'dependency', action: 'add', name, range, section })

  if (isUsed(CORE)) add(CORE, GILD_RANGE, designSystem)
  if (isUsed(STYLED_SYSTEM)) add(STYLED_SYSTEM, STYLED_SYSTEM_RANGE, designSystem)
  for (const [oldName, newName] of [
    ['@soroush.tech/markdown', MARKDOWN],
    ['@soroush.tech/hooks', HOOKS],
  ]) {
    const section = dependencyIn(packageJson, oldName)
    if (section) add(newName, GILD_RANGE, section)
    else if (isUsed(newName)) add(newName, GILD_RANGE, designSystem)
    if (section) changes.push({ kind: 'dependency', action: 'remove', name: oldName })
  }
  for (const name of PREVIOUS_ENGINE.packages) {
    const isImported = facts.sources.some(
      (source) => source.includes(`'${name}`) || source.includes(`"${name}`)
    )
    if (!isImported) changes.push({ kind: 'dependency', action: 'remove', name })
  }
  for (const name of ['react', 'react-dom']) {
    const range = packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name]
    const minimum = range === undefined ? undefined : readRangeMinimum(range)
    if (minimum !== undefined && compareVersions(minimum, REACT_MINIMUM) < 0) {
      changes.push({ kind: 'dependency', action: 'update', name, range: REACT_RANGE })
    }
  }
  return changes
}

function reportManifest(packageJson: Manifest, text: string): FileReport[] {
  const reports: FileReport[] = []
  const add = (key: string, message: string) =>
    reports.push({ line: lineOfKey(text, key), message })
  const isLow = (range: unknown, minimum: string) => {
    const lowest = typeof range === 'string' ? readRangeMinimum(range) : undefined
    return lowest !== undefined && compareVersions(lowest, minimum) < 0
  }
  for (const [name, command] of Object.entries(packageJson.scripts ?? {})) {
    if (/design-system\s+init/.test(command)) {
      add(
        name,
        `${inventoryMessage('DEP-008')} The script "${name}" runs "design-system init": run \`npx @soroush.design/cli init\` instead.`
      )
    }
  }
  for (const name of ['react', 'react-dom']) {
    const pins: [string, unknown][] = [
      ['peerDependencies', packageJson.peerDependencies?.[name]],
      ['overrides', packageJson.overrides?.[name]],
      ['resolutions', packageJson.resolutions?.[name]],
      ['overrides', packageJson.pnpm?.overrides?.[name]],
    ]
    for (const [where, range] of pins) {
      if (isLow(range, REACT_MINIMUM)) {
        add(where, `${inventoryMessage('DEP-006')} ${where} pins ${name} at ${String(range)}.`)
      }
    }
  }
  for (const name of ['@types/react', '@types/react-dom']) {
    const range = packageJson.devDependencies?.[name] ?? packageJson.dependencies?.[name]
    if (isLow(range, '19.0.0'))
      add(name, inventoryMessage('DEP-006', `${name} is at ${range}: use the types of React 19.`))
  }
  for (const name of ['@soroush.tech/design-system', '@soroush.tech/markdown']) {
    if (packageJson.peerDependencies?.[name] !== undefined) {
      add(
        name,
        inventoryMessage(
          'DEP-003',
          `${name} is a peer dependency of this package: change it to ${name === '@soroush.tech/markdown' ? MARKDOWN : REACT} ${GILD_RANGE} by hand.`
        )
      )
    }
  }
  if (
    packageJson.dependencies?.next !== undefined ||
    packageJson.devDependencies?.next !== undefined
  ) {
    add('next', inventoryMessage('THM-007'))
  }
  return reports
}

/** The reports that name no place in the app: what the move changes in the output, and its types. */
function reportAfterTheMove(text: string): FileReport[] {
  const line = lineOfKey(text, '@soroush.tech/design-system')
  return [
    {
      line,
      message: `Check the screens, and the tests that read the rendered page: ${['OUT-003', 'OUT-006', 'OUT-007', 'OUT-008', 'STY-015', 'CMP-006'].map((id) => inventoryMessage(id)).join(' ')}`,
    },
    {
      line,
      message: `Run the type check: where it fails, these are the differences of type: ${['CMP-002', 'CMP-004', 'THM-008', 'THM-009', 'THM-010', 'STY-013'].map((id) => inventoryMessage(id)).join(' ')}`,
    },
  ]
}

export function planManifest(
  packageJson: Manifest,
  text: string,
  facts: AppFacts
): { changes: Change[]; reports: FileReport[] } {
  return {
    changes: planPackages(packageJson, facts),
    reports: [...reportManifest(packageJson, text), ...reportAfterTheMove(text)],
  }
}
