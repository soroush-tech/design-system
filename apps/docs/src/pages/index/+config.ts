import type { Config } from 'vike/types'
// Vike config-time file: the src alias is unavailable here, so the import is relative.
import { docsSection } from '../../common/sectionRoute'

export default {
  // Snapshot builds carry a single section - the landing page stays live-only.
  prerender: !docsSection(),
  title: 'Design system documentation',
  description:
    'Documentation and live demos for the @soroush.tech packages: design-system, markdown, and styled-system.',
} satisfies Config
