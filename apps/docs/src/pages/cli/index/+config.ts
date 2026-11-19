import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('cli'),
  title: 'Command line',
  description:
    'npx @soroush.tech/design-system init sets the design system up in an existing React app, showing every change first.',
} satisfies Config
