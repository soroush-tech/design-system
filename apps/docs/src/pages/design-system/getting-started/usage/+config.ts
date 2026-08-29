import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'Usage',
  description:
    'Per-component subpath imports, styled-system props against theme scales, and the layout primitives.',
} satisfies Config
