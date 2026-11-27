// `css` and `style` on Gild UI components. The `css` prop no longer exists and `style` takes only
// entries of `StyleSheet.create`, so each site that can be read from the text moves into a sheet at
// module level: a static object into `StyleSheet.create({ ... })`, an object that reads the theme
// into a function sheet that `useStyle` resolves in the component. What depends on props or state
// is reported with the recipe.
import type {
  ArrowFunctionExpression,
  BlockStatement,
  CallExpression,
  File,
  FunctionDeclaration,
  FunctionExpression,
  JSXAttribute,
  JSXOpeningElement,
  Node,
  ObjectExpression,
} from '@babel/types'
import { inventoryMessage, REACT } from './data'
import type { FileReport, ImportEditor } from './imports'
import { Names, readNames } from './names'
import { lineAt, nameOfKey, walk, type Edit } from './source'

type FunctionNode = ArrowFunctionExpression | FunctionDeclaration | FunctionExpression

const STYLE_PROP_MESSAGE =
  '[STYLE-PROP] `style` takes only entries of StyleSheet.create, never an object: move the static part into a sheet at module level (style={styles.name}); a style that reads the theme is a function sheet, StyleSheet.create((theme) => ({ ... })), resolved in the component with useStyle; a value that changes with props or state is a style prop of the component (width={...}) or a live value (useStyleValue). See the styling guide, docs/style.md of @gild-ui/react.'

const CSS_PROP_MESSAGE = (detail: string) =>
  `${inventoryMessage('STY-004')} Here: ${detail}. Move it to a StyleSheet entry and pass it as style, as above.`

const lowerFirst = (name: string) => name[0].toLowerCase() + name.slice(1)

const EXPRESSION_WRAPPERS = new Set([
  'TSAsExpression',
  'TSSatisfiesExpression',
  'TSNonNullExpression',
])

/** Whether a value is written out in the text: no name in it refers to anything of the file. */
function isStatic(node: Node): boolean {
  switch (node.type) {
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
    case 'NullLiteral':
      return true
    case 'TemplateLiteral':
      return node.expressions.length === 0
    case 'UnaryExpression':
      return (
        (node.operator === '-' || node.operator === '+') && node.argument.type === 'NumericLiteral'
      )
    case 'ArrayExpression':
      return node.elements.every((element) => element !== null && isStatic(element))
    case 'ObjectExpression':
      return node.properties.every(
        (property) =>
          property.type === 'ObjectProperty' &&
          !property.computed &&
          ['Identifier', 'StringLiteral', 'NumericLiteral'].includes(property.key.type) &&
          isStatic(property.value)
      )
    default:
      return (
        EXPRESSION_WRAPPERS.has(node.type) && isStatic((node as { expression: Node }).expression)
      )
  }
}

/** The text of an object moved into a sheet, indented as the sheet's entries are. */
function reindent(node: Node, source: string): string {
  const lineStart = source.lastIndexOf('\n', node.start! - 1) + 1
  const base = /^ */.exec(source.slice(lineStart))![0].length
  return source
    .slice(node.start!, node.end!)
    .split('\n')
    .map((line, index) => {
      if (index === 0) return line
      const own = /^ */.exec(line)![0].length
      return `  ${line.slice(Math.min(base, own))}`
    })
    .join('\n')
}

interface Site {
  attribute: JSXAttribute
  element: JSXOpeningElement
  ancestors: readonly Node[]
  tag: string
}

interface Entry {
  name: string
  object: string
}

export class StyleLifter {
  readonly edits: Edit[] = []
  readonly reports: FileReport[] = []
  /** Names bound to a style `useStyle` returns once rewritten: `css={name}` is `style={name}`. */
  private readonly styleResults = new Set<string>()
  private readonly components = new Set<string>()
  private readonly entries: Entry[] = []
  private readonly blocks: (string | 'static')[] = []
  private staticSheet = ''
  private readonly pending: { at: number; text: string }[] = []

  constructor(
    private readonly text: string,
    private readonly ast: File,
    private readonly imports: ImportEditor,
    private readonly names: Names
  ) {
    this.findComponents()
    this.liftUseStyle()
    this.liftJsx()
  }

  private report(node: Node, message: string): void {
    this.reports.push({ line: lineAt(this.text, node.start!), message })
  }

