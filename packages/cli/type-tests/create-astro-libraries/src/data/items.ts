/** One sample item. */
export interface Item {
  id: string
  title: string
  summary: string
  status: 'todo' | 'doing' | 'done'
}

/**
 * Sample data, so the items pages have something to show: the pages in src/pages/items read it
 * on each request. Make them fetch your own data instead, and remove this file.
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
    summary: 'An .astro file in src/pages is a new route: it renders your components.',
    status: 'todo',
  },
  {
    id: 'data',
    title: 'Read your own data',
    summary: 'The items pages read this file on each request. Make them fetch from your API.',
    status: 'todo',
  },
  {
    id: 'build',
    title: 'Build it',
    summary: 'The server renders every page, these items among them, as HTML with its styles.',
    status: 'done',
  },
  {
    id: 'deploy',
    title: 'Deploy it',
    summary: 'npm start runs the server the build wrote, on any Node host.',
    status: 'todo',
  },
]
