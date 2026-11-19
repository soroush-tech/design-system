import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('cli'),
  title: 'Command line releases',
  description: 'What each release of @soroush.design/cli changed.',
} satisfies Config