  /** The tags of Gild UI components: imported from a component entry, or made with `styled`. */
  private findComponents(): void {
    for (const [local, name] of this.imports.locals) {
      const isComponent =
        !name.isType &&
        /\/design-system\/[A-Z]/.test(name.oldPath) &&
        /^[A-Z][A-Za-z0-9]*$/.test(name.imported)
      if (isComponent) this.components.add(local)
    }
    const styled = [...this.imports.locals].find(([, name]) => name.imported === 'styled')?.[0]
    if (!styled) return
    walk(this.ast.program, (node) => {
      if (node.type !== 'VariableDeclarator' || node.id.type !== 'Identifier' || !node.init) return
      let head: Node = node.init
      while (
        head.type === 'CallExpression' ||
        head.type === 'TaggedTemplateExpression' ||
        head.type === 'MemberExpression'
      ) {
        head =
          head.type === 'CallExpression'
            ? head.callee
            : head.type === 'MemberExpression'
              ? head.object
              : head.tag
      }
      if (head.type === 'Identifier' && head.name === styled) this.components.add(node.id.name)
    })
  }

  private entryName(tag: string): string {
    return this.names.claim(lowerFirst(tag))
  }

  /** `useStyle({ getStyles: (theme) => ({ ... }) })`, the 2.2.0 form, becomes a function sheet. */
  private liftUseStyle(): void {
    const useStyle = [...this.imports.locals].find(([, name]) => name.imported === 'useStyle')?.[0]
    if (!useStyle) return
    walk(this.ast.program, (node, ancestors) => {
      if (
        node.type !== 'CallExpression' ||
        node.callee.type !== 'Identifier' ||
        node.callee.name !== useStyle
      )
        return
      const factory = this.readFactory(node)
      if (!factory) {
        this.report(
          node,
          '[USE-STYLE] useStyle takes a sheet now, StyleSheet.create(...), and returns its entries: rewrite this call by hand (a factory object, { getStyles: (theme) => ({ ... }) }, becomes StyleSheet.create((theme) => ({ entry: { ... } })) and useStyle(sheet).entry).'
        )
        return
      }
      const parent = ancestors[ancestors.length - 1]
      const variable =
        parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier'
          ? parent.id.name
          : 'component'
      const sheet = this.names.claim(`${variable}Sheet`)
      this.blocks.push(
        `const ${sheet} = StyleSheet.create((${factory.param}) => ({\n  root: ${factory.body},\n}))`
      )
      this.imports.addImport(`${REACT}/StyleSheet`, 'StyleSheet')
      this.edits.push({ start: node.start!, end: node.end!, text: `${useStyle}(${sheet}).root` })
      if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier')
        this.styleResults.add(parent.id.name)
    })
  }

  private readFactory(call: CallExpression): { param: string; body: string } | undefined {
    const [argument] = call.arguments
    if (call.arguments.length !== 1 || argument.type !== 'ObjectExpression') return undefined
    const [property] = argument.properties
    if (argument.properties.length !== 1 || property.type !== 'ObjectProperty' || property.computed)
      return undefined
    if (nameOfKey(property.key) !== 'getStyles') return undefined
    return this.readThemed(property.value)
  }

  /** `(theme) => ({ ... })` that reads nothing but its theme: the parameter and the object's text. */
  private readThemed(node: Node): { param: string; body: string } | undefined {
    if (node.type !== 'ArrowFunctionExpression' || node.params.length !== 1) return undefined
    const [param] = node.params
    if (param.type !== 'Identifier' || node.body.type !== 'ObjectExpression') return undefined
    const used = readNames(node.body)
    if (![...used].every((name) => name === param.name)) return undefined
    return { param: param.name, body: reindent(node.body, this.text) }
  }

  private liftJsx(): void {
    walk(this.ast.program, (node, ancestors) => {
      if (node.type !== 'JSXOpeningElement') return
      for (const attribute of node.attributes) {
        if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') continue
        const prop = attribute.name.name
        if (prop !== 'css' && prop !== 'style') continue
        const tag = node.name.type === 'JSXIdentifier' ? node.name.name : ''
        this.liftAttribute({ attribute, element: node, ancestors, tag }, prop)
      }
    })
  }

  private liftAttribute(site: Site, prop: 'css' | 'style'): void {
    const { attribute, tag } = site
    const isComponent = this.components.has(tag)
    const value =
      attribute.value?.type === 'JSXExpressionContainer' ? attribute.value.expression : undefined
    if (!isComponent) {
      if (prop === 'css') this.report(attribute, CSS_PROP_MESSAGE(`<${tag || 'element'} css>`))
      return
    }
    if (value?.type === 'Identifier' && prop === 'css' && this.styleResults.has(value.name)) {
      this.edits.push({
        start: attribute.start!,
        end: attribute.end!,
        text: `style={${value.name}}`,
      })
    } else if (value?.type === 'ObjectExpression' && isStatic(value)) {
      this.liftStatic(site, value)
    } else if (prop === 'css' && value?.type === 'ArrowFunctionExpression') {
      this.liftThemed(site, value)
    } else if (prop === 'css') {
      this.report(
        attribute,
        CSS_PROP_MESSAGE(`<${tag} css={...}> reads something other than a static object`)
      )
    } else {
      this.report(attribute, STYLE_PROP_MESSAGE)
    }
  }

