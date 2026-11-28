// The step on small sources: one behaviour each, written out. The fixtures (fixtures.test.ts) hold
// whole apps; these hold the shapes a whole app has no reason to repeat.
import { describe, expect, it } from 'vitest'
import type { Change } from '../../step'
import { inventoryMessage, resolveName, ruleOfPath, targetsOfPath } from './data'
import { step } from './index'
import { applyEdits, isSourceFile, lineAt, parseSource } from './source'

const PM = { name: 'npm', isYarnBerry: false } as const
const PACKAGE = {
  name: 'app',
  dependencies: { '@soroush.tech/design-system': '^2.2.0', react: '^19.2.8' },
}

function run(files: Record<string, string>, packageJson: Record<string, unknown> = PACKAGE) {
  const all: Record<string, string> = {
    'package.json': `${JSON.stringify(packageJson, null, 2)}\n`,
    ...files,
  }
  const changes = step.plan({
    packageJson,
    packageManager: PM,
    readFile: (path) => all[path],
    listFiles: () => Object.keys(all).sort(),
  })
  const after = { ...all }
  for (const change of changes) if (change.kind === 'edit') after[change.path] = change.after
  const reports = changes
    .filter((change): change is Extract<Change, { kind: 'report' }> => change.kind === 'report')
    .filter(({ path }) => path !== 'package.json')
    .map(({ path, line, message }) => ({ path, line, id: /^\[([A-Z0-9-]+)\]/.exec(message)?.[1] }))
  const dependencies = changes.filter((change) => change.kind === 'dependency')
  return { after, reports, dependencies, changes }
}

const migrate = (source: string, path = 'src/a.tsx') => run({ [path]: source }).after[path]
const ids = (source: string, path = 'src/a.tsx') =>
  run({ [path]: source }).reports.map(({ line, id }) => `${line}:${id}`)

const TITLE = "import { Card } from '@soroush.tech/design-system/Card'\n"
const SHEET = "import { StyleSheet } from '@gild-ui/react/StyleSheet'"

