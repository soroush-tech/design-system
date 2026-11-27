// The theme. `createTheme` takes tokens only now, and the looks of the components go to the second
// argument of `defineThemes`. When every theme of a file shares one `components` object, and the
// file collects its themes in one place, the move is made; any other shape is reported. The
// `Theme['components']` type is `ThemeComponents`, and the declarations a theme module augments
// are checked for what no longer exists.
import type {
  CallExpression,
  File,
  Identifier,
  Node,
  ObjectExpression,
  ObjectProperty,
} from '@babel/types'
import { CORE, inventoryMessage, REACT } from './data'
import type { FileReport, ImportEditor } from './imports'
import type { Names } from './names'
import { lineAt, nameOfKey, walk, type Edit } from './source'

type Range = [number, number]

interface ThemeCall {
  call: CallExpression
  object: ObjectExpression
  components: ObjectProperty | undefined
  ancestors: readonly Node[]
}

const isBlank = (text: string) => /^[ \t]*$/.test(text)

export class ThemeMigrator {
  readonly edits: Edit[] = []
  readonly reports: FileReport[] = []
  /** What the step takes out of the text, so an import that only served it can go. */
  private readonly removed: Range[] = []

  constructor(
    private readonly text: string,
    private readonly ast: File,
    private readonly imports: ImportEditor,
    private readonly names: Names
  ) {
    this.readCreateTheme()
    this.readThemeComponentsType()
    this.readAugmentations()
  }

  private report(node: Node, message: string): void {
    this.reports.push({ line: lineAt(this.text, node.start!), message })
  }

  private localOf(imported: string): string | undefined {
    return [...this.imports.locals].find(([, name]) => name.imported === imported)?.[0]
  }

  // --- createTheme ---------------------------------------------------------------------------

  private readCreateTheme(): void {
    const createTheme = this.localOf('createTheme')
    if (!createTheme) return
    const calls: ThemeCall[] = []
    walk(this.ast.program, (node, ancestors) => {
      if (
        node.type !== 'CallExpression' ||
        node.callee.type !== 'Identifier' ||
        node.callee.name !== createTheme
      )
        return
      const object = node.arguments.find((argument) => argument.type === 'ObjectExpression')
      if (object?.type !== 'ObjectExpression') return
      const components = object.properties.find(
        (property): property is ObjectProperty =>
          property.type === 'ObjectProperty' && nameOfKey(property.key) === 'components'
      )
      calls.push({ call: node, object, components, ancestors })
    })
    if (calls.length === 0) return
    this.report(calls[0].call, inventoryMessage('THM-006'))
    const moved = this.moveComponents(calls)
    for (const { object, components, ancestors } of calls) {
      if (components && !moved) this.report(components, inventoryMessage('THM-001'))
      const declarator = ancestors.at(-1)!
      if (
        !moved &&
        declarator.type === 'VariableDeclarator' &&
        declarator.id.type === 'Identifier' &&
        declarator.id.typeAnnotation
      ) {
        this.report(declarator, inventoryMessage('THM-003'))
      }
      this.readElements(object)
    }
  }

  /** `element:` of a typography variant is a tag name now, a string. */
  private readElements(object: ObjectExpression): void {
    walk(object, (node) => {
      if (
        node.type === 'ObjectProperty' &&
        !node.computed &&
        node.key.type === 'Identifier' &&
        node.key.name === 'element' &&
        node.value.type !== 'StringLiteral'
      ) {
        this.report(node, inventoryMessage('CMP-003'))
      }
    })
  }

  /** The themes of the file become the first argument of `defineThemes`, when its shape is known. */
  private moveComponents(calls: ThemeCall[]): boolean {
    const withComponents = calls.filter((item) => item.components)
    if (withComponents.length === 0) return false
    if (withComponents.length !== calls.length) return false
    const values = new Set(
      withComponents.map(({ components }) =>
        components!.value.type === 'Identifier' ? components!.value.name : undefined
      )
    )
    const [shared] = values
    if (values.size !== 1 || !shared || !this.isDeclaredAtTopLevel(shared)) return false
    const shape = this.readThemesObject(calls)
    if (!shape) return false
    for (const { components, object } of withComponents) this.removeProperty(components!, object)
    this.imports.addImport(`${CORE}/theme`, 'defineThemes')
    this.edits.push(...shape(shared))
    return true
  }

  private isDeclaredAtTopLevel(name: string): boolean {
    return this.ast.program.body.some((statement) => {
      const declaration =
        statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement
      if (declaration?.type === 'VariableDeclaration') {
        return declaration.declarations.some(
          (item) => item.id.type === 'Identifier' && item.id.name === name
        )
      }
      return (
        statement.type === 'ImportDeclaration' &&
        statement.specifiers.some((item) => item.local.name === name)
      )
    })
  }

