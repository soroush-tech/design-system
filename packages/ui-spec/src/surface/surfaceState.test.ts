import { readSurfaces } from './surfaceState'

const box = (id: string, extra: object = {}) => ({ id, component: 'Box', ...extra })

describe('readSurfaces', () => {
  it('reads a surface with its catalog, components, data and extensions', () => {
    const { surfaces, findings } = readSurfaces([
      {
        createSurface: {
          surfaceId: 'main',
          catalogId: 'https://app.test/catalog.json',
          components: [box('root')],
          dataModel: { count: 1 },
          metadata: { extensions: { tech_soroush_behavior: { behaviorVersion: '0.1' } } },
        },
      },
    ])

    expect(findings).toEqual([])
    expect(surfaces).toHaveLength(1)
    expect(surfaces[0]).toMatchObject({
      surfaceId: 'main',
      catalogId: 'https://app.test/catalog.json',
      dataModel: { count: 1 },
      extensions: { tech_soroush_behavior: { behaviorVersion: '0.1' } },
    })
    expect(surfaces[0]!.components.get('root')).toEqual({
      component: box('root'),
      path: '/0/createSurface/components/0',
    })
  })

  it('starts a surface empty when it brings no components, data or extensions', () => {
    const { surfaces } = readSurfaces([
      { createSurface: { surfaceId: 'bare' } },
      { createSurface: { surfaceId: 'tagged', metadata: {} } },
    ])

    expect(surfaces.map(({ dataModel, extensions }) => ({ dataModel, extensions }))).toEqual([
      { dataModel: {}, extensions: {} },
      { dataModel: {}, extensions: {} },
    ])
    expect(surfaces[0]!.components.size).toBe(0)
  })

  it('takes a component sent again as its replacement', () => {
    // A stream is validated as its end state, and an update is written by sending the id again.
    const { surfaces, findings } = readSurfaces([
      { createSurface: { surfaceId: 'main', components: [box('root', { label: 'old' })] } },
      { updateComponents: { surfaceId: 'main', components: [box('root', { label: 'new' })] } },
    ])

    expect(findings).toEqual([])
    expect(surfaces[0]!.components.get('root')).toEqual({
      component: box('root', { label: 'new' }),
      path: '/1/updateComponents/components/0',
    })
  })

  it('reports an id repeated inside one message', () => {
    const { findings } = readSurfaces([
      { createSurface: { surfaceId: 'main', components: [box('root'), box('a'), box('a')] } },
    ])

    expect(findings).toEqual([
      {
        code: 'duplicate-id',
        path: '/0/createSurface/components/2',
        componentId: 'a',
        message: 'The id "a" is used twice in one message.',
      },
    ])
  })

  it('keeps the components of a surface nothing created', () => {
    // Dropping them would hide them from every check.
    const { surfaces } = readSurfaces([
      { updateComponents: { surfaceId: 'late', components: [box('root')] } },
    ])

    expect(surfaces[0]!.surfaceId).toBe('late')
    expect(surfaces[0]!.catalogId).toBeUndefined()
    expect(surfaces[0]!.components.has('root')).toBe(true)
  })

  it('applies data model updates the way the protocol defines them', () => {
    const { surfaces } = readSurfaces([
      { createSurface: { surfaceId: 'main', dataModel: { form: { name: 'Ada', draft: true } } } },
      // The value replaces what is there, creating the way to it.
      { updateDataModel: { surfaceId: 'main', path: '/page/params/id', value: 7 } },
      // `null` removes the key.
      { updateDataModel: { surfaceId: 'main', path: '/form/draft', value: null } },
    ])

    expect(surfaces[0]!.dataModel).toEqual({ form: { name: 'Ada' }, page: { params: { id: 7 } } })
  })

  it('removes an item from a list, leaving no hole', () => {
    const { surfaces } = readSurfaces([
      { createSurface: { surfaceId: 'main', dataModel: { items: ['a', 'b', 'c'] } } },
      { updateDataModel: { surfaceId: 'main', path: '/items/1', value: null } },
      // Not an index, so there is no item to remove.
      { updateDataModel: { surfaceId: 'main', path: '/items/first', value: null } },
    ])

    expect(surfaces[0]!.dataModel).toEqual({ items: ['a', 'c'] })
  })

  it('replaces the whole model when an update names no path', () => {
    const replaced = readSurfaces([
      { createSurface: { surfaceId: 'main', dataModel: { old: true } } },
      { updateDataModel: { surfaceId: 'main', value: { fresh: true } } },
    ])
    const emptied = readSurfaces([
      { createSurface: { surfaceId: 'main', dataModel: { old: true } } },
      { updateDataModel: { surfaceId: 'main', path: '/', value: 'not an object' } },
    ])

    expect(replaced.surfaces[0]!.dataModel).toEqual({ fresh: true })
    expect(emptied.surfaces[0]!.dataModel).toEqual({})
  })

  it('does not write through to the messages it was given', () => {
    const dataModel = { form: { name: 'Ada' } }

    readSurfaces([
      { createSurface: { surfaceId: 'main', dataModel } },
      { updateDataModel: { surfaceId: 'main', path: '/form/name', value: 'Grace' } },
    ])

    expect(dataModel).toEqual({ form: { name: 'Ada' } })
  })

  it('forgets a deleted surface', () => {
    const { surfaces } = readSurfaces([
      { createSurface: { surfaceId: 'main' } },
      { createSurface: { surfaceId: 'gone' } },
      { deleteSurface: { surfaceId: 'gone' } },
    ])

    expect(surfaces.map(({ surfaceId }) => surfaceId)).toEqual(['main'])
  })
})
