import type { Config } from 'vike/types'

// The settings of every page: https://vike.dev/config
export default {
  // SPA: every page is an empty HTML shell from the build, which the browser renders; the app
  // moves between pages with no reload.
  prerender: true,
  clientRouting: true,
  // The page and +Layout, a setting of this app's own, load in the browser only.
  meta: {
    Page: { env: { server: false, client: true } },
    Layout: { env: { server: false, client: true } },
  },
} satisfies Config
