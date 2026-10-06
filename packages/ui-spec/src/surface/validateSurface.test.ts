import type { Catalog } from '../catalog/catalogRules'
import { composeCatalog } from '../core/composeCatalog'
import { APP_ID, BASIC_ID, CATALOGS, DESIGN_SYSTEM_ID } from '../fixtures/catalogs'
import { inspectSurfaces, validateSurface } from './validateSurface'

/** One `createSurface` message on the design-system fixture catalog. */
const surface = (components: object[], extra: object = {}) => [
  {
    version: 'v1.0',
    createSurface: { surfaceId: 'page', catalogId: DESIGN_SYSTEM_ID, components, ...extra },
  },
]

const text = (id: string, value: unknown = 'Hi') => ({ id, component: 'Typography', text: value })
const view = (id: string, children: unknown) => ({ id, component: 'View', children })

/** Where component `index` of the message sits, which is what a finding points at. */
const at = (index: number, rest = '') => `/0/createSurface/components/${index}${rest}`

const KINDS =
  'createSurface, updateComponents, updateDataModel, deleteSurface, callRendererFunction, agentFunctionResponse'

const located = (messages: unknown[], catalogs: Catalog[] = CATALOGS) =>
  validateSurface(messages, { catalogs }).map(({ code, path }) => `${code} ${path}`)

describe('validateSurface: the envelope', () => {
  it('accepts a surface with nothing wrong', () => {
    expect(
      validateSurface(surface([view('root', ['title']), text('title')]), { catalogs: CATALOGS })
    ).toEqual([])
  })

  it('reports a message the envelope refuses, and reads no further', () => {
    const messages = [
      { version: 'v1.0', createSurface: { surfaceId: 'page', theme: {} } },
      { version: 'v0.9', updateComponents: { surfaceId: 'page', components: [{ id: 'root' }] } },
      { version: 'v1.0' },
      'not a message',
    ]

    // One finding per mistake: each message is held to the kind it claims to be, not to all six.
    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'envelope',
        path: '/0/createSurface/theme',
        message: 'must NOT have additional properties',
      },
      { code: 'envelope', path: '/1/version', message: 'must be equal to constant' },
      {
        code: 'envelope',
        path: '/1/updateComponents/components/0/component',
        message: "must have required property 'component'",
      },
      { code: 'envelope', path: '/2', message: `A message carries exactly one of ${KINDS}.` },
      { code: 'envelope', path: '/3', message: `A message carries exactly one of ${KINDS}.` },
    ])
  })

  it('checks every surface the messages describe', () => {
    const messages = [
      ...surface([text('root')]),
      { version: 'v1.0', createSurface: { surfaceId: 'other', catalogId: DESIGN_SYSTEM_ID } },
    ]

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'missing-root',
        path: '',
        message: 'The surface "other" has no component with the id "root".',
      },
    ])
  })
})

describe('validateSurface: each component against its catalog', () => {
  it('reports a component whose catalog was never named, or never supplied', () => {
    const messages = [
      {
        version: 'v1.0',
        createSurface: {
          surfaceId: 'page',
          components: [text('root'), { ...text('other'), catalogId: 'https://x.test/c.json' }],
        },
      },
    ]

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'unknown-catalog',
        path: at(0),
        componentId: 'root',
        message: 'The surface names no default catalog to resolve "Typography" in.',
      },
      {
        code: 'unknown-catalog',
        path: at(1),
        componentId: 'other',
        message: 'The catalog "https://x.test/c.json" was not supplied to resolve "Typography" in.',
      },
    ])
  })

  it('reports a component its catalog does not have', () => {
    expect(
      validateSurface(surface([{ id: 'root', component: 'Carousel' }]), { catalogs: CATALOGS })
    ).toEqual([
      {
        code: 'unknown-component',
        path: at(0),
        componentId: 'root',
        message: `The catalog "${DESIGN_SYSTEM_ID}" has no component "Carousel".`,
      },
    ])
  })

  it('reports each prop the component schema refuses', () => {
    const button = { id: 'root', component: 'Button', variant: 'ghost', elevation: 3 }

    expect(validateSurface(surface([button]), { catalogs: CATALOGS })).toEqual([
      {
        code: 'component-schema',
        path: at(0, '/child'),
        componentId: 'root',
        message: `"Button" must have required property 'child'.`,
      },
      {
        code: 'component-schema',
        path: at(0, '/variant'),
        componentId: 'root',
        message: '"Button" must be equal to one of the allowed values: contained, outlined, text.',
      },
      {
        code: 'component-schema',
        path: at(0, '/elevation'),
        componentId: 'root',
        message: '"Button" must NOT have unevaluated properties.',
      },
    ])
  })

  it('resolves a component in the catalog it names over the surface default', () => {
    const header = { id: 'root', component: 'PageHeader', catalogId: APP_ID, title: 'Articles' }

    expect(located(surface([header]))).toEqual([])
  })
})

