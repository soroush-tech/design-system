import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('ui-spec'),
  title: 'UI spec releases',
  description: 'What each release of @soroush.tech/ui-spec changed.',
} satisfies Config
