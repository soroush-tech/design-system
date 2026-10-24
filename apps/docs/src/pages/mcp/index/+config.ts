import type { Config } from 'vike/types'
import { sectionPrerender } from '../../../common/sectionRoute'

export default {
  prerender: sectionPrerender('mcp'),
  title: 'MCP server',
  description:
    'The @soroush.tech MCP server: the component inventory, READMEs and theme tokens for AI coding tools.',
} satisfies Config
