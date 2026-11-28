import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('react'),
  title: 'Gild UI for React',
  description:
    'Overview of @gild-ui/react: the component inventory, theme tokens, and how the pieces fit together.',
} satisfies Config
