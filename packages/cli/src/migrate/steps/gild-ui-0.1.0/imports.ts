// The imports of one file, rewritten by name: where each name of an old package lives now is in
// the inventory (`imports.json`). A statement whose old path moves as a whole only changes its
// specifier; one whose names go to several modules is split, and statements that end up in the
// same module are merged. Anything that cannot be decided from the text is reported, not guessed.
import type {
  CallExpression,
  ExportAllDeclaration,
  ExportNamedDeclaration,
  File,
  Identifier,
  ImportDeclaration,
  Node,
  StringLiteral,
} from '@babel/types'
import {
  augmentedModule,
  inventoryMessage,
  OLD_PACKAGES,
  resolveName,
  ruleOfPath,
  targetsOfPath,
} from './data'
import { lineAt, walk, type Edit } from './source'

/** A place in a file that needs a person. */
export interface FileReport {
  line: number
  message: string
}

/** A name an old import brought in, and where it comes from now. */
export interface ImportedName {
  imported: string
  oldPath: string
  to: string
  isType: boolean
}

type Statement = ImportDeclaration | ExportNamedDeclaration | ExportAllDeclaration
type Keyword = 'import' | 'export'

interface Group {
  keyword: Keyword
  module: string
  isType: boolean
  /** Each specifier as written, with the local name it binds. */
  specs: { text: string; name: string }[]
}

/** The parts of a specifier of an import or of an `export ... from`, the same for both. */
interface Specifier {
  type: string
  start: number
  end: number
  /** The name the source module exports. */
  imported: string
  /** The name the file binds (an import) or exports (an export). */
  local: string
  isType: boolean
}

const MAX_WIDTH = 100

/** The length of the line break the text starts with: 2 for `\r\n`, 1 for `\n`, else 0. */
function lineBreakLength(text: string): number {
  if (text.startsWith('\r\n')) return 2
  return text.startsWith('\n') ? 1 : 0
}

