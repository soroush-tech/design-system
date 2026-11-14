import type { Scheme } from '../templates/templates'
import { vikeStarter } from './vike/vike'

/** What a starter is told: everything the developer chose, and the design system to install. */
export interface StarterFacts {
  /** The app's name, which is also its folder's. */
  name: string
  isTypeScript: boolean
  scheme: Scheme
  /** The version of the design system the app gets. */
  version: string
}

/** A file a starter writes, by its path from the app's folder. */
export interface StarterFile {
  path: string
  content: string
}

/**
 * One framework `create` can start an app on. It only supplies the files: their `package.json`
 * lists what to install, and `create` does the rest the same way for every starter.
 */
export interface Starter {
  /** How the plan names it: `create will make my-app, a <title> app`. */
  title: string
  createFiles: (facts: StarterFacts) => StarterFile[]
}

/** The starters, by the name `--framework` takes. The first is the default. */
export const STARTERS: Readonly<Record<string, Starter>> = { vike: vikeStarter }
