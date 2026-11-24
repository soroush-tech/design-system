// Proves that the component library and the theme library are one copy in an app.
//
//   pnpm check:single-copy     (run by `test:types`, after the build)
//
// The two packages are packed as published, installed together in a fresh folder outside the
// workspace, and a component of the library is rendered on the server under the `ThemeProvider` of
// the theme library. It must read that provider's theme, and the styles of the component and of an
// element made with the theme library's own `styled` must be one stream with one prefix. A second
// copy of the theme package would be a second React context and a second engine configuration.
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packages = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const folder = mkdtempSync(join(tmpdir(), 'single-copy-'))
const tarballs = join(folder, 'tgz')
const app = join(folder, 'app')
mkdirSync(tarballs)
mkdirSync(app)
const run = (command, args, cwd) =>
  execFileSync(command, args, { cwd, encoding: 'utf8', shell: process.platform === 'win32' })

try {
  for (const name of [
    'styled-system',
    'core',
    'react-hooks',
    'react-theme',
    'cli',
    'react-components',
  ]) {
    run('pnpm', ['pack', '--pack-destination', tarballs], join(packages, name))
  }
  const overrides = {}
  for (const file of readdirSync(tarballs)) {
    const name = /^soroush\.design-(.+)-\d+\.\d+\.\d+.*\.tgz$/.exec(file)?.[1]
    overrides[`@soroush.design/${name}`] = `file:${join(tarballs, file).replaceAll('\\', '/')}`
  }
  writeFileSync(
    join(app, 'package.json'),
    JSON.stringify({
      name: 'single-copy',
      private: true,
      dependencies: {
        '@soroush.design/react-components': overrides['@soroush.design/react-components'],
        '@soroush.design/react-theme': overrides['@soroush.design/react-theme'],
        react: '^19.2.8',
        'react-dom': '^19.2.8',
      },
      overrides,
    })
  )
  run('npm', ['install', '--no-audit', '--no-fund'], app)

  const copies = run('npm', ['ls', '@soroush.design/react-theme', '--all', '--parseable'], app)
  const paths = new Set(
    copies
      .split('\n')
      .filter(Boolean)
      .map((path) => path.trim())
  )
  if (paths.size !== 1)
    throw new Error(`Expected one copy of the theme package, found:\n${[...paths].join('\n')}`)

  writeFileSync(
    join(app, 'check.cjs'),
    `
const assert = require('node:assert')
const theme = require('@soroush.design/react-theme')
const libraryTheme = require('@soroush.design/react-components/theme')
const libraryEngine = require('@soroush.design/react-components/engine')
const { styled: libraryStyled } = require('@soroush.design/react-components')
const { Button } = require('@soroush.design/react-components/Button')
const { createElement: h } = require('react')
const { renderToString } = require('react-dom/server')

assert.strictEqual(libraryTheme.ThemeProvider, theme.ThemeProvider)
assert.strictEqual(libraryTheme.useTheme, theme.useTheme)
assert.strictEqual(libraryEngine.styleCache, theme.styleCache)
assert.strictEqual(libraryStyled, theme.styled)

const mine = theme.styled('i')(({ theme }) => ({ color: theme.palette.primary.main }))
const brand = theme.createTheme(theme.baseTheme, { palette: { primary: { main: '#0a7a5a' } } })
const html = renderToString(
  h(theme.ThemeProvider, { theme: brand }, h(Button, null, 'Save'), h(mine, null, 'mine'))
)
assert.strictEqual(html.split('<style').length - 1, 1, 'one style stream')
assert.strictEqual(html.split('@layer soroush-theme{:where(:root)').length - 1, 1, 'theme declared once')
assert.ok(html.includes('--soroush-palette-primary-main:#0a7a5a'), 'the component reads the theme of the provider')
for (const [, classes] of html.matchAll(/class="([^"]+)"/g)) {
  for (const name of classes.split(' ')) assert.ok(name.startsWith('soroush-'), name)
}
`
  )
  run('node', ['check.cjs'], app)
  console.log('check:single-copy: one copy of the theme package; a component reads its provider.')
} finally {
  rmSync(folder, { recursive: true, force: true })
}
