/**
 * Local oxlint plugin: ban a style object written in JSX, `style={{ ... }}`.
 *
 * Inline styles are not allowed in this repository. A static value goes to a styled component or a
 * sheet entry; a value that changes at runtime goes to `useStyleValue` of `@gild-ui/react`,
 * which writes one class and changes a CSS variable. Only an object written in place is reported:
 * a `style` that is a variable, a call or a conditional is not (those are looked at in review), and
 * a type assertion (`as CSSProperties`) does not hide the object.
 */
const WRAPPERS = new Set(['TSAsExpression', 'TSSatisfiesExpression', 'TSNonNullExpression'])

const unwrap = (expression) => {
  let node = expression
  while (WRAPPERS.has(node.type)) node = node.expression
  return node
}

/** @type {import('oxlint').Plugin} */
const plugin = {
  meta: { name: 'local-style' },
  rules: {
    'no-inline-style-object': {
      create(context) {
        return {
          JSXAttribute(node) {
            if (node.name.name !== 'style' || node.value?.type !== 'JSXExpressionContainer') return
            if (unwrap(node.value.expression).type === 'ObjectExpression') {
              context.report({
                node,
                message:
                  'Do not write a style object in JSX: use a styled component or a sheet entry, and useStyleValue for a value that changes.',
              })
            }
          },
        }
      },
    },
  },
}

export default plugin
