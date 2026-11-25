import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('react'),
  title: 'Design System',
  description:
    'Overview of @soroush.design/react: the component inventory, theme tokens, and how the pieces fit together.',
} satisfies Config
