// The starters' templates: real files in packages/cli/templates/<framework>/<ts|js>/<layer>/, laid
// one over the other, whose lines a condition can keep or drop. `create` only copies and chooses;
// what a file holds is written in the file.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

/** The names that hold for an app: its rendering, its libraries, `sample-data`, `ts` or `js`. */
export type Flags = ReadonlySet<string>

// A marker is a line of its own, in the comment the file's language has: `// @if msw`,
// `{/* @if msw */}` in JSX, `<!-- @if msw -->` in Markdown and HTML.
const COMMENTS: readonly (readonly [open: string, close: string])[] = [
  ['//', ''],
  ['{/*', '*/}'],
  ['<!--', '-->'],
]

/** The marker `line` holds - its word and its condition - or `undefined` when it holds none. */
function readMarker(line: string): { word: string; expression: string } | undefined {
  const text = line.trim()
  for (const [open, close] of COMMENTS) {
    if (!text.startsWith(open) || !text.endsWith(close)) continue
    const inner = text.slice(open.length, text.length - close.length).trim()
    const match = /^@(if|elif|else|endif)\b(.*)$/.exec(inner)
    if (match) return { word: match[1], expression: match[2].trim() }
  }
  return undefined
}

/**
 * Whether `expression` holds for `flags`: names, `!`, `&&`, `||` and parentheses, as in
 * `tanstack-query && !ssg`.
 */
export function isConditionMet(expression: string, flags: Flags): boolean {
  const tokens = expression.match(/[a-z0-9-]+|&&|\|\||[!()]/g) ?? []
  if (tokens.join('') !== expression.replaceAll(/\s/g, '')) {
    throw new Error(
      `The condition "${expression}" holds something other than names and ! && || ( ).`
    )
  }
  let position = 0
  const next = () => tokens[position++]
  // or := and ('||' and)*;  and := not ('&&' not)*;  not := '!' not | '(' or ')' | name
  const readOr = (): boolean => {
    let value = readAnd()
    while (tokens[position] === '||') {
      next()
      value = readAnd() || value
    }
    return value
  }
  const readAnd = (): boolean => {
    let value = readNot()
    while (tokens[position] === '&&') {
      next()
      value = readNot() && value
    }
    return value
  }
  const readNot = (): boolean => {
    const token = next()
    if (token === '!') return !readNot()
    if (token === '(') {
      const value = readOr()
      if (next() !== ')') throw new Error(`The condition "${expression}" leaves a ( open.`)
      return value
    }
    if (token === undefined || !/^[a-z0-9-]+$/.test(token)) {
      throw new Error(`The condition "${expression}" lacks a name where it has ${token ?? 'none'}.`)
    }
    return flags.has(token)
  }
  const value = readOr()
  if (position !== tokens.length) {
    throw new Error(`The condition "${expression}" goes on after its end.`)
  }
  return value
}

/**
 * A template's text for an app: the lines whose conditions hold, with each placeholder replaced by
 * its value. Returns `undefined` when nothing is left, so the file is not written.
 */
export function renderTemplate(
  source: string,
  flags: Flags,
  values: Readonly<Record<string, string>>,
  name = 'the template'
): string | undefined {
  // Each open @if: whether its lines are kept, and whether one of its branches already was.
  const open: { isKept: boolean; isTaken: boolean }[] = []
  const isKept = () => open.every((block) => block.isKept)
  const lines: string[] = []
  for (const line of source.split('\n')) {
    const marker = readMarker(line)
    if (!marker) {
      if (isKept()) lines.push(line)
      continue
    }
    const { word, expression } = marker
    const block = open.at(-1)
    if (word === 'if') {
      const holds = isConditionMet(expression, flags)
      open.push({ isKept: holds, isTaken: holds })
    } else if (!block) {
      throw new Error(`${name} has an @${word} with no @if.`)
    } else if (word === 'elif') {
      block.isKept = !block.isTaken && isConditionMet(expression, flags)
      block.isTaken ||= block.isKept
    } else if (word === 'else') {
      block.isKept = !block.isTaken
      block.isTaken = true
    } else {
      open.pop()
    }
  }
  if (open.length > 0) throw new Error(`${name} leaves an @if open.`)
  let text = lines.join('\n')
  for (const [placeholder, value] of Object.entries(values)) {
    text = text.replaceAll(placeholder, value)
  }
  return text.trim() === '' ? undefined : text
}

/** The names npm or this repository would drop from a template, and what they become. */
const RENAMES: Readonly<Record<string, string>> = { _gitignore: '.gitignore', _env: '.env' }

const toOutputPath = (path: string) => {
  const name = path.split('/').at(-1)!
  return Object.hasOwn(RENAMES, name) ? `${path.slice(0, -name.length)}${RENAMES[name]}` : path
}

/** Every file under `folder`, by its path from there, `/`-separated. */
function readFolder(folder: string): Map<string, string> {
  const files = new Map<string, string>()
  const visit = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) visit(path)
      else files.set(relative(folder, path).replaceAll('\\', '/'), readFileSync(path, 'utf8'))
    }
  }
  visit(folder)
  return files
}

/** The folder of this package that holds the templates, from where this module runs. */
export function findTemplatesRoot(start = dirname(fileURLToPath(import.meta.url))): string {
  for (let directory = start; ; directory = dirname(directory)) {
    const templates = join(directory, 'templates')
    if (existsSync(join(templates, 'templates.md'))) return templates
    if (dirname(directory) === directory) throw new Error(`No templates folder above ${start}.`)
  }
}

/**
 * The files of `layers`, read from `root` in order, each over the ones before it. A layer that is
 * not there adds nothing. Returns each file's source by the path it is written at.
 */
export function readLayers(root: string, layers: readonly string[]): Map<string, string> {
  const files = new Map<string, string>()
  for (const layer of layers) {
    const folder = join(root, layer)
    if (!existsSync(folder)) continue
    for (const [path, source] of readFolder(folder)) files.set(toOutputPath(path), source)
  }
  return files
}
