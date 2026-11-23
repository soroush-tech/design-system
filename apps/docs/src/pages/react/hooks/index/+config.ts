import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('react'),
  title: 'Hooks',
  description:
    'The React hooks that belong to no component and no theme, and which of them need a browser.',
} satisfies Config
