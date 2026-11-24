// Generates the entry points of an umbrella from the packages it points at.
//
// An umbrella holds no code: every entry point is a one-line re-export of an entry point of one of
// its sources. The platform umbrella (`@soroush.design/react`) has libraries as sources; the family
// umbrella (`soroush.design`) has the platform umbrellas, each mounted under its platform's name.
// Both are described by the same list of `Library`, because a platform umbrella publishes an
// export map like any library. This file turns the published export maps into
//   - one file per entry point under src/, and
//   - the `exports` and `publishConfig.exports` of package.json,
// and `check` fails when what is on disk differs from what it would write.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

// A source is added by one line in the umbrella's `libraries.ts` and an entry in package.json;
// `pnpm gen:umbrellas` then writes its entry points.
//
//   { package: '@soroush.design/react-components' }                    merged at the top: /Button
//   { package: '@soroush.design/react-markdown', under: 'markdown' }   under a name: /markdown/Editor
//   { package: '@soroush.design/react', under: 'react' }               a platform: /react/Button
//   { package: '...', omit: ['./style'] }                               without an entry point another source serves
//
// A source with heavy dependencies is `optional: true`: the umbrella lists it as an optional peer,
// so an app that never imports its entry points installs none of them.
export interface Library {
  /** The source's package name. */
  package: string
  /** A lowercase name to mount the source under; without it the source is merged at the top. */
  under?: string
  /**
   * The app installs the source itself: it is an optional peer of the umbrella, not a dependency,
   * and importing its entry points without it fails with a module-not-found error.
   */
  optional?: boolean
  /**
   * Entry points of the source the umbrella does not re-export, as the source publishes them
   * (`'.'`, `'./style'`). Two sources may hold the same name - the component library re-exports the
   * theme library's `/style` - and the umbrella takes it from one: the generator checks that an
   * omitted entry point exists and that another source serves it.
   */
  omit?: string[]
}

/** One entry point of a library: `.` or `./Button`, and whether it has a default export. */
export interface LibraryEntry {
  subpath: string
  hasDefault: boolean
}

export interface ResolvedLibrary extends Library {
  entries: LibraryEntry[]
}

/** One entry point of the umbrella. */
export interface Entry {
  /** The subpath an app imports, such as `.` or `./Button` or `./markdown/Editor`. */
  subpath: string
  /** The specifier it re-exports, such as `@soroush.design/react-components/Button`. */
  target: string
  hasDefault: boolean
  /** The library it comes from, for messages. */
  library: string
}

const LOWERCASE_NAME = /^[a-z][a-z0-9-]*$/
const DEFAULT_EXPORT = /^\s*export\s+default\b/m
const EXPORT_LIST = /export\s+(?:type\s+)?\{([^}]*)\}/g

/**
 * Whether a module's source gives it a default export. `export *` never carries a default
 * across, so the module's own syntax is all there is to read: `export default ...`,
 * `export { default } from ...` and `export { x as default }`.
 */
export function hasDefaultExport(source: string): boolean {
  if (DEFAULT_EXPORT.test(source)) return true
  return [...source.matchAll(EXPORT_LIST)].some(([, list]) =>
    list.split(',').some((item) => {
      const name = item.trim().replace(/^type\s+/, '')
      return name === 'default' || /\bas\s+default$/.test(name)
    })
  )
}

/** Where a library's subpath lands on the umbrella. */
export function mountSubpath(subpath: string, under?: string): string {
  if (under === undefined) return subpath
  return subpath === '.' ? `./${under}` : `./${under}${subpath.slice(1)}`
}

/**
 * The umbrella's entry points, sorted, root first. A name two libraries both claim, or two
 * names that differ only by case, is an error that names both libraries.
 */
