import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('markdown'),
  title: 'Markdown releases',
  description: 'What each release of @gild-ui/react-markdown changed.',
} satisfies Config
