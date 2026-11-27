// The step's data: the inventory of every difference between @soroush.tech/design-system 2.2.0
// and Gild UI 0.1.0 (`inventory/`, made for #171). What the step reports reads its text from
// `inventory.json`, and where an old import goes comes from `imports.json`, so neither can drift
// from the other.
import { compareText } from '../../../compareText'
import importsJson from './inventory/imports.json'
import inventoryJson from './inventory/inventory.json'

interface InventoryItem {
  id: string
  area: string
  kind: 'mechanical' | 'manual'
  from: string
  to: string
  how: string
}

interface ImportRow {
  name: string
  kind: 'value' | 'type'
  status: 'kept' | 'moved' | 'removed'
  to: string | null
  rule: string
}

interface ImportPath {
  from: string
  exports: ImportRow[]
}

const ITEMS = new Map((inventoryJson as InventoryItem[]).map((item) => [item.id, item]))

/** The inventory's text for an item: what it is and what to do, as a report message. */
export function inventoryMessage(id: string, detail?: string): string {
  const item = ITEMS.get(id)
  if (!item) throw new Error(`The inventory has no item ${id}.`)
  const lead = detail ? `${detail} ` : ''
  return `[${id}] ${lead}${item.how}`
}

/** The packages the step moves away from, and the ones they become. */
export const OLD_PACKAGES = [
  '@soroush.tech/design-system',
  '@soroush.tech/markdown',
  '@soroush.tech/hooks',
] as const

export const REACT = '@gild-ui/react'
export const CORE = '@gild-ui/core'
export const HOOKS = '@gild-ui/hooks'
export const MARKDOWN = '@gild-ui/react-markdown'
export const STYLED_SYSTEM = '@soroush.tech/styled-system'
export const STYLED_SYSTEM_RANGE = '^6.0.3'

/**
 * The entry of `@gild-ui/react` each styling-system name is imported from: one entry per name. A
 * name that has none (the three types of the root) is imported from the root.
 */
const REACT_ENTRY_OF_NAME: Record<string, string> = {
  ThemeProvider: 'ThemeProvider',
  LayoutProvider: 'LayoutProvider',
  LayoutProviderProps: 'LayoutProvider',
  useTheme: 'useTheme',
  useDefaultProps: 'useDefaultProps',
  withTheme: 'withTheme',
  styled: 'styled',
  css: 'css',
  keyframes: 'keyframes',
  Global: 'Global',
  StyleSheet: 'StyleSheet',
  useStyle: 'useStyle',
  withStyles: 'withStyles',
  StyleFactory: 'withStyles',
  StyleInput: 'withStyles',
  StylesConsumer: 'StylesConsumer',
}

/** Where a name goes: the inventory's target, with the root of `@gild-ui/react` split by name. */
function entryOf(name: string, target: string): string {
  if (target !== REACT) return target
  const entry = REACT_ENTRY_OF_NAME[name]
  return entry ? `${REACT}/${entry}` : REACT
}

/** The entries `entryOf` can answer for the styling system, for the test that checks they exist. */
export const REACT_ENTRIES = [...new Set(Object.values(REACT_ENTRY_OF_NAME))]

const PATHS = new Map(
  (importsJson.paths as unknown as ImportPath[]).map((path) => [
    path.from,
    new Map(path.exports.map((row) => [row.name, row])),
  ])
)

/** What `import { name } from path` becomes: a module, or `removed`, or `undefined` for a name not in the inventory. */
export function resolveName(
  path: string,
  name: string
): { to: string } | { removed: string } | undefined {
  const row = PATHS.get(path)?.get(name)
  if (!row) return undefined
  return row.to === null ? { removed: row.rule } : { to: entryOf(name, row.to) }
}

/** The file of the app's tools that `declare module` augments is the theme of the core package. */
const AUGMENTED_MODULES: Record<string, string> = {
  '@soroush.tech/design-system/theme': `${CORE}/theme`,
}