describe('validateSurface: the tree', () => {
  it('reports a reference to a component that does not exist, wherever it is written', () => {
    const messages = surface(
      [
        view('root', ['list', 'link', 'state', 'gone']),
        view('list', { componentId: 'no_template', path: '/items' }),
        { id: 'link', component: 'Link', href: '/', child: 'no_child' },
        {
          id: 'state',
          component: 'When',
          value: 'a',
          cases: [{ when: 'a', child: 'no_case' }],
          otherwise: 'no_fallback',
        },
      ],
      { dataModel: { items: [] } }
    )

    expect(located(messages)).toEqual([
      `unknown-child ${at(1, '/children/componentId')}`,
      `unknown-child ${at(2, '/child')}`,
      `unknown-child ${at(3, '/cases/0/child')}`,
      `unknown-child ${at(3, '/otherwise')}`,
      `unknown-child ${at(0, '/children/3')}`,
    ])
  })

  it('reports a component that contains itself', () => {
    const messages = surface([view('root', ['a']), view('a', ['b']), view('b', ['a'])])

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'cycle',
        path: at(2, '/children/0'),
        componentId: 'a',
        message: '"a" contains itself: root > a > b > a.',
      },
    ])
  })

  it('lets two parents hold the same component', () => {
    const messages = surface([
      view('root', ['a', 'b']),
      view('a', ['shared']),
      view('b', ['shared']),
      text('shared'),
    ])

    expect(located(messages)).toEqual([])
  })

  it('reports a component nothing leads to', () => {
    expect(validateSurface(surface([text('root'), text('stray')]), { catalogs: CATALOGS })).toEqual(
      [
        {
          code: 'orphan',
          path: at(1),
          componentId: 'stray',
          message: 'Nothing reachable from "root" refers to "stray".',
        },
      ]
    )
  })

  it('does not call the children of an unreadable component orphans', () => {
    // What `broken` holds cannot be read, so `inside` may well be reachable. One finding, not two.
    const messages = surface([
      view('root', ['broken']),
      { id: 'broken', component: 'Carousel', children: ['inside'] },
      text('inside'),
    ])

    expect(located(messages)).toEqual([`unknown-component ${at(1)}`])
  })

  it('holds a component to what its catalog lets it sit inside, and hold', () => {
    const messages = surface([
      view('root', ['table', 'row_outside', 'header']),
      { id: 'table', component: 'Table', children: ['row', 'caption'] },
      { id: 'row', component: 'TableRow', children: [] },
      text('caption'),
      { id: 'row_outside', component: 'TableRow', children: [] },
      // Allowed inside a View, or as the root.
      { id: 'header', component: 'PageHeader', catalogId: APP_ID, title: 'Articles' },
    ])

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'unallowed-child',
        path: at(3),
        componentId: 'caption',
        message: '"Table" cannot hold "Typography".',
      },
      {
        code: 'unallowed-parent',
        path: at(4),
        componentId: 'row_outside',
        message: '"TableRow" cannot sit inside "View".',
      },
    ])
  })

  it('knows the surface itself as the parent of the root', () => {
    const row = { id: 'root', component: 'TableRow', children: [] }
    const header = { id: 'root', component: 'PageHeader', catalogId: APP_ID, title: 'Articles' }

    expect(located(surface([row]))).toEqual([`unallowed-parent ${at(0)}`])
    expect(located(surface([header]))).toEqual([])
  })
})

