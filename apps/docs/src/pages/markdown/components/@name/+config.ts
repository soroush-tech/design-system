import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('markdown'),
  title: 'Markdown component',
  description: 'Props and usage for a @soroush.tech/markdown component.',
} satisfies Config
