import { augmentDataModel, type Behavior } from './behavior/dataModel'
import { validateBehavior } from './behavior/validateBehavior'
import { type Catalog, getDeclaredProperties } from './catalog/catalogRules'
import { validateCatalog } from './catalog/validateCatalog'
import { composeCatalog } from './core/composeCatalog'
import { CATALOGS, DESIGN_SYSTEM_ID } from './fixtures/catalogs'
import { readSurfaces } from './surface/surfaceState'
import { getAcceptedReturns } from './surface/slots'
import { validateSurface } from './surface/validateSurface'
import { applyTheme } from './theme/theme'

// `toString`, `constructor` and `__proto__` are names like any other in JSON, and the documents
// validated here are written by an agent. Every lookup by a name that came from a document reads
// own keys only: an inherited member is not a component, a function, a resource or a value, and
// writing through `__proto__` must never reach `Object.prototype`.

const surface = (components: object[], extra: object = {}) => [
  {
    version: 'v1.0',
    createSurface: { surfaceId: 'page', catalogId: DESIGN_SYSTEM_ID, components, ...extra },
  },
]

const text = (value: unknown) => ({ id: 'root', component: 'Typography', text: value })

const codes = (messages: unknown[]) =>
  validateSurface(messages, { catalogs: CATALOGS }).map(({ code }) => code)

const polluted = () => ({}) as Record<string, unknown>

afterEach(() => {
  // A failure of the first group would otherwise leak into every later test of the run.
  delete (Object.prototype as Record<string, unknown>).polluted
})

describe('a write through `__proto__`', () => {
  it('does not reach Object.prototype from a data model update, and does not throw', () => {
    const messages = [
      ...surface([text('Hi')]),
      {
        version: 'v1.0',
        updateDataModel: { surfaceId: 'page', path: '/__proto__/polluted', value: 1 },
      },
    ]

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([])
    expect(polluted().polluted).toBeUndefined()
  })

  it('lands in the data model as an ordinary key', () => {
    const { surfaces } = readSurfaces([
      { createSurface: { surfaceId: 'page' } },
      { updateDataModel: { surfaceId: 'page', path: '/__proto__/polluted', value: 1 } },
      { updateDataModel: { surfaceId: 'page', path: '/constructor', value: 'built' } },
    ])
    const { dataModel } = surfaces[0]!

    expect(Object.hasOwn(dataModel, '__proto__')).toBe(true)
    expect(Object.getOwnPropertyDescriptor(dataModel, '__proto__')?.value).toEqual({ polluted: 1 })
    expect(Object.getOwnPropertyDescriptor(dataModel, 'constructor')?.value).toBe('built')
    expect(Object.getPrototypeOf(dataModel)).toBe(Object.prototype)
    expect(polluted().polluted).toBeUndefined()
  })

  it('does not reach Object.prototype from where a behavior document writes', () => {
    const behavior = {
      behaviorVersion: '0.1',
      surfaceId: 'page',
      catalogId: DESIGN_SYSTEM_ID,
      resources: {
        items: {
          kind: 'query',
          request: { method: 'get', url: '/x' },
          cache: { key: ['x'] },
          into: '/__proto__/polluted',
        },
      },
      derived: [{ id: 'd', into: '/constructor/prototype/polluted', value: 1 }],
    } as unknown as Behavior
    const messages = surface([text('Hi')])

    const model = augmentDataModel({}, behavior)

    expect(polluted().polluted).toBeUndefined()
    expect(Object.hasOwn(model, '__proto__')).toBe(true)
    expect(validateBehavior(behavior, { messages, catalogs: CATALOGS })).toEqual([])
    expect(validateSurface(messages, { catalogs: CATALOGS, behavior })).toEqual([])
    expect(polluted().polluted).toBeUndefined()
  })
})

