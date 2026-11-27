// The first step: an app on @soroush.tech/design-system 2.x moves to Gild UI 0.1.0. What changes,
// and what is left to people, is the inventory in `inventory/` (see README.md here); this file
// reads each file of the app once, makes the edits the inventory marks mechanical, and reports
// the rest with its file and line.
import type { Change, MigrationApp, MigrationStep } from '../../step'
import { RELEVANT } from './data'
import { planManifest, type AppFacts } from './dependencies'
import { detectInSource, detectInText } from './detect'
import { ImportEditor, type FileReport } from './imports'
import { Names } from './names'
import { applyEdits, isSourceFile, parseSource } from './source'
import { StyleLifter } from './styles'
import { ThemeMigrator } from './theme'

const CONFIG_FILE =
  /(?:^|\/)(?:tsconfig[^/]*\.json|jsconfig\.json|babel\.config\.[cm]?js|\.babelrc)$/

interface FileResult {
  after: string
  reports: FileReport[]
  modules: string[]
}

/** The changes to one source file: its text after the step, what it reports, and the modules it imports. */
function planSource(path: string, text: string): FileResult {
  const ast = parseSource(path, text)
  if (!ast) {
    const message = `[PARSE] ${path} could not be read as TypeScript or JavaScript, so nothing in it was moved: change its imports of the old packages by hand (the inventory in the migration guide lists every path), and its styles, as the other files'.`
    return { after: text, reports: [{ line: 1, message }], modules: [] }
  }
  const imports = new ImportEditor(text, ast)
  const names = new Names(ast)
  const styles = new StyleLifter(text, ast, imports, names)
  const theme = new ThemeMigrator(text, ast, imports, names)
  theme.dropUnused()
  const edits = [
    ...imports.collectEdits(),
    ...styles.collectEdits(imports.importsEnd),
    ...theme.edits,
  ]
  const reports = [
    ...imports.reports,
    ...styles.reports,
    ...theme.reports,
    ...detectInSource(text, ast, imports),
    ...detectInText(text),
  ]
  // What the step writes has `\n`; a file with `\r\n` stays so.
  const after = applyEdits(text, edits)
  const body = text.includes('\r\n') ? after.replace(/\r?\n/g, '\r\n') : after
  return { after: body, reports, modules: [...imports.modules] }
}

/** What the step does to one file of the app, and what it learns of the app from it. */
function planFile(path: string, text: string, facts: AppFacts): Change[] {
  const isSource = isSourceFile(path)
  if (isSource) facts.sources.push(text)
  const result = isSource
    ? planSource(path, text)
    : { after: text, reports: detectInText(text), modules: [] }
  for (const module of result.modules) facts.modules.add(module)
  const changes: Change[] = []
  if (result.after !== text) changes.push({ kind: 'edit', path, after: result.after })
  const reports = [...result.reports].sort((a, b) => a.line - b.line)
  for (const { line, message } of reports) changes.push({ kind: 'report', path, line, message })
  return changes
}

function plan(app: MigrationApp): Change[] {
  const changes: Change[] = []
  const facts: AppFacts = { modules: new Set(), sources: [] }
  for (const path of app.listFiles()) {
    if (!isSourceFile(path) && !CONFIG_FILE.test(path)) continue
    const text = app.readFile(path)
    if (text === undefined || !RELEVANT.test(text)) continue
    changes.push(...planFile(path, text, facts))
  }
  const manifest = planManifest(app.packageJson, app.readFile('package.json')!, facts)
  changes.push(...manifest.changes)
  for (const { line, message } of manifest.reports)
    changes.push({ kind: 'report', path: 'package.json', line, message })
  return changes
}

export const step: MigrationStep = {
  id: 'gild-ui-0.1.0',
  from: { package: '@soroush.tech/design-system', range: '2.x' },
  to: { package: '@gild-ui/react', version: '0.1.0' },
  summary:
    'imports move to @gild-ui/*, css and style become StyleSheet entries, the theme gets defineThemes, and the previous engine goes',
  plan,
}
