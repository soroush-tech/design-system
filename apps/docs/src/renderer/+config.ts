import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'
// Vike config-time file: the src alias is unavailable here, so the import is relative.
import { readNodeEnv } from '../common/sectionRoute'

// https://vike.dev/config
export const config = {
  prerender: readNodeEnv('SKIP_PRERENDER') !== 'true',
  passToClient: [],
  clientRouting: true,
  hydrationCanBeAborted: true,
  extends: [vikeReact],
  meta: {
    title: {
      env: {
        server: true,
        client: true,
      },
    },
    description: {
      env: { server: true, client: true },
    },
    robots: {
      env: { server: true, client: true },
    },
  },
} satisfies Config