describe('a name that an object inherits', () => {
  it('is not a function of the catalog', () => {
    expect(codes(surface([text({ '@call': 'toString' })]))).toEqual(['unknown-function'])
    expect(codes(surface([text({ '@call': 'constructor', args: {} })]))).toEqual([
      'unknown-function',
    ])
  })

  it('is not a component of the catalog', () => {
    expect(codes(surface([{ id: 'root', component: 'constructor' }]))).toEqual([
      'unknown-component',
    ])
    expect(codes(surface([{ id: 'root', component: 'toString' }]))).toEqual(['unknown-component'])
  })

  it('is not a value in the data model', () => {
    const messages = surface([text({ '@path': '/toString' })], { dataModel: { ui: {} } })
    const nested = surface([text({ '@path': '/ui/constructor/name' })], { dataModel: { ui: {} } })

    expect(codes(messages)).toEqual(['unresolved-path'])
    expect(codes(nested)).toEqual(['unresolved-path'])
  })

  it('is not a resource a trigger can run', () => {
    const behavior = {
      behaviorVersion: '0.1',
      surfaceId: 'page',
      catalogId: DESIGN_SYSTEM_ID,
      triggers: [{ on: { change: '/ui' }, run: ['toString', 'constructor'] }],
    }
    const messages = surface([text('Hi')], { dataModel: { ui: {} } })

    const findings = validateBehavior(behavior, { messages, catalogs: CATALOGS })

    expect(findings.map(({ code, path }) => `${code} ${path}`)).toEqual([
      'unknown-resource /triggers/0/run/0',
      'unknown-resource /triggers/0/run/1',
    ])
  })

  it('is not a component or function a `$ref` can point at', () => {
    const catalog = {
      $id: 'https://app.test/c.json',
      catalogId: 'https://app.test/c.json',
      protocolVersion: '1.0',
      components: {
        Box: {
          type: 'object',
          properties: {
            component: { const: 'Box' },
            a: { $ref: '#/components/toString' },
            b: { $ref: '#/functions/constructor' },
          },
        },
      },
    }

    expect(validateCatalog(catalog).map(({ code, path }) => `${code} ${path}`)).toEqual([
      'catalog-ref /components/Box/properties/a',
      'catalog-ref /components/Box/properties/b',
    ])
  })

  it('is not a name the core owns', () => {
    const fn = (name: string) => ({
      type: 'object',
      returnType: 'string',
      properties: { '@call': { const: name }, args: { type: 'object' } },
      required: ['@call'],
    })

    const catalog = composeCatalog({
      catalogId: 'https://app.test/c.json',
      title: 'App',
      components: {},
      functions: { toString: fn('toString'), constructor: fn('constructor') },
    })

    expect(validateCatalog(catalog)).toEqual([])
  })

  it('is not a common type or a JSON type a slot can be read from', () => {
    expect(getAcceptedReturns({ $ref: 'common_types.json#/$defs/toString' })).toBeUndefined()
    expect(getAcceptedReturns({ type: ['constructor', 'string'] })).toEqual(new Set(['string']))
  })

  it('is not a scale or a variant set of the theme', () => {
    const catalog = composeCatalog({
      catalogId: 'https://app.test/c.json',
      title: 'App',
      components: {
        Box: {
          type: 'object',
          properties: {
            component: { const: 'Box' },
            bg: { enum: ['paper'] },
            size: { enum: ['sm'] },
          },
          required: ['component'],
          metadata: {
            extensions: {
              tech_soroush_theme: {
                props: { bg: { scale: 'toString' }, size: { variants: 'constructor' } },
              },
            },
          },
        },
      },
    }) as Catalog

    expect(applyTheme(catalog, { scales: {}, variants: {} })).toEqual(catalog)
  })

  it('is a prop like any other when a component declares one by that name', () => {
    // Merged by assignment, a prop named `__proto__` became the prototype of the declared props,
    // and its own keys then read as props: `metadata` here, which the envelope reserves.
    const box = JSON.parse(`{
      "type": "object",
      "properties": {
        "component": { "const": "Box" },
        "__proto__": { "type": "string", "metadata": { "note": "x" } }
      },
      "required": ["component"]
    }`)
    const catalog = composeCatalog({
      catalogId: 'https://app.test/c.json',
      title: 'App',
      components: { Box: box },
    })

    expect(Object.keys(getDeclaredProperties(box))).toEqual(['component', '__proto__'])
    expect(validateCatalog(catalog)).toEqual([])
  })

  it('is not a prop when a value carries it as a key', () => {
    // A map argument is free-form, so a key spelled `__proto__` is legal data. The binding under
    // it is still an expression, and is still checked.
    const map = JSON.parse('{ "__proto__": { "@path": "/nope" } }')
    const messages = surface([text({ '@call': 'lookup', args: { key: 'a', map } })])

    expect(codes(messages)).toEqual(['unresolved-path'])
  })
})
