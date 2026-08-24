import { maskSource } from './maskSource'

/**
 * A static `import` declaration. The lookahead rejects `import(...)` and `import.meta`,
 * which are expressions - dropping them would take the rest of the module with them.
 */
const STATIC_IMPORT = /^\s*import\b(?!\s*[(.])/
/**
 * A line ending in the module specifier, i.e. the last line of an import declaration.
 * Tested against the trailing-trimmed line so the pattern needs no `\s*` on either side
 * of the optional semicolon - two unbounded repeats around it backtrack super-linearly.
 */
const SPECIFIER_END = /['"][^'"]*['"];?$/

/**
 * Turns a standalone demo module into code react-live can evaluate: import lines are
 * dropped (identifiers come from the provider's fixed scope), exports are unwrapped,
 * and a `render(<Demo />)` call is appended for noInline mode.
 */
export const prepareLiveCode = (code: string): string => {
  const normalized = code.replaceAll('\r\n', '\n')
  const lines = normalized.split('\n')
  // Classify against the masked copy so an `import` inside a string, template literal,
  // or comment is never mistaken for a declaration. maskSource preserves line breaks,
  // so the two line arrays stay index-aligned.
  const masked = maskSource(normalized).split('\n')
  const kept: string[] = []
  let inImport = false
  for (let index = 0; index < lines.length; index++) {
    const line = masked[index].trimEnd()
    if (inImport) {
      if (SPECIFIER_END.test(line)) inImport = false
      continue
    }
    if (STATIC_IMPORT.test(line)) {
      if (!SPECIFIER_END.test(line)) inImport = true
      continue
    }
    kept.push(lines[index])
  }
  const withoutImports = kept.join('\n')
  // `[ \t]` rather than `\s`, which spans newlines: under /m a leading `\s*` can restart
  // at every line and rescan what it already covered.
  const componentName =
    /^[ \t]*export[ \t]+default[ \t]+function[ \t]+([A-Za-z_$][\w$]*)/m.exec(withoutImports)?.[1] ??
    'Demo'
  const unwrapped = withoutImports
    .replace(/^export\s+default\s+/m, '')
    .replaceAll(/^export\s+(?=const|let|var|function|class)/gm, '')
    .trim()
  return `${unwrapped}\n\nrender(<${componentName} />)\n`
}
