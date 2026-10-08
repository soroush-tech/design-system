import { validateCatalog } from '../catalog/validateCatalog'
import { composeCatalog } from './composeCatalog'

const CATALOG_ID = 'https://app.test/ui/catalog.json'
const BADGE = {
  type: 'object',
  properties: {
    component: { const: 'Badge' },
    label: { $ref: 'common_types.json#/$defs/DynamicString' },
  },
  required: ['component', 'label'],
}

describe('composeCatalog', () => {
  it('builds a catalog the A2UI meta-schema and the catalog rules accept', () => {
    const catalog = composeCatalog({
      catalogId: CATALOG_ID,
      title: 'App',
      components: { Badge: BADGE },
    })

    expect(validateCatalog(catalog)).toEqual([])
  })

  it('addresses the catalog by its id and declares the protocol version', () => {
    const catalog = composeCatalog({ catalogId: CATALOG_ID, title: 'App', components: {} })

    expect(catalog).toMatchObject({
      $id: CATALOG_ID,
      catalogId: CATALOG_ID,
      protocolVersion: '1.0',
      title: 'App',
    })
  })

  it('adds the core to what the app brings, and lists every entry for the envelope', () => {
    const double = {
      type: 'object',
      returnType: 'number',
      properties: { '@call': { const: 'double' }, args: { type: 'object' } },
      required: ['@call'],
    }
    const catalog = composeCatalog({
      catalogId: CATALOG_ID,
      title: 'App',
      description: 'The app catalog.',
      instructions: 'Use tokens.',
      components: { Badge: BADGE },
      functions: { double },
    }) as {
      components: object
      functions: object
      $defs: { anyComponent: object; anyFunction: { oneOf: object[] } }
    }

    expect(Object.keys(catalog.components)).toEqual(['Badge', 'When'])
    expect(Object.keys(catalog.functions)).toContain('select')
    expect(Object.keys(catalog.functions)).toContain('double')
    expect(catalog.$defs.anyComponent).toEqual({
      oneOf: [{ $ref: '#/components/Badge' }, { $ref: '#/components/When' }],
    })
    expect(catalog.$defs.anyFunction.oneOf).toContainEqual({ $ref: '#/functions/double' })
    expect(catalog).toMatchObject({ description: 'The app catalog.', instructions: 'Use tokens.' })
    expect(validateCatalog(catalog)).toEqual([])
  })

  it('refuses a catalog that redefines what the core owns', () => {
    // A composed catalog always carries the standard `When`; replacing it quietly would change
    // what every surface written against the spec means.
    const parts = { catalogId: CATALOG_ID, title: 'App' }

    expect(() => composeCatalog({ ...parts, components: { When: BADGE } })).toThrow(
      'The core defines When; a catalog cannot redefine it.'
    )
    expect(() =>
      composeCatalog({ ...parts, components: {}, functions: { select: {}, max: {} } })
    ).toThrow('The core defines select, max')
  })
})
