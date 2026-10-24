import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('ui-spec'),
  title: 'UI spec',
  description:
    'The @soroush.tech generative-UI spec: A2UI catalogs, a behavior schema and validators.',
} satisfies Config