describe('validateSurface: bindings', () => {
  const dataModel = { ui: { isDark: false }, gists: [{ description: 'One' }], empty: [] }

  it('reports a path that leads nowhere in the data model', () => {
    const messages = surface([text('root', { '@path': '/ui/theme' })], { dataModel })

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'unresolved-path',
        path: at(0, '/text'),
        componentId: 'root',
        message: 'Nothing in the data model is at "/ui/theme".',
      },
    ])
  })

  it('reads a path with no leading slash from the root, outside a template', () => {
    expect(located(surface([text('root', { '@path': 'ui/isDark' })], { dataModel }))).toEqual([])
  })

  it('reads a relative path inside a template from the item', () => {
    const messages = surface(
      [
        view('root', { componentId: 'row', path: '/gists' }),
        view('row', ['title', 'author']),
        text('title', { '@path': 'description' }),
        text('author', { '@path': 'owner/login' }),
      ],
      { dataModel }
    )

    expect(located(messages)).toEqual([`unresolved-path ${at(3, '/text')}`])
  })

  it('cannot say what an item of an empty list holds, and does not guess', () => {
    const messages = surface(
      [
        view('root', { componentId: 'row', path: '/empty' }),
        text('row', { '@path': 'anything/at/all' }),
      ],
      { dataModel }
    )

    expect(located(messages)).toEqual([])
  })

  it('reports a template over a list that is not there', () => {
    const messages = surface([view('root', { componentId: 'row', path: '/nope' }), text('row')], {
      dataModel,
    })

    expect(located(messages)).toEqual([`unresolved-path ${at(0, '/children/path')}`])
  })

  it('reads a nested template from the item of the outer one', () => {
    const nested = { groups: [{ items: [{ label: 'a' }] }] }
    const messages = surface(
      [
        view('root', { componentId: 'group', path: '/groups' }),
        view('group', { componentId: 'item', path: 'items' }),
        text('item', { '@path': 'label' }),
      ],
      { dataModel: nested }
    )

    expect(located(messages)).toEqual([])
  })

  it('checks a binding wherever it sits, including accessibility text', () => {
    const messages = surface(
      [{ ...text('root'), accessibility: { label: { '@path': '/ui/label' } } }],
      { dataModel }
    )

    expect(located(messages)).toEqual([`unresolved-path ${at(0, '/accessibility/label')}`])
  })
})