  private liftStatic(site: Site, object: ObjectExpression): void {
    const name = this.entryName(site.tag)
    this.entries.push({ name, object: reindent(object, this.text) })
    if (!this.staticSheet) {
      this.staticSheet = this.names.claim('styles')
      this.blocks.push('static')
    }
    this.imports.addImport(`${REACT}/StyleSheet`, 'StyleSheet')
    this.replaceAttribute(site, `${this.staticSheet}.${name}`)
  }

  private liftThemed(site: Site, arrow: ArrowFunctionExpression): void {
    const themed = this.readThemed(arrow)
    const component = findComponent(site.ancestors)
    const hookAt = component ? this.hookPosition(component) : undefined
    if (!themed || hookAt === undefined) {
      this.report(
        site.attribute,
        CSS_PROP_MESSAGE(
          `<${site.tag} css={...}> ${themed ? 'is not in a function component whose body has lines of its own to put a hook in' : 'reads more than its theme, or is not an arrow with one parameter and an object'}`
        )
      )
      return
    }
    const base = lowerFirst(site.tag)
    const sheet = this.names.claim(`${base}Sheet`)
    const resolved = this.names.claim(`${base}Styles`)
    this.blocks.push(
      `const ${sheet} = StyleSheet.create((${themed.param}) => ({\n  root: ${themed.body},\n}))`
    )
    this.imports.addImport(`${REACT}/StyleSheet`, 'StyleSheet')
    this.imports.addImport(`${REACT}/useStyle`, 'useStyle')
    const indent = /^[ \t]*/.exec(this.text.slice(hookAt))![0]
    this.edits.push({
      start: hookAt,
      end: hookAt,
      text: `${indent}const ${resolved} = useStyle(${sheet})\n`,
    })
    this.replaceAttribute(site, `${resolved}.root`)
  }

  /** The start of the line of a component's first statement, where its hooks go, if it has one of its own. */
  private hookPosition(component: FunctionNode): number | undefined {
    const body = component.body as BlockStatement
    const lineStart = this.text.lastIndexOf('\n', body.body[0].start! - 1) + 1
    return lineStart > body.start! ? lineStart : undefined
  }

  private replaceAttribute({ attribute }: Site, expression: string): void {
    const name = (attribute.name as { name: string }).name
    // `css` is no longer a prop: the entry goes in `style`, where `style={{ ... }}` already was.
    const isStyle = name === 'style'
    this.edits.push({
      start: attribute.start!,
      end: attribute.end!,
      text: `${isStyle ? name : 'style'}={${expression}}`,
    })
  }

  /** The edits that add the sheets to the module, after the last import. */
  collectEdits(at: number): Edit[] {
    const edits = [...this.edits]
    if (this.blocks.length > 0) {
      const sheets = this.blocks.map((block) =>
        block === 'static'
          ? `const ${this.staticSheet} = StyleSheet.create({\n${this.entries.map((entry) => `  ${entry.name}: ${entry.object},`).join('\n')}\n})`
          : block
      )
      edits.push({ start: at, end: at, text: `\n\n${sheets.join('\n\n')}` })
    }
    return edits
  }
}

/** The nearest function component above a site that has a body to put a hook in. */
function findComponent(ancestors: readonly Node[]): FunctionNode | undefined {
  for (let index = ancestors.length - 1; index >= 0; index -= 1) {
    const node = ancestors[index]
    if (
      node.type !== 'FunctionDeclaration' &&
      node.type !== 'FunctionExpression' &&
      node.type !== 'ArrowFunctionExpression'
    ) {
      continue
    }
    const parent = ancestors[index - 1]
    const holder = parent?.type === 'CallExpression' ? ancestors[index - 2] : parent
    const name =
      node.type !== 'ArrowFunctionExpression' && node.id
        ? node.id.name
        : holder?.type === 'VariableDeclarator' && holder.id.type === 'Identifier'
          ? holder.id.name
          : undefined
    if (name && /^[A-Z]/.test(name)) return node.body.type === 'BlockStatement' ? node : undefined
  }
  return undefined
}