describe('imports', () => {
  it('moves each name to its entry, keeping aliases and type modifiers, and merges what meets', () => {
    expect(
      migrate(
        [
          "import { styled, type Theme as T, css as c } from '@soroush.tech/design-system'",
          "import { baseTheme, type PaletteEntry } from '@soroush.tech/design-system/theme'",
          "import type { PaletteColor } from '@soroush.tech/design-system'",
          "import { alpha } from '@soroush.tech/design-system/utils'",
          '',
        ].join('\n'),
        'src/a.ts'
      )
    ).toBe(
      [
        "import { styled } from '@gild-ui/react/styled'",
        "import { type Theme as T, baseTheme, type PaletteEntry } from '@gild-ui/core/theme'",
        "import { css as c } from '@gild-ui/react/css'",
        "import type { PaletteColor } from '@gild-ui/core/theme'",
        "import { alpha } from '@gild-ui/core/utils'",
        '',
      ].join('\n')
    )
  })

  it('writes a long import over lines, as the formatter would', () => {
    const names = [
      'space',
      'layout',
      'color',
      'typography',
      'border',
      'flexbox',
      'grid',
      'position',
    ]
    const out = migrate(
      `import { ${names.join(', ')}, compose } from '@soroush.tech/design-system'\n`
    )
    expect(out).toBe(
      `import {\n${[...names, 'compose'].map((name) => `  ${name},`).join('\n')}\n} from '@soroush.tech/styled-system'\n`
    )
  })

  it('keeps the quotes and semicolons of the file, and its line breaks', () => {
    const source =
      'import { styled, space } from "@soroush.tech/design-system";\r\nimport type { ComponentStyle } from "@soroush.tech/design-system/theme";\r\nexport const x = 1;\r\n'
    expect(migrate(source, 'src/a.ts')).toBe(
      'import { styled } from "@gild-ui/react/styled";\r\nimport { space } from "@soroush.tech/styled-system";\r\nexport const x = 1;\r\n'
    )
  })

  it('removes a statement that is the last line of a file, with no line break after it', () => {
    expect(
      migrate("import type { ComponentStyle } from '@soroush.tech/design-system/theme'", 'src/a.ts')
    ).toBe('')
  })

  it('reports a name Gild UI no longer exports, a name and a path the inventory does not know', () => {
    const source = [
      "import type { TabsVariants, ComponentVariant } from '@soroush.tech/design-system/theme'",
      "import { Unknown } from '@soroush.tech/design-system/theme'",
      "import { Mystery } from '@soroush.tech/design-system/Mystery'",
      "import { 'string-name' as named } from '@soroush.tech/design-system/theme'",
      '',
    ].join('\n')
    const out = run({ 'src/a.ts': source })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '1:EXP-004',
      '1:EXP-002',
      '2:IMP-UNKNOWN',
      '3:IMP-UNKNOWN',
      '4:IMP-UNKNOWN',
    ])
    expect(out.after['src/a.ts']).toBe(
      "import { Unknown, 'string-name' as named } from '@soroush.tech/design-system/theme'\nimport { Mystery } from '@soroush.tech/design-system/Mystery'\n"
    )
  })

  it('reports a default, a namespace and a star import of a path that is split', () => {
    const out = run({
      'src/a.ts': [
        "import theme from '@soroush.tech/design-system/theme'",
        "import * as engine from '@soroush.tech/design-system/engine'",
        "export * from '@soroush.tech/design-system'",
        "import * as table from '@soroush.tech/design-system/Table'",
        "export * as card from '@soroush.tech/design-system/Card'",
        '',
      ].join('\n'),
    })
    expect(out.reports.map(({ id }) => id)).toEqual(['IMP-SPLIT', 'IMP-SPLIT', 'IMP-SPLIT'])
    expect(out.after['src/a.ts']).toContain("import * as table from '@gild-ui/react/Table'")
    expect(out.after['src/a.ts']).toContain("export * as card from '@gild-ui/react/Card'")
    expect(out.reports[0]).toMatchObject({ line: 1 })
  })

  it('moves export-from statements by name, with their aliases and type modifiers', () => {
    expect(
      migrate(
        [
          "export { baseTheme as base, type Theme } from '@soroush.tech/design-system/theme'",
          "export type { Theme as T } from '@soroush.tech/design-system'",
          "export { type PaletteEntry as C } from '@soroush.tech/design-system/theme'",
          '',
        ].join('\n'),
        'src/a.ts'
      )
    ).toBe(
      [
        "export { baseTheme as base, type Theme, type PaletteEntry as C } from '@gild-ui/core/theme'",
        "export type { Theme as T } from '@gild-ui/core/theme'",
        '',
      ].join('\n')
    )
  })

  it('moves import(), require(), jest and vi calls, and import types, by their string', () => {
    const source = [
      "const a = () => import('@soroush.tech/design-system/Modal')",
      "const b = require('@soroush.tech/markdown/Editor')",
      "jest.mock('@soroush.tech/hooks/useCopyToClipboard', () => ({}))",
      "vi.importActual('@soroush.tech/design-system/utils/test/renderWithTheme')",
      "type T = import('@soroush.tech/design-system/Popover').PopoverProps",
      "const c = import('@soroush.tech/design-system/theme')",
      "const d = require('./local')",
      "other.mock('@soroush.tech/design-system/Modal')",
      "vi[mock]('@soroush.tech/design-system/Modal')",
      'require()',
      'const e = import(name)',
      'const f = import(`./${name}`)',
      'const g = import(`@soroush.tech/design-system/${name}`)',
      "const h = require('@soroush.tech/design-system/' + name)",
      'type U = import("react").Foo',
      '',
    ].join('\n')
    const out = run({ 'src/a.ts': source })
    expect(out.after['src/a.ts']).toBe(
      [
        "const a = () => import('@gild-ui/react/Modal')",
        "const b = require('@gild-ui/react-markdown/Editor')",
        "jest.mock('@gild-ui/hooks/useCopyToClipboard', () => ({}))",
        "vi.importActual('@gild-ui/react/utils/test/renderWithTheme')",
        "type T = import('@gild-ui/react/Popover').PopoverProps",
        "const c = import('@soroush.tech/design-system/theme')",
        "const d = require('./local')",
        "other.mock('@soroush.tech/design-system/Modal')",
        "vi[mock]('@soroush.tech/design-system/Modal')",
        'require()',
        'const e = import(name)',
        'const f = import(`./${name}`)',
        'const g = import(`@soroush.tech/design-system/${name}`)',
        "const h = require('@soroush.tech/design-system/' + name)",
        'type U = import("react").Foo',
        '',
      ].join('\n')
    )
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '6:IMP-SPLIT',
      '13:IMP-DYNAMIC',
      '14:IMP-DYNAMIC',
    ])
  })

  it('moves the old paths named in comments, and only where the path moves whole', () => {
    expect(
      migrate(
        [
          "// import { X } from '@soroush.tech/design-system/Button'",
          "/* declare module '@soroush.tech/design-system/theme' {} and '@soroush.tech/design-system/engine' and '@soroush.tech/design-systemx' */",
          '',
        ].join('\n'),
        'src/a.ts'
      )
    ).toBe(
      [
        "// import { X } from '@gild-ui/react/Button'",
        "/* declare module '@gild-ui/core/theme' {} and '@soroush.tech/design-system/engine' and '@soroush.tech/design-systemx' */",
        '',
      ].join('\n')
    )
  })

  it('knows the imports of Gild UI that are already there', () => {
    const out = run(
      {
        'src/a.ts': [
          "import { Button } from '@soroush.tech/design-system/Button'",
          "import { Card } from '@gild-ui/react/Card'",
          "export { space } from '@soroush.tech/styled-system'",
          "import './styles.css'",
          "export { x } from './x'",
          "const y = require('@soroush.tech/styled-system/should-forward-prop')",
          "declare module '@gild-ui/core/theme' {}",
          '',
        ].join('\n'),
      },
      { name: 'app', dependencies: { '@soroush.tech/design-system': '^2.2.0' } }
    )
    expect(out.dependencies).toEqual(
      expect.arrayContaining([
        {
          kind: 'dependency',
          action: 'add',
          name: '@gild-ui/core',
          range: '^0.1.0',
          section: 'dependencies',
        },
        {
          kind: 'dependency',
          action: 'add',
          name: '@soroush.tech/styled-system',
          range: '^6.0.3',
          section: 'dependencies',
        },
      ])
    )
  })
})

