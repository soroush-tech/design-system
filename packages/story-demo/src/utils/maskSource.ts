// Chars after which a quote begins a string literal; after anything else (JSX text,
// identifiers) an apostrophe or quote is treated as plain text.
const STRING_OPENERS = new Set([...'([{=:;,>?&|!+-*/%~^'])

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

/**
 * The source with every string, template, and comment interior blanked to spaces
 * (newlines and string delimiters kept), so structural scans - brace depth, statement
 * boundaries, property keys - never trip over quotes or braces inside literals. Indices
 * are preserved: `mask[i]` always corresponds to `source[i]`.
 */
export const maskSource = (source: string): string => {
  const out = [...source]
  const stack: ScanMode[] = [{ kind: 'code', braceDepth: 0, isMasked: false }]
  const blank = (index: number): void => {
    if (out[index] !== '\n') out[index] = ' '
  }
  let index = 0
  while (index < source.length) {
    const mode = stack[stack.length - 1]
    const char = source[index]
    if (mode.kind === 'template') {
      if (char === '`') {
        stack.pop()
        const parent = stack[stack.length - 1]
        if (parent.kind === 'template' || parent.isMasked) blank(index)
        index++
      } else if (char === '$' && source[index + 1] === '{') {
        blank(index)
        blank(index + 1)
        stack.push({ kind: 'code', braceDepth: 0, isMasked: true })
        index += 2
      } else if (char === '\\') {
        blank(index)
        blank(index + 1)
        index += 2
      } else {
        blank(index)
        index++
      }
      continue
    }
    const consumeMasked = mode.isMasked
    if (char === '/' && source[index + 1] === '/') {
      while (index < source.length && source[index] !== '\n') blank(index++)
    } else if (char === '/' && source[index + 1] === '*') {
      blank(index++)
      blank(index++)
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) {
        blank(index++)
      }
      if (index < source.length) {
        blank(index++)
        blank(index++)
      }
    } else if ((char === "'" || char === '"') && isStringStart(source, index)) {
      if (consumeMasked) blank(index)
      index++
      while (index < source.length && source[index] !== char) {
        if (source[index] === '\\') blank(index++)
        blank(index++)
      }
      if (consumeMasked) blank(index)
      index++
    } else if (char === '`') {
      if (consumeMasked) blank(index)
      stack.push({ kind: 'template' })
      index++
    } else {
      if (char === '{') {
        mode.braceDepth++
      } else if (char === '}') {
        if (mode.braceDepth === 0 && mode.isMasked) {
          blank(index)
          stack.pop()
          index++
          continue
        }
        mode.braceDepth--
      }
      if (consumeMasked) blank(index)
      index++
    }
  }
  return out.join('')
}