describe('validateSurface: function calls', () => {
  const dataModel = { ui: { isDark: false }, total: 10, items: [{ price: 4 }] }
  const call = (name: string, args: object, extra: object = {}) => ({
    '@call': name,
    args,
    ...extra,
  })
  const skeleton = (id: string, height: unknown) => ({ id, component: 'Skeleton', height })

  it('accepts calls that exist, take their arguments and return what the position takes', () => {
    const messages = surface(
      [
        view('root', ['bar', 'label', 'button']),
        skeleton('bar', call('divide', { a: { '@path': '/total' }, b: 2 })),
        // `select` returns anything, which fits any position.
        text(
          'label',
          call('select', { condition: { '@path': '/ui/isDark' }, then: 'on', else: 'off' })
        ),
        {
          id: 'button',
          component: 'Button',
          child: 'label',
          disabled: call(
            'and',
            { values: [{ '@path': '/ui/isDark' }, true] },
            { catalogId: BASIC_ID }
          ),
          // A function that returns nothing belongs in an action, and only there.
          onClick: { functionCall: call('setValue', { path: '/total', value: 0 }) },
        },
      ],
      { dataModel }
    )

    expect(located(messages)).toEqual([])
  })

  it('reports a function its catalog does not have', () => {
    const messages = surface([text('root', call('shout', {}))])

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'unknown-function',
        path: at(0, '/text'),
        componentId: 'root',
        message: `The catalog "${DESIGN_SYSTEM_ID}" has no function "shout".`,
      },
    ])
  })

  it('reports a call into a catalog that was never named, or never supplied', () => {
    const header = (title: unknown) => ({
      id: 'root',
      component: 'PageHeader',
      catalogId: APP_ID,
      title,
    })
    const noDefault = [
      {
        version: 'v1.0',
        createSurface: { surfaceId: 'page', components: [header(call('initials', { name: 'A' }))] },
      },
    ]
    const notSupplied = surface([
      text('root', call('trim', {}, { catalogId: 'https://x.test/c.json' })),
    ])

    expect(
      validateSurface(noDefault, { catalogs: CATALOGS }).map(({ message }) => message)
    ).toEqual(['The surface names no default catalog to resolve "initials" in.'])
    expect(located(notSupplied)).toEqual([`unknown-catalog ${at(0, '/text')}`])
  })

  it('reports arguments the function does not take', () => {
    const messages = surface([
      view('root', ['a', 'b']),
      skeleton('a', call('divide', { a: 1 })),
      skeleton('b', { ...call('divide', { a: 1, b: 2 }), extra: true }),
    ])

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'function-args',
        path: at(1, '/height/args/b'),
        componentId: 'a',
        message: `"divide" must have required property 'b'.`,
      },
      {
        code: 'function-args',
        path: at(2, '/height/extra'),
        componentId: 'b',
        message: '"divide" must NOT have unevaluated properties.',
      },
    ])
  })

  it('reports a call that returns what its position does not take', () => {
    const messages = surface([
      view('root', ['label', 'nothing']),
      text('label', call('divide', { a: 1, b: 2 })),
      text('nothing', call('setValue', { path: '/total', value: 1 })),
    ])

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'return-type',
        path: at(1, '/text'),
        componentId: 'label',
        message: '"divide" returns number, which this position does not take.',
      },
      {
        code: 'return-type',
        path: at(2, '/text'),
        componentId: 'nothing',
        message: '"setValue" returns void, which this position does not take.',
      },
    ])
  })

  it('checks the calls and bindings inside the arguments of a call', () => {
    const inner = call('formatString', { value: 'ten' }, { catalogId: BASIC_ID })
    const messages = surface(
      [
        view('root', ['a', 'b']),
        skeleton('a', call('round', { value: call('divide', { a: { '@path': '/nope' }, b: 2 }) })),
        // A string where the argument wants a number.
        skeleton('b', call('round', { value: inner })),
      ],
      { dataModel }
    )

    expect(located(messages)).toEqual([
      `unresolved-path ${at(1, '/height/args/value/args/a')}`,
      `return-type ${at(2, '/height/args/value')}`,
    ])
  })

  it('knows `@index` only inside a list template', () => {
    const index = { '@call': '@index', args: { offset: 1 } }
    const messages = surface(
      [
        view('root', ['list', 'outside']),
        view('list', { componentId: 'row', path: '/items' }),
        skeleton('row', index),
        skeleton('outside', index),
      ],
      { dataModel }
    )

    expect(validateSurface(messages, { catalogs: CATALOGS })).toEqual([
      {
        code: 'index-outside-template',
        path: at(3, '/height'),
        componentId: 'outside',
        message: '`@index` only has a value inside a list template.',
      },
    ])
  })

  it('holds `@index` to its own definition and return type', () => {
    const messages = surface(
      [
        view('root', { componentId: 'row', path: '/items' }),
        view('row', ['a', 'b']),
        // The protocol's own function belongs to no catalog.
        skeleton('a', { '@call': '@index', catalogId: BASIC_ID }),
        text('b', { '@call': '@index' }),
      ],
      { dataModel }
    )

    // Inside a component the common types already hold `@index` to its definition, so the
    // misuse surfaces as a finding about the component.
    expect(located(messages)).toEqual([
      `component-schema ${at(2, '/height/catalogId')}`,
      `return-type ${at(3, '/text')}`,
    ])
  })

  it('checks what an event sends, and collects the events a surface dispatches', () => {
    const messages = surface(
      [
        {
          id: 'root',
          component: 'Button',
          child: 'label',
          onClick: {
            event: {
              name: 'save',
              context: { total: { '@path': '/total' }, tags: [{ '@path': '/tags' }] },
            },
          },
        },
        text('label'),
      ],
      { dataModel }
    )

    const { findings, surfaces } = inspectSurfaces(messages, { catalogs: CATALOGS })

    expect(findings.map(({ code, path }) => `${code} ${path}`)).toEqual([
      `unresolved-path ${at(0, '/onClick/event/context/tags/0')}`,
    ])
    expect([...surfaces[0]!.events]).toEqual(['save'])
  })
})

describe('validateSurface: a prop that names a component by its id', () => {
  const catalogId = 'https://probe.test/catalog.json'
  const probe = composeCatalog({
    catalogId,
    title: 'Probe',
    components: {
      Anchor: {
        type: 'object',
        properties: {
          component: { const: 'Anchor' },
          target: { $ref: 'common_types.json#/$defs/ComponentId' },
        },
        required: ['component'],
      },
    },
  }) as Catalog
  const anchors = (components: object[]) => [
    { version: 'v1.0', createSurface: { surfaceId: 'page', catalogId, components } },
  ]

  it('follows it like any other child reference', () => {
    const linked = anchors([
      { id: 'root', component: 'Anchor', target: 'end' },
      { id: 'end', component: 'Anchor' },
    ])
    const dangling = anchors([{ id: 'root', component: 'Anchor', target: 'nowhere' }])

    expect(located(linked, [probe])).toEqual([])
    expect(located(dangling, [probe])).toEqual([`unknown-child ${at(0, '/target')}`])
  })
})