  /**
   * How the file collects its themes, as the edits for it once the shared `components` is known:
   * an object of `createTheme` calls that is a top-level `const`, or top-level `const`s that a
   * `const themes = { light, dark }` collects.
   */
  private readThemesObject(calls: ThemeCall[]): ((components: string) => Edit[]) | undefined {
    const parents = calls.map(({ ancestors }) => ancestors.at(-1)!)
    if (parents.every((parent) => parent.type === 'ObjectProperty')) {
      const holder = calls[0].ancestors.at(-2)!
      const isOneObject = calls.every(({ ancestors }) => ancestors.at(-2)! === holder)
      if (
        isOneObject &&
        holder.type === 'ObjectExpression' &&
        holder.properties.length === calls.length &&
        this.isTopLevelConst(calls[0].ancestors.at(-3)!)
      ) {
        return (components) => [
          { start: holder.start!, end: holder.start!, text: 'defineThemes(' },
          { start: holder.end!, end: holder.end!, text: `, ${components})` },
        ]
      }
      return undefined
    }
    return this.readCollectedThemes(calls)
  }

  private isTopLevelConst(node: Node): boolean {
    return this.ast.program.body.some((statement) => {
      const declaration =
        statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement
      return (
        declaration?.type === 'VariableDeclaration' &&
        (declaration.declarations as Node[]).includes(node)
      )
    })
  }

  private readCollectedThemes(calls: ThemeCall[]): ((components: string) => Edit[]) | undefined {
    // Each call is the whole value of a top-level `const light = createTheme(...)`.
    const declared = new Map<
      string,
      { statement: Node; id: Identifier; exported: boolean; call: CallExpression }
    >()
    for (const statement of this.ast.program.body) {
      const exported = statement.type === 'ExportNamedDeclaration'
      const declaration = exported ? statement.declaration : statement
      if (declaration?.type !== 'VariableDeclaration' || declaration.declarations.length !== 1)
        continue
      const [item] = declaration.declarations
      if (item.id.type === 'Identifier' && calls.some(({ call }) => call === item.init)) {
        declared.set(item.id.name, {
          statement,
          id: item.id,
          exported,
          call: item.init as CallExpression,
        })
      }
    }
    if (declared.size !== calls.length) return undefined
    const collected = this.findCollection(declared)
    if (!collected) return undefined
    const { statement: collection, collector, properties } = collected
    const first = collection.start!
    // A name read before the collection is declared would read it before it exists.
    const isEarlyUse = [...declared.keys()].some((name) => this.isReadBefore(name, first, declared))
    if (isEarlyUse) return undefined
    return (components) => {
      const edits: Edit[] = []
      const tokens = new Map<string, string>()
      for (const [name, { statement, id, call }] of declared) {
        const tokensName = this.names.claim(`${name}Theme`)
        tokens.set(name, tokensName)
        edits.push({ start: statement.start!, end: call.start!, text: `const ${tokensName} = ` })
        if (id.typeAnnotation) this.removed.push([id.typeAnnotation.start!, id.typeAnnotation.end!])
      }
      const pairs = properties.map(({ key, local }) => `${key}: ${tokens.get(local)}`).join(', ')
      const head = `${collector.exported ? 'export ' : ''}const ${collector.name} = defineThemes(`
      const one = `${head}{ ${pairs} }, ${components})`
      const call = one.length <= 100 ? one : `${head}\n  { ${pairs} },\n  ${components}\n)`
      const names = (isExported: boolean) =>
        properties
          .filter(({ local }) => declared.get(local)!.exported === isExported)
          .map(({ key, local }) => (key === local ? key : `${key}: ${local}`))
      const destructures = [true, false]
        .map((isExported) => ({ isExported, items: names(isExported) }))
        .filter(({ items }) => items.length > 0)
        .map(
          ({ isExported, items }) =>
            `${isExported ? 'export ' : ''}const { ${items.join(', ')} } = ${collector.name}`
        )
      edits.push({
        start: collection.start!,
        end: collection.end!,
        text: [call, ...destructures].join('\n\n'),
      })
      return edits
    }
  }

  /** The `const themes = { light, dark }` that gathers every theme the file declares, and nothing else. */
  private findCollection(declared: Map<string, unknown>):
    | {
        statement: Node
        collector: { name: string; exported: boolean }
        properties: { key: string; local: string }[]
      }
    | undefined {
    for (const statement of this.ast.program.body) {
      const exported = statement.type === 'ExportNamedDeclaration'
      const declaration = exported ? statement.declaration : statement
      if (declaration?.type !== 'VariableDeclaration' || declaration.declarations.length !== 1)
        continue
      const [item] = declaration.declarations
      if (item.id.type !== 'Identifier' || item.init?.type !== 'ObjectExpression') continue
      const properties = item.init.properties.map((property) => {
        if (
          property.type !== 'ObjectProperty' ||
          property.computed ||
          property.value.type !== 'Identifier'
        )
          return undefined
        const key = nameOfKey(property.key)
        return key === undefined ? undefined : { key, local: property.value.name }
      })
      const known = properties.filter((property) => property !== undefined)
      if (
        known.length === properties.length &&
        known.length === declared.size &&
        known.every(({ local }) => declared.has(local))
      ) {
        return { statement, collector: { name: item.id.name, exported }, properties: known }
      }
    }
    return undefined
  }

