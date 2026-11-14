/** One sample item. */
export interface Item {
  id: string
  title: string
  summary: string
  status: 'todo' | 'doing' | 'done'
}

/**
 * Sample data, so the items pages have something to show: each page's +data reads it at build
 * time. Make the +data hooks fetch your own data instead, and remove this file.
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
    summary: 'A folder in src/pages with a +Page in it is a new route.',
    status: 'todo',
  },
  {
    id: 'data',
    title: 'Read your own data',
    summary: 'Each +data here reads this file. Make it fetch from your API, at build time.',
    status: 'todo',
  },
  {
    id: 'build',
    title: 'Build it',
    summary: 'The build prerenders every page, these items among them, to HTML with its styles.',
    status: 'done',
  },
  {
    id: 'deploy',
    title: 'Deploy it',
    summary: 'The build is static files in dist/client, which any static host serves.',
    status: 'todo',
  },
]
