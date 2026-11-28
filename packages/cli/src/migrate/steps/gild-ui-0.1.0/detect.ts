// What only a person can decide, found in the text of a source file: each place is reported with
// its line and the inventory's words for it. Nothing here edits.
import type { File, Node } from '@babel/types'
import { inventoryFinding, PREVIOUS_ENGINE, type Finding } from './data'
import type { FileReport, ImportEditor } from './imports'
import { lineAt, walk } from './source'

const EXTRACTORS = new Set([
  'extractCritical',
  'extractCriticalToChunks',
  'renderStylesToString',
  'constructStyleTagsFromChunks',
])
const THEME_SCALES = new Set([
  'space',
  'fontSizes',
  'radii',
  'lineHeights',
  'sizes',
  'borderWidths',
])
const lineOfOffset = (text: string, node: Node) => lineAt(text, node.start!)

/** Whether a node is a reference to the local name `name` or to a member chain from it. */
function rootName(node: Node): string | undefined {
  let head = node
  while (head.type === 'MemberExpression') head = head.object
  return head.type === 'Identifier' ? head.name : undefined
}

export function detectInSource(text: string, ast: File, imports: ImportEditor): FileReport[] {
  const reports: FileReport[] = []
  const add = (node: Node, found: Finding) =>
    reports.push({ line: lineOfOffset(text, node), ...found })
  const local = (imported: string) =>
    [...imports.locals].find(([, name]) => name.imported === imported)?.[0]
  const css = local('css')
  const keyframes = local('keyframes')
  const withTheme = local('withTheme')
  const styled = local('styled')

  walk(ast.program, (node) => {
    switch (node.type) {
      case 'ImportDeclaration':
        readPreviousEngineImport(
          node.source.value,
          node,
          node.specifiers.map((spec) =>
            spec.type === 'ImportSpecifier' ? (spec.imported as { name: string }).name : 'default'
          ),
          add
        )
        return false
      case 'CallExpression':
        readCall(node)
        break
      case 'TaggedTemplateExpression':
        if (node.tag.type === 'Identifier' && node.tag.name === css)
          add(node, inventoryFinding('STY-002'))
        if (node.tag.type === 'Identifier' && node.tag.name === keyframes)
          add(node, inventoryFinding('STY-003'))
        break
      case 'JSXOpeningElement':
        readElement(node)
        break
      case 'TemplateLiteral':
        readTemplate(node)
        break
      case 'BinaryExpression':
        if (
          ['*', '/', '+', '-'].includes(node.operator) &&
          [node.left, node.right].some(isThemeScale)
        ) {
          add(node, inventoryFinding('STY-012'))
        }
        break
      default:
    }
  })

  function readCall(node: Extract<Node, { type: 'CallExpression' }>): void {
    const { callee } = node
    if (callee.type === 'Identifier') {
      readNamedCall(node, callee.name)
    } else if (
      callee.type === 'MemberExpression' &&
      !callee.computed &&
      callee.property.type === 'Identifier'
    ) {
      readMemberCall(node, callee.property.name)
    } else if (
      callee.type === 'CallExpression' &&
      callee.callee.type === 'Identifier' &&
      callee.callee.name === styled
    ) {
      readStyledRoot(node, callee)
    }
  }

  /** A call of a name: `css(...)`, `withTheme(...)`, `createCache(...)`, `require('...')`. */
  function readNamedCall(node: Extract<Node, { type: 'CallExpression' }>, name: string): void {
    if (name === css) add(node, inventoryFinding('STY-002'))
    if (name === keyframes) add(node, inventoryFinding('STY-003'))
    if (name === withTheme) add(node, inventoryFinding('CMP-001'))
    if (name === 'useServerInsertedHTML') add(node, inventoryFinding('STY-007'))
    if (name === 'createCache') readCreateCache(node)
    if (EXTRACTORS.has(name)) add(node, inventoryFinding('STY-008'))
    if (name === 'require' && node.arguments[0]?.type === 'StringLiteral') {
      readPreviousEngineImport(node.arguments[0].value, node, [], add)
    }
  }

  /** A call of a member: `styled.div.withComponent(...)`, `cache.extractCritical(...)`. */
  function readMemberCall(node: Extract<Node, { type: 'CallExpression' }>, name: string): void {
    if (name === 'withComponent') add(node, inventoryFinding('STY-001'))
    if (EXTRACTORS.has(name)) add(node, inventoryFinding('STY-008'))
  }

  /** `styled('div')<{ isOpen: boolean }>(...)` with props of its own and no `shouldForwardProp`. */
  function readStyledRoot(
    node: Extract<Node, { type: 'CallExpression' }>,
    root: Extract<Node, { type: 'CallExpression' }>
  ): void {
    const [tag, options] = root.arguments
    const isDom = tag?.type === 'StringLiteral'
    const hasProps = (node.typeParameters?.params.length ?? 0) > 0
    const hasFilter =
      options?.type === 'ObjectExpression' &&
      options.properties.some(
        (property) =>
          property.type === 'ObjectProperty' &&
          property.key.type === 'Identifier' &&
          property.key.name === 'shouldForwardProp'
      )
    if (isDom && hasProps && !hasFilter) add(node, inventoryFinding('STY-005'))
  }

  function readCreateCache(node: Extract<Node, { type: 'CallExpression' }>): void {
    add(node, inventoryFinding('STY-009'))
    const [options] = node.arguments
    if (options?.type !== 'ObjectExpression') return
    for (const property of options.properties) {
      if (
        property.type === 'ObjectProperty' &&
        property.key.type === 'Identifier' &&
        property.key.name === 'nonce'
      ) {
        add(property, inventoryFinding('STY-010'))
      }
    }
  }

  function readElement(node: Extract<Node, { type: 'JSXOpeningElement' }>): void {
    if (node.name.type === 'JSXIdentifier') {
      const tag = imports.locals.get(node.name.name)
      if (tag?.imported === 'LayoutProvider' || tag?.imported === 'Portal') {
        add(node, inventoryFinding(tag.imported === 'Portal' ? 'OUT-005' : 'OUT-004'))
      }
    }
    for (const attribute of node.attributes) {
      if (attribute.type !== 'JSXAttribute' || attribute.name.name !== 'slotProps') continue
      if (
        attribute.value?.type !== 'JSXExpressionContainer' ||
        attribute.value.expression.type !== 'ObjectExpression'
      )
        continue
      const arrow = attribute.value.expression.properties.find(
        (property) =>
          property.type === 'ObjectProperty' &&
          property.key.type === 'Identifier' &&
          property.key.name === 'arrow'
      )
      if (arrow?.type !== 'ObjectProperty' || arrow.value.type !== 'ObjectExpression') continue
      const style = arrow.value.properties.find(
        (property) =>
          property.type === 'ObjectProperty' &&
          property.key.type === 'Identifier' &&
          property.key.name === 'style'
      )
      if (style) add(style, inventoryFinding('CMP-005'))
    }
  }

  /** `${theme.palette.primary.main}33`, `-${theme.space[2]}` and `${theme.fontSizes[2]}px`. */
  function readTemplate(node: Extract<Node, { type: 'TemplateLiteral' }>): void {
    node.expressions.forEach((expression, index) => {
      if (rootName(expression) !== 'theme') return
      const before = node.quasis[index].value.raw
      const after = node.quasis[index + 1].value.raw
      if (before.endsWith('-') || /^(?:[0-9a-fA-F]{2}\b|px|rem|em|%)/.test(after))
        add(node, inventoryFinding('STY-012'))
    })
  }

  return reports
}