describe('css and style', () => {
  it('lifts a static object into one sheet, an entry for each place, named for its component', () => {
    expect(
      migrate(
        `${TITLE}import { View } from '@soroush.tech/design-system/View'\n\nconst styles = 1\n\nexport const A = () => (\n  <Card css={{ padding: 8, margin: -4, zIndex: +1, ok: true, no: null, w: \`1px\`, list: [1, 'a'], deep: { x: 'y' as const } }}>\n    <View\n      style={{\n        color: 'red',\n        '&:hover': { color: 'blue' },\n      }}\n    />\n    <View style={{ color: 'green' }} />\n  </Card>\n)\n`
      )
    ).toBe(
      `import { Card } from '@gild-ui/react/Card'\nimport { View } from '@gild-ui/react/View'\n${SHEET}\n\nconst styles2 = StyleSheet.create({\n  card: { padding: 8, margin: -4, zIndex: +1, ok: true, no: null, w: \`1px\`, list: [1, 'a'], deep: { x: 'y' as const } },\n  view: {\n    color: 'red',\n    '&:hover': { color: 'blue' },\n  },\n  view2: { color: 'green' },\n})\n\nconst styles = 1\n\nexport const A = () => (\n  <Card style={styles2.card}>\n    <View\n      style={styles2.view}\n    />\n    <View style={styles2.view2} />\n  </Card>\n)\n`
    )
  })

  it('does not lift what is not written out in the text', () => {
    const body = [
      "const color = 'red'",
      'export const A = () => (',
      '  <Card>',
      '    <Card style={{ color }} />',
      '    <Card style={{ ...rest }} />',
      '    <Card style={{ [key]: 1 }} />',
      '    <Card style={{ a() {} }} />',
      '    <Card style={{ a: `${color}` }} />',
      '    <Card style={{ a: [1, , 2] }} />',
      '    <Card style={{ a: -color }} />',
      '    <Card style={{ a: color as string }} />',
      '    <Card style={{ a: -1 } as object} />',
      '    <Card style={cond ? { a: 1 } : undefined} />',
      '    <Card style="a" />',
      '    <Card style />',
      '    <Card css="a" />',
      '    <Card css={function (t) { return {} }} />',
      '    <Card css={{ ...rest }} />',
      '  </Card>',
      ')',
    ].join('\n')
    const out = run({ 'src/a.tsx': `${TITLE}${body}\n` })
    expect(out.after['src/a.tsx']).toBe(
      `${TITLE.replace('@soroush.tech/design-system', '@gild-ui/react')}${body}\n`
    )
    expect(out.reports.map(({ id }) => id)).toEqual([
      ...Array(12).fill('STYLE-PROP'),
      'STY-004',
      'STY-004',
      'STY-004',
    ])
  })

  it('reports css on an element that is not a Gild UI component', () => {
    expect(
      ids(
        `${TITLE}export const A = () => (<><div css={{ a: 1 }} /><Other.Part css={{ a: 1 }} /><Other style={{ a: 1 }} /></>)\n`
      )
    ).toEqual(['2:STY-004', '2:STY-004'])
  })

  it('moves a theme function into a sheet and a hook of its own, where the component has lines for it', () => {
    const out = migrate(
      `${TITLE}\nexport function A() {\n  const x = 1\n  return <Card css={(theme) => ({ color: theme.palette.primary.main, w: 'x' as const })} />\n}\n\nexport const B = () => {\n  return <Card css={(t) => ({ gap: t.space[1] })} />\n}\n\nexport default function () {\n  return <Card css={(t) => ({ gap: t.space[1] })} />\n}\n\nfunction lower() {\n  return <Card css={(t) => ({ gap: t.space[1] })} />\n}\n\nexport const C = (items: string[]) => (\n  <>{items.map((item) => <Card key={item} css={(t) => ({ gap: t.space[1] })} />)}</>\n)\n\nexport const D = () => {\n  const list = [1].map(function () {\n    return <Card css={(t) => ({ gap: t.space[1] })} />\n  })\n  return list\n}\n`
    )
    expect(out).toContain("import { StyleSheet } from '@gild-ui/react/StyleSheet'")
    expect(out).toContain("import { useStyle } from '@gild-ui/react/useStyle'")
    expect(out).toContain(
      "const cardSheet = StyleSheet.create((theme) => ({\n  root: { color: theme.palette.primary.main, w: 'x' as const },\n}))"
    )
    expect(out).toContain(
      'export function A() {\n  const cardStyles = useStyle(cardSheet)\n  const x = 1\n  return <Card style={cardStyles.root} />'
    )
    expect(out).toContain(
      'export const B = () => {\n  const cardStyles2 = useStyle(cardSheet2)\n  return <Card style={cardStyles2.root} />'
    )
    expect(out).toContain('export default function () {\n  return <Card css=')
    expect(out).toContain('function lower() {\n  return <Card css=')
    expect(out).toContain('{items.map((item) => <Card key={item} css=')
    expect(out).toContain('const D = () => {\n  const cardStyles')
  })

  it('reports a theme function that reads more than its theme, or has no place for a hook', () => {
    expect(
      ids(
        `${TITLE}\nexport function A({ p }: { p: string }) {\n  const q = 1\n  return (\n    <>\n      <Card css={(theme) => ({ color: p })} />\n      <Card css={(theme) => ({ color: q })} />\n      <Card css={({ palette }) => ({ color: palette.x })} />\n      <Card css={(a, b) => ({ color: a })} />\n      <Card css={(theme) => { return { color: theme.x } }} />\n      <Card css={() => ({ color: 'red' })} />\n    </>\n  )\n}\n\nexport function B() { return <Card css={(t) => ({ gap: t.space[1] })} /> }\n`
      )
    ).toEqual([
      '7:STY-004',
      '8:STY-004',
      '9:STY-004',
      '10:STY-004',
      '11:STY-004',
      '12:STY-004',
      '17:STY-004',
    ])
  })

  it('rewrites useStyle with a factory, and what is made of its result', () => {
    const out = migrate(
      `${TITLE}import { useStyle } from '@soroush.tech/design-system/style'\n\nexport function A() {\n  const card = useStyle({ getStyles: (theme) => ({ padding: theme.space[2] }) })\n  const other = useStyle({ 'getStyles': (t) => ({ margin: t.space[1] }) })\n  useStyle({ getStyles: (t) => ({ margin: t.space[1] }) })\n  return <><Card css={card} /><Card css={other} /></>\n}\n`
    )
    expect(out).toContain(
      'const cardSheet = StyleSheet.create((theme) => ({\n  root: { padding: theme.space[2] },\n}))'
    )
    expect(out).toContain('const otherSheet = StyleSheet.create((t) => ({')
    expect(out).toContain('const componentSheet = StyleSheet.create((t) => ({')
    expect(out).toContain('const card = useStyle(cardSheet).root')
    expect(out).toContain('  useStyle(componentSheet).root\n')
    expect(out).toContain('<Card style={card} /><Card style={other} />')
  })

  it('reports a useStyle call it cannot rewrite', () => {
    expect(
      ids(
        `${TITLE}import { useStyle } from '@soroush.tech/design-system/style'\nexport function A() {\n  useStyle(factory)\n  useStyle({ padding: 1 })\n  useStyle({ getStyles: factory.getStyles })\n  useStyle({ getStyles: (t) => ({ a: 1 }), more: 1 })\n  useStyle({ [key]: 1 })\n  useStyle({ ...factory })\n  useStyle()\n  useStyle({ getStyles: (t) => ({ a: other }) })\n  useStyle({ getStyles: ({ x }) => ({ a: 1 }) })\n  notUseStyle({})\n  return null\n}\n`
      )
    ).toEqual([
      '4:USE-STYLE',
      '5:USE-STYLE',
      '6:USE-STYLE',
      '7:USE-STYLE',
      '8:USE-STYLE',
      '9:USE-STYLE',
      '10:USE-STYLE',
      '11:USE-STYLE',
      '12:USE-STYLE',
    ])
  })

  it('finds the components made with styled, and no other', () => {
    const out = migrate(
      "import { styled } from '@soroush.tech/design-system'\nimport { View } from '@soroush.tech/design-system/View'\n\nconst A = styled(View)({})\nconst B = styled.div`color: red;`\nconst C = styled('p', { name: 'C' })({})\nconst plain = 1\nexport const X = () => (\n  <>\n    <A style={{ a: 1 }} />\n    <B style={{ a: 1 }} />\n    <C style={{ a: 1 }} />\n    <plain style={{ a: 1 }} />\n  </>\n)\n"
    )
    expect(out).toContain('<A style={styles.a2} />')
    expect(out).toContain('<B style={styles.b} />')
    expect(out).toContain('<C style={styles.c} />')
    expect(out).toContain('<plain style={{ a: 1 }} />')
  })

  it('does not look for components in a file that has no styled', () => {
    expect(
      migrate(
        "import { View } from '@soroush.tech/design-system/View'\nconst A = other(View)\nexport const X = () => <A style={{ a: 1 }} />\n"
      )
    ).toContain('<A style={{ a: 1 }} />')
  })
})

