import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'How to customize',
  description:
    'Per-component customization via theme.components: defaultProps, styleOverrides, variants, and slot props.',
} satisfies Config
