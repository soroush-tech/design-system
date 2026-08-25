import { dedent } from './indentation'
import { maskSource } from './maskSource'

export interface ParsedImport {
  /** The full original import statement. */
  statement: string
  specifier: string
  defaultBinding?: string
  namespaceBinding?: string
  namedBindings: { imported: string; local: string }[]
  /** Every local name the statement introduces. */
  bindings: string[]
  typeOnly: boolean
}

export interface ParsedDeclaration {
  names: string[]
  /** The declaration with its contiguous leading line comments attached. */
  text: string
}

export type RenderParamKind = 'none' | 'args' | 'pattern'

export interface ParsedStory {
  name: string
  /** The story's full object initializer. */
  text: string
  /** The render function's returned JSX (paren-stripped) or block body, dedented. */
  renderBody?: string
  /** True when renderBody is a `{ ... }` block that contains its own return. */
  isBlockBody: boolean
  renderParamKind: RenderParamKind
  /** The render parameter's source text - an identifier or a destructuring pattern. */
  renderParamText?: string
  hasDecorators: boolean
}

export interface ParsedStoriesSource {
  imports: ParsedImport[]
  declarations: ParsedDeclaration[]
  stories: Map<string, ParsedStory>
  componentName: string
}

const TOP_LEVEL_START = /^(?:import|export|const|let|var|type|interface|function|async)\b/
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/

interface Statement {
  start: number
  end: number
  text: string
}

/**
 * Whether the line following a depth-0 newline opens a new top-level statement. Trailing
 * whitespace at the end of the source counts, so the last statement closes there.
 */
const startsNewStatement = (source: string, mask: string, newlineIndex: number): boolean => {
  const { length } = mask
  let peek = newlineIndex + 1
  while (peek < length && /\s/.test(mask[peek])) peek++
  if (peek >= length) return true
  const lineStart = mask.lastIndexOf('\n', peek - 1) + 1
  return peek === lineStart && TOP_LEVEL_START.test(source.slice(peek, peek + 12))
}

/** The end of the statement beginning at `start`, scanning at bracket depth 0. */
const findStatementEnd = (source: string, mask: string, start: number): number => {
  const { length } = mask
  let depth = 0
  for (let index = start; index < length; index++) {
    const char = mask[index]
    if ('{(['.includes(char)) depth++
    else if ('})]'.includes(char)) depth--
    else if (char === '\n' && depth === 0 && startsNewStatement(source, mask, index)) return index
  }
  return length
}

const splitTopLevelStatements = (source: string, mask: string): Statement[] => {
  const statements: Statement[] = []
  const { length } = source
  let index = 0
  while (index < length) {
    while (index < length && /\s/.test(mask[index])) index++
    if (index >= length) break
    const end = findStatementEnd(source, mask, index)
    statements.push({ start: index, end, text: source.slice(index, end).trimEnd() })
    index = end
  }
  return statements
}

const findMatching = (mask: string, openIndex: number, open: string, close: string): number => {
  let depth = 0
  for (let index = openIndex; index < mask.length; index++) {
    if (mask[index] === open) depth++
    else if (mask[index] === close && --depth === 0) return index
  }
  throw new Error(`Unbalanced \`${open}\` at index ${openIndex} in stories source.`)
}

/** The `{ a, b as c, type D }` specifiers of an import clause, `type` prefixes dropped. */
const parseNamedBindings = (
  clause: string,
  braceStart: number
): { imported: string; local: string }[] => {
  const bindings: { imported: string; local: string }[] = []
  const inner = clause.slice(braceStart + 1, clause.lastIndexOf('}'))
  for (const part of inner.split(',')) {
    const specifierText = part.replace(/^\s*type\s+/, '').trim()
    if (specifierText === '') continue
    const asMatch = /^([\w$]+)\s+as\s+([\w$]+)$/.exec(specifierText)
    if (asMatch) bindings.push({ imported: asMatch[1], local: asMatch[2] })
    else bindings.push({ imported: specifierText, local: specifierText })
  }
  return bindings
}

