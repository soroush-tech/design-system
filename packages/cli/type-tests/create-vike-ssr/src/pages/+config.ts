import type { Config } from 'vike/types'

// The settings of every page: https://vike.dev/config
export default {
  // SSR: every page is rendered on the server, on each request, then the app moves between pages
  // in the browser, with no reload. Vike's own server runs the build: npm start.
  server: true,
  clientRouting: true,
  hydrationCanBeAborted: true,
  // +Layout is a setting of this app's own: the component every page renders inside.
  meta: {
    Layout: { env: { server: true, client: true } },
  },
} satisfies Config