export function planEntries(libraries: ResolvedLibrary[]): Entry[] {
  const seen = new Map<string, Entry>()
  for (const library of libraries) {
    for (const subpath of library.omit ?? []) {
      if (!library.entries.some((entry) => entry.subpath === subpath)) {
        throw new Error(
          `${library.package}: omits "${subpath}", which is not one of its entry points.`
        )
      }
    }
    if (library.under !== undefined && !LOWERCASE_NAME.test(library.under)) {
      throw new Error(
        `${library.package}: "${library.under}" is not a lowercase name; a library is mounted under a name such as "markdown".`
      )
    }
    for (const { subpath, hasDefault } of library.entries) {
      if (library.omit?.includes(subpath)) continue
      const mounted = mountSubpath(subpath, library.under)
      const entry: Entry = {
        subpath: mounted,
        target: subpath === '.' ? library.package : `${library.package}${subpath.slice(1)}`,
        hasDefault,
        library: library.package,
      }
      const taken = seen.get(mounted.toLowerCase())
      if (taken) {
        const byCase =
          taken.subpath === mounted ? '' : ` (it differs from "${taken.subpath}" only by case)`
        throw new Error(`${taken.library} and ${library.package} both claim "${mounted}"${byCase}.`)
      }
      seen.set(mounted.toLowerCase(), entry)
    }
  }
  for (const library of libraries) {
    for (const subpath of library.omit ?? []) {
      const mounted = mountSubpath(subpath, library.under)
      if (!seen.has(mounted.toLowerCase())) {
        throw new Error(
          `${library.package}: omits "${subpath}" but no other library serves "${mounted}".`
        )
      }
    }
  }
  return [...seen.values()].sort((a, b) => {
    if (a.subpath === '.' || b.subpath === '.') return a.subpath === '.' ? -1 : 1
    return a.subpath < b.subpath ? -1 : 1
  })
}

/** The file of an entry point, relative to src/. */
export const entryFile = (subpath: string): string =>
  subpath === '.' ? 'index.ts' : `${subpath.slice(2)}.ts`

/** The one-line module of an entry point. */
export function renderEntry({ target, hasDefault }: Entry): string {
  const lines = [`export * from '${target}'`]
  if (hasDefault) lines.push(`export { default } from '${target}'`)
  return `${lines.join('\n')}\n`
}

/**
 * Reads a library's entry points from its package.json: the ones it publishes
 * (`publishConfig.exports`), because those are what an app that installs it can import, and
 * the source file `exports` names for each, to see whether the entry has a default export.
 */
export function readLibrary(library: Library, root: string): ResolvedLibrary {
  const folder = join(root, 'node_modules', library.package)
  const manifest = JSON.parse(readFileSync(join(folder, 'package.json'), 'utf8')) as {
    exports: Record<string, unknown>
    publishConfig?: { exports?: Record<string, unknown> }
  }
  const published = manifest.publishConfig?.exports ?? manifest.exports
  const entries = Object.keys(published)
    .filter((subpath) => subpath.startsWith('.') && subpath !== './package.json')
    .map((subpath) => {
      if (subpath.includes('*')) {
        throw new Error(
          `${library.package}: "${subpath}" is a pattern; list each entry point so the umbrella can re-export it.`
        )
      }
      const source = manifest.exports[subpath]
      if (typeof source !== 'string') {
        throw new Error(
          `${library.package}: "${subpath}" is published but has no source file in "exports".`
        )
      }
      return { subpath, hasDefault: hasDefaultExport(readFileSync(join(folder, source), 'utf8')) }
    })
  return { ...library, entries }
}

const conditions = (name: string) => ({
  import: { types: `./dist/${name}.d.mts`, default: `./dist/${name}.mjs` },
  require: { types: `./dist/${name}.d.cts`, default: `./dist/${name}.cjs` },
})

/**
 * package.json with the entry points: source in the workspace, `dist` once published. An umbrella
 * with no root entry point (the family's: an app imports a platform, never the family) has no
 * `main`, `module` or `types` either.
 */
