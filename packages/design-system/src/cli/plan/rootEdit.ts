// Edits the app's root: the one file whose render call starts the app. Pure text work, with no
// parser: a root that is not the standard shape returns `null`, and its lines are printed for the
// developer to add instead.

const RENDER_CALL = /\.render\s*\(/g
const CLOSERS: Record<string, string> = { ')': '(', ']': '[', '}': '{' }

/** Whether a source starts a client-rendered React app: `createRoot(...).render(` or `ReactDOM.render(`. */
export function isRootSource(source: string): boolean {
  const rendersARoot = /\bcreateRoot\s*\(/.test(source) && /\.render\s*\(/.test(source)
  return rendersARoot || /\bReactDOM\.render\s*\(/.test(source)
}

/** Skips a string or a comment starting at `index`, returning the index after it, or `index` if none starts there. */
function skipStringOrComment(source: string, index: number): number {
  const char = source[index]
  if (char === '"' || char === "'" || char === '`') {
    let cursor = index + 1
    while (cursor < source.length && source[cursor] !== char) {
      cursor += source[cursor] === '\\' ? 2 : 1
    }
    return cursor + 1
  }
  if (source.startsWith('//', index)) {
    const end = source.indexOf('\n', index)
    return end === -1 ? source.length : end
  }
  if (source.startsWith('/*', index)) {
    const end = source.indexOf('*/', index + 2)
    return end === -1 ? source.length : end + 2
  }
  return index
}

/**
 * The span of the first argument of the call whose `(` ends just before `from`: up to the first
 * comma or the closing parenthesis at its own depth. `null` when the call never closes.
 */
function readFirstArgument(source: string, from: number): { start: number; end: number } | null {
  const stack: string[] = []
  let cursor = from
  while (cursor < source.length) {
    const skipped = skipStringOrComment(source, cursor)
    if (skipped !== cursor) {
      cursor = skipped
      continue
    }
    const char = source[cursor]
    if (char === '(' || char === '[' || char === '{') stack.push(char)
    else if (char in CLOSERS) {
      if (stack.length === 0) return trimSpan(source, from, cursor)
      if (stack.pop() !== CLOSERS[char]) return null
    } else if (char === ',' && stack.length === 0) return trimSpan(source, from, cursor)
    cursor += 1
  }
  return null
}

function trimSpan(source: string, start: number, end: number) {
  let from = start
  let to = end
  while (from < to && /\s/.test(source[from])) from += 1
  while (to > from && /\s/.test(source[to - 1])) to -= 1
  return { start: from, end: to }
}

/** The indentation of the line `index` sits on. */
function indentationAt(source: string, index: number): string {
  const line = source.slice(source.lastIndexOf('\n', index - 1) + 1, index)
  return line.slice(0, line.length - line.trimStart().length)
}

/** Wraps a JSX child in `<Providers>`, keeping a multi-line tree on its own lines, one step deeper. */
function wrapTree(tree: string, indentation: string): string {
  if (!tree.includes('\n')) return `<Providers>${tree}</Providers>`
  const step = indentation.includes('\t') ? '\t' : '  '
  const deeper = tree.replaceAll('\n', `\n${step}`)
  return `<Providers>\n${indentation}${step}${deeper}\n${indentation}</Providers>`
}

const IMPORT_DECLARATION = /^import(?=[\s{*'"])[\s\S]*?(['"])[^'"\n]*\1[^\S\n]*(;?)/gm

/**
 * Adds an import after the last import declaration, in the file's own quote and semicolon style:
 * `statement` is written with single quotes and no semicolon.
 */
export function insertImport(source: string, statement: string): string {
  const declarations = [...source.matchAll(IMPORT_DECLARATION)]
  const last = declarations.at(-1)
  if (!last) return `${statement}\n${source}`
  const [text, quote, semicolon] = last
  const styled = (quote === '"' ? statement.replaceAll("'", '"') : statement) + semicolon
  const end = last.index + text.length
  return `${source.slice(0, end)}\n${styled}${source.slice(end)}`
}

/**
 * The root with what it renders wrapped in `<Providers>` and the import added, or `null` when it
 * is not the standard shape: one render call. A JSX tree is wrapped as it is; any other argument -
 * a call, a variable - is wrapped as `<Providers>{...}</Providers>`, but only in a file that may
 * hold JSX (`canHoldJsx`, a `.jsx` or `.tsx` file).
 */
export function wrapRoot(
  source: string,
  importStatement: string,
  canHoldJsx: boolean
): string | null {
  const calls = [...source.matchAll(RENDER_CALL)]
  if (calls.length !== 1) return null
  const call = calls[0]
  const argument = readFirstArgument(source, call.index + call[0].length)
  if (!argument) return null
  const rendered = source.slice(argument.start, argument.end)
  const isTree = rendered.startsWith('<') && rendered.endsWith('>')
  if (!isTree && (!canHoldJsx || rendered === '')) return null
  const child = isTree ? rendered : `{${rendered}}`
  const wrapped = wrapTree(child, indentationAt(source, argument.start))
  const edited = source.slice(0, argument.start) + wrapped + source.slice(argument.end)
  return insertImport(edited, importStatement)
}
