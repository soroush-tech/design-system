import { transform } from 'sucrase'

/**
 * The JavaScript view of a TypeScript demo: types stripped (annotations, `as const`,
 * type-only imports), JSX kept intact, and the blank lines sucrase leaves behind
 * collapsed.
 */
export const tsToJs = (code: string): string =>
  transform(code, {
    transforms: ['typescript', 'jsx'],
    jsxRuntime: 'preserve',
    disableESTransforms: true,
    keepUnusedImports: true,
  })
    .code.split('\n')
    .map((line) => {
      const trimmed = line.trimEnd()
      // Stripped `type X` specifiers leave a trailing comma inside import braces.
      return trimmed.startsWith('import ') ? trimmed.replace(/,\s*\}/, ' }') : trimmed
    })
    .join('\n')
    .replaceAll(/\n{3,}/g, '\n\n')
    // trimEnd rather than `/\n*$/`, which backtracks on a long run of blank lines.
    .trimEnd() + '\n'
