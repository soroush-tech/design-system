import type { Config } from 'vike/types'
// Vike config-time file: the src alias is unavailable here, so the import is relative.
import { docsSection } from '../../common/sectionRoute'

export default {
  // Snapshot builds carry a single section - the packages page stays live-only.
  prerender: !docsSection(),
  title: 'Packages',
  description:
    'The @soroush.tech packages: the design system, markdown, styled-system, the MCP server and the UI spec - with their docs, npm pages and source.',
} satisfies Config
