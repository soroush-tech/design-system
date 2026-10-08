import { getAt, getHolder, lookUp, parsePointer } from './pointer'

describe('parsePointer', () => {
  it('names the root with the empty pointer and with a lone slash', () => {
    expect(parsePointer('')).toEqual([])
    expect(parsePointer('/')).toEqual([])
  })

  it('splits a pointer into its segments, forgiving a trailing slash', () => {
    expect(parsePointer('/form/email')).toEqual(['form', 'email'])
    expect(parsePointer('/form/email/')).toEqual(['form', 'email'])
  })

  it('keeps an empty key in the middle, and unescapes the two escapes', () => {
    expect(parsePointer('/a//b')).toEqual(['a', '', 'b'])
    expect(parsePointer('/a~1b/c~0d')).toEqual(['a/b', 'c~d'])
  })
})

describe('getAt', () => {
  const model = { gists: [{ owner: { login: 'soroushm' } }], count: 3 }

  it('reads through objects and arrays', () => {
    expect(getAt(model, ['gists', '0', 'owner', 'login'])).toBe('soroushm')
    expect(getAt(model, [])).toBe(model)
  })

  it('answers undefined where the way does not exist', () => {
    expect(getAt(model, ['gists', '4', 'owner'])).toBeUndefined()
    expect(getAt(model, ['count', 'digits'])).toBeUndefined()
  })
})

describe('lookUp', () => {
  const model = { ui: { isDark: false }, gists: [], user: null, items: [{ id: 1 }], title: 'Hi' }

  it('finds what is there, down to a falsy value', () => {
    expect(lookUp(model, ['ui', 'isDark'])).toBe('found')
    expect(lookUp(model, ['items', '0', 'id'])).toBe('found')
    expect(lookUp(model, [])).toBe('found')
  })

  it('calls a key that is plainly absent missing', () => {
    expect(lookUp(model, ['ui', 'theme'])).toBe('missing')
    expect(lookUp(model, ['nope', 'deeper'])).toBe('missing')
  })

  it('has nothing below a plain value', () => {
    expect(lookUp(model, ['title', 'length'])).toBe('missing')
  })

  it('cannot know what a list will hold, only that a name is not an index', () => {
    // The list is empty until a resource fills it, so an item is unknowable, not missing.
    expect(lookUp(model, ['gists', '0', 'description'])).toBe('unknowable')
    expect(lookUp(model, ['items', '5'])).toBe('unknowable')
    expect(lookUp(model, ['gists', 'description'])).toBe('missing')
  })

  it('cannot know what arrives where a null stands', () => {
    expect(lookUp(model, ['user', 'name'])).toBe('unknowable')
  })
})

describe('getHolder', () => {
  it('answers the container of the last segment, creating the way to it', () => {
    const model = {}

    const [holder, key] = getHolder(model, ['page', 'params', 'id'])
    holder[key] = 7

    expect(model).toEqual({ page: { params: { id: 7 } } })
  })

  it('walks into what is already there, arrays included', () => {
    const model = { gists: [{ id: 'a' }], form: { name: '' } }

    const [item, field] = getHolder(model, ['gists', '0', 'label'])
    item[field] = 'A'
    const [form, name] = getHolder(model, ['form', 'name'])

    expect(model.gists[0]).toEqual({ id: 'a', label: 'A' })
    expect(form).toBe(model.form)
    expect(name).toBe('name')
  })

  it('replaces a plain value that stands in the way', () => {
    const model = { form: 'draft' }

    const [holder, key] = getHolder(model, ['form', 'name'])
    holder[key] = 'Ada'

    expect(model).toEqual({ form: { name: 'Ada' } })
  })
})
