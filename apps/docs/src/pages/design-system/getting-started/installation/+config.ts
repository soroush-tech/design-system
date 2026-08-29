import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'Installation',
  description:
    'Install @soroush.tech/design-system, wrap your app in the ThemeProvider, and set up the fonts.',
} satisfies Config
