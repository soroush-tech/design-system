// The names a file already uses, so the declarations the step adds never collide with one.
import type { File, Node } from '@babel/types'
import { walk } from './source'

export class Names {
  private readonly used = new Set<string>()

  constructor(ast: File) {
    walk(ast.program, (node) => {
      if (node.type === 'Identifier') this.used.add(node.name)
      else if (node.type === 'JSXIdentifier') this.used.add(node.name)
    })
  }

  /** `base`, or `base2`, `base3`, ... the first the file does not use; it is used from now on. */
  claim(base: string): string {
    let name = base
    for (let count = 2; this.used.has(name); count += 1) name = `${base}${count}`
    this.used.add(name)
    return name
  }
}

/** The names a piece of code reads: not property keys, member names, or the names inside a type. */
export function readNames(root: Node): Set<string> {
  const names = new Set<string>()
  walk(root, (node, ancestors) => {
    if (node.type.startsWith('TS') && !EXPRESSION_WRAPPERS.has(node.type)) return false
    const parent = ancestors.at(-1)
    if (node.type !== 'Identifier') return
    const isKey = parent?.type === 'ObjectProperty' && parent.key === node && !parent.computed
    const isMember =
      parent?.type === 'MemberExpression' && parent.property === node && !parent.computed
    if (!isKey && !isMember) names.add(node.name)
  })
  return names
}

const EXPRESSION_WRAPPERS = new Set([
  'TSAsExpression',
  'TSSatisfiesExpression',
  'TSNonNullExpression',
])
