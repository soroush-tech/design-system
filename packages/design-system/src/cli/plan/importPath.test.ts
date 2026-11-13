// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { readExtensionStyle, toImportSpecifier } from './importPath'

describe('readExtensionStyle', () => {
  it("copies the extension style of the file's own relative imports of code", () => {
    expect(readExtensionStyle("import App from './App.tsx'")).toBe('.ts')
    expect(readExtensionStyle("import App from './App.jsx'")).toBe('.js')
    expect(readExtensionStyle("import App from './App.js'")).toBe('.js')
    expect(readExtensionStyle("import { x } from '../lib/x.mts'")).toBe('.ts')
    expect(readExtensionStyle("import App from './App'")).toBe('')
  })

  it('passes over packages and imports that are not code', () => {
    expect(
      readExtensionStyle("import 'x.js'\nimport './index.css'\nimport logo from './logo.svg'")
    ).toBe('')
    expect(
      readExtensionStyle(
        "import { a } from 'pkg/a.js'\nimport './index.css'\nimport App from './App.tsx'"
      )
    ).toBe('.ts')
  })
})

describe('toImportSpecifier', () => {
  it('gives the path from one file to another in the chosen style', () => {
    expect(toImportSpecifier('src/main.tsx', 'src/theme/Providers.ts', '')).toBe(
      './theme/Providers'
    )
    expect(toImportSpecifier('src/main.tsx', 'src/theme/Providers.ts', '.ts')).toBe(
      './theme/Providers.ts'
    )
    expect(toImportSpecifier('src/index.js', 'src/theme/Providers.js', '.js')).toBe(
      './theme/Providers.js'
    )
    expect(toImportSpecifier('src/theme/Providers.ts', 'src/theme/themes.ts', '')).toBe('./themes')
    expect(toImportSpecifier('src/client/main.tsx', 'src/theme/Providers.ts', '')).toBe(
      '../theme/Providers'
    )
  })
})
