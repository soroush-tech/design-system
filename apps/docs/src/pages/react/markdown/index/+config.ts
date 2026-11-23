import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('markdown'),
  title: 'Markdown',
  description:
    'Overview of @soroush.design/react-markdown: the editor, preview, and code-rendering companion components.',
} satisfies Config
