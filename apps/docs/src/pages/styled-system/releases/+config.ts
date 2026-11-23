import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('styled-system'),
  title: 'Styled System releases',
  description: 'What each release of @soroush.design/styled-system changed.',
} satisfies Config