describe('the theme', () => {
  const HEAD = "import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'\n"

  it('moves a shared components object into defineThemes, in a themes object', () => {
    expect(
      migrate(
        `${HEAD}\nconst components = { Button: {} }\n\nconst themes = {\n  light: createTheme(baseTheme, { name: 'light', components }),\n  'dark': createTheme(baseTheme, {\n    components: components,\n    name: 'dark',\n  }),\n}\n\nexport default themes\n`,
        'src/a.ts'
      )
    ).toBe(
      `import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'\n\nconst components = { Button: {} }\n\nconst themes = defineThemes({\n  light: createTheme(baseTheme, { name: 'light' }),\n  'dark': createTheme(baseTheme, {\n    name: 'dark',\n  }),\n}, components)\n\nexport default themes\n`
    )
  })

  it('moves it into defineThemes when the themes are consts a collection gathers, keeping the names', () => {
    expect(
      migrate(
        `${HEAD}import type { Theme } from '@soroush.tech/design-system'\nimport { components } from './components'\n\nexport const light: Theme = createTheme(baseTheme, { components, name: 'light' })\nconst dark = createTheme(baseTheme, {\n  name: 'dark',\n  components,\n})\n\nexport const themes = { light, main: dark }\nexport const used = [light, dark]\n`,
        'src/a.ts'
      )
    ).toBe(
      `import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'\nimport { components } from './components'\n\nconst lightTheme = createTheme(baseTheme, { name: 'light' })\nconst darkTheme = createTheme(baseTheme, {\n  name: 'dark',\n})\n\nexport const themes = defineThemes({ light: lightTheme, main: darkTheme }, components)\n\nexport const { light } = themes\n\nconst { main: dark } = themes\nexport const used = [light, dark]\n`
    )
  })

  it('writes the call over lines when it is long', () => {
    const out = migrate(
      `${HEAD}const components = {}\nconst aVeryLongNameForALightTheme = createTheme(baseTheme, { components })\nconst aVeryLongNameForADarkTheme = createTheme(baseTheme, { components })\nconst themes = { aVeryLongNameForALightTheme, aVeryLongNameForADarkTheme }\n`,
      'src/a.ts'
    )
    expect(out).toContain(
      'const themes = defineThemes(\n  { aVeryLongNameForALightTheme: aVeryLongNameForALightThemeTheme, aVeryLongNameForADarkTheme: aVeryLongNameForADarkThemeTheme },\n  components\n)'
    )
  })

  it('drops the Theme import only when nothing else uses it', () => {
    const out = migrate(
      `${HEAD}import type { Theme } from '@soroush.tech/design-system'\nconst components = {}\nexport const light: Theme = createTheme(baseTheme, { components })\nexport const themes = { light }\nexport const f = (theme: Theme) => theme\n`,
      'src/a.ts'
    )
    expect(out).toContain("import type { Theme } from '@gild-ui/core/theme'")
    expect(out).toContain('const lightTheme = createTheme(baseTheme, {})')
  })

  it('reports each components of a file it cannot move, each annotation, and a non-string element', () => {
    const out = run({
      'src/a.ts': `${HEAD}import type { Theme } from '@soroush.tech/design-system'\nconst components = {}\nconst other = {}\nexport const a: Theme = createTheme(baseTheme, { components })\nexport const b = createTheme(baseTheme, { components: other, typography: { h1: { element: Tag, other: 1 } } })\nexport const c = createTheme(baseTheme, { 'components': { X: 1 } })\nexport const d = createTheme(baseTheme)\n`,
    })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '5:THM-006',
      '5:THM-001',
      '5:THM-003',
      '6:THM-001',
      '6:CMP-003',
      '7:THM-001',
    ])
  })

  it('moves nothing when the components are not shared by every theme, or the shape is not known', () => {
    const base = `${HEAD}const components = {}\n`
    const cases = [
      `${base}export const a = createTheme(baseTheme, { components })\nexport const b = createTheme(baseTheme, {})\nexport const themes = { a, b }\n`,
      `${base}export const a = createTheme(baseTheme, { components: {} })\nexport const b = createTheme(baseTheme, { components })\nexport const themes = { a, b }\n`,
      `${base}export const a = createTheme(baseTheme, { components })\nexport const b = createTheme(baseTheme, { components })\nexport const themes = { a }\n`,
      `${base}export const a = createTheme(baseTheme, { components })\nexport const b = createTheme(baseTheme, { components })\nexport const themes = { a, b, c: 1 }\n`,
      `${base}export const a = createTheme(baseTheme, { components })\nexport const b = createTheme(baseTheme, { components })\nexport const themes = { a, b: a, [c]: b }\n`,
      `${base}export const a = createTheme(baseTheme, { components })\nexport const b = createTheme(baseTheme, { components })\nexport const themes = { a, 1: b }\n`,
      `${base}export const a = createTheme(baseTheme, { components })\nexport const b = createTheme(baseTheme, { components })\n`,
      `${base}export const a = createTheme(baseTheme, { components }), b = createTheme(baseTheme, { components })\nexport const themes = { a, b }\n`,
      `${HEAD}const components = {}\nexport const a = createTheme(baseTheme, { components })\nconst use = a\nexport const b = createTheme(a, { components })\nexport const themes = { a, b }\n`,
      `${HEAD}const f = (components) => createTheme(baseTheme, { components })\n`,
      `${HEAD}const f = (components) => ({ light: createTheme(baseTheme, { components }) })\n`,
      `${HEAD}const components = {}\nexport default { light: createTheme(baseTheme, { components }) }\n`,
      `${HEAD}const components = {}\nexport const themes = { light: createTheme(baseTheme, { components }), x: 1 }\n`,
      `${HEAD}const components = {}\nexport const themes = { light: createTheme(baseTheme, { components }), dark: other }\n`,
    ]
    cases.forEach((source, index) => {
      const out = run({ 'src/a.ts': source })
      expect([index, out.after['src/a.ts'].includes('defineThemes(')]).toEqual([index, false])
      expect([index, out.reports.some(({ id }) => id === 'THM-001')]).toEqual([index, true])
    })
  })

  it('writes Theme["components"] as ThemeComponents, and leaves the other keys', () => {
    expect(
      migrate(
        "import type { Theme } from '@soroush.tech/design-system'\nexport type A = Theme['components']\nexport type B = Theme['name']\nexport type C = Other['components']\nexport type D = Theme[K]\n",
        'src/a.ts'
      )
    ).toBe(
      "import type { Theme } from '@gild-ui/core/theme'\nimport type { ThemeComponents } from '@gild-ui/react'\nexport type A = ThemeComponents\nexport type B = Theme['name']\nexport type C = Other['components']\nexport type D = Theme[K]\n"
    )
    expect(
      migrate(
        "import type { Theme } from '@soroush.tech/design-system'\nexport type A = Theme['components']\n",
        'src/a.ts'
      )
    ).toBe(
      "import type { ThemeComponents } from '@gild-ui/react'\nexport type A = ThemeComponents\n"
    )
  })

  it('reports what an augmentation of the old theme module no longer has', () => {
    const out = run({
      'src/a.d.ts':
        "declare module '@soroush.tech/design-system/theme' {\n  interface Theme { name: string }\n  interface Theme { components?: {} }\n  interface Other { components: 1 }\n  interface ThemeComponents {}\n  interface TabsVariants {}\n  type X = 1\n}\ndeclare module 'other' { interface TabsVariants {} }\ndeclare namespace Foo {}\n",
    })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '3:THM-005',
      '5:THM-005',
      '6:EXP-004',
    ])
    expect(out.after['src/a.d.ts']).toContain("declare module '@gild-ui/core/theme' {")
  })
})

