import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('styled-system'),
  title: 'Styled-system docs',
  description: 'Guides and reference documentation for @soroush.tech/styled-system.',
} satisfies Config
