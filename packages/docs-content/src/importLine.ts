import { importPackageOf, importSubpathOf, type ComponentNavItem } from './registry'

/** The lines a page shows at its top: how to install the package that exports the thing, and the import. */
export interface ImportLine {
  /** The package's name on npm. */
  npm: string
  /** The entry point of the package the names are imported from; none for its root. */
  subpath?: string
  /** The names the statement imports. */
  names: string[]
  install: string
  statement: string
}

/** The hooks library, which a hook is imported from. */
export const HOOKS_PACKAGE = '@gild-ui/hooks'

const CORE_PACKAGE = '@gild-ui/core'
const REACT_PACKAGE = '@gild-ui/react'

const importLine = (npm: string, names: string[], subpath?: string): ImportLine => ({
  npm,
  subpath,
  names,
  install: `npm i ${npm}`,
  statement: `import { ${names.join(', ')} } from '${subpath ? `${npm}/${subpath}` : npm}'`,
})

/** A component's lines: its package, and the entry point it is imported from (a member's is its family's). */
export const componentImportLine = (item: ComponentNavItem): ImportLine =>
  importLine(importPackageOf(item), [item.name], importSubpathOf(item))

/** A hook's lines: the hooks library, and its own entry point. */
export const hookImportLine = (hook: string): ImportLine => importLine(HOOKS_PACKAGE, [hook], hook)

/**
 * The lines of the lowercase pages of the React platform that document an entry point or the
 * names of a package. `/react/theme/` and `/react/utils/` document `@gild-ui/core`, and
 * `/react/style/` the root of the React package.
 */
export const entryImportLines: Record<string, ImportLine> = {
  catalog: importLine(REACT_PACKAGE, ['catalog'], 'catalog'),
  engine: importLine(REACT_PACKAGE, ['globalStyles'], 'engine'),
  next: importLine(REACT_PACKAGE, ['StyleRegistry'], 'next'),
  server: importLine(REACT_PACKAGE, ['styleServer'], 'server'),
  testing: importLine(REACT_PACKAGE, ['installPopover'], 'testing'),
  style: importLine(REACT_PACKAGE, ['styled', 'css']),
  theme: importLine(CORE_PACKAGE, ['baseTheme', 'createTheme', 'defineThemes'], 'theme'),
  utils: importLine(CORE_PACKAGE, ['alpha'], 'utils'),
}

/** What an app installs to use Gild UI: the React package, and the theme it is built on. */
export const appInstallLine = `npm i ${REACT_PACKAGE} ${CORE_PACKAGE}`
