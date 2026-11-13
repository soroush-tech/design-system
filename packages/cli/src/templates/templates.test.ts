// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createProvidersSource, createThemesSource, MARKER } from './templates'

describe('createThemesSource', () => {
  it('default-exports an object of named themes, each createTheme(base, {...literal})', () => {
    const source = createThemesSource({ isTypeScript: true })
    expect(source.startsWith(MARKER)).toBe(true)
    expect(source).toMatch(/\nconst themes = \{\n {2}light: createTheme\(baseTheme, \{\n/)
    expect(source).toMatch(/\n {2}dark: createTheme\(baseTheme, \{\n/)
    expect(source).toMatch(/\nexport default themes\n$/)
    // Every theme ends with a literal object: no theme is built by a function or from a variable.
    const themeCalls = [...source.matchAll(/createTheme\((\w+), (.)/g)]
    expect(themeCalls.map(([, base, next]) => [base, next])).toEqual([
      ['baseTheme', '{'],
      ['baseTheme', '{'],
    ])
  })

  it('gives a TypeScript app the augmentation stub, as a comment, and a JavaScript app none', () => {
    expect(createThemesSource({ isTypeScript: true })).toContain(
      "// declare module '@soroush.tech/design-system/theme' {"
    )
    expect(createThemesSource({ isTypeScript: false })).not.toContain('declare module')
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
    expect(source).toContain('{ theme: themes.dark }')
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
    expect(source).toContain('export function Providers({ children }) {')
    expect(source).toContain("import themes from './themes.js'")
    expect(source).toContain('{ theme: themes.light }')
  })
})
