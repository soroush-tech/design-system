// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createProvidersSource, createThemesSource, isSetUpByInit, MARKER } from './templates'

describe('createThemesSource', () => {
  it('default-exports defineThemes of named themes, each createTheme(base, {...literal})', () => {
    const source = createThemesSource({ isTypeScript: true, scheme: 'light' })
    expect(source.startsWith(MARKER)).toBe(true)
    expect(source).toMatch(
      /\nconst themes = defineThemes\(\n {2}\{\n {4}light: createTheme\(baseTheme, \{\n/
    )
    expect(source).toMatch(/\n {4}dark: createTheme\(baseTheme, \{\n/)
    expect(source).toMatch(/\n {2}\},\n {2}\{\} satisfies ThemeComponents\n\)\n/)
    expect(source).toMatch(/\nexport default themes\n$/)
    // Every theme ends with a literal object: no theme is built by a function or from a variable.
    const themeCalls = [...source.matchAll(/createTheme\((\w+), (.)/g)]
    expect(themeCalls.map(([, base, next]) => [base, next])).toEqual([
      ['baseTheme', '{'],
      ['baseTheme', '{'],
    ])
  })

  it('gives a TypeScript app the augmentation stub, as a comment, and the registration; a JavaScript app neither', () => {
    const source = createThemesSource({ isTypeScript: true, scheme: 'light' })
    expect(source).toContain("// declare module '@soroush.design/core/theme' {")
    expect(source).toContain(
      "\ndeclare module '@soroush.design/core/theme' {\n  interface Register {\n    themes: typeof themes\n  }\n}\n"
    )
    expect(createThemesSource({ isTypeScript: false, scheme: 'light' })).not.toContain(
      'declare module'
    )
  })

  it('registers the theme the app starts in as the base theme, and types the components in TypeScript only', () => {
    const dark = createThemesSource({ isTypeScript: true, scheme: 'dark' })
    expect(dark).toContain(
      "import { registerBaseTheme } from '@soroush.design/react/ThemeProvider'"
    )
    expect(dark).toContain("import type { ThemeComponents } from '@soroush.design/react'")
    expect(dark).toContain('\nregisterBaseTheme(themes.dark)\n')
    const js = createThemesSource({ isTypeScript: false, scheme: 'light' })
    expect(js).toContain('\nregisterBaseTheme(themes.light)\n')
    expect(js).not.toContain('ThemeComponents')
  })
})

describe('createProvidersSource', () => {
  it('renders ThemeProvider and the base styles, with no JSX', () => {
    const source = createProvidersSource({
      isTypeScript: true,
      scheme: 'dark',
      themesImport: './themes',
    })
    expect(source.startsWith(MARKER)).toBe(true)
    expect(source).toContain("import type { ReactNode } from 'react'")
    expect(source).toContain("import themes from './themes'")
    expect(source).toContain("scheme = 'dark'")
    expect(source).toContain('createElement(Global, { styles: globalStyles })')
    expect(source).not.toMatch(/<\w/)
  })

  it('has no types in a JavaScript app', () => {
    const source = createProvidersSource({
      isTypeScript: false,
      scheme: 'light',
      themesImport: './themes.js',
    })
    expect(source).not.toContain('ReactNode')
    expect(source).toContain("export function Providers({ children, scheme = 'light' }) {")
    expect(source).toContain('{ theme: themes[scheme] }')
    expect(source).toContain("import themes from './themes.js'")
    expect(source).toContain("scheme = 'light'")
  })
})

describe('isSetUpByInit', () => {
  it('writes the name of the package an app imports from', () => {
    expect(MARKER).toBe('// Set up by @soroush.design/react init.')
  })

  it('recognises a file that starts with the current marker', () => {
    expect(isSetUpByInit('// Set up by @soroush.design/react init. Your themes')).toBe(true)
  })

  it('recognises a file that starts with the marker of the library, its name before', () => {
    expect(isSetUpByInit('// Set up by @soroush.design/react-components init. Your themes')).toBe(
      true
    )
  })

  it('recognises a file that starts with the marker of the former name, before the library was renamed', () => {
    expect(isSetUpByInit('// Set up by @soroush.tech/design-system init. Your themes')).toBe(true)
  })

  it("treats a file with neither marker as the developer's own", () => {
    expect(isSetUpByInit('export const light = {}')).toBe(false)
    expect(isSetUpByInit('// Set up by another-package init.')).toBe(false)
    expect(isSetUpByInit('')).toBe(false)
  })
})
