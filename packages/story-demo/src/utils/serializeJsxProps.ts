const IDENTIFIER = /^[A-Za-z_$][\w$]*$/
const MAX_SINGLE_LINE = 80

const isPlainObject = (value: object): boolean => {
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/** Whether a value can be written back out as a source literal. */
export const isSerializableArg = (value: unknown): boolean => {
  if (value === null) return true
  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      return true
    case 'object':
      if (Array.isArray(value)) return value.every(isSerializableArg)
      return isPlainObject(value) && Object.values(value).every(isSerializableArg)
    default:
      return false
  }
}

/** A JS source literal for a serializable value - single-quoted strings, plain objects. */
export const jsLiteral = (value: unknown): string => {
  if (value === null) return 'null'
  if (typeof value === 'string') {
    return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`
  }
  if (Array.isArray(value)) return `[${value.map(jsLiteral).join(', ')}]`
  if (typeof value === 'object') {
    const entries = Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([key, entryValue]) => {
        const keyText = IDENTIFIER.test(key) ? key : `'${key}'`
        return `${keyText}: ${jsLiteral(entryValue)}`
      })
    return entries.length === 0 ? '{}' : `{ ${entries.join(', ')} }`
  }
  return String(value)
}

/**
 * The arg names worth writing out: the include-listed ones that are present and
 * serializable, in include order, plus `aria-label` (kept for a11y fidelity even when
 * it is not a control).
 */
const presentableKeys = (
  args: Record<string, unknown>,
  include: readonly string[],
  extras: readonly string[]
): string[] => {
  const keys = include.filter(
    (key) => key !== 'children' && args[key] !== undefined && isSerializableArg(args[key])
  )
  for (const extra of extras) {
    if (args[extra] !== undefined && isSerializableArg(args[extra]) && !keys.includes(extra)) {
      keys.push(extra)
    }
  }
  return keys
}

const jsxAttribute = (key: string, value: unknown): string => {
  if (value === true) return key
  if (typeof value === 'string') return `${key}="${value.replaceAll('"', '&quot;')}"`
  if (typeof value === 'number' || typeof value === 'boolean') return `${key}={${String(value)}}`
  return `${key}={${jsLiteral(value)}}`
}

/**
 * A JSX element for an args-driven story: `<Button variant="contained">Action</Button>`.
 * Attributes follow the controls include order; string or numeric `children` become the
 * element's text child. Wraps onto multiple lines past 80 columns.
 */
export const serializeJsxProps = (
  componentName: string,
  args: Record<string, unknown>,
  include: readonly string[]
): string => {
  const keys = presentableKeys(args, include, ['aria-label'])
  const attributes = keys.map((key) => jsxAttribute(key, args[key]))
  const children = args.children
  const childText =
    typeof children === 'string' || typeof children === 'number' ? String(children) : undefined
  const attributeText = attributes.length > 0 ? ` ${attributes.join(' ')}` : ''
  const singleLine =
    childText === undefined
      ? `<${componentName}${attributeText} />`
      : `<${componentName}${attributeText}>${childText}</${componentName}>`
  if (singleLine.length <= MAX_SINGLE_LINE || attributes.length === 0) return singleLine
  const attributeLines = attributes.map((attribute) => `  ${attribute}`).join('\n')
  return childText === undefined
    ? `<${componentName}\n${attributeLines}\n/>`
    : `<${componentName}\n${attributeLines}\n>\n  ${childText}\n</${componentName}>`
}

/**
 * An object literal for the `const args = ...` line of a `render: (args) =>` story.
 * Unlike the JSX form this keeps `children` - the spread passes it through.
 */
export const serializeArgsLiteral = (
  args: Record<string, unknown>,
  include: readonly string[]
): string => {
  const keys = presentableKeys(args, include, ['aria-label', 'children'])
  const literal: Record<string, unknown> = {}
  for (const key of keys) literal[key] = args[key]
  const singleLine = jsLiteral(literal)
  if (singleLine.length <= MAX_SINGLE_LINE) return singleLine
  const entryLines = keys
    .map((key) => {
      const keyText = IDENTIFIER.test(key) ? key : `'${key}'`
      return `  ${keyText}: ${jsLiteral(args[key])},`
    })
    .join('\n')
  return `{\n${entryLines}\n}`
}
