import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { content, findComponent, findDoc } from './content'
import { search } from './search'
import { tokenPath } from './tokenPath'
import type { ComponentRecord, ContentBundle } from './types'

export const SERVER_NAME = 'soroush-design-system'

const text = (body: string) => ({ content: [{ type: 'text' as const, text: body }] })

const componentLine = (component: ComponentRecord): string =>
  `- **${component.name}** (${component.packageName}) - ${component.summary}`

/** The inventory, grouped by category so a reader can scan by intent. */
export const renderInventory = (bundle: ContentBundle, pkg?: string): string => {
  const components = pkg ? bundle.components.filter((item) => item.pkg === pkg) : bundle.components
  if (!components.length) {
    const packages = [...new Set(bundle.components.map((item) => item.pkg))].join(', ')
    return `No components in package "${pkg}". Available packages: ${packages}.`
  }
  const groups = new Map<string, ComponentRecord[]>()
  for (const component of components) {
    const key = component.category ?? `${component.packageName} components`
    groups.set(key, [...(groups.get(key) ?? []), component])
  }
  return [
    `${components.length} components. Import each from its own subpath, e.g. \`${components[0].importPath}\`.`,
    '',
    ...[...groups].flatMap(([label, items]) => [`## ${label}`, ...items.map(componentLine), '']),
    `Use \`get_component\` for a component's full README - pass part="api" for its props reference.`,
  ].join('\n')
}

const PART_LABEL = {
  intro: 'what it is and how it composes',
  api: 'props reference',
  examples: 'examples',
} as const

/** One component's README, whole or sliced. */
export const renderComponent = (
  component: ComponentRecord,
  part: 'all' | 'intro' | 'api' | 'examples'
): string => {
  const header = [
    `# ${component.name}`,
    '',
    `\`${component.importPath}\``,
    '',
    `Package: ${component.packageName} - Docs: ${component.url}`,
    '',
  ].join('\n')

  if (part === 'all') {
    return [header, component.intro, component.api, component.examples]
      .filter(Boolean)
      .join('\n\n')
      .trimEnd()
  }

  const section = component[part]
  if (section) return `${header}\n${section}`.trimEnd()
  return [
    header,
    `This component's README has no separate ${PART_LABEL[part]} section.`,
    '',
    component.intro,
  ].join('\n')
}

/** The token contract, as dotted paths so values can be quoted directly in code. */
export const renderTokens = (bundle: ContentBundle, scale?: string): string => {
  const scales = scale ? bundle.tokens.filter((item) => item.name === scale) : bundle.tokens
  if (!scales.length) {
    return `Unknown scale "${scale}". Available: ${bundle.tokens.map((item) => item.name).join(', ')}.`
  }
  return [
    `Theme tokens from \`baseTheme\` (@soroush.tech/design-system ${bundle.version}).`,
    'Reference them through the theme - never hardcode the literal value.',
    '',
    ...scales.flatMap((item) => [
      `## ${item.name}`,
      ...item.tokens.map(
        ({ path, value }) => `- \`theme.${tokenPath(item.name, path)}\`: ${String(value)}`
      ),
      '',
    ]),
  ].join('\n')
}

export const renderDocIndex = (bundle: ContentBundle): string =>
  [
    'Guides and references. Fetch one with `get_doc`.',
    '',
    ...bundle.docs.map((doc) => `- \`${doc.id}\` - ${doc.title}: ${doc.summary}`),
  ].join('\n')

/** Builds the MCP server. Transport-agnostic: stdio and the Worker both use this. */
export const createMcpServer = (bundle: ContentBundle = content): McpServer => {
  const server = new McpServer({ name: SERVER_NAME, version: bundle.version })

  server.registerTool(
    'list_components',
    {
      description:
        'List every component in the @soroush.tech design system with its category, one-line summary, and exact subpath import. Start here when building UI with this library.',
      inputSchema: {
        package: z
          .enum(['design-system', 'markdown'])
          .optional()
          .describe('Limit to one package. Omit for everything.'),
      },
    },
    async ({ package: pkg }) => text(renderInventory(bundle, pkg))
  )

  server.registerTool(
    'get_component',
    {
      description:
        "Get a component's documentation from its README: `intro` (what it is and how it composes), `api` (its props with token values and defaults), `examples`, or `all`. Use this before writing markup with a component.",
      inputSchema: {
        name: z.string().describe('Component name or slug, e.g. "Button" or "text-input".'),
        part: z
          .enum(['all', 'intro', 'api', 'examples'])
          .optional()
          .describe('Which README section to return. Defaults to "all".'),
      },
    },
    async ({ name, part }) => {
      const component = findComponent(name, bundle)
      if (!component) {
        const names = bundle.components.map((item) => item.name).join(', ')
        return text(`Unknown component "${name}". Available: ${names}.`)
      }
      return text(renderComponent(component, part ?? 'all'))
    }
  )

  server.registerTool(
    'get_tokens',
    {
      description:
        'Get the theme token contract - spacing, radii, palette, typography and the other scales, serialized from the live baseTheme. Use it to pick token names instead of hardcoding values.',
      inputSchema: {
        scale: z
          .string()
          .optional()
          .describe('One scale, e.g. "space", "palette", "radii". Omit for all of them.'),
      },
    },
    async ({ scale }) => text(renderTokens(bundle, scale))
  )

  server.registerTool(
    'list_docs',
    {
      description:
        'List the available guides and references: installation, usage, theming, customization, app setup, the layout kit, the brand theme, and the styled-system docs.',
      inputSchema: {},
    },
    async () => text(renderDocIndex(bundle))
  )

  server.registerTool(
    'get_doc',
    {
      description: 'Get one guide or reference in full, by the id shown in `list_docs`.',
      inputSchema: {
        id: z.string().describe('Doc id, e.g. "theming" or "styled-system/api".'),
      },
    },
    async ({ id }) => {
      const doc = findDoc(id, bundle)
      if (!doc) {
        const ids = bundle.docs.map((item) => item.id).join(', ')
        return text(`Unknown doc "${id}". Available: ${ids}.`)
      }
      return text(`# ${doc.title}\n\n${doc.body}`)
    }
  )

  server.registerTool(
    'search_docs',
    {
      description:
        'Search components and guides by keyword. Returns the best matches with snippets; follow up with get_component or get_doc for the full text.',
      inputSchema: {
        query: z.string().describe('Free-text query, e.g. "dark mode" or "focus trap".'),
      },
    },
    async ({ query }) => {
      const hits = search(bundle, query)
      if (!hits.length) return text(`No matches for "${query}".`)
      return text(
        [
          `${hits.length} match(es) for "${query}":`,
          '',
          ...hits.map(
            (hit) => `- **${hit.title}** (${hit.kind}, ref \`${hit.ref}\`)\n  ${hit.snippet}`
          ),
        ].join('\n')
      )
    }
  )

  return server
}
