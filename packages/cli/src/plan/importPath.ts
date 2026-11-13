import { posix } from 'node:path'

/** How the app writes a relative import of its own code: with no extension, `.js`, or `.ts`. */
export type ExtensionStyle = '' | '.js' | '.ts'

const RELATIVE_SPECIFIER = /\bfrom\s*['"](\.{1,2}\/[^'"]+)['"]/g

/**
 * The extension style of a file's relative imports of code, so a new import matches its
 * neighbours: `./App.tsx` means the app imports TypeScript files by their own extension, `./App.js`
 * the Node style, and `./App` none.
 */
export function readExtensionStyle(source: string): ExtensionStyle {
  for (const [, specifier] of source.matchAll(RELATIVE_SPECIFIER)) {
    const extension = /\.(m?[jt]sx?)$/.exec(specifier)?.[1]
    if (extension) return extension.includes('t') ? '.ts' : '.js'
  }
  return ''
}

/** The specifier `fromFile` imports `toFile` by, both relative to the app's root, in `style`. */
export function toImportSpecifier(fromFile: string, toFile: string, style: ExtensionStyle): string {
  const target = toFile.replace(/\.[^./]+$/, style)
  const specifier = posix.relative(posix.dirname(fromFile), target)
  return specifier.startsWith('.') ? specifier : `./${specifier}`
}
