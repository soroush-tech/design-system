/**
 * Turns a standalone demo module into code react-live can evaluate: import lines are
 * dropped (identifiers come from the provider's fixed scope), exports are unwrapped,
 * and a `render(<Demo />)` call is appended for noInline mode.
 */
export const prepareLiveCode = (code: string): string => {
  const lines = code.replaceAll('\r\n', '\n').split('\n')
  const kept: string[] = []
  let inImport = false
  for (const line of lines) {
    if (inImport) {
      if (/['"][^'"]*['"]\s*;?\s*$/.test(line)) inImport = false
      continue
    }
    if (/^\s*import\b/.test(line)) {
      if (!/['"][^'"]*['"]\s*;?\s*$/.test(line)) inImport = true
      continue
    }
    kept.push(line)
  }
  const withoutImports = kept.join('\n')
  const componentName =
    /export\s+default\s+function\s+([A-Za-z_$][\w$]*)/.exec(withoutImports)?.[1] ?? 'Demo'
  const unwrapped = withoutImports
    .replace(/^export\s+default\s+/m, '')
    .replaceAll(/^export\s+(?=const|let|var|function|class)/gm, '')
    .trim()
  return `${unwrapped}\n\nrender(<${componentName} />)\n`
}
