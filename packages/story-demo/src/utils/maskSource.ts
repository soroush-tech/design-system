// Chars after which a quote begins a string literal; after anything else (JSX text,
// identifiers) an apostrophe or quote is treated as plain text.
const STRING_OPENERS = new Set('([{=:;,>?&|!+-*/%~^')

// Keywords that can directly precede a string literal even though they scan as identifiers.
const STRING_KEYWORD_PREFIXES = new Set([
  'import',
  'from',
  'return',
  'case',
  'typeof',
  'instanceof',
  'in',
  'of',
  'new',
  'throw',
  'do',
  'else',
  'void',
  'delete',
  'yield',
  'await',
])

const isIdentifierChar = (char: string): boolean => /[\w$]/.test(char)

const isStringStart = (source: string, index: number): boolean => {
  let cursor = index - 1
  while (cursor >= 0 && /\s/.test(source[cursor])) cursor--
  if (cursor < 0) return true
  if (isIdentifierChar(source[cursor])) {
    let start = cursor
    while (start > 0 && isIdentifierChar(source[start - 1])) start--
    return STRING_KEYWORD_PREFIXES.has(source.slice(start, cursor + 1))
  }
  return STRING_OPENERS.has(source[cursor])
}

interface CodeMode {
  kind: 'code'
  braceDepth: number
  /** Interpolation code inside a template literal is masked like the template itself. */
  isMasked: boolean
}

interface TemplateMode {
  kind: 'template'
}

type ScanMode = CodeMode | TemplateMode

/** The scan's shared state. Each scanner below consumes one construct and returns the
 * index just past it, so the driver loop stays a plain dispatch. */
interface Scanner {
  source: string
  stack: ScanMode[]
  blank: (index: number) => void
}

/** Template interior: every character is blanked, and `${` opens a masked code frame. */
const scanTemplate = (scanner: Scanner, index: number): number => {
  const { source, stack, blank } = scanner
  const char = source[index]
  if (char === '`') {
    stack.pop()
    const parent = stack.at(-1)!
    if (parent.kind === 'template' || parent.isMasked) blank(index)
    return index + 1
  }
  if (char === '$' && source[index + 1] === '{') {
    blank(index)
    blank(index + 1)
    stack.push({ kind: 'code', braceDepth: 0, isMasked: true })
    return index + 2
  }
  if (char === '\\') {
    blank(index)
    blank(index + 1)
    return index + 2
  }
  blank(index)
  return index + 1
}

/** `//` through the end of the line, or `/*` through `*` `/`, delimiters included. */
const scanComment = (scanner: Scanner, index: number): number => {
  const { source, blank } = scanner
  if (source[index + 1] === '/') {
    while (index < source.length && source[index] !== '\n') blank(index++)
    return index
  }
  blank(index++)
  blank(index++)
  while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) {
    blank(index++)
  }
  if (index < source.length) {
    blank(index++)
    blank(index++)
  }
  return index
}

/** A quoted string: the interior is blanked, the delimiters survive unless the
 * surrounding frame is itself masked. */
const scanString = (scanner: Scanner, index: number, masked: boolean): number => {
  const { source, blank } = scanner
  const quote = source[index]
  if (masked) blank(index)
  index++
  while (index < source.length && source[index] !== quote) {
    if (source[index] === '\\') blank(index++)
    blank(index++)
  }
  if (masked) blank(index)
  return index + 1
}

/** One ordinary character: tracks brace depth, and a `}` at depth 0 closes a `${` frame. */
const scanCodeChar = (scanner: Scanner, mode: CodeMode, index: number): number => {
  const { source, stack, blank } = scanner
  const char = source[index]
  if (char === '{') {
    mode.braceDepth++
  } else if (char === '}') {
    if (mode.braceDepth === 0 && mode.isMasked) {
      blank(index)
      stack.pop()
      return index + 1
    }
    mode.braceDepth--
  }
  if (mode.isMasked) blank(index)
  return index + 1
}

/** Code outside a template: picks the construct starting at `index` and consumes it. */
const scanCode = (scanner: Scanner, mode: CodeMode, index: number): number => {
  const { source, stack, blank } = scanner
  const char = source[index]
  const next = source[index + 1]
  if (char === '/' && (next === '/' || next === '*')) return scanComment(scanner, index)
  if ((char === "'" || char === '"') && isStringStart(source, index)) {
    return scanString(scanner, index, mode.isMasked)
  }
  if (char === '`') {
    if (mode.isMasked) blank(index)
    stack.push({ kind: 'template' })
    return index + 1
  }
  return scanCodeChar(scanner, mode, index)
}

/**
 * The source with every string, template, and comment interior blanked to spaces
 * (newlines and string delimiters kept), so structural scans - brace depth, statement
 * boundaries, property keys - never trip over quotes or braces inside literals. Indices
 * are preserved: `mask[i]` always corresponds to `source[i]`.
 */
export const maskSource = (source: string): string => {
  const out = [...source]
  const stack: ScanMode[] = [{ kind: 'code', braceDepth: 0, isMasked: false }]
  const scanner: Scanner = {
    source,
    stack,
    blank: (index) => {
      if (out[index] !== '\n') out[index] = ' '
    },
  }
  let index = 0
  while (index < source.length) {
    const mode = stack.at(-1)!
    index = mode.kind === 'template' ? scanTemplate(scanner, index) : scanCode(scanner, mode, index)
  }
  return out.join('')
}