export function renderPackageJson(source: string, entries: Entry[]): string {
  const manifest = JSON.parse(source) as Record<string, unknown>
  const outputName = ({ subpath }: Entry) => entryFile(subpath).slice(0, -'.ts'.length)
  const hasRoot = entries.some(({ subpath }) => subpath === '.')
  manifest.exports = Object.fromEntries(
    entries.map((entry) => [entry.subpath, `./src/${entryFile(entry.subpath)}`])
  )
  if (hasRoot) manifest.types = './src/index.ts'
  else delete manifest.types
  manifest.publishConfig = {
    access: 'public',
    exports: Object.fromEntries(
      entries.map((entry) => [entry.subpath, conditions(outputName(entry))])
    ),
    ...(hasRoot && {
      main: './dist/index.cjs',
      module: './dist/index.mjs',
      types: './dist/index.d.mts',
    }),
    typesVersions: { '*': { '*': ['./dist/*.d.cts'] } },
  }
  return `${JSON.stringify(manifest, null, 2)}\n`
}

const filesUnder = (folder: string, base = folder): string[] =>
  existsSync(folder)
    ? readdirSync(folder, { withFileTypes: true }).flatMap((item) =>
        item.isDirectory()
          ? filesUnder(join(folder, item.name), base)
          : [
              join(folder, item.name)
                .slice(base.length + 1)
                .replaceAll('\\', '/'),
            ]
      )
    : []

export interface RunOptions {
  /** The umbrella's folder. */
  root: string
  libraries: Library[]
  /** Report what differs instead of writing it. */
  check: boolean
}

/** Writes every generated file, or with `check` only reports the ones that differ. */
export function run({ root, libraries, check }: RunOptions): {
  problems: string[]
  summary: string
} {
  const manifest = readFileSync(join(root, 'package.json'), 'utf8')
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
    peerDependenciesMeta = {},
  } = JSON.parse(manifest) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    peerDependencies?: Record<string, string>
    peerDependenciesMeta?: Record<string, { optional?: boolean }>
  }
  const missing = libraries.flatMap((library): string[] => {
    const name = library.package
    if (!library.optional) {
      return dependencies[name] ? [] : [`${name} is in libraries.ts but not in "dependencies".`]
    }
    // An optional library is the app's to install: an optional peer, and a dev dependency, which
    // is how the workspace (the generator, the tests) reads it.
    if (dependencies[name]) {
      return [`${name} is optional in libraries.ts, so it is a peer and not in "dependencies".`]
    }
    if (!peerDependencies[name] || !peerDependenciesMeta[name]?.optional) {
      return [
        `${name} is optional in libraries.ts but not an optional peer ("peerDependencies" and "peerDependenciesMeta").`,
      ]
    }
    return devDependencies[name]
      ? []
      : [
          `${name} is optional in libraries.ts but not in "devDependencies", which is where the workspace reads it.`,
        ]
  })
  if (missing.length > 0) return { problems: missing, summary: 'Nothing generated.' }

  const entries = planEntries(libraries.map((library) => readLibrary(library, root)))
  const wanted = new Map<string, string>([
    ['package.json', renderPackageJson(manifest, entries)],
    ...entries.map((entry): [string, string] => [
      `src/${entryFile(entry.subpath)}`,
      renderEntry(entry),
    ]),
  ])
  const stale = filesUnder(join(root, 'src'))
    .filter((file) => !wanted.has(`src/${file}`))
    .sort()

  const problems: string[] = []
  for (const [file, content] of wanted) {
    const path = join(root, file)
    if (existsSync(path) && readFileSync(path, 'utf8') === content) continue
    problems.push(`${file} is out of date.`)
    if (!check) {
      mkdirSync(dirname(path), { recursive: true })
      writeFileSync(path, content)
    }
  }
  for (const file of stale) {
    problems.push(`src/${file} is not an entry point of any library.`)
    if (!check) rmSync(join(root, 'src', file))
  }

  const total = `${entries.length} entry points from ${libraries.length} library package(s)`
  if (!check) return { problems: [], summary: `Wrote ${problems.length} files; ${total}.` }
  if (problems.length === 0) return { problems, summary: `Up to date: ${total}.` }
  return {
    problems: [...problems, 'Run `pnpm gen:umbrellas` and commit what it writes.'],
    summary: 'The umbrella has drifted from its libraries.',
  }
}
