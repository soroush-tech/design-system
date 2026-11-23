import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('react'),
} satisfies Config
