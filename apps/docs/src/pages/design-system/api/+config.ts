import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'Component API',
  description:
    'The prop reference index: every component with a link to its props, tokens, and defaults.',
} satisfies Config
