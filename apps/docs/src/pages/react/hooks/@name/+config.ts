import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('react'),
  title: 'Hook',
  description: 'How to use a hook of @gild-ui/hooks, and whether it needs a browser.',
} satisfies Config
