import type { DocsSection } from './sections'

// Alone in a module of its own, with no import that runs: the docs app's route files read it
// when Vike loads its config, in plain Node, where nothing else of this package can be loaded.

/**
 * Where each section is on the docs site (`/<route>/`): the path an app imports it from in the
 * `soroush.design` umbrella - `react`, and `react/markdown` for the library that will be mounted
 * under it.
 */
export const sectionRoutes: Record<DocsSection, string> = {
  react: 'react',
  markdown: 'react/markdown',
  'styled-system': 'styled-system',
  mcp: 'mcp',
  'ui-spec': 'ui-spec',
  cli: 'cli',
}