describe('what is found in the text', () => {
  it('reports the imports of the previous engine, with what takes their place', () => {
    const out = run({
      'src/a.ts': [
        "import styled from '@emotion/styled'",
        "import { css, keyframes, Other } from '@emotion/react'",
        "import '@emotion/react'",
        "import createEmotionServer from '@emotion/server/create-instance'",
        "const x = require('@emotion/cache')",
        "const y = require('react')",
        'const z = require(name)',
        '',
      ].join('\n'),
    })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '1:IMP-EMOTION',
      '2:IMP-EMOTION',
      '3:IMP-EMOTION',
      '4:STY-008',
      '5:IMP-EMOTION',
    ])
    expect(
      run({
        'src/a.ts': "import styled from '@emotion/styled'\nimport { css } from '@emotion/react'\n",
      })
        .changes.filter((c) => c.kind === 'report')
        .map((c) => (c as { message: string }).message)
        .join('\n')
    ).toContain('Replacements: the default import: styled from @gild-ui/react/styled.')
  })

  it('reports the calls whose meaning changed', () => {
    const out = run({
      'src/a.tsx': `import { css, keyframes, styled } from '@soroush.tech/design-system'\nimport { withTheme } from '@soroush.tech/design-system/theme'\nimport { createCache } from '@soroush.tech/design-system/engine'\n\nconst a = css\`color: red;\`\nconst b = css({ color: 'red' })\nconst c = keyframes\`from {}\`\nconst d = keyframes({})\nwithTheme(Foo)\nuseServerInsertedHTML(() => null)\ncreateCache({ key: 'a', nonce: 'x', speedy: true, 'prepend': true })\ncreateCache(options)\ncreateCache()\nconst e = renderStylesToString(html)\nconst f = server.extractCritical(html)\nconst g = server.other(html)\nconst h = styled('div')<{ a: 1 }>({})\nconst i = styled('div', { shouldForwardProp })<{ a: 1 }>({})\nconst j = styled('div', {})<{ a: 1 }>({})\nconst k = styled(Foo)<{ a: 1 }>({})\nconst l = styled('div')({})\nconst m = styled('div')<{ a: 1 }>\`\`\nconst n = styled.div.withComponent('a')({})\nconst o = other()()\nconst p = other()<{ a: 1 }>()\nexport const q = () => foo[bar]()\n`,
    })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual(
      [
        '5:STY-002',
        '6:STY-002',
        '7:STY-003',
        '8:STY-003',
        '9:CMP-001',
        '10:STY-007',
        '11:STY-009',
        '11:STY-010',
        '12:STY-009',
        '13:STY-009',
        '14:STY-008',
        '15:STY-008',
        '17:STY-005',
        '19:STY-005',
        '23:STY-001',
      ].filter((entry) => !entry.endsWith('STY-005') || true)
    )
  })

  it('reports a slot style on the arrow, a provider, and a portal', () => {
    const out = run({
      'src/a.tsx': `import { Tooltip } from '@soroush.tech/design-system/Tooltip'\nimport { Portal } from '@soroush.tech/design-system/Portal'\nimport { LayoutProvider, ThemeProvider } from '@soroush.tech/design-system/theme'\n\nexport const A = () => (\n  <>\n    <Tooltip slotProps={{ arrow: { style: { top: 1 } } }} />\n    <Tooltip slotProps={{ arrow: { className: 'x' } }} />\n    <Tooltip slotProps={{ arrow: other }} />\n    <Tooltip slotProps={{ root: {} }} />\n    <Tooltip slotProps={props} />\n    <Tooltip slotProps="x" />\n    <Tooltip slotProps />\n    <Tooltip {...props} other={1} />\n    <Portal />\n    <LayoutProvider />\n    <ThemeProvider />\n    <this.Foo />\n  </>\n)\n`,
    })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '7:CMP-005',
      '15:OUT-005',
      '16:OUT-004',
    ])
  })

  it('maps withStyles, and reports what changed for it and the removed StylesConsumer', () => {
    const out = run({
      'src/a.tsx': `import { withStyles, StylesConsumer } from '@soroush.tech/design-system/style'

export const A = withStyles({ opacity: 1 })(Base)
export const B = () => <StylesConsumer style={s}>{(x) => null}</StylesConsumer>
`,
    })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '1:EXP-005',
      '3:CMP-007',
      '4:EXP-005',
    ])
    expect(JSON.stringify(out.changes)).toContain(
      "import { withStyles } from '@gild-ui/react/withStyles'"
    )
  })

  it('reports tokens glued to text, and arithmetic on them', () => {
    const out = run({
      'src/a.ts':
        "import { styled } from '@soroush.tech/design-system'\nexport const a = (theme) => [\n  `${theme.palette.primary.main}1F`,\n  `-${theme.space[2]}`,\n  `${theme.fontSizes[2]}px`,\n  `${theme.space[1]} ${theme.space[2]}`,\n  `${other.palette}1F`,\n  `${theme.palette.primary.main}`,\n  theme.space[2] * 2,\n  theme.palette.x * 2,\n  other.space[2] * 2,\n  theme.space,\n  1 + 2,\n  theme * 2,\n  `${theme}1F`,\n  `${call()}1F`,\n]\n",
    })
    expect(out.reports.map(({ line, id }) => `${line}:${id}`)).toEqual([
      '3:STY-012',
      '4:STY-012',
      '5:STY-012',
      '9:STY-012',
      '15:STY-012',
    ])
  })

  it('reports what reads the old output or the old tools in a file, line by line', () => {
    const out = run({
      'src/a.test.ts':
        "document.querySelector('style[data-emotion]')\ndocument.querySelector('[class^=\"css-\"]')\nexpect(el.className).toBe('css-1abc23-Button')\nexpect(el.className).toBe('css-in-js')\n/** @jsxImportSource @emotion/react */\nconst a = { jsxImportSource: '@emotion/react' }\nconst b = { jsxImportSource: 'react' }\nconst c = '@emotion/babel-plugin'\n",
      'tsconfig.app.json': '{ "compilerOptions": { "jsxImportSource": "@emotion/react" } }',
      'tsconfig.json': '{ "compilerOptions": { "jsxImportSource": "react" } }',
      'src/data.json': '{ "jsxImportSource": "@emotion/react" }',
      'babel.config.js': "module.exports = { presets: ['@emotion/babel-preset-css-prop'] }",
    })
    expect(out.reports.map(({ path, line, id }) => `${path}:${line}:${id}`)).toEqual([
      'babel.config.js:1:DEP-009',
      'src/a.test.ts:1:STY-011',
      'src/a.test.ts:2:STY-011',
      'src/a.test.ts:3:STY-011',
      'src/a.test.ts:5:DEP-009',
      'src/a.test.ts:6:DEP-009',
      'src/a.test.ts:8:DEP-009',
      'tsconfig.app.json:1:DEP-009',
    ])
  })
})

