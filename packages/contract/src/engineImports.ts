import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * The files an app, or a reader of the docs, sees: none of them imports the engine
 * (`@umber-style/*`). What an app needs of it is exported by `@gild-ui/react`. The package's own
 * source (`packages/react/src`, but not its stories and markdown), `react-markdown`'s source and
 * the measure scripts are outside this list on purpose: they may use the engine.
 */
export const guardedPatterns: RegExp[] = [
  /^apps\//,
  /^packages\/cli\/templates\//,
  /^packages\/cli\/type-tests\/create-/,
  /^packages\/[^/]+\/docs\//,
  /^packages\/[^/]+\/README\.md$/,
  /^packages\/[^/]+\/src\/.*\.mdx?$/,
  /^packages\/react\/src\/.*\.stories\.tsx$/,
  /^packages\/mcp\//,
  /^plugins\//,
]

/** What an import of the engine looks like in code, a doc's example, a mock, or a manifest. */
const engineImport =
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\(\s*|\bmock\(\s*)['"]@umber-style\/|"@umber-style\/[\w-]+"\s*:/

/** Whether `path` (relative to the repository, with `/`) is a file that must not import the engine. */
export const isGuarded = (path: string): boolean =>
  guardedPatterns.some((pattern) => pattern.test(path)) && !path.includes('/node_modules/')

/** The guarded files among `files` that import the engine, one line each. */
export const findEngineImports = (files: ReadonlyArray<{ path: string; text: string }>): string[] =>
  files
    .filter(({ path, text }) => isGuarded(path) && engineImport.test(text))
    .map(({ path }) => `${path} imports @umber-style/*: use @gild-ui/react`)

/** The files git tracks in `root`, relative to it. */
export const trackedFiles = (root: string): string[] =>
  execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 })
    .split('\0')
    .filter(Boolean)

/** The tracked files of `root` that import the engine and must not. */
export const checkEngineImports = (root: string): string[] =>
  findEngineImports(
    trackedFiles(root)
      .filter(isGuarded)
      .flatMap((path) => {
        try {
          return [{ path, text: readFileSync(join(root, path), 'utf8') }]
        } catch {
          // A tracked file that is deleted in the working tree has nothing to read.
          return []
        }
      })
  )
