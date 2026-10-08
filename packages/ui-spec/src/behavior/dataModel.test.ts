import { augmentDataModel, type Behavior } from './dataModel'

const behavior = (parts: object): Behavior =>
  ({ behaviorVersion: '0.1', surfaceId: 'page', catalogId: 'c', ...parts }) as Behavior

const query = (into: string, extra: object = {}) => ({
  kind: 'query',
  request: { method: 'get', url: '/x' },
  cache: { key: ['x'] },
  into,
  ...extra,
})

describe('augmentDataModel', () => {
  it('leaves the model alone when the document promises nothing', () => {
    const model = { ui: { isDark: false } }

    expect(augmentDataModel(model, behavior({}))).toEqual(model)
  })

  it('never writes to the model it was given', () => {
    const model = {}

    augmentDataModel(model, behavior({ params: { id: { default: 'a' } } }))

    expect(model).toEqual({})
  })

  it('puts each param where a surface reads it, with its default when it has one', () => {
    const model = augmentDataModel(
      {},
      behavior({ params: { source: { default: 'site' }, verify: {} } })
    )

    expect(model).toEqual({ page: { params: { source: 'site', verify: null } } })
  })

  it('gives each resource a status, and marks where its response goes', () => {
    const model = augmentDataModel({}, behavior({ resources: { gists: query('/gists') } }))

    expect(model).toEqual({
      resources: { gists: { status: 'idle', error: null } },
      gists: null,
    })
  })

  it('marks where an error goes, and the raw response a `select` reads', () => {
    const model = augmentDataModel(
      {},
      behavior({
        resources: {
          key: query('/form/key', {
            onError: '/form/keyError',
            select: { '@path': '/_response/key' },
          }),
        },
      })
    )

    expect(model).toMatchObject({ form: { key: null, keyError: null }, _response: null })
  })

  it('keeps what the model already holds at a promised place', () => {
    // A prefetched list is real data: its items can be checked, so it is not replaced.
    const model = augmentDataModel(
      { gists: [{ id: 'a' }], page: { params: { id: 'given' } } },
      behavior({ params: { id: { default: 'x' } }, resources: { gists: query('/gists') } })
    )

    expect(model.gists).toEqual([{ id: 'a' }])
    expect(model.page).toEqual({ params: { id: 'given' } })
  })

  it('does not mark anything for a response written to the root', () => {
    const model = augmentDataModel({ title: 'Hi' }, behavior({ resources: { all: query('/') } }))

    expect(model).toEqual({ title: 'Hi', resources: { all: { status: 'idle', error: null } } })
  })

  it('marks where a derived value goes', () => {
    const model = augmentDataModel(
      {},
      behavior({ derived: [{ id: 'total', into: '/cart/total', value: 0 }] })
    )

    expect(model).toEqual({ cart: { total: null } })
  })

  it('adds a per-item derived value to every item the list already has', () => {
    const model = augmentDataModel(
      { gists: [{ id: 'a' }, { id: 'b', meta: { label: 'kept' } }] },
      behavior({
        derived: [
          { id: 'author', forEach: '/gists', into: 'authorLabel', value: 0 },
          { id: 'label', forEach: '/gists', into: 'meta/label', value: 0 },
        ],
      })
    )

    expect(model.gists).toEqual([
      { id: 'a', authorLabel: null, meta: { label: null } },
      { id: 'b', authorLabel: null, meta: { label: 'kept' } },
    ])
  })

  it('has nothing to add where the list is not there yet', () => {
    const model = augmentDataModel(
      { gists: null },
      behavior({ derived: [{ id: 'author', forEach: '/gists', into: 'authorLabel', value: 0 }] })
    )

    expect(model).toEqual({ gists: null })
  })
})
