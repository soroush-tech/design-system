import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('react'),
  title: 'Design System releases',
  description: 'What each release of @soroush.design/react-components changed.',
} satisfies Config
