import { APP_ID, BASIC_ID, CATALOGS, DESIGN_SYSTEM_ID } from '../fixtures/catalogs'
import { validateBehavior } from './validateBehavior'

/** A small surface: a button that dispatches `save`, over a little data. */
const page = (extra: object = {}) => [
  {
    version: 'v1.0',
    createSurface: {
      surfaceId: 'page',
      catalogId: DESIGN_SYSTEM_ID,
      dataModel: { form: { email: '' }, items: [{ price: 4 }] },
      components: [
        { id: 'root', component: 'Button', child: 'label', onClick: { event: { name: 'save' } } },
        { id: 'label', component: 'Typography', text: 'Save' },
      ],
      ...extra,
    },
  },
]

const doc = (parts: object = {}) => ({
  behaviorVersion: '0.1',
  surfaceId: 'page',
  catalogId: DESIGN_SYSTEM_ID,
  ...parts,
})

const query = (into: string, extra: object = {}) => ({
  kind: 'query',
  request: { method: 'get', url: '/api/items' },
  cache: { key: ['items'] },
  into,
  ...extra,
})

const validate = (behavior: unknown, messages: unknown[] = page()) =>
  validateBehavior(behavior, { messages, catalogs: CATALOGS })

const located = (behavior: unknown, messages?: unknown[]) =>
  validate(behavior, messages).map(({ code, path }) => `${code} ${path}`)

describe('validateBehavior: the document and its surface', () => {
  it('accepts a document that declares nothing beyond its pairing', () => {
    expect(validate(doc())).toEqual([])
  })

  it('reports a document the schema refuses, and stops there', () => {
    expect(validate({ ...doc(), surfaceId: undefined, extra: 1 })).toEqual([
      {
        code: 'behavior-schema',
        path: '/surfaceId',
        message: "must have required property 'surfaceId'",
      },
      { code: 'behavior-schema', path: '/extra', message: 'must NOT have additional properties' },
    ])
  })

  it('holds a query to declaring how it is cached', () => {
    const uncached = { kind: 'query', request: { method: 'get', url: '/x' }, into: '/x' }

    expect(located(doc({ resources: { items: uncached } }))).toEqual([
      'behavior-schema /resources/items/cache',
    ])
  })

  it('reports a document whose surface the messages do not describe', () => {
    const elsewhere = { code: 'behavior-surface', path: '/surfaceId' }

    expect(validate(doc({ surfaceId: 'other' }))).toEqual([
      { ...elsewhere, message: 'The messages describe no surface "other".' },
    ])
    // Messages the envelope refuses describe no surface at all.
    expect(validate(doc(), [{ version: 'v1.0' }])).toEqual([
      { ...elsewhere, message: 'The messages describe no surface "page".' },
    ])
  })

  it('reports a catalog that is not the default of the surface', () => {
    expect(validate(doc({ catalogId: APP_ID }))).toEqual([
      {
        code: 'behavior-surface',
        path: '/catalogId',
        message: `The surface's default catalog is "${DESIGN_SYSTEM_ID}", not "${APP_ID}".`,
      },
    ])
  })

  it('reports a surface that asks for another version of the document', () => {
    const asking = (link: unknown) =>
      page({ metadata: { extensions: { tech_soroush_behavior: link } } })

    expect(validate(doc(), asking({ behaviorVersion: '0.2' }))).toEqual([
      {
        code: 'behavior-surface',
        path: '/behaviorVersion',
        message: 'The surface asks for behavior version "0.2".',
      },
    ])
    expect(validate(doc(), asking({ behaviorVersion: '0.1' }))).toEqual([])
    // A link that is not an object says nothing to compare.
    expect(validate(doc(), asking(true))).toEqual([])
  })
})

describe('validateBehavior: where a document may write', () => {
  it('reports a write into what the runtime owns', () => {
    const behavior = doc({
      resources: {
        a: query('/resources/a/data'),
        b: query('/items', { onError: '/page/params/error' }),
      },
      derived: [
        { id: 'c', into: '/resources/c', value: 1 },
        // Only `/page/params` is the runtime's; the rest of `/page` is free.
        { id: 'd', into: '/page/title', value: 1 },
        // With `forEach` it is a field of each item, not a place in the model.
        { id: 'e', forEach: '/items', into: 'resources', value: 1 },
      ],
    })

    expect(validate(behavior)).toEqual([
      {
        code: 'reserved-path',
        path: '/resources/a/into',
        message: '"/resources/a/data" belongs to the runtime; a document cannot write there.',
      },
      {
        code: 'reserved-path',
        path: '/resources/b/onError',
        message: '"/page/params/error" belongs to the runtime; a document cannot write there.',
      },
      {
        code: 'reserved-path',
        path: '/derived/0/into',
        message: '"/resources/c" belongs to the runtime; a document cannot write there.',
      },
    ])
  })
})

