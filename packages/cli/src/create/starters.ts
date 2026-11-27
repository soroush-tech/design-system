import type { Scheme } from '../templates/templates'
import type { Library } from './libraries'
import { astroStarter } from './astro/astro'
import { reactRouterStarter } from './react-router/react-router'
import { vikeStarter } from './vike/vike'

/**
 * How the app's pages are rendered: `isomorphic`, prerendered to HTML at build time and then
 * moving between pages in the browser; `ssr`, rendered on a server on each request, then the
 * same; `spa`, rendered in the browser only; `ssg`, HTML only, with no JavaScript in the browser.
 */
export type Rendering = 'isomorphic' | 'ssr' | 'spa' | 'ssg'

/** The renderings, in the order create offers them. The first is the default. */
export const RENDERINGS: readonly Rendering[] = ['isomorphic', 'ssr', 'spa', 'ssg']

/** What a starter is told: everything the developer chose, and Gild UI to install. */
export interface StarterFacts {
  /** The app's folder, as it was typed. */
  name: string
  /** The name in its package.json: the folder's, in the lowercase npm takes. */
  packageName: string
  /** What its pages call it. */
  title: string
  isTypeScript: boolean
  rendering: Rendering
  /** The libraries to add, with their wiring and an example of each. */
  libraries: readonly Library[]
  scheme: Scheme
  /** Adds the pages that read sample data. */
  hasSampleData: boolean
  /** The version of Gild UI the app gets. */
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
  /** What the framework question says of it. */
  label: string
  /** The renderings it writes, in the order create offers them. */
  renderings: readonly Rendering[]
  /** Whether it adds the libraries create offers. */
  hasLibraries: boolean
  createFiles: (facts: StarterFacts) => StarterFile[]
}

/** The starters, by the name `--framework` takes. The first is the default. */
export const STARTERS: Readonly<Record<string, Starter>> = {
  vike: vikeStarter,
  astro: astroStarter,
  'react-router': reactRouterStarter,
}
