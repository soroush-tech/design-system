import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('styled-system'),
  title: 'Styled System',
  description:
    'Overview of @soroush.tech/styled-system: responsive style props, theme scales, and the system() builder.',
} satisfies Config