describe('validateBehavior: triggers', () => {
  it('accepts a trigger on an event the surface dispatches, or on a place in its data', () => {
    const behavior = doc({
      resources: { items: query('/items') },
      triggers: [
        { on: { event: 'save' }, run: ['items'] },
        { on: { change: '/form/email' }, run: ['items'] },
      ],
    })

    expect(validate(behavior)).toEqual([])
  })

  it('reports an event nothing dispatches, a place that is not there, and an unknown resource', () => {
    const behavior = doc({
      triggers: [
        { on: { event: 'submit' }, run: ['items'] },
        { on: { change: '/form/phone' }, run: [] },
      ],
    })

    expect(validate(behavior)).toEqual([
      {
        code: 'unknown-event',
        path: '/triggers/0/on/event',
        message: 'No component of the surface dispatches an event named "submit".',
      },
      {
        code: 'unknown-resource',
        path: '/triggers/0/run/0',
        message: 'The document declares no resource "items".',
      },
      {
        code: 'unresolved-path',
        path: '/triggers/1/on/change',
        message: 'Nothing in the data model is at "/form/phone".',
      },
    ])
  })
})

describe('validateBehavior: expressions', () => {
  const call = (name: string, args: object, extra: object = {}) => ({
    '@call': name,
    args,
    ...extra,
  })

  it('checks every expression in the document, not only the derived values', () => {
    const behavior = doc({
      resources: {
        items: query('/items', {
          request: {
            method: 'get',
            url: call('shout', {}),
            query: { q: { '@path': '/form/nope' } },
          },
          cache: { key: [call('divide', { a: 1 })] },
          enabled: { '@path': '/form/flag' },
        }),
      },
      head: {
        title: { '@path': '/form/title' },
        meta: [{ name: 'x', content: { '@path': '/nope' } }],
      },
    })

    expect(located(behavior)).toEqual([
      'unknown-function /resources/items/request/url',
      'unresolved-path /resources/items/request/query/q',
      'function-args /resources/items/cache/key/0/args/b',
      'unresolved-path /resources/items/enabled',
      'unresolved-path /head/title',
      'unresolved-path /head/meta/0/content',
      'requires-functions /requires/functions',
      'requires-functions /requires/functions',
    ])
  })

  it('reads a derived value per item the way a list template is read', () => {
    const behavior = doc({
      derived: [
        // The first item stands for all: `price` is there, `weight` is not.
        { id: 'a', forEach: '/items', into: 'label', value: { '@path': 'price' } },
        { id: 'b', forEach: '/items', into: 'heavy', value: { '@path': 'weight' } },
        { id: 'c', forEach: '/items', into: 'position', value: { '@call': '@index' } },
        // A later entry reads what an earlier one wrote.
        { id: 'd', forEach: '/items', into: 'copy', value: { '@path': 'label' } },
      ],
    })

    expect(located(behavior)).toEqual(['unresolved-path /derived/1/value'])
  })

  it('holds `@index` to a list, and to its own definition', () => {
    const behavior = doc({
      derived: [
        { id: 'a', into: '/first', value: { '@call': '@index' } },
        {
          id: 'b',
          forEach: '/items',
          into: 'n',
          value: { '@call': '@index', catalogId: BASIC_ID },
        },
      ],
    })

    expect(located(behavior)).toEqual([
      'index-outside-template /derived/0/value',
      'function-args /derived/1/value/catalogId',
    ])
  })

  it('wants `requires.functions` to be exactly what the document calls in its own catalog', () => {
    const behavior = doc({
      requires: { functions: ['round', 'max'] },
      derived: [
        { id: 'a', into: '/a', value: call('round', { value: call('divide', { a: 1, b: 2 }) }) },
        // A call into another catalog is that catalog's to provide, and is not listed here.
        {
          id: 'b',
          into: '/b',
          value: call('formatString', { value: 'x' }, { catalogId: BASIC_ID }),
        },
      ],
    })

    expect(validate(behavior)).toEqual([
      {
        code: 'requires-functions',
        path: '/requires/functions',
        message: '"divide" is called but not listed in `requires.functions`.',
      },
      {
        code: 'requires-functions',
        path: '/requires/functions',
        message: '"max" is listed in `requires.functions` but never called.',
      },
    ])
  })
})
