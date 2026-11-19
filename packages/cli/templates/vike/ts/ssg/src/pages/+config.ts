import type { Config } from 'vike/types'

// The settings of every page: https://vike.dev/config
export default {
  // SSG: every page is HTML at build time, with no JavaScript in the browser: a link loads the
  // next page.
  prerender: true,
  // The page and +Layout, a setting of this app's own, load at build time only.
  meta: {
    Page: { env: { server: true, client: false } },
    Layout: { env: { server: true, client: false } },
  },
} satisfies Config
