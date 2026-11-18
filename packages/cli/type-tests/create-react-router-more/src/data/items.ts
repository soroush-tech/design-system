/** One sample item. */
export interface Item {
  id: string
  title: string
  summary: string
  status: 'todo' | 'doing' | 'done'
}

/**
 * Sample data, so the items pages have something to show: src/data/api.ts answers with it. Make
 * src/data/api.ts fetch from your API instead, and remove this file.
 */
export const items: readonly Item[] = [
  {
    id: 'theme',
    title: 'Make the theme your own',
    summary: 'Change the colors and fonts of both themes in src/theme/themes.ts.',
    status: 'doing',
  },
  {
    id: 'fonts',
    title: 'Load the fonts',
    summary: 'The theme names Space Grotesk and JetBrains Mono, and does not load them.',
    status: 'todo',
  },
  {
    id: 'pages',
    title: 'Add a page',
    summary: 'A component in src/pages, and a route for it in src/routes.tsx, is a new page.',
    status: 'todo',
  },
  {
    id: 'data',
    title: 'Read your own data',
    summary: 'src/data/api.ts answers with this file. Make it fetch from your API.',
    status: 'todo',
  },
  {
    id: 'build',
    title: 'Build it',
    summary: 'The build writes the app to dist: one HTML page, and the scripts that render it.',
    status: 'done',
  },
  {
    id: 'deploy',
    title: 'Deploy it',
    summary: 'Any static host serves dist, once it answers every path with index.html.',
    status: 'todo',
  },
]
