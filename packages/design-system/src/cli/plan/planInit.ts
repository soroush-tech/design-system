import { posix } from 'node:path'
import {
  createProvidersSource,
  createThemesSource,
  MARKER,
  type Scheme,
} from '../templates/templates'
import { readExtensionStyle, toImportSpecifier } from './importPath'
import { wrapRoot } from './rootEdit'

export type PackageManagerName = 'npm' | 'pnpm' | 'yarn' | 'bun'

export interface PackageManager {
  name: PackageManagerName
  /** Yarn 2 and later, which takes no `--ignore-scripts` flag. */
  isYarnBerry: boolean
}

export interface InstallCommand {
  command: string
  args: string[]
  env: Record<string, string>
}

/** Everything init would do, worked out before anything is written. */
export interface Plan {
  creates: { path: string; content: string }[]
  edits: { path: string; before: string; after: string }[]
  skips: { path: string; reason: string }[]
  /** What init leaves to the developer, with the lines to add. */
  manual: string[]
  install: InstallCommand | undefined
}

export interface InitFacts {
  isTypeScript: boolean
  hasSrcFolder: boolean
  /** The app's root, when exactly one file renders it. */
  root: { path: string; source: string } | undefined
  /** Every file that looked like a root: none, one, or several. */
  rootCandidates: readonly string[]
  hasDesignSystem: boolean
  /** A Parcel app that does not read package exports yet. */
  needsParcelPackageExports: boolean
  packageManager: PackageManager
  /** The version of this package, which the app gets. */
  version: string
  scheme: Scheme
  /** A file's content, by its path from the app's root, or `undefined` when there is none. */
  readFile: (path: string) => string | undefined
}

const SETUP_DOCS = 'https://docs.soroush.tech/design-system/getting-started/installation/'

/** The command that adds the design system with the app's own package manager, running no scripts. */
export function createInstallCommand(
  { name, isYarnBerry }: PackageManager,
  version: string
): InstallCommand {
  const range = version.includes('-') ? version : `^${version}`
  const spec = `@soroush.tech/design-system@${range}`
  if (name === 'yarn' && isYarnBerry) {
    return { command: 'yarn', args: ['add', spec], env: { YARN_ENABLE_SCRIPTS: 'false' } }
  }
  const verb = name === 'npm' ? 'install' : 'add'
  return { command: name, args: [verb, spec, '--ignore-scripts'], env: {} }
}

function describeRootProblem(facts: InitFacts): string {
  if (facts.rootCandidates.length === 0) {
    return 'init found no file that calls createRoot(...).render( or ReactDOM.render(.'
  }
  return `init found more than one root (${facts.rootCandidates.join(', ')}) and edits none.`
}

/** Works out the changes, reading files through `facts.readFile` and writing nothing. */
export function planInit(facts: InitFacts): Plan {
  const plan: Plan = { creates: [], edits: [], skips: [], manual: [], install: undefined }
  const extension = facts.isTypeScript ? 'ts' : 'js'
  const themeDir =
    facts.hasSrcFolder || !facts.root
      ? 'src/theme'
      : posix.join(posix.dirname(facts.root.path), 'theme')
  const themesPath = `${themeDir}/themes.${extension}`
  const providersPath = `${themeDir}/Providers.${extension}`
  const style = facts.root ? readExtensionStyle(facts.root.source) : ''

  const ownership = (path: string) => {
    const content = facts.readFile(path)
    if (content === undefined) return 'missing'
    return content.startsWith(MARKER) ? 'ours' : 'theirs'
  }
  const themes = ownership(themesPath)
  const providers = ownership(providersPath)

  if (themes === 'missing') {
    plan.creates.push({ path: themesPath, content: createThemesSource(facts) })
  } else if (themes === 'theirs') {
    plan.skips.push({ path: themesPath, reason: 'exists, and init did not write it' })
  }

  if (providers === 'theirs') {
    plan.skips.push({ path: providersPath, reason: 'exists, and init did not write it' })
  } else if (providers === 'missing' && themes === 'theirs') {
    plan.skips.push({
      path: providersPath,
      reason: `would read ${themesPath}, which init did not write`,
    })
  } else if (providers === 'missing') {
    const themesImport = toImportSpecifier(providersPath, themesPath, style)
    plan.creates.push({
      path: providersPath,
      content: createProvidersSource({ ...facts, themesImport }),
    })
  }

  const hasProviders =
    providers === 'ours' || plan.creates.some((file) => file.path === providersPath)
  if (!hasProviders) {
    plan.manual.push(`Set up the theme by hand: ${SETUP_DOCS}`)
  } else if (!facts.root) {
    plan.manual.push(
      `${describeRootProblem(facts)} In the file that renders your app, import { Providers } from ${providersPath} and wrap the tree it renders: render(<Providers><App /></Providers>).`
    )
  } else {
    const specifier = toImportSpecifier(facts.root.path, providersPath, style)
    const statement = `import { Providers } from '${specifier}'`
    const { path, source } = facts.root
    const isWrapped = source.includes(`'${specifier}'`) || source.includes(`"${specifier}"`)
    const after = isWrapped ? source : wrapRoot(source, statement)
    if (after === null) {
      plan.manual.push(
        `${path} is not the standard shape, so init leaves it as it is. Add ${statement} to it, and wrap the tree it renders: render(<Providers><App /></Providers>).`
      )
    } else if (after !== source) {
      plan.edits.push({ path, before: source, after })
    }
  }

  if (facts.needsParcelPackageExports) {
    plan.manual.push(
      'Parcel finds @soroush.tech/design-system/theme and the other subpaths only once it reads package exports. Add to package.json: "@parcel/resolver-default": { "packageExports": true }'
    )
  }
  if (!facts.hasDesignSystem)
    plan.install = createInstallCommand(facts.packageManager, facts.version)
  return plan
}

/** Whether the plan has nothing to write or install. */
export function isPlanEmpty(plan: Plan): boolean {
  return plan.creates.length === 0 && plan.edits.length === 0 && !plan.install
}
