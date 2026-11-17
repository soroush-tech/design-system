// Makes the JavaScript templates from the TypeScript ones: templates/<framework>/js/ from
// templates/<framework>/ts/. Each .ts and .tsx file loses its types (ts-blank-space), and so does
// the frontmatter of an .astro file; a line that held only types goes; the paths a text names, and
// the file names, take .js and .jsx; tsconfig.json and .d.ts files are left out. Then the
// formatter runs over the result, so it reads as if written by hand.
//
// They are not kept in git: the package's build makes them before its code (so the published
// package has them), and so does the global setup of its tests.
import { spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { blankSourceFile } from 'ts-blank-space'

const require = createRequire(import.meta.url)
// The TypeScript ts-blank-space parses with: a source file must come from the same one.
const ts = createRequire(require.resolve('ts-blank-space'))('typescript')

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const templatesRoot = join(packageRoot, 'templates')

/** Every file under `folder`, by its `/`-separated path from there. */
function listFiles(folder) {
  const files = []
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) visit(path)
      else files.push(relative(folder, path).replaceAll('\\', '/'))
    }
  }
  visit(folder)
  return files.sort((a, b) => a.localeCompare(b))
}

/** `source` with its types blanked out, as TypeScript or TSX, and the lines left empty gone. */
function stripTypes(source, isJsx) {
  const file = ts.createSourceFile(
    isJsx ? 'template.tsx' : 'template.ts',
    source,
    ts.ScriptTarget.Latest,
    false,
    isJsx ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )
  const unsupported = []
  const blanked = blankSourceFile(file, (node) => unsupported.push(ts.SyntaxKind[node.kind]))
  if (unsupported.length > 0) {
    throw new Error(`ts-blank-space cannot take out: ${unsupported.join(', ')}`)
  }
  const before = source.split('\n')
  return (
    blanked
      .split('\n')
      // A statement taken out whole leaves its line empty, or a ; that keeps the next line apart.
      .filter((line, index) => !['', ';'].includes(line.trim()) || before[index].trim() === '')
      .join('\n')
  )
}

/** The JavaScript a TypeScript template's text becomes: the paths it names take .js and .jsx. */
const renamePaths = (text) => text.replaceAll(/\.tsx\b/g, '.jsx').replaceAll(/\.ts\b/g, '.js')

/** The JavaScript form of the template at `path`, or `undefined` when JavaScript has none. */
function toJavaScript(path, source) {
  if (path.endsWith('.d.ts') || path.split('/').at(-1) === 'tsconfig.json') return undefined
  if (/\.tsx?$/.test(path)) {
    return { path: renamePaths(path), content: renamePaths(stripTypes(source, path.endsWith('x'))) }
  }
  if (path.endsWith('.astro')) {
    // The frontmatter, between the first two --- lines, is TypeScript.
    const match = /^---\n([\s\S]*?)\n---\n/.exec(source)
    const content = match
      ? `---\n${stripTypes(match[1], false)}\n---\n${source.slice(match[0].length)}`
      : source
    return { path, content: renamePaths(content) }
  }
  return { path, content: renamePaths(source) }
}

/** Writes the JavaScript templates of every framework under `outputRoot`, formatted. */
function generate(outputRoot) {
  const written = []
  for (const framework of readdirSync(templatesRoot, { withFileTypes: true })) {
    if (!framework.isDirectory()) continue
    const source = join(templatesRoot, framework.name, 'ts')
    if (!existsSync(source)) continue
    for (const path of listFiles(source)) {
      const file = toJavaScript(path, readFileSync(join(source, path), 'utf8'))
      if (!file) continue
      const target = join(outputRoot, framework.name, 'js', file.path)
      mkdirSync(dirname(target), { recursive: true })
      // JavaScript is formatted under its TypeScript name: the parser then allows what a template
      // holds in its branches, such as a default export each, and the rules are the same.
      const isScript = /\.jsx?$/.test(file.path)
      const draft = isScript ? target.replace(/\.js(x?)$/, '.ts$1') : target
      writeFileSync(draft, file.content)
      if (isScript) written.push({ draft, target })
    }
  }
  // The repository's own formatter settings, from its root.
  const repoRoot = join(packageRoot, '../..')
  // The formatter's own entry, which its package does not export: found next to its manifest.
  const oxfmtManifest = createRequire(join(repoRoot, 'package.json')).resolve('oxfmt/package.json')
  const oxfmt = join(dirname(oxfmtManifest), 'bin/oxfmt')
  const result = spawnSync(process.execPath, [oxfmt, ...written.map(({ draft }) => draft)], {
    cwd: repoRoot,
    stdio: 'inherit',
  })
  if (result.status !== 0) throw new Error('oxfmt failed on the JavaScript templates')
  for (const { draft, target } of written) renameSync(draft, target)
}

// The templates are made in a folder of their own, then copied into place: the formatter leaves
// alone what the repository's settings exclude, as templates/*/js/ is.
const outputRoot = mkdtempSync(join(tmpdir(), 'templates-js-'))
try {
  generate(outputRoot)
  for (const framework of readdirSync(outputRoot)) {
    const target = join(templatesRoot, framework, 'js')
    rmSync(target, { recursive: true, force: true })
    cpSync(join(outputRoot, framework, 'js'), target, { recursive: true })
  }
  console.log('Wrote the JavaScript templates.')
} finally {
  rmSync(outputRoot, { recursive: true, force: true })
}
