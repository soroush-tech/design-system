import type { Catalog } from '../catalog/catalogRules'
import { validateCatalog } from '../catalog/validateCatalog'
import { composeCatalog } from '../core/composeCatalog'
import { CATALOGS, designSystemCatalog } from '../fixtures/catalogs'
import { validateSurface } from '../surface/validateSurface'
import type { JsonObject } from '../types'
import { applyTheme } from './theme'

const CATALOG_ID = 'https://app.test/ui/catalog.json'

const catalogOf = (components: Record<string, JsonObject>): Catalog =>
  composeCatalog({ catalogId: CATALOG_ID, title: 'App', components }) as Catalog

const component = (name: string, properties: JsonObject, sources?: unknown): JsonObject => ({
  type: 'object',
  properties: { component: { const: name }, ...properties },
  required: ['component'],
  ...(sources === undefined ? {} : { metadata: { extensions: { tech_soroush_theme: sources } } }),
})

const propsOf = (catalog: Catalog, name: string) =>
  (catalog.components as Record<string, { properties: JsonObject }>)[name]!.properties

describe('applyTheme', () => {
  // An app that widened the palette and registered a Button variant in its theme.
  const theme = {
    scales: { palette: ['default', 'primary', 'secondary', 'error', 'brand'] },
    variants: { Button: ['contained', 'outlined', 'text', 'dashed'] },
  }
  const dashed = [
    {
      version: 'v1.0',
      createSurface: {
        surfaceId: 'page',
        catalogId: designSystemCatalog.catalogId,
        components: [
          { id: 'root', component: 'Button', child: 'label', variant: 'dashed', color: 'brand' },
          { id: 'label', component: 'Typography', text: 'Save' },
        ],
      },
    },
  ]

  it('opens a catalog to the values an app added through its theme', () => {
    // Frozen at the base values, the catalog refuses UI that is valid for this app.
    const base = validateSurface(dashed, { catalogs: CATALOGS })
    const themed = applyTheme(designSystemCatalog, theme)

    expect(base.map(({ code, path }) => `${code} ${path}`)).toEqual([
      'component-schema /0/createSurface/components/0/variant',
      'component-schema /0/createSurface/components/0/color',
    ])
    expect(validateSurface(dashed, { catalogs: [themed] })).toEqual([])
    expect(validateCatalog(themed)).toEqual([])
  })

  it('leaves the catalog it was given as it was', () => {
    const before = JSON.stringify(designSystemCatalog)

    applyTheme(designSystemCatalog, theme)

    expect(JSON.stringify(designSystemCatalog)).toBe(before)
  })

  it('fills every copy of the token enumeration, and keeps the other literals a prop takes', () => {
    const tokens = ['primary', 'secondary']
    const catalog = catalogOf({
      Text: component(
        'Text',
        {
          // Tokens, one per breakpoint, or the one literal that is not a token.
          color: {
            anyOf: [
              { enum: tokens },
              { type: 'array', items: { enum: tokens } },
              { const: 'inherit' },
            ],
          },
          // The same values, but not declared as coming from the theme.
          accent: { enum: tokens },
        },
        { props: { color: { scale: 'text' } } }
      ),
    })

    const themed = applyTheme(catalog, { scales: { text: ['primary', 'muted'] }, variants: {} })

    expect(propsOf(themed, 'Text')).toMatchObject({
      color: {
        anyOf: [
          { enum: ['primary', 'muted'] },
          { type: 'array', items: { enum: ['primary', 'muted'] } },
          { const: 'inherit' },
        ],
      },
      accent: { enum: tokens },
    })
  })

  it('keeps the values of a source the theme says nothing about', () => {
    const catalog = catalogOf({
      Box: component(
        'Box',
        { bg: { enum: ['paper'] }, size: { enum: ['sm'] } },
        {
          props: { bg: { scale: 'background' }, size: { variants: 'Box' } },
        }
      ),
    })

    const themed = applyTheme(catalog, { scales: {}, variants: {} })

    expect(propsOf(themed, 'Box')).toEqual(propsOf(catalog, 'Box'))
  })

  it('takes a catalog with no components', () => {
    const functionsOnly = { catalogId: CATALOG_ID } as Catalog

    expect(applyTheme(functionsOnly, theme)).toEqual({ catalogId: CATALOG_ID, components: {} })
  })
})

describe('validateCatalog: theme sources', () => {
  const located = (catalog: Catalog) =>
    validateCatalog(catalog).map(({ code, path }) => `${code} ${path}`)
  const at = '/components/Box/metadata/extensions/tech_soroush_theme'

  it('accepts a source for a prop that has an enumeration', () => {
    const catalog = catalogOf({
      Box: component(
        'Box',
        { bg: { enum: ['paper'] } },
        { props: { bg: { scale: 'background' } } }
      ),
    })

    expect(validateCatalog(catalog)).toEqual([])
  })

  it('reports a source that is not one scale or one set of variants', () => {
    const catalog = catalogOf({
      Box: component(
        'Box',
        { bg: { enum: ['paper'] } },
        {
          props: { bg: { scale: 'background', variants: 'Box' } },
          note: 'extra',
        }
      ),
    })

    expect(located(catalog)).toEqual([`catalog-theme ${at}/note`, `catalog-theme ${at}/props/bg`])
  })

  it('reports a source for a prop with nothing for the theme to fill', () => {
    const catalog = catalogOf({
      Box: component(
        'Box',
        { title: { type: 'string' }, tags: { anyOf: [{ type: 'string' }] } },
        {
          props: { title: { scale: 'text' }, tags: { scale: 'text' }, missing: { scale: 'text' } },
        }
      ),
    })

    expect(validateCatalog(catalog)).toEqual([
      {
        code: 'catalog-theme',
        path: `${at}/props/title`,
        message: '"Box" has no prop "title" with an enumeration for the theme to fill.',
      },
      {
        code: 'catalog-theme',
        path: `${at}/props/tags`,
        message: '"Box" has no prop "tags" with an enumeration for the theme to fill.',
      },
      {
        code: 'catalog-theme',
        path: `${at}/props/missing`,
        message: '"Box" has no prop "missing" with an enumeration for the theme to fill.',
      },
    ])
  })

  it('ignores a theme key that carries no props', () => {
    // The extension slot is free-form to A2UI, so a malformed value is ours alone to report.
    const catalog = catalogOf({ Box: component('Box', {}, 'nonsense') })

    expect(located(catalog)).toEqual([`catalog-theme ${at}`])
    expect(applyTheme(catalog, { scales: {}, variants: {} })).toEqual(catalog)
  })
})
