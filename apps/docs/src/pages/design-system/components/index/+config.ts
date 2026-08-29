import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'Components',
  description:
    'Every design-system component by category: layout, content, inputs, feedback, and overlay primitives.',
} satisfies Config
