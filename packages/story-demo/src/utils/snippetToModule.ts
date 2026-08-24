import { indent } from './indentation'
import { maskSource } from './maskSource'

export interface SnippetContext {
  /** Import lines to prepend - empty for evaluation (imports are inert there). */
  importsText: string
  /** Hidden helper declarations the collapsed view references. */
  helpersText: string
}

/**
 * Turns a collapsed editor buffer into a standalone module: setup statements stay
 * above the return, the trailing JSX becomes the Demo's return value, and the hidden
 * imports/helpers are prepended. A buffer that already has a default export (the
 * expanded view) passes through untouched.
 */
export const snippetToModule = (visible: string, context: SnippetContext): string => {
  // Matched on the masked copy and anchored to a line start: "export default" inside a
  // string literal is not a declaration, and passing that buffer through unwrapped would
  // leave the evaluated code with no Demo component.
  if (/^\s*export\s+default\b/m.test(maskSource(visible))) return visible
  const normalized = visible.replaceAll('\r\n', '\n')
  const lines = normalized.split('\n')
  const jsxStart = lines.findIndex((line) => line.startsWith('<'))
  let wrapper: string
  if (jsxStart === -1) {
    // No top-level JSX statement - the buffer is a complete function body (block-body
    // stories carry their own `return`), or empty.
    const body = normalized.trim() === '' ? 'return null' : normalized
    wrapper = ['export default function Demo() {', indent(body, 2), '}'].join('\n')
  } else {
    const setup = lines.slice(0, jsxStart).join('\n').trim()
    const jsx = lines.slice(jsxStart).join('\n').trim()
    wrapper = [
      'export default function Demo() {',
      ...(setup === '' ? [] : [indent(setup, 2)]),
      '  return (',
      indent(jsx, 4),
      '  )',
      '}',
    ].join('\n')
  }
  const sections = [context.importsText, context.helpersText, wrapper].filter(
    (section) => section !== ''
  )
  return `${sections.join('\n\n')}\n`
}
