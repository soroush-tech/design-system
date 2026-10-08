import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  applyTheme,
  type Behavior,
  type Catalog,
  composeCatalog,
  validateBehavior,
  validateCatalog,
  validateSurface,
} from './index'

const README = readFileSync(fileURLToPath(new URL('../README.md', import.meta.url)), 'utf8')

/** The JSON blocks of the README, in order, so its examples are checked rather than trusted. */
const jsonBlocks = [...README.matchAll(/```json\n([\s\S]*?)```/g)].map(([, body]) => body as string)

const CATALOG_ID = 'https://example.com/ui/catalog.json'
const dynamic = (literal: object) => ({
  anyOf: [
    literal,
    { $ref: 'common_types.json#/$defs/DataBinding' },
    { $ref: 'common_types.json#/$defs/FunctionCall' },
  ],
})

/** The catalog the README builds, with the two components its other examples use. */
const catalog = composeCatalog({
  catalogId: CATALOG_ID,
  title: 'Example app',
  components: {
    Typography: {
      type: 'object',
      properties: {
        component: { const: 'Typography' },
        text: { $ref: 'common_types.json#/$defs/DynamicString' },
        variant: dynamic({ enum: ['h1', 'body1'] }),
      },
      required: ['component', 'text'],
    },
    Button: {
      type: 'object',
      properties: {
        component: { const: 'Button' },
        color: dynamic({ enum: ['default', 'primary'] }),
        variant: dynamic({ enum: ['contained', 'outlined'] }),
      },
      required: ['component'],
      metadata: JSON.parse(`{${jsonBlocks[0]}}`).metadata,
    },
  },
}) as Catalog

const text = (id: string) => ({ id, component: 'Typography', text: id })

describe('the README', () => {
  it('builds a catalog that validates, as it says', () => {
    expect(validateCatalog(catalog)).toEqual([])
  })

  it('declares theme sources that open a catalog to the theme it shows', () => {
    const themed = applyTheme(catalog, {
      scales: { palette: ['default', 'primary', 'brand'] },
      variants: { Button: ['contained', 'outlined', 'dashed'] },
    })
    const messages = [
      {
        version: 'v1.0',
        createSurface: {
          surfaceId: 'page',
          catalogId: CATALOG_ID,
          components: [{ id: 'root', component: 'Button', color: 'brand', variant: 'dashed' }],
        },
      },
    ]

    expect(validateCatalog(themed)).toEqual([])
    expect(validateSurface(messages, { catalogs: [themed] })).toEqual([])
    expect(validateSurface(messages, { catalogs: [catalog] })).toHaveLength(2)
  })

  it('shows a `When` and a behavior document that validate together', () => {
    const when = JSON.parse(jsonBlocks[1] as string)
    const behavior = JSON.parse(jsonBlocks[2] as string) as Behavior
    const link = JSON.parse(`{${jsonBlocks[3]}}`).metadata
    const messages = [
      {
        version: 'v1.0',
        createSurface: {
          surfaceId: 'articles_page',
          catalogId: CATALOG_ID,
          metadata: link,
          components: [
            { ...when, id: 'root' },
            text('list_skeleton'),
            text('list_error'),
            text('article_list'),
          ],
        },
      },
    ]

    expect(validateSurface(messages, { catalogs: [catalog], behavior })).toEqual([])
    expect(validateBehavior(behavior, { messages, catalogs: [catalog] })).toEqual([])
  })
})