const parseImport = (text: string): ParsedImport => {
  const typeOnly = /^import\s+type\b/.test(text)
  const specifier =
    /from\s*['"]([^'"]+)['"]\s*;?$/.exec(text)?.[1] ?? /^import\s*['"]([^'"]+)['"]/.exec(text)?.[1]
  if (!specifier) throw new Error(`Could not read the import specifier of: ${text}`)
  // Anchored on the trailing `from '...'` clause, not `lastIndexOf('from')` - a specifier
  // such as './fromNow' contains the keyword and would truncate the binding clause.
  const fromMatch = /\bfrom\s*['"][^'"]+['"]\s*;?$/.exec(text)
  const clause =
    fromMatch === null ? '' : text.slice(0, fromMatch.index).replace(/^import\s+(type\s+)?/, '')
  const namedBindings: { imported: string; local: string }[] = []
  let defaultBinding: string | undefined
  let namespaceBinding: string | undefined
  const braceStart = clause.indexOf('{')
  const head = (braceStart === -1 ? clause : clause.slice(0, braceStart)).trim()
  const namespaceMatch = /\*\s*as\s+([\w$]+)/.exec(head)
  if (namespaceMatch) namespaceBinding = namespaceMatch[1]
  const headName = head
    .replace(/\*\s*as\s+[\w$]+/, '')
    .replaceAll(',', '')
    .trim()
  if (IDENTIFIER.test(headName)) defaultBinding = headName
  if (braceStart !== -1) namedBindings.push(...parseNamedBindings(clause, braceStart))
  const bindings = [
    ...(defaultBinding ? [defaultBinding] : []),
    ...(namespaceBinding ? [namespaceBinding] : []),
    ...namedBindings.map((binding) => binding.local),
  ]
  return {
    statement: text,
    specifier,
    defaultBinding,
    namespaceBinding,
    namedBindings,
    bindings,
    typeOnly,
  }
}

const parseComponentName = (metaText: string): string => {
  const name =
    /Meta<\s*typeof\s+([A-Za-z_$][\w$]*)/.exec(metaText)?.[1] ??
    /component:\s*([A-Za-z_$][\w$]*)/.exec(metaText)?.[1]
  if (!name) {
    throw new Error('Unsupported stories module - could not determine the component from meta.')
  }
  return name
}

/** Attaches the contiguous `//` comment lines directly above a top-level statement. */
const withLeadingComments = (source: string, start: number, text: string): string => {
  let lineStart = start
  for (;;) {
    if (lineStart === 0) break
    const previousLineStart = source.lastIndexOf('\n', lineStart - 2) + 1
    const previousLine = source.slice(previousLineStart, lineStart - 1)
    if (!previousLine.trim().startsWith('//')) break
    lineStart = previousLineStart
  }
  return lineStart === start ? text : `${source.slice(lineStart, start)}${text}`
}

interface ObjectProperty {
  name: string
  valueStart: number
  valueEnd: number
  /** Set on a `...Story` entry - the identifier it spreads from. */
  spreadFrom?: string
}

const PROPERTY_KEY = /^([A-Za-z_$][\w$]*|'[^']*'|"[^"]*")\s*:/
// CSF composes a story from a sibling: `{ ...WithPanel, args: { ... } }`. The scanned
// slice stops before the closing brace, so a trailing spread ends at the string's end.
const SPREAD_ENTRY = /^\.\.\.\s*([A-Za-z_$][\w$]*)\s*(?=[,}]|$)/

/** The property whose key starts at `index`; its value runs to `braceClose` until a
 * qualifying comma trims it. A `...Story` entry carries no value of its own. */
