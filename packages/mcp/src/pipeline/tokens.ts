import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { packageDir } from '@soroush.tech/docs-content/node'
import type { TokenScale } from '../types'

type Leaf = string | number
type ThemeNode = Leaf | ThemeNode[] | { [key: string]: ThemeNode }

// Scales that describe the theme's identity rather than a token contract.
const SKIP = new Set(['name', 'colorScheme'])

const isLeaf = (node: ThemeNode): node is Leaf =>
  typeof node === 'string' || typeof node === 'number'

/** Flattens a nested scale into dotted leaf paths, in declaration order. */
export const flatten = (node: ThemeNode, prefix = ''): TokenScale['tokens'] => {
  if (isLeaf(node)) return [{ path: prefix, value: node }]
  return Object.entries(node).flatMap(([key, child]) =>
    flatten(child, prefix ? `${prefix}.${key}` : key)
  )
}

/**
 * The token contract, serialized from the live `baseTheme` object rather than a
 * hand-kept copy - a scale added to the theme shows up here with no extra step.
 * Loaded by path so generating content pulls in `themes.ts` alone, not the whole
 * component library.
 */
export const buildTokens = async (): Promise<TokenScale[]> => {
  const themesPath = join(packageDir('design-system'), 'src', 'theme', 'themes.ts')
  const { baseTheme } = (await import(pathToFileURL(themesPath).href)) as {
    baseTheme: Record<string, ThemeNode>
  }
  return Object.entries(baseTheme)
    .filter(([name]) => !SKIP.has(name))
    .map(([name, scale]) => ({ name, tokens: flatten(scale) }))
}

/** Every top-level key of the theme, so a test can assert nothing was dropped. */
export const themeScaleNames = async (): Promise<string[]> => {
  const themesPath = join(packageDir('design-system'), 'src', 'theme', 'themes.ts')
  const { baseTheme } = (await import(pathToFileURL(themesPath).href)) as {
    baseTheme: Record<string, ThemeNode>
  }
  return Object.keys(baseTheme)
}
