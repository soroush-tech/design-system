// What a migration step is, and what it is given. A step is data and one function: it reads the
// app as the steps before it left it, and answers with the changes it wants. The runner (migrate.ts)
// applies them; a step never writes.
import type { PackageJson } from '../detect/detect'
import type { PackageManager } from '../plan/planInit'

export type DependencySection = 'dependencies' | 'devDependencies'

/**
 * One change a step asks for, in the kinds init's plan has:
 * - `create` and `edit`: a file, by its path from the app's folder. An edit gives the whole new
 *   text; the runner reads the old one, so a step never repeats it.
 * - `dependency`: `add` sets a range (in `section` when the app lacks the package, `dependencies`
 *   by default), `update` sets it only where the app has the package, and `remove` takes it out of
 *   both sections. package.json itself is changed only this way, never by an `edit`.
 * - `report`: something only a person can decide, with the file and line it is at, and the stable
 *   `code` of its kind (an inventory id as STY-007, or IMP-SPLIT).
 */
export type Change =
  | { kind: 'create'; path: string; content: string }
  | { kind: 'edit'; path: string; after: string }
  | {
      kind: 'dependency'
      action: 'add' | 'update'
      name: string
      range: string
      section?: DependencySection
    }
  | { kind: 'dependency'; action: 'remove'; name: string }
  | { kind: 'report'; path: string; line?: number; code: string; message: string }

/** The app as a step sees it: the files as the steps before it left them. Read-only. */
export interface MigrationApp {
  packageJson: PackageJson
  packageManager: PackageManager
  /** A file's text, by its path from the app's folder, or `undefined` when there is none. */
  readFile: (path: string) => string | undefined
  /** Every file in the app, sorted, by its path from the app's folder. */
  listFiles: () => string[]
}

/** One move from a version of a package to the next: `from` it, `to` a version of its own. */
export interface MigrationStep {
  /** Names the step's folder: `steps/<id>/index.ts`. */
  id: string
  /**
   * The versions it starts from. `range` is a version with `x` for what may vary: `2.x`,
   * `0.1.x`, or one exact version.
   */
  from: { package: string; range: string }
  /** The package and the exact version the app is on after it. */
  to: { package: string; version: string }
  /** One line for the plan: what the step moves. */
  summary: string
  /** The changes the step asks for, working from `app`, writing nothing. */
  plan: (app: MigrationApp) => Change[]
}

/** The package an app is on, and its version. */
export interface AppVersion {
  package: string
  version: string
  /** Set when the version was read from package.json's range, as no install was found. */
  note?: string
}