const readPropertyKey = (
  source: string,
  mask: string,
  index: number,
  braceClose: number
): ObjectProperty => {
  const rest = mask.slice(index, braceClose)
  const spreadMatch = SPREAD_ENTRY.exec(rest)
  if (spreadMatch) {
    const valueStart = index + spreadMatch[0].length
    return { name: '...', spreadFrom: spreadMatch[1], valueStart, valueEnd: valueStart }
  }
  const keyMatch = PROPERTY_KEY.exec(rest)
  if (!keyMatch) {
    throw new Error(`Could not read a property key at index ${index} in stories source.`)
  }
  const rawKey = source.slice(index, index + keyMatch[1].length)
  const name = /^['"]/.test(rawKey) ? rawKey.slice(1, -1) : rawKey
  return { name, valueStart: index + keyMatch[0].length, valueEnd: braceClose }
}

/**
 * Whether a depth-1 comma ends the current property value. It does so only when a
 * property key (or the end of the object) follows - JSX text inside an unparenthesized
 * render value may contain bare commas.
 */
const endsPropertyValue = (mask: string, commaIndex: number, braceClose: number): boolean => {
  let peek = commaIndex + 1
  while (peek < braceClose && /\s/.test(mask[peek])) peek++
  if (peek >= braceClose) return true
  const rest = mask.slice(peek, braceClose)
  return PROPERTY_KEY.test(rest) || SPREAD_ENTRY.test(rest)
}

/** The top-level properties of an object initializer, located via the mask. */
const scanObjectProperties = (
  source: string,
  mask: string,
  braceOpen: number,
  braceClose: number
): ObjectProperty[] => {
  const properties: ObjectProperty[] = []
  // The scan starts just inside the object's own brace, so depth 1 is its property level
  // and the first non-space character there is a key.
  let depth = 1
  let expectKey = true
  let index = braceOpen + 1
  while (index <= braceClose) {
    const char = mask[index]
    if ('{(['.includes(char)) depth++
    else if ('})]'.includes(char)) depth--
    else if (depth === 1 && expectKey && !/\s/.test(char)) {
      const property = readPropertyKey(source, mask, index, braceClose)
      properties.push(property)
      expectKey = false
      index = property.valueStart
      continue
    } else if (depth === 1 && char === ',' && endsPropertyValue(mask, index, braceClose)) {
      // A qualifying comma always follows a scanned property - readPropertyKey throws on
      // anything that is not a key, so `properties` cannot be empty here.
      properties.at(-1)!.valueEnd = index
      expectKey = true
    }
    index++
  }
  return properties
}

interface RenderValue {
  renderBody: string
  isBlockBody: boolean
  renderParamKind: RenderParamKind
  renderParamText?: string
}

interface RenderParam {
  kind: RenderParamKind
  text?: string
  /** The index just past the parameter, where the `=>` search resumes. */
  end: number
}

/** The render arrow's parameter: `(args)`, a destructuring `({ disabled })`, a bare
 * `args`, or none at all. */
const parseRenderParam = (
  source: string,
  mask: string,
  start: number,
  valueEnd: number
): RenderParam => {
  if (mask[start] === '(') {
    const close = findMatching(mask, start, '(', ')')
    const paramText = source.slice(start + 1, close).trim()
    if (paramText === '') return { kind: 'none', end: close + 1 }
    const paramName = paramText.split(':')[0].trim()
    return IDENTIFIER.test(paramName)
      ? { kind: 'args', text: paramName, end: close + 1 }
      : { kind: 'pattern', text: paramText, end: close + 1 }
  }
  const bareParam = /^([A-Za-z_$][\w$]*)\s*=>/.exec(source.slice(start, valueEnd))
  if (bareParam) return { kind: 'args', text: bareParam[1], end: start + bareParam[1].length }
  return { kind: 'none', end: start }
}

const parseRenderValue = (source: string, mask: string, property: ObjectProperty): RenderValue => {
  let index = property.valueStart
  while (index < property.valueEnd && /\s/.test(mask[index])) index++
  const param = parseRenderParam(source, mask, index, property.valueEnd)
  const common = { renderParamKind: param.kind, renderParamText: param.text }
  // Searched in the mask, not the source: a comment such as `(args) /* => */ => ...`
  // would otherwise supply the arrow and the body would start at `*/`.
  const arrow = mask.indexOf('=>', param.end)
  if (arrow === -1 || arrow >= property.valueEnd) {
    throw new Error('Unsupported render value - expected an arrow function.')
  }
  index = arrow + 2
  while (index < property.valueEnd && /\s/.test(mask[index])) index++
  if (mask[index] === '(') {
    const close = findMatching(mask, index, '(', ')')
    return { renderBody: dedent(source.slice(index + 1, close)), isBlockBody: false, ...common }
  }
  if (mask[index] === '{') {
    const close = findMatching(mask, index, '{', '}')
    return { renderBody: dedent(source.slice(index + 1, close)), isBlockBody: true, ...common }
  }
  return {
    renderBody: dedent(source.slice(index, property.valueEnd)).trim(),
    isBlockBody: false,
    ...common,
  }
}

const parseStory = (
  source: string,
  mask: string,
  statement: Statement,
  name: string,
  /** Stories already parsed in this module - what a `...Story` spread can name. */
  parsed: Map<string, ParsedStory>
): ParsedStory => {
  const braceOpen = mask.indexOf('{', mask.indexOf('=', statement.start))
  const braceClose = findMatching(mask, braceOpen, '{', '}')
  const properties = scanObjectProperties(source, mask, braceOpen, braceClose)
  const renderProperty = properties.find((property) => property.name === 'render')
  const render = renderProperty ? parseRenderValue(source, mask, renderProperty) : undefined
  // `{ ...Base, args: {...} }` inherits Base's render; an own `render` still wins.
  let base: ParsedStory | undefined
  for (const property of properties) {
    if (property.spreadFrom) base = parsed.get(property.spreadFrom) ?? base
  }
  const inherited = render ? undefined : base
  return {
    name,
    text: source.slice(braceOpen, braceClose + 1),
    renderBody: render?.renderBody ?? inherited?.renderBody,
    isBlockBody: render?.isBlockBody ?? inherited?.isBlockBody ?? false,
    renderParamKind: render?.renderParamKind ?? inherited?.renderParamKind ?? 'none',
    renderParamText: render?.renderParamText ?? inherited?.renderParamText,
    hasDecorators:
      properties.some((property) => property.name === 'decorators') ||
      (base?.hasDecorators ?? false),
  }
}

/**
 * A structural read of a CSF3 stories module - its imports, top-level helper
 * declarations, story initializers, and the component under test - extracted with a
 * mask-based scan so demo code can be synthesized from the real story source.
 */
export const parseStoriesSource = (raw: string): ParsedStoriesSource => {
  const source = raw.replaceAll('\r\n', '\n')
  const mask = maskSource(source)
  const imports: ParsedImport[] = []
  const declarations: ParsedDeclaration[] = []
  const stories = new Map<string, ParsedStory>()
  let componentName: string | undefined
  for (const statement of splitTopLevelStatements(source, mask)) {
    const { text } = statement
    if (/^import\b/.test(text)) {
      imports.push(parseImport(text))
      continue
    }
    if (/^(?:export\s+default|type|interface)\b/.test(text)) continue
    if (/^const\s+meta\b/.test(text)) {
      componentName = parseComponentName(text)
      continue
    }
    const storyMatch = /^export\s+const\s+([A-Za-z_$][\w$]*)\s*:\s*Story\b/.exec(text)
    if (storyMatch) {
      const name = storyMatch[1]
      stories.set(name, parseStory(source, mask, statement, name, stories))
      continue
    }
    const declarationMatch =
      /^(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)/.exec(text) ??
      /^(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/.exec(text)
    if (declarationMatch) {
      declarations.push({
        names: [declarationMatch[1]],
        text: withLeadingComments(source, statement.start, text),
      })
    }
  }
  if (!componentName) {
    throw new Error('Unsupported stories module - could not find the CSF meta declaration.')
  }
  return { imports, declarations, stories, componentName }
}
