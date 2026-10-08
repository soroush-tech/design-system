import basicCatalog from '../../vendor/a2ui/v1_0/catalogs/basic/catalog.json'
import testingCatalog from '../../vendor/a2ui/v1_0/test/testing_catalog.json'
import type { JsonObject } from '../types'
import { getDeclaredProperties } from './catalogRules'
import { validateCatalog } from './validateCatalog'

const CATALOG_ID = 'https://app.test/ui/catalog.json'

/** A valid catalog holding `components` and `functions`, to break one thing at a time. */
const catalogWith = (components: JsonObject, functions: JsonObject = {}): JsonObject => ({
  $id: CATALOG_ID,
  catalogId: CATALOG_ID,
  protocolVersion: '1.0',
  components,
  functions,
})

const component = (name: string, properties: JsonObject = {}): JsonObject => ({
  type: 'object',
  properties: { component: { const: name }, ...properties },
  required: ['component'],
})

const fn = (name: string, args: JsonObject = {}): JsonObject => ({
  type: 'object',
  returnType: 'string',
  properties: { '@call': { const: name }, args: { type: 'object', properties: args } },
  required: ['@call'],
})

const located = (catalog: unknown) =>
  validateCatalog(catalog).map(({ code, path }) => `${code} ${path}`)

describe('validateCatalog', () => {
  it('accepts the catalogs the specification ships', () => {
    // The oracle for the rules mirrored from the specification: its catalogs pass its own
    // checker, so they must pass here.
    expect(validateCatalog(basicCatalog)).toEqual([])
    expect(validateCatalog(testingCatalog)).toEqual([])
  })

  it('accepts a catalog that declares nothing but its identity', () => {
    const bare = { $id: CATALOG_ID, catalogId: CATALOG_ID, protocolVersion: '1.0' }

    expect(validateCatalog(bare)).toEqual([])
  })

  it('reports a catalog the meta-schema refuses, and stops there', () => {
    // The catalog root is closed: design tokens cannot ride along as a top-level key. The
    // invalid component name beside it is not reported, because the rules never ran.
    const findings = validateCatalog({ ...catalogWith({ 'my-box': {} }), tokens: {} })

    expect(findings).toEqual([
      { code: 'catalog-schema', path: '/tokens', message: 'must NOT have additional properties' },
    ])
    expect(located('not a catalog')).toEqual(['catalog-schema '])
  })

  it('wants `$id` to equal `catalogId`, and the protocol version to be 1.0', () => {
    expect(located({ catalogId: CATALOG_ID, $id: 'https://other.test/c.json' })).toEqual([
      'catalog-id /$id',
      'catalog-version /protocolVersion',
    ])
  })

  it('wants every name a catalog introduces to be an identifier', () => {
    const catalog = catalogWith(
      { 'my-box': component('my-box', { 'aria-label': { type: 'string' } }) },
      { 'to-upper': fn('to-upper', { 'the-value': { type: 'string' } }) }
    )

    expect(located(catalog)).toEqual([
      'catalog-name /components/my-box',
      'catalog-name /components/my-box/properties/aria-label',
      'catalog-name /functions/to-upper',
      'catalog-name /functions/to-upper/properties/args/properties/the-value',
    ])
  })

  it('leaves the `@path` and `@call` of the protocol alone', () => {
    const binding = {
      type: 'object',
      properties: { '@path': { type: 'string' } },
      required: ['@path'],
    }

    expect(validateCatalog(catalogWith({ Box: component('Box', { source: binding }) }))).toEqual([])
  })

  it('wants each entry to name itself as a constant', () => {
    const catalog = catalogWith(
      { Box: component('Card'), Bare: { type: 'object', properties: { component: true } } },
      { trim: fn('strip') }
    )

    expect(located(catalog)).toEqual([
      'catalog-discriminator /components/Box/properties/component',
      'catalog-discriminator /components/Bare/properties/component',
      'catalog-discriminator /functions/trim/properties/@call',
    ])
  })

  it('refuses a prop that carries a name the envelope owns', () => {
    const catalog = catalogWith({
      Box: component('Box', { id: { type: 'string' }, metadata: { type: 'string' } }),
    })

    expect(validateCatalog(catalog)).toEqual([
      {
        code: 'catalog-reserved-prop',
        path: '/components/Box/properties/id',
        message: '`id` belongs to the envelope; a component cannot declare it as a prop.',
      },
      {
        code: 'catalog-reserved-prop',
        path: '/components/Box/properties/metadata',
        message: '`metadata` belongs to the envelope; a component cannot declare it as a prop.',
      },
    ])
  })

  it('refuses a `$ref` outside the catalog and the allowed common types', () => {
    const catalog = {
      ...catalogWith(
        {
          Box: component('Box', {
            // A shared helper file is what the prototype used; the specification forbids it.
            shared: { $ref: 'prop_types.json#/$defs/size' },
            surface: { $ref: 'common_types.json#/$defs/Surface' },
            sibling: { anyOf: [{ $ref: '#/components/Missing' }, { $ref: '#/components/Box' }] },
            call: { $ref: '#/functions/missing' },
            known: { $ref: '#/functions/trim' },
            label: { $ref: 'common_types.json#/$defs/DynamicString' },
            // Literal data, where a `$ref` key is not a reference.
            sample: { type: 'string', default: { $ref: 'anything' } },
          }),
        },
        { trim: fn('trim') }
      ),
      $defs: {
        anyComponent: { oneOf: [{ $ref: '#/components/Gone' }] },
        anyFunction: { oneOf: [{ $ref: '#/functions/trim' }] },
      },
    }

    expect(located(catalog)).toEqual([
      'catalog-ref /components/Box/properties/shared',
      'catalog-ref /components/Box/properties/surface',
      'catalog-ref /components/Box/properties/sibling/anyOf/0',
      'catalog-ref /components/Box/properties/call',
      'catalog-ref /$defs/anyComponent/oneOf/0',
    ])
  })

  it('refuses an object a component says nothing about', () => {
    const catalog = catalogWith(
      {
        Box: component('Box', {
          loose: { type: 'object' },
          mixed: { type: ['array', 'object'] },
          described: { type: 'object', properties: { x: { type: 'number' } } },
          text: { type: 'string' },
        }),
      },
      // A function argument is not held to it: the rule is about what a component prop accepts.
      { trim: fn('trim', { options: { type: 'object' } }) }
    )

    expect(located(catalog)).toEqual([
      'catalog-open-object /components/Box/properties/loose',
      'catalog-open-object /components/Box/properties/mixed',
    ])
  })
})

describe('getDeclaredProperties', () => {
  it('gathers the props a definition spreads over `allOf`', () => {
    // The basic catalog mixes `Checkable` into Button this way.
    const definition = {
      allOf: [
        { $ref: 'common_types.json#/$defs/Checkable' },
        { properties: { component: { const: 'Button' }, variant: { type: 'string' } } },
        'not a schema',
      ],
      properties: { weight: { type: 'number' } },
    }

    expect(Object.keys(getDeclaredProperties(definition))).toEqual([
      'component',
      'variant',
      'weight',
    ])
  })
})