describe('package.json', () => {
  const plan = (packageJson: Record<string, unknown>, files: Record<string, string> = {}) =>
    run(files, packageJson)

  it('adds what the imports reach and removes what the old packages brought', () => {
    const out = plan(
      {
        name: 'app',
        dependencies: { '@soroush.tech/design-system': '^2.2.0', react: '^19.2.8' },
        devDependencies: {
          '@soroush.tech/markdown': '^1.3.0',
          '@soroush.tech/hooks': '^0.1.0',
          '@emotion/react': '^11.0.0',
          '@emotion/styled': '^11.0.0',
        },
      },
      {
        'src/a.ts':
          "import { space } from '@soroush.tech/design-system'\nimport { Preview } from '@soroush.tech/markdown'\nimport { useCopyToClipboard } from '@soroush.tech/hooks/useCopyToClipboard'\nimport { createTheme } from '@soroush.tech/design-system/theme'\n",
        'src/b.ts': "import { css } from '@emotion/react'\n",
      }
    )
    expect(out.dependencies).toEqual([
      {
        kind: 'dependency',
        action: 'add',
        name: '@gild-ui/core',
        range: '^0.1.0',
        section: 'dependencies',
      },
      {
        kind: 'dependency',
        action: 'add',
        name: '@soroush.tech/styled-system',
        range: '^6.0.3',
        section: 'dependencies',
      },
      {
        kind: 'dependency',
        action: 'add',
        name: '@gild-ui/react-markdown',
        range: '^0.1.0',
        section: 'devDependencies',
      },
      { kind: 'dependency', action: 'remove', name: '@soroush.tech/markdown' },
      {
        kind: 'dependency',
        action: 'add',
        name: '@gild-ui/hooks',
        range: '^0.1.0',
        section: 'devDependencies',
      },
      { kind: 'dependency', action: 'remove', name: '@soroush.tech/hooks' },
      { kind: 'dependency', action: 'remove', name: '@emotion/styled' },
      { kind: 'dependency', action: 'remove', name: '@emotion/cache' },
      { kind: 'dependency', action: 'remove', name: '@emotion/css' },
      { kind: 'dependency', action: 'remove', name: '@emotion/server' },
    ])
  })

  it('adds a package the imports reach even when the old one was not listed, in the section of the design system', () => {
    const out = plan(
      { name: 'app', devDependencies: { '@soroush.tech/design-system': '^2.2.0' } },
      {
        'src/a.ts':
          "import { Preview } from '@soroush.tech/markdown'\nimport { useCopyToClipboard } from '@soroush.tech/hooks/useCopyToClipboard'\nimport { createTheme } from '@soroush.tech/design-system/theme'\n",
      }
    )
    expect(out.dependencies.filter((change) => change.action === 'add')).toEqual([
      {
        kind: 'dependency',
        action: 'add',
        name: '@gild-ui/core',
        range: '^0.1.0',
        section: 'devDependencies',
      },
      {
        kind: 'dependency',
        action: 'add',
        name: '@gild-ui/react-markdown',
        range: '^0.1.0',
        section: 'devDependencies',
      },
      {
        kind: 'dependency',
        action: 'add',
        name: '@gild-ui/hooks',
        range: '^0.1.0',
        section: 'devDependencies',
      },
    ])
  })

  it('raises React to 19.2.8 where it is lower, in the section it is in, and reports the other pins of React 18', () => {
    const out = plan({
      name: 'app',
      dependencies: { '@soroush.tech/design-system': '^2.2.0', 'react-dom': '^18.2.0' },
      devDependencies: {
        react: '~18.3.1',
        '@types/react': '^18.0.0',
        '@types/react-dom': '^19.0.0',
      },
      peerDependencies: {
        react: '^18 || ^19',
        'react-dom': 'latest',
        '@soroush.tech/markdown': '^1.3.0',
        '@soroush.tech/design-system': '^2.0.0',
      },
      overrides: { react: '18.3.1', 'react-dom': { x: 1 } },
      resolutions: { react: '^19.2.8' },
      pnpm: { overrides: { 'react-dom': '17.0.2' } },
      scripts: {
        setup: 'design-system init',
        start: 'vite',
        init: 'npx @soroush.tech/design-system init',
      },
    })
    expect(out.dependencies.filter((change) => change.action === 'update')).toEqual([
      { kind: 'dependency', action: 'update', name: 'react', range: '^19.2.8' },
      { kind: 'dependency', action: 'update', name: 'react-dom', range: '^19.2.8' },
    ])
    expect(
      out.changes
        .filter((change) => change.kind === 'report' && change.path === 'package.json')
        .map((change) => /^\[([A-Z0-9-]+)\]/.exec((change as { message: string }).message)?.[1])
    ).toEqual([
      'DEP-008',
      'DEP-008',
      'DEP-006',
      'DEP-006',
      'DEP-006',
      'DEP-006',
      'DEP-003',
      'DEP-003',
      undefined,
      undefined,
    ])
  })

  it('leaves a React range it cannot read, and an app with no React, alone', () => {
    const updates = (packageJson: Record<string, unknown>) =>
      plan(packageJson).dependencies.filter((change) => change.action === 'update')
    expect(
      updates({
        name: 'app',
        dependencies: { '@soroush.tech/design-system': '^2.2.0', react: 'latest' },
      })
    ).toEqual([])
    expect(
      updates({ name: 'app', dependencies: { '@soroush.tech/design-system': '^2.2.0' } })
    ).toEqual([])
  })

  it('reports Next.js for the server components, and a package.json with none of the scripts', () => {
    const out = plan({
      name: 'app',
      dependencies: { '@soroush.tech/design-system': '^2.2.0', next: '^16.0.0' },
    })
    expect(
      out.changes.some(
        (change) => change.kind === 'report' && change.message.startsWith('[THM-007]')
      )
    ).toBe(true)
    const dev = plan({
      name: 'app',
      devDependencies: { '@soroush.tech/design-system': '^2.2.0', next: '^16.0.0' },
    })
    expect(
      dev.changes.some(
        (change) => change.kind === 'report' && change.message.startsWith('[THM-007]')
      )
    ).toBe(true)
  })
})