/** Whether a node is `theme.<scale>`, or a member chain that starts there. */
function isThemeScale(node: Node): boolean {
  let head = node
  while (head.type === 'MemberExpression') {
    const parent = head
    head = head.object
    if (head.type === 'Identifier' && head.name === 'theme') {
      return parent.property.type === 'Identifier' && THEME_SCALES.has(parent.property.name)
    }
  }
  return false
}

function readPreviousEngineImport(
  specifier: string,
  node: Node,
  names: string[],
  add: (node: Node, found: Finding) => void
): void {
  if (!specifier.startsWith(PREVIOUS_ENGINE.scope)) return
  if (specifier.startsWith(PREVIOUS_ENGINE.server)) {
    add(node, inventoryFinding('STY-008'))
    return
  }
  const replacements = names.map(
    (name) =>
      `${name === 'default' ? 'the default import' : name}: ${PREVIOUS_ENGINE.replacements[name] ?? 'no equivalent'}`
  )
  add(
    node,
    inventoryFinding(
      'IMP-EMOTION',
      replacements.length > 0 ? `Replacements: ${replacements.join('; ')}.` : undefined
    )
  )
}

/** The lines of a source file that read what the previous engine rendered, and the settings it needed. */
export function detectInText(text: string): FileReport[] {
  const reports: FileReport[] = []
  text.split('\n').forEach((line, index) => {
    if (PREVIOUS_ENGINE.output.test(line))
      reports.push({ line: index + 1, ...inventoryFinding('STY-011') })
    if (PREVIOUS_ENGINE.settings.test(line)) {
      reports.push({ line: index + 1, ...inventoryFinding('DEP-009') })
    }
  })
  return reports
}
