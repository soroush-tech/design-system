import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'Theming',
  description:
    'Build brand themes with createTheme: the token ladder, component defaults, and extending the type system.',
} satisfies Config