/** How an old module specifier moves: to one module, to several by name, or nowhere known. */
export type PathRule =
  | { kind: 'uniform'; to: string }
  | { kind: 'split' }
  | { kind: 'unknown' }
  | undefined

const SUBPATH_PACKAGES: [string, string][] = [
  ['@soroush.tech/markdown/', `${MARKDOWN}/`],
  ['@soroush.tech/hooks/', `${HOOKS}/`],
  ['@soroush.tech/design-system/utils/test/', `${REACT}/utils/test/`],
]

/** The rule for an old specifier, or `undefined` when it is not one of the old packages'. */
export function ruleOfPath(specifier: string): PathRule {
  const isOurs = OLD_PACKAGES.some((name) => specifier === name || specifier.startsWith(`${name}/`))
  if (!isOurs) return undefined
  const names = PATHS.get(specifier)
  if (names) {
    const targets = new Set([...names.values()].map((row) => row.to && entryOf(row.name, row.to)))
    const [only] = targets
    return targets.size === 1 && only ? { kind: 'uniform', to: only } : { kind: 'split' }
  }
  for (const [from, to] of SUBPATH_PACKAGES) {
    if (specifier.startsWith(from))
      return { kind: 'uniform', to: to + specifier.slice(from.length) }
  }
  return { kind: 'unknown' }
}

/** The module a `declare module` block of an old specifier becomes, when it has a rule of its own. */
export const augmentedModule = (specifier: string): string | undefined =>
  AUGMENTED_MODULES[specifier]

/** The modules the names of an old path go to, for a message about a path that has to be split. */
export function targetsOfPath(path: string): string[] {
  const rows = [...(PATHS.get(path)?.values() ?? [])]
  const targets = rows.filter((row) => row.to !== null).map((row) => entryOf(row.name, row.to!))
  return [...new Set(targets)].sort(compareText)
}

/**
 * The previous engine's packages and the marks it left, as the inventory names them: what the step
 * looks for in an app. Nothing else in the step names them.
 */
export const PREVIOUS_ENGINE = {
  scope: '@emotion/',
  server: '@emotion/server',
  /** The packages the old ones brought in, taken out of package.json when no file imports them. */
  packages: [
    '@emotion/react',
    '@emotion/styled',
    '@emotion/cache',
    '@emotion/css',
    '@emotion/server',
  ],
  /** What an import of it is replaced by, per name (STY-014). */
  replacements: {
    css: 'css from @gild-ui/react/css',
    keyframes: 'keyframes from @gild-ui/react/keyframes',
    Global: 'Global from @gild-ui/react/Global',
    useTheme: 'useTheme from @gild-ui/react/useTheme',
    ThemeProvider: 'ThemeProvider from @gild-ui/react/ThemeProvider',
    default: 'styled from @gild-ui/react/styled',
    createCache: 'createCache from @gild-ui/react/engine',
    CacheProvider: 'CacheProvider from @gild-ui/react/engine',
  } as Record<string, string>,
  /** A line that reads what it rendered: its class names and style elements (STY-011). */
  output: new RegExp(
    [
      /data-emotion/,
      /[[]class[\\^*$|~]?=\s*["']?css-/,
      /(?:^|[\s"'`.])css-[0-9a-z]{5,}(?:-[A-Za-z]\w*)?\b/,
    ]
      .map((pattern) => pattern.source)
      .join('|')
  ),
  /** A line that sets it up: the JSX import source and the Babel plugins (DEP-009). */
  settings:
    /@jsxImportSource\s+@emotion|jsxImportSource['"]?\s*[:=]\s*['"]@emotion|@emotion\/babel/,
}

/** A file is read only when it can hold something of the inventory: this is what it looks for. */
export const RELEVANT = new RegExp(
  String.raw`@soroush\.tech/(?:design-system|markdown|hooks)|${PREVIOUS_ENGINE.scope}|jsxImportSource|data-emotion|css-[0-9a-z]{5,}|useServerInsertedHTML`
)
