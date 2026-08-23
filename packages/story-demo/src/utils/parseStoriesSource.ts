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

const splitTopLevelStatements = (source: string, mask: string): Statement[] => {
  const statements: Statement[] = []
  const { length } = source
  let index = 0
  while (index < length) {
    while (index < length && /\s/.test(mask[index])) index++
    if (index >= length) break
    const start = index
    let depth = 0
    let end = length
    while (index < length) {
      const char = mask[index]
      if ('{(['.includes(char)) {
        depth++
      } else if ('})]'.includes(char)) {
        depth--
      } else if (char === '\n' && depth === 0) {
        let peek = index + 1
        while (peek < length && /\s/.test(mask[peek])) peek++
        if (peek >= length) {
          end = index
          break
        }
        const lineStart = mask.lastIndexOf('\n', peek - 1) + 1
        if (peek === lineStart && TOP_LEVEL_START.test(source.slice(peek, peek + 12))) {
          end = index
          break
        }
      }
      index++
    }
    statements.push({ start, end, text: source.slice(start, end).trimEnd() })
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

const parseImport = (text: string): ParsedImport => {
  const typeOnly = /^import\s+type\b/.test(text)
  const specifier =
    /from\s*['"]([^'"]+)['"]\s*;?$/.exec(text)?.[1] ?? /^import\s*['"]([^'"]+)['"]/.exec(text)?.[1]
  if (!specifier) throw new Error(`Could not read the import specifier of: ${text}`)
  const fromIndex = text.lastIndexOf('from')
  const clause =
    fromIndex === -1 ? '' : text.slice(0, fromIndex).replace(/^import\s+(type\s+)?/, '')
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
  if (braceStart !== -1) {
    const inner = clause.slice(braceStart + 1, clause.indexOf('}'))
    for (const part of inner.split(',')) {
      const specifierText = part.replace(/^\s*type\s+/, '').trim()
      if (specifierText === '') continue
      const asMatch = /^([\w$]+)\s+as\s+([\w$]+)$/.exec(specifierText)
      if (asMatch) namedBindings.push({ imported: asMatch[1], local: asMatch[2] })
      else namedBindings.push({ imported: specifierText, local: specifierText })
    }
  }
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
}

const PROPERTY_KEY = /^([A-Za-z_$][\w$]*|'[^']*'|"[^"]*")\s*:/

/** The top-level properties of an object initializer, located via the mask. */
const scanObjectProperties = (
  source: string,
  mask: string,
  braceOpen: number,
  braceClose: number
): ObjectProperty[] => {
  const properties: ObjectProperty[] = []
  let depth = 0
  let expectKey = false
  let index = braceOpen
  while (index <= braceClose) {
    const char = mask[index]
    if ('{(['.includes(char)) {
      depth++
      if (char === '{' && depth === 1) expectKey = true
      index++
      continue
    }
    if ('})]'.includes(char)) {
      depth--
      index++
      continue
    }
    if (depth === 1) {
      if (expectKey && !/\s/.test(char)) {
        const keyMatch = PROPERTY_KEY.exec(mask.slice(index, braceClose))
        if (!keyMatch) {
          throw new Error(`Could not read a property key at index ${index} in stories source.`)
        }
        const rawKey = source.slice(index, index + keyMatch[1].length)
        const name = /^['"]/.test(rawKey) ? rawKey.slice(1, -1) : rawKey
        const valueStart = index + keyMatch[0].length
        properties.push({ name, valueStart, valueEnd: braceClose })
        expectKey = false
        index = valueStart
        continue
      }
      if (char === ',') {
        // A comma at depth 1 ends the value only when a property key (or the end of the
        // object) follows - JSX text inside an unparenthesized render value may contain
        // bare commas.
        let peek = index + 1
        while (peek < braceClose && /\s/.test(mask[peek])) peek++
        if (peek >= braceClose || PROPERTY_KEY.test(mask.slice(peek, braceClose))) {
          // A qualifying comma always follows a scanned property - the key branch above
          // throws on anything that is not a key, so `properties` cannot be empty here.
          properties[properties.length - 1].valueEnd = index
          expectKey = true
        }
      }
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

const parseRenderValue = (source: string, mask: string, property: ObjectProperty): RenderValue => {
  let index = property.valueStart
  while (index < property.valueEnd && /\s/.test(mask[index])) index++
  let renderParamKind: RenderParamKind = 'none'
  let renderParamText: string | undefined
  if (mask[index] === '(') {
    const close = findMatching(mask, index, '(', ')')
    const paramText = source.slice(index + 1, close).trim()
    if (paramText !== '') {
      renderParamText = paramText
      const paramName = paramText.split(':')[0].trim()
      if (IDENTIFIER.test(paramName)) {
        renderParamKind = 'args'
        renderParamText = paramName
      } else {
        renderParamKind = 'pattern'
      }
    }
    index = close + 1
  } else {
    const bareParam = /^([A-Za-z_$][\w$]*)\s*=>/.exec(source.slice(index, property.valueEnd))
    if (bareParam) {
      renderParamKind = 'args'
      renderParamText = bareParam[1]
      index += bareParam[1].length
    }
  }
  const arrow = source.indexOf('=>', index)
  if (arrow === -1 || arrow >= property.valueEnd) {
    throw new Error('Unsupported render value - expected an arrow function.')
  }
  index = arrow + 2
  while (index < property.valueEnd && /\s/.test(mask[index])) index++
  if (mask[index] === '(') {
    const close = findMatching(mask, index, '(', ')')
    return {
      renderBody: dedent(source.slice(index + 1, close)),
      isBlockBody: false,
      renderParamKind,
      renderParamText,
    }
  }
  if (mask[index] === '{') {
    const close = findMatching(mask, index, '{', '}')
    return {
      renderBody: dedent(source.slice(index + 1, close)),
      isBlockBody: true,
      renderParamKind,
      renderParamText,
    }
  }
  return {
    renderBody: dedent(source.slice(index, property.valueEnd)).trim(),
    isBlockBody: false,
    renderParamKind,
    renderParamText,
  }
}

const parseStory = (
  source: string,
  mask: string,
  statement: Statement,
  name: string
): ParsedStory => {
  const braceOpen = mask.indexOf('{', mask.indexOf('=', statement.start))
  const braceClose = findMatching(mask, braceOpen, '{', '}')
  const properties = scanObjectProperties(source, mask, braceOpen, braceClose)
  const renderProperty = properties.find((property) => property.name === 'render')
  const render = renderProperty ? parseRenderValue(source, mask, renderProperty) : undefined
  return {
    name,
    text: source.slice(braceOpen, braceClose + 1),
    renderBody: render?.renderBody,
    isBlockBody: render?.isBlockBody ?? false,
    renderParamKind: render?.renderParamKind ?? 'none',
    renderParamText: render?.renderParamText,
    hasDecorators: properties.some((property) => property.name === 'decorators'),
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
      stories.set(name, parseStory(source, mask, statement, name))
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