  private isReadBefore(name: string, offset: number, declared: Map<string, unknown>): boolean {
    let isRead = false
    walk(this.ast.program, (node, ancestors) => {
      if (node.type !== 'Identifier' || node.name !== name || node.start! >= offset) return
      const parent = ancestors.at(-1)!
      const isDeclaration = parent.type === 'VariableDeclarator' && parent.id === node
      const isKey =
        parent.type === 'ObjectProperty' &&
        parent.key === node &&
        !parent.computed &&
        !parent.shorthand
      if (!isDeclaration && !isKey && declared.has(name)) isRead = true
    })
    return isRead
  }

  /** Takes a property out of an object literal, with its comma and, when it has them alone, its lines. */
  private removeProperty(property: ObjectProperty, object: ObjectExpression): void {
    let start = property.start!
    let end = property.end!
    const previous = object.properties[object.properties.indexOf(property) - 1]
    const isLastInline = this.text[end] !== ',' && previous !== undefined
    if (this.text[end] === ',') end += 1
    const lineStart = this.text.lastIndexOf('\n', start - 1) + 1
    const lineEnd = this.text.indexOf('\n', end)
    if (object.properties.length === 1 && !isBlank(this.text.slice(lineStart, start))) {
      // Its object has nothing else: `{ components }` becomes `{}`.
      start = object.start! + 1
      end = object.end! - 1
    } else if (
      isBlank(this.text.slice(lineStart, start)) &&
      lineEnd !== -1 &&
      isBlank(this.text.slice(end, lineEnd))
    ) {
      start = lineStart
      end = lineEnd + 1
    } else if (isLastInline) {
      // The last of the line: the comma after the one before goes with it.
      start = previous.end!
    } else {
      while (this.text[end] === ' ') end += 1
    }
    this.edits.push({ start, end, text: '' })
    this.removed.push([property.start!, property.end!])
  }

  // --- Theme['components'] ---------------------------------------------------------------------

  private readThemeComponentsType(): void {
    const theme = this.localOf('Theme')
    if (!theme) return
    walk(this.ast.program, (node) => {
      if (node.type !== 'TSIndexedAccessType') return
      const { objectType, indexType } = node
      const isThemeComponents =
        objectType.type === 'TSTypeReference' &&
        objectType.typeName.type === 'Identifier' &&
        objectType.typeName.name === theme &&
        indexType.type === 'TSLiteralType' &&
        indexType.literal.type === 'StringLiteral' &&
        indexType.literal.value === 'components'
      if (!isThemeComponents) return
      this.edits.push({ start: node.start!, end: node.end!, text: 'ThemeComponents' })
      this.removed.push([node.start!, node.end!])
      this.imports.addImport(REACT, 'ThemeComponents', true)
    })
  }

  // --- declare module ------------------------------------------------------------------------

  private readAugmentations(): void {
    walk(this.ast.program, (node) => {
      if (node.type !== 'TSModuleDeclaration' || node.id.type !== 'StringLiteral') return
      if (node.id.value !== '@soroush.tech/design-system/theme') return
      walk(node, (inner) => {
        if (inner.type !== 'TSInterfaceDeclaration') return
        const { name } = inner.id
        if (name === 'TabsVariants') this.report(inner, inventoryMessage('EXP-004'))
        const isComponentsOfTheme =
          name === 'Theme' &&
          inner.body.body.some(
            (member) =>
              member.type === 'TSPropertySignature' &&
              member.key.type === 'Identifier' &&
              member.key.name === 'components'
          )
        if (isComponentsOfTheme || name === 'ThemeComponents')
          this.report(inner, inventoryMessage('THM-005'))
      })
    })
  }

  /** Drops the imports of old names the edits left unused: the `Theme` of an annotation that went. */
  dropUnused(): void {
    for (const local of ['Theme']) {
      const name = this.localOf(local)
      if (name && this.removed.length > 0 && !this.isStillUsed(name)) this.imports.dropLocal(name)
    }
  }

  private isStillUsed(name: string): boolean {
    let isUsed = false
    walk(this.ast.program, (node) => {
      if (
        node.type === 'ImportDeclaration' ||
        (node.type === 'ExportNamedDeclaration' && node.source)
      )
        return false
      if (node.type === 'Identifier' && node.name === name) {
        const offset = node.start!
        if (!this.removed.some(([start, end]) => offset >= start && offset < end)) isUsed = true
      }
    })
    return isUsed
  }
}
