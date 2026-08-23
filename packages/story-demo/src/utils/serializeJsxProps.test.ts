import { describe, it, expect } from 'vitest'
import {
  isSerializableArg,
  jsLiteral,
  serializeArgsLiteral,
  serializeJsxProps,
} from './serializeJsxProps'

describe('isSerializableArg', () => {
  it('accepts primitives, plain objects, and arrays', () => {
    expect(isSerializableArg('a')).toBe(true)
    expect(isSerializableArg(1)).toBe(true)
    expect(isSerializableArg(false)).toBe(true)
    expect(isSerializableArg(null)).toBe(true)
    expect(isSerializableArg({ a: [1, 'b'] })).toBe(true)
  })

  it('rejects functions, symbols, class instances, and nested rejects', () => {
    expect(isSerializableArg(() => {})).toBe(false)
    expect(isSerializableArg(Symbol('x'))).toBe(false)
    expect(isSerializableArg(new Date())).toBe(false)
    expect(isSerializableArg([() => {}])).toBe(false)
    expect(isSerializableArg({ onClick: () => {} })).toBe(false)
  })
})

describe('jsLiteral', () => {
  it('prints values as source literals', () => {
    expect(jsLiteral(null)).toBe('null')
    expect(jsLiteral("it's")).toBe("'it\\'s'")
    expect(jsLiteral('back\\slash')).toBe("'back\\\\slash'")
    expect(jsLiteral([1, 'two'])).toBe("[1, 'two']")
    expect(jsLiteral({ a: 1, 'aria-label': 'x', skipped: undefined })).toBe(
      "{ a: 1, 'aria-label': 'x' }"
    )
    expect(jsLiteral({})).toBe('{}')
    expect(jsLiteral(true)).toBe('true')
  })
})

describe('serializeJsxProps', () => {
  it('writes include-listed args as attributes with string children', () => {
    const args = { children: 'Action', variant: 'contained', size: 'md', onClick: () => {} }
    expect(serializeJsxProps('Button', args, ['children', 'variant', 'size'])).toBe(
      '<Button variant="contained" size="md">Action</Button>'
    )
  })

  it('formats booleans, numbers, objects, and escaped strings', () => {
    const args = { on: true, off: false, gap: 2, sx: { m: 1 }, title: 'say "hi"' }
    expect(serializeJsxProps('Box', args, ['on', 'off', 'gap', 'sx', 'title'])).toBe(
      '<Box on off={false} gap={2} sx={{ m: 1 }} title="say &quot;hi&quot;" />'
    )
  })

  it('always keeps aria-label and self-closes without children', () => {
    const args = { 'aria-label': 'A group', variant: 'outlined' }
    expect(serializeJsxProps('ButtonGroup', args, ['variant'])).toBe(
      '<ButtonGroup variant="outlined" aria-label="A group" />'
    )
  })

  it('renders numeric children and bare elements', () => {
    expect(serializeJsxProps('Badge', { children: 3 }, [])).toBe('<Badge>3</Badge>')
    expect(serializeJsxProps('Divider', {}, [])).toBe('<Divider />')
  })

  it('wraps attributes onto their own lines past 80 columns', () => {
    const args = {
      children: 'Action',
      variant: 'contained',
      color: 'primary',
      size: 'md',
      loadingPosition: 'center',
      borderRadius: 'lg',
    }
    const include = ['variant', 'color', 'size', 'loadingPosition', 'borderRadius']
    expect(serializeJsxProps('Button', { ...args, children: undefined }, include)).toBe(
      [
        '<Button',
        '  variant="contained"',
        '  color="primary"',
        '  size="md"',
        '  loadingPosition="center"',
        '  borderRadius="lg"',
        '/>',
      ].join('\n')
    )
    expect(serializeJsxProps('Button', args, include)).toBe(
      [
        '<Button',
        '  variant="contained"',
        '  color="primary"',
        '  size="md"',
        '  loadingPosition="center"',
        '  borderRadius="lg"',
        '>',
        '  Action',
        '</Button>',
      ].join('\n')
    )
  })
})

describe('serializeArgsLiteral', () => {
  it('keeps children and aria-label alongside the include list', () => {
    const args = { 'aria-label': 'A group', children: 'Text', variant: 'outlined' }
    expect(serializeArgsLiteral(args, ['variant'])).toBe(
      "{ variant: 'outlined', 'aria-label': 'A group', children: 'Text' }"
    )
  })

  it('wraps long literals with one entry per line, quoting non-identifier keys', () => {
    const args = {
      variant: 'a-rather-long-variant-name',
      color: 'another-long-color-token-name',
      'aria-label': 'a descriptive label',
    }
    expect(serializeArgsLiteral(args, ['variant', 'color'])).toBe(
      [
        '{',
        "  variant: 'a-rather-long-variant-name',",
        "  color: 'another-long-color-token-name',",
        "  'aria-label': 'a descriptive label',",
        '}',
      ].join('\n')
    )
  })
})
