// What the step reads and writes a source file with: a parser that keeps every node's range, a
// walk over the tree, and range edits applied to the original text, so what an edit does not touch
// stays byte for byte as the developer wrote it.
import { parse } from '@babel/parser'
import type { File, Node } from '@babel/types'

/** One replacement of `text.slice(start, end)`; an insertion has `start === end`. */
export interface Edit {
  start: number
  end: number
  text: string
}

const SCRIPT_EXTENSIONS = /\.(?:[cm]?[jt]s|[jt]sx)$/
const TYPE_ONLY_EXTENSIONS = /\.[cm]?ts$/

/** Whether the step reads this file as source: JavaScript or TypeScript, with JSX or without. */
export const isSourceFile = (path: string): boolean => SCRIPT_EXTENSIONS.test(path)

/** The tree of a source file, or `undefined` when the file does not parse. */
export function parseSource(path: string, text: string): File | undefined {
  // `<T>value` is a cast in .ts and an element in .tsx: JSX is read only where the extension allows.
  const plugins: ('typescript' | 'jsx')[] = TYPE_ONLY_EXTENSIONS.test(path)
    ? ['typescript']
    : ['typescript', 'jsx']
  try {
    return parse(text, { sourceType: 'module', plugins, ranges: true, tokens: false })
  } catch {
    return undefined
  }
}

const SKIPPED_KEYS = new Set(['loc', 'start', 'end', 'range', 'extra', 'leadingComments'])
const OTHER_SKIPPED_KEYS = new Set(['trailingComments', 'innerComments', 'comments', 'errors'])

const isNode = (value: unknown): value is Node =>
  typeof value === 'object' && value !== null && typeof (value as Node).type === 'string'

/** The child nodes of `node`, in the order they appear in the file. */
export function childrenOf(node: Node): Node[] {
  const children: Node[] = []
  for (const [key, value] of Object.entries(node)) {
    if (SKIPPED_KEYS.has(key) || OTHER_SKIPPED_KEYS.has(key)) continue
    if (Array.isArray(value)) children.push(...value.filter(isNode))
    else if (isNode(value)) children.push(value)
  }
  return children.sort((a, b) => a.start! - b.start!)
}

/**
 * Calls `visit` on `node` and on everything inside it, parents first, with the chain of nodes
 * above the visited one (the nearest last). `visit` answers `false` to skip what is inside.
 */
export function walk(
  node: Node,
  visit: (node: Node, ancestors: readonly Node[]) => boolean | void,
  ancestors: readonly Node[] = []
): void {
  if (visit(node, ancestors) === false) return
  const chain = [...ancestors, node]
  for (const child of childrenOf(node)) walk(child, visit, chain)
}

/** The 1-based line of an offset in `text`. */
export function lineAt(text: string, offset: number): number {
  let line = 1
  for (let index = text.indexOf('\n'); index !== -1 && index < offset;) {
    line += 1
    index = text.indexOf('\n', index + 1)
  }
  return line
}

/** `text` with the edits applied; they must not overlap. Edits at one offset keep their order. */
export function applyEdits(text: string, edits: readonly Edit[]): string {
  const sorted = edits
    .map((edit, order) => ({ edit, order }))
    .sort((a, b) => a.edit.start - b.edit.start || a.edit.end - b.edit.end || a.order - b.order)
  let out = ''
  let cursor = 0
  for (const { edit } of sorted) {
    if (edit.start < cursor) throw new Error(`Two edits overlap at offset ${edit.start}.`)
    out += text.slice(cursor, edit.start) + edit.text
    cursor = edit.end
  }
  return out + text.slice(cursor)
}

/** The name an object property is written with: an identifier or a string, else `undefined`. */
export const nameOfKey = (key: Node): string | undefined =>
  key.type === 'Identifier' ? key.name : key.type === 'StringLiteral' ? key.value : undefined
