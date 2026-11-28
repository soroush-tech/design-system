import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('react'),
  title: 'Gild UI for React releases',
  description: 'What each release of @gild-ui/react changed.',
} satisfies Config
