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

/**
 * A single-quoted JS string literal. JSON.stringify does the escaping - line breaks and
 * other control characters included, which a hand-rolled quote/backslash pass emits raw,
 * producing an unterminated literal - then the quote style is swapped back to the house
 * single quote.
 */
const ESCAPED_DOUBLE_QUOTE = String.raw`\"`
const ESCAPED_SINGLE_QUOTE = String.raw`\'`

const singleQuoted = (value: string): string => {
  const escaped = JSON.stringify(value)
    .slice(1, -1)
    .replaceAll(ESCAPED_DOUBLE_QUOTE, '"')
    .replaceAll("'", ESCAPED_SINGLE_QUOTE)
  return `'${escaped}'`
}

/**
 * An object-literal key. `__proto__` gets the computed form: written bare it sets the
 * new object's prototype instead of adding a property of that name.
 */
const objectKeyText = (key: string): string => {
  if (key === '__proto__') return `[${singleQuoted(key)}]`
  return IDENTIFIER.test(key) ? key : singleQuoted(key)
}

/** A JS source literal for a serializable value - single-quoted strings, plain objects. */
export const jsLiteral = (value: unknown): string => {
  if (value === null) return 'null'
  if (typeof value === 'string') return singleQuoted(value)
  if (Array.isArray(value)) return `[${value.map(jsLiteral).join(', ')}]`
  if (typeof value === 'object') {
    const entries = Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([key, entryValue]) => `${objectKeyText(key)}: ${jsLiteral(entryValue)}`)
    return entries.length === 0 ? '{}' : `{ ${entries.join(', ')} }`
  }
  // Numbers and booleans are all that isSerializableArg admits past the guards above,
  // so this never reaches Object's default stringification.
  return String(value as number | boolean)
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

/**
 * Strings that survive a double-quoted JSX attribute byte for byte. A quote closes the
 * attribute, an ampersand may be read as a character reference, and a control character
 * (a line break above all) cannot be written raw - each of those goes in an expression
 * container instead, where it is an ordinary JS literal.
 */
const JSX_ATTRIBUTE_SAFE = /^[^"&\p{Cc}]*$/u

/**
 * Strings that survive as JSX text. On top of the attribute cases, angle brackets open a
 * tag and braces open an expression, so text carrying either is quoted instead.
 */
const JSX_TEXT_SAFE = /^[^<>{}&\p{Cc}]*$/u

const jsxAttribute = (key: string, value: unknown): string => {
  if (value === true) return key
  if (typeof value === 'string') {
    return JSX_ATTRIBUTE_SAFE.test(value) ? `${key}="${value}"` : `${key}={${jsLiteral(value)}}`
  }
  if (typeof value === 'number' || typeof value === 'boolean') return `${key}={${String(value)}}`
  return `${key}={${jsLiteral(value)}}`
}

/** The text child for an args value, quoted into an expression container when it must be. */
const jsxChild = (children: unknown): string | undefined => {
  if (typeof children === 'number') return String(children)
  if (typeof children !== 'string') return undefined
  return JSX_TEXT_SAFE.test(children) ? children : `{${jsLiteral(children)}}`
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
  const childText = jsxChild(args.children)
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
  // Null-prototype: assigning `__proto__` on a plain object replaces the prototype and
  // the key is lost before jsLiteral ever sees it.
  const literal: Record<string, unknown> = Object.create(null)
  for (const key of keys) literal[key] = args[key]
  const singleLine = jsLiteral(literal)
  if (singleLine.length <= MAX_SINGLE_LINE) return singleLine
  const entryLines = keys
    .map((key) => `  ${objectKeyText(key)}: ${jsLiteral(args[key])},`)
    .join('\n')
  return `{\n${entryLines}\n}`
}