describe('the files it reads', () => {
  it('reads only source files and the config files that can hold the old settings', () => {
    const out = run({
      'src/a.md': "import { Button } from '@soroush.tech/design-system/Button'\n",
      'src/a.css': '.css-1abc23 {}\n',
      'src/b.js': "const { Button } = require('@soroush.tech/design-system/Button')\n",
      'src/c.mjs': "import { Button } from '@soroush.tech/design-system/Button'\n",
      'src/d.cts': "import { Button } from '@soroush.tech/design-system/Button'\n",
      'src/e.ts':
        "const a = <T,>(x: T) => x\nconst b = <number>1\nimport { Button } from '@soroush.tech/design-system/Button'\n",
      'src/f.tsx':
        "import { Button } from '@soroush.tech/design-system/Button'\nconst a = <div />\n",
      'src/g.ts': 'export const x = 1\n',
    })
    expect(out.after['src/a.md']).toContain('@soroush.tech/design-system/Button')
    expect(out.after['src/a.css']).toBe('.css-1abc23 {}\n')
    expect(out.after['src/b.js']).toContain('@gild-ui/react/Button')
    expect(out.after['src/c.mjs']).toContain('@gild-ui/react/Button')
    expect(out.after['src/d.cts']).toContain('@gild-ui/react/Button')
    expect(out.after['src/e.ts']).toContain('@gild-ui/react/Button')
    expect(out.after['src/f.tsx']).toContain('@gild-ui/react/Button')
    expect(out.reports.filter(({ path }) => path === 'src/e.ts' || path === 'src/g.ts')).toEqual([])
  })

  it('reports a file it cannot read as source, and moves nothing in it', () => {
    const out = run({
      'src/a.ts': "import { Button } from '@soroush.tech/design-system/Button'\nconst = \n",
    })
    expect(out.after['src/a.ts']).toContain('@soroush.tech/design-system/Button')
    expect(out.reports).toEqual([{ path: 'src/a.ts', line: 1, id: 'PARSE' }])
  })

  it('skips a file that is listed and cannot be read', () => {
    const changes = step.plan({
      packageJson: PACKAGE,
      packageManager: PM,
      readFile: (path) => (path === 'package.json' ? JSON.stringify(PACKAGE) : undefined),
      listFiles: () => ['package.json', 'src/gone.ts'],
    })
    expect(changes.some((change) => change.kind === 'edit')).toBe(false)
  })
})

