import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('design-system'),
  title: 'Installation',
  description:
    'Install @soroush.design/react-components, wrap your app in the ThemeProvider, and set up the fonts.',
} satisfies Config
