/**
 * Local oxlint plugin: ban file extensions in relative import paths.
 *
 * oxlint has no `no-restricted-syntax`, which is how this ban used to be spelled,
 * so the rule is expressed directly instead. Only `ImportDeclaration` is visited,
 * which deliberately leaves dynamic `import()` calls alone - the codegen scripts
 * use those with an explicit `.ts` so node's native TS runner can resolve them.
 *
 * Bare package specifiers are exempt: their layout is fixed by the dependency's own
 * exports map, and some published ESM libraries only resolve with the extension
 * spelled out (`@modelcontextprotocol/sdk/server/mcp.js`). The rule is about the
 * paths we choose - our own files - not the ones a dependency dictates.
 */
const EXTENSION = /\.(?:ts|tsx|js|jsx)$/
const RELATIVE = /^[./]/

/** @type {import('oxlint').Plugin} */
const plugin = {
  meta: { name: 'local' },
  rules: {
    'no-import-extensions': {
      create(context) {
        return {
          ImportDeclaration(node) {
            if (RELATIVE.test(node.source.value) && EXTENSION.test(node.source.value)) {
              context.report({
                node: node.source,
                message: 'Do not include .ts, .tsx, .js or .jsx extensions in import paths.',
              })
            }
          },
        }
      },
    },
  },
}

export default plugin
