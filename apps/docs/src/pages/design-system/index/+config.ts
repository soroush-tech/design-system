import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'Design System',
  description:
    'Overview of @soroush.design/react-components: the component inventory, theme tokens, and how the pieces fit together.',
} satisfies Config
