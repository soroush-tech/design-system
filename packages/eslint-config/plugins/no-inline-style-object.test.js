import { describe, expect, it, vi } from 'vitest'
import plugin from './no-inline-style-object.js'

const MESSAGE =
  'Do not write a style object in JSX: use a styled component or a sheet entry, and useStyleValue for a value that changes.'

const object = { type: 'ObjectExpression' }
const attribute = (name, value) => ({ type: 'JSXAttribute', name: { name }, value })
const container = (expression) => ({ type: 'JSXExpressionContainer', expression })

/** Drive the rule's `JSXAttribute` visitor over one attribute. */
const visit = (node) => {
  const report = vi.fn()
  plugin.rules['no-inline-style-object'].create({ report }).JSXAttribute(node)
  return report
}

describe('local-style/no-inline-style-object', () => {
  it('registers under the local-style plugin namespace', () => {
    expect(plugin.meta.name).toBe('local-style')
    expect(Object.keys(plugin.rules)).toEqual(['no-inline-style-object'])
  })

  it('reports an object written in place', () => {
    const node = attribute('style', container(object))
    expect(visit(node)).toHaveBeenCalledWith({ node, message: MESSAGE })
  })

  it.each(['TSAsExpression', 'TSSatisfiesExpression', 'TSNonNullExpression'])(
    'reports an object under %s',
    (type) => {
      const node = attribute('style', container({ type, expression: { type, expression: object } }))
      expect(visit(node)).toHaveBeenCalledWith({ node, message: MESSAGE })
    }
  )

  it.each([
    ['a variable', attribute('style', container({ type: 'Identifier' }))],
    ['a conditional', attribute('style', container({ type: 'ConditionalExpression' }))],
    ['a string', attribute('style', { type: 'Literal', value: 'color: red' })],
    ['no value', attribute('style', null)],
    ['another attribute', attribute('sx', container(object))],
  ])('allows %s', (_label, node) => {
    expect(visit(node)).not.toHaveBeenCalled()
  })
})
