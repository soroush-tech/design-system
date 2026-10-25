import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('mcp'),
  title: 'MCP server releases',
  description: 'What each release of @soroush.design/mcp changed.',
} satisfies Config
