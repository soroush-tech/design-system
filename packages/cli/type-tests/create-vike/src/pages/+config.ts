import type { Config } from 'vike/types'

// The settings of every page: https://vike.dev/config
export default {
  clientRouting: true,
  hydrationCanBeAborted: true,
  // +Layout is a setting of this app's own: the component every page renders inside.
  meta: {
    Layout: { env: { server: true, client: true } },
  },
} satisfies Config