describe('the helpers', () => {
  it('reads and edits source text', () => {
    expect(isSourceFile('a.ts') && isSourceFile('a.tsx') && isSourceFile('a.mjs')).toBe(true)
    expect(isSourceFile('a.json')).toBe(false)
    expect(parseSource('a.ts', 'const =')).toBeUndefined()
    expect(lineAt('a\nb\nc', 4)).toBe(3)
    expect(
      applyEdits('abc', [
        { start: 1, end: 2, text: 'X' },
        { start: 3, end: 3, text: '!' },
      ])
    ).toBe('aXc!')
    expect(() =>
      applyEdits('abc', [
        { start: 0, end: 2, text: '' },
        { start: 1, end: 2, text: '' },
      ])
    ).toThrow('overlap')
  })

  it('answers from the inventory', () => {
    expect(inventoryMessage('EXP-001', 'Here.')).toMatch(/^\[EXP-001\] Here\. /)
    expect(() => inventoryMessage('NOPE')).toThrow('no item NOPE')
    expect(resolveName('@soroush.tech/design-system/theme', 'ButtonOwnerState')).toEqual({
      to: '@gild-ui/react/Button',
    })
    expect(resolveName('@soroush.tech/design-system/theme', 'TabsVariants')).toEqual({
      removed: 'EXP-004',
    })
    expect(resolveName('@soroush.tech/design-system/theme', 'nope')).toBeUndefined()
    expect(resolveName('@soroush.tech/design-system', 'Theme')).toEqual({
      to: '@gild-ui/core/theme',
    })
    expect(resolveName('@soroush.tech/design-system', 'CSSObject')).toEqual({
      to: '@gild-ui/react',
    })
    expect(resolveName('@soroush.tech/design-system/style', 'StyleInput')).toEqual({
      to: '@gild-ui/react/withStyles',
    })
    expect(ruleOfPath('react')).toBeUndefined()
    expect(ruleOfPath('@soroush.tech/design-systemx')).toBeUndefined()
    expect(ruleOfPath('@soroush.tech/design-system/Button')).toEqual({
      kind: 'uniform',
      to: '@gild-ui/react/Button',
    })
    expect(ruleOfPath('@soroush.tech/design-system/theme')).toEqual({ kind: 'split' })
    expect(ruleOfPath('@soroush.tech/design-system/style')).toEqual({ kind: 'split' })
    expect(ruleOfPath('@soroush.tech/design-system/Nope')).toEqual({ kind: 'unknown' })
    expect(ruleOfPath('@soroush.tech/hooks')).toEqual({ kind: 'unknown' })
    expect(targetsOfPath('@soroush.tech/design-system/engine')).toEqual([
      '@gild-ui/react/Global',
      '@gild-ui/react/engine',
    ])
    expect(targetsOfPath('@soroush.tech/design-system/nope')).toEqual([])
  })
})