/** The text a specifier built at run time starts with, when it is a string or a template. */
function startOfText(node: Node): string {
  if (node.type === 'TemplateLiteral') return node.quasis[0].value.raw
  return node.type === 'StringLiteral' ? node.value : ''
}
const QUOTED_OLD_SPECIFIER = /(['"])(@soroush\.tech\/(?:design-system|markdown|hooks)[^'"\s]*)\1/g
const MODULE_CALLS = new Set(['mock', 'doMock', 'unmock', 'importActual', 'requireActual'])

const nameOf = (node: Node): string =>
  node.type === 'StringLiteral' ? node.value : (node as { name: string }).name

/** Whether a module specifier is a Gild UI package, or the style-prop package the step adds. */
const isNewPackage = (specifier: string): boolean =>
  specifier.startsWith('@gild-ui/') || specifier.startsWith('@soroush.tech/styled-system')

function readSpecifier(spec: Node, keyword: Keyword, isTypeStatement: boolean): Specifier {
  const { start, end } = spec as { start: number; end: number }
  if (spec.type === 'ImportSpecifier') {
    return {
      type: spec.type,
      start,
      end,
      imported: nameOf(spec.imported),
      local: spec.local.name,
      isType: isTypeStatement || spec.importKind === 'type',
    }
  }
  if (spec.type === 'ExportSpecifier') {
    return {
      type: spec.type,
      start,
      end,
      imported: nameOf(spec.local),
      local: nameOf(spec.exported),
      isType: isTypeStatement || spec.exportKind === 'type',
    }
  }
  return { type: spec.type, start, end, imported: keyword, local: keyword, isType: false }
}

export class ImportEditor {
  /** Every name imported from an old path, by its local name. */
  readonly locals = new Map<string, ImportedName>()
  /** Every module of a Gild UI package, or of styled-system, the file imports after the step. */
  readonly modules = new Set<string>()
  readonly reports: FileReport[] = []
  private readonly edits: Edit[] = []
  private readonly groups = new Map<string, Group>()
  /** Each statement that is rewritten, with the groups it writes in its place. */
  private readonly owned = new Map<Statement, Group[]>()
  private readonly extras: Group[] = []
  private readonly statements: Statement[] = []
  private insertAt = 0
  private quote = "'"
  private semi = ''

  constructor(
    private readonly text: string,
    private readonly ast: File
  ) {
    for (const statement of ast.program.body) {
      if (statement.type === 'ImportDeclaration') this.readStatement(statement, 'import')
      else if (statement.type === 'ExportNamedDeclaration' && statement.source) {
        this.readStatement(statement, 'export')
      } else if (statement.type === 'ExportAllDeclaration') this.readStatement(statement, 'export')
    }
    this.readSites()
  }

  private report(node: Node, message: string): void {
    this.reports.push({ line: lineAt(this.text, node.start!), message })
  }

  private replaceLiteral(literal: StringLiteral, module: string): void {
    const quote = this.text[literal.start!]
    this.edits.push({ start: literal.start!, end: literal.end!, text: `${quote}${module}${quote}` })
    this.modules.add(module)
  }

  private readStatement(statement: Statement, keyword: Keyword): void {
    const source = statement.source!
    this.statements.push(statement)
    if (statement.type === 'ImportDeclaration') {
      this.semi = this.text[statement.end! - 1] === ';' ? ';' : ''
      this.quote = this.text[source.start!]
    }
    const rule = ruleOfPath(source.value)
    if (!rule) {
      if (isNewPackage(source.value)) this.modules.add(source.value)
    } else if (rule.kind === 'unknown') {
      this.report(
        source,
        `[IMP-UNKNOWN] ${source.value} is not a path of the inventory: look for its name in Gild UI by hand (every component has its own entry, @gild-ui/react/<Component>).`
      )
    } else if (rule.kind === 'uniform') {
      this.replaceLiteral(source, rule.to)
      if (statement.type === 'ImportDeclaration') this.readLocals(statement, keyword, rule.to)
    } else {
      this.splitStatement(statement, keyword, source)
    }
  }

  /** The names an import whose whole path moves to `to` brings in. */
  private readLocals(statement: ImportDeclaration, keyword: Keyword, to: string): void {
    const isTypeStatement = statement.importKind === 'type'
    for (const node of statement.specifiers) {
      const spec = readSpecifier(node, keyword, isTypeStatement)
      const imported = spec.type === 'ImportSpecifier' ? spec.imported : 'default'
      this.locals.set(spec.local, {
        imported,
        oldPath: statement.source.value,
        to,
        isType: spec.isType,
      })
    }
  }

  private splitStatement(statement: Statement, keyword: Keyword, source: StringLiteral): void {
    const nodes = statement.type === 'ExportAllDeclaration' ? [] : statement.specifiers
    const isTypeStatement =
      statement.type === 'ImportDeclaration'
        ? statement.importKind === 'type'
        : (statement as ExportNamedDeclaration).exportKind === 'type'
    const specs = nodes.map((node) => readSpecifier(node, keyword, isTypeStatement))
    const isWhole =
      statement.type === 'ExportAllDeclaration' ||
      specs.some((spec) => spec.type !== 'ImportSpecifier' && spec.type !== 'ExportSpecifier')
    if (isWhole) {
      this.report(
        source,
        `[IMP-SPLIT] ${source.value} is imported whole (a default, a namespace or export *), but its names now live in several modules (${targetsOfPath(source.value).join(', ')}): import each name from its module.`
      )
      return
    }
    const owned: Group[] = []
    nodes.forEach((node, index) => {
      const spec = specs[index]
      const result = resolveName(source.value, spec.imported)
      if (result && 'removed' in result) {
        this.report(
          node,
          inventoryMessage(result.removed, `${spec.imported} is not exported by Gild UI.`)
        )
        return
      }
      if (!result) {
        this.report(
          node,
          `[IMP-UNKNOWN] ${spec.imported} of ${source.value} is not a name of the inventory: look for it in Gild UI by hand.`
        )
      }
      const module = result?.to ?? source.value
      const group = this.groupFor(keyword, module, isTypeStatement, owned)
      group.specs.push({ text: this.text.slice(spec.start, spec.end), name: spec.local })
      if (result) this.modules.add(module)
      if (keyword === 'import') {
        this.locals.set(spec.local, {
          imported: spec.imported,
          oldPath: source.value,
          to: module,
          isType: spec.isType,
        })
      }
    })
    this.owned.set(statement, owned)
  }

  private groupFor(keyword: Keyword, module: string, isType: boolean, owned: Group[]): Group {
    const key = `${keyword}|${isType}|${module}`
    let group = this.groups.get(key)
    if (!group) {
      group = { keyword, module, isType, specs: [] }
      this.groups.set(key, group)
      owned.push(group)
    }
    return group
  }

  /** `import('x')`, `require('x')`, `vi.mock('x')`, `import('x').T` and `declare module 'x'`. */
  private readSites(): void {
    walk(this.ast.program, (node) => {
      if (node.type === 'CallExpression') this.readCall(node)
      else if (node.type === 'TSImportType') this.readSite(node.argument, false)
      else if (node.type === 'TSModuleDeclaration' && node.id.type === 'StringLiteral') {
        this.readSite(node.id, true)
      }
    })
    this.readComments()
  }

  /** A commented-out import or `declare module` names the old path too: it is moved with the rest. */
  private readComments(): void {
    for (const comment of this.ast.comments!) {
      for (const match of this.text
        .slice(comment.start!, comment.end!)
        .matchAll(QUOTED_OLD_SPECIFIER)) {
        const rule = ruleOfPath(match[2])
        const to = augmentedModule(match[2]) ?? (rule?.kind === 'uniform' ? rule.to : undefined)
        if (!to) continue
        const start = comment.start! + match.index + 1
        this.edits.push({ start, end: start + match[2].length, text: to })
      }
    }
  }

  private readCall(call: CallExpression): void {
    const { callee } = call
    const isLoad =
      callee.type === 'Import' ||
      (callee.type === 'Identifier' && callee.name === 'require') ||
      (callee.type === 'MemberExpression' &&
        !callee.computed &&
        callee.object.type === 'Identifier' &&
        ['vi', 'jest'].includes(callee.object.name) &&
        MODULE_CALLS.has((callee.property as Identifier).name))
    const [argument] = call.arguments
    if (!isLoad || !argument) return
    if (argument.type === 'StringLiteral') this.readSite(argument, false)
    else if (this.startsWithOldPackage(argument)) this.report(call, inventoryMessage('IMP-DYNAMIC'))
  }

  /** Whether a specifier built at run time starts with the text of an old package. */
  private startsWithOldPackage(node: Node): boolean {
    let head = node
    while (head.type === 'BinaryExpression') head = head.left
    return OLD_PACKAGES.some((name) => startOfText(head).startsWith(name))
  }

  private readSite(literal: StringLiteral, isModuleBlock: boolean): void {
    const rule = ruleOfPath(literal.value)
    if (!rule) {
      if (isNewPackage(literal.value)) this.modules.add(literal.value)
      return
    }
    const augmented = isModuleBlock ? augmentedModule(literal.value) : undefined
    if (augmented) this.replaceLiteral(literal, augmented)
    else if (rule.kind === 'uniform') this.replaceLiteral(literal, rule.to)
    else {
      this.report(
        literal,
        `[IMP-SPLIT] ${literal.value} is used here as a string (a dynamic import, a mock or a type), but its names now live in several modules (${targetsOfPath(literal.value).join(', ')}): move each by hand.`
      )
    }
  }

  /**
   * Asks for `specifier` to be imported from `module`, where it is not already. It joins a
   * statement of the file for that module, or becomes one after the last import.
   */
  addImport(module: string, specifier: string, isType = false): void {
    const name = specifier.split(/\s/).pop()!
    const key = `import|${isType}|${module}`
    const existing = this.groups.get(key)
    if (existing?.specs.some((spec) => spec.name === name)) return
    this.modules.add(module)
    if (existing) {
      existing.specs.push({ text: specifier, name })
      return
    }
    const group: Group = { keyword: 'import', module, isType, specs: [{ text: specifier, name }] }
    this.groups.set(key, group)
    this.extras.push(group)
  }

  /** Takes the name an old import brought in out of the file's imports, once nothing uses it. */
  dropLocal(name: string): void {
    for (const group of this.groups.values()) {
      group.specs = group.specs.filter((spec) => spec.name !== name)
    }
    this.locals.delete(name)
  }

  /** Where what the step adds to the module goes: after the last import that stays. */
  get importsEnd(): number {
    return this.insertAt
  }

  private render(group: Group): string {
    const { quote, semi } = this
    const head = `${group.keyword}${group.isType ? ' type' : ''} {`
    const tail = `} from ${quote}${group.module}${quote}${semi}`
    const texts = group.specs.map((spec) => spec.text)
    const line = `${head} ${texts.join(', ')} ${tail}`
    if (line.length <= MAX_WIDTH) return line
    const body = texts.map((text) => `  ${text},`).join('\n')
    return `${head}\n${body}\n${tail}`
  }

  /** The edit that rewrites, merges or removes one statement, when it is one the step owns. */
  private editStatement(statement: Statement): Edit | undefined {
    if (!this.owned.has(statement)) return undefined
    const groups = this.owned.get(statement)!.filter((group) => group.specs.length !== 0)
    if (groups.length === 0) {
      // Nothing is left of the statement: its line goes with it.
      const after = this.text.slice(statement.end!, statement.end! + 2)
      return { start: statement.start!, end: statement.end! + lineBreakLength(after), text: '' }
    }
    const text = groups.map((group) => this.render(group)).join('\n')
    return { start: statement.start!, end: statement.end!, text }
  }

  /** The edits of the file's imports: statements rewritten, merged and removed, and added ones. */
  collectEdits(): Edit[] {
    const edits = [...this.edits]
    const kept: Statement[] = []
    for (const statement of this.statements) {
      const edit = this.editStatement(statement)
      if (edit) edits.push(edit)
      // A statement stays unless nothing is left of it.
      if (statement.type === 'ImportDeclaration' && edit?.text !== '') kept.push(statement)
    }
    // After the last import that stays; when none does, where the first one was.
    const last = kept.at(-1)
    this.insertAt = last ? last.end! : (this.statements[0]?.start ?? 0)
    const extras = this.extras.filter((group) => group.specs.length > 0)
    if (extras.length > 0) {
      const text = extras.map((group) => this.render(group)).join('\n')
      edits.push({
        start: this.insertAt,
        end: this.insertAt,
        text: last ? `\n${text}` : `${text}\n`,
      })
    }
    return edits
  }
}
