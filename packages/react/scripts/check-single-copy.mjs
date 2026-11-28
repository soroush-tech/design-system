// Proves that the package is one copy in an app: one theme context, one engine configuration.
//
//   pnpm check:single-copy     (run by `test:types`, after the build)
//
// The package and the packages it depends on are packed as published, installed together in a
// fresh folder outside the workspace, and a component is rendered on the server under the
// `ThemeProvider` of the package's own entry. It must read that provider's theme, and the styles of
// the component and of an element made with the package's `styled` must be one stream with one
// prefix, in both formats. The app installs the package and React alone: no CLI, no markdown.
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

// The same checks, written for a loader: `require` in a CommonJS file, `await import` in a module.
const check = (load) => `
const assert = ${load === 'require' ? "require('node:assert')" : "(await import('node:assert')).default"}
const root = ${load === 'require' ? "require('@gild-ui/react')" : "await import('@gild-ui/react')"}
const provider = ${load === 'require' ? "require('@gild-ui/react/ThemeProvider')" : "await import('@gild-ui/react/ThemeProvider')"}
const styledEntry = ${load === 'require' ? "require('@gild-ui/react/styled')" : "await import('@gild-ui/react/styled')"}
const { baseTheme, createTheme } = ${load === 'require' ? "require('@gild-ui/core/theme')" : "await import('@gild-ui/core/theme')"}
const { Button } = ${load === 'require' ? "require('@gild-ui/react/Button')" : "await import('@gild-ui/react/Button')"}
const { createElement: h } = ${load === 'require' ? "require('react')" : "await import('react')"}
const { renderToString } = ${load === 'require' ? "require('react-dom/server')" : "await import('react-dom/server')"}

assert.strictEqual(provider.ThemeProvider, root.ThemeProvider)
assert.strictEqual(styledEntry.styled, root.styled)

const mine = root.styled('i')(({ theme }) => ({ color: theme.palette.primary.main }))
const brand = createTheme(baseTheme, { palette: { primary: { main: '#0a7a5a' } } })
const html = renderToString(
  h(provider.ThemeProvider, { theme: brand }, h(Button, null, 'Save'), h(mine, null, 'mine'))
)
assert.strictEqual(html.split('<style').length - 1, 1, 'one style stream')
assert.strictEqual(html.split('@layer soroush-theme{:where(:root)').length - 1, 1, 'theme declared once')
assert.ok(html.includes('--soroush-palette-primary-main:#0a7a5a'), 'the component reads the theme of the provider')
for (const [, classes] of html.matchAll(/class="([^"]+)"/g)) {
  for (const name of classes.split(' ')) assert.ok(name.startsWith('soroush-'), name)
}
`

try {
  for (const name of ['core', 'hooks', 'react']) {
    run('pnpm', ['pack', '--pack-destination', tarballs], join(packages, name))
  }
  const overrides = {}
  for (const file of readdirSync(tarballs)) {
    // gild-ui-<name>-<version>.tgz: the name is every part before the one that starts the version.
    if (!file.startsWith('gild-ui-') || !file.endsWith('.tgz')) continue
    const parts = file.slice('gild-ui-'.length, -'.tgz'.length).split('-')
    const versionAt = parts.findIndex((part) => /^\d+\.\d+\.\d+/.test(part))
    if (versionAt < 1) continue
    const name = parts.slice(0, versionAt).join('-')
    overrides[`@gild-ui/${name}`] = `file:${join(tarballs, file).replaceAll('\\', '/')}`
  }
  writeFileSync(
    join(app, 'package.json'),
    JSON.stringify({
      name: 'single-copy',
      private: true,
      dependencies: {
        '@gild-ui/react': overrides['@gild-ui/react'],
        react: '^19.2.8',
        'react-dom': '^19.2.8',
      },
      overrides,
    })
  )
  run('npm', ['install', '--no-audit', '--no-fund'], app)

  const installed = readdirSync(join(app, 'node_modules', '@gild-ui')).sort()
  const expected = ['core', 'hooks', 'react']
  if (installed.join() !== expected.join()) {
    throw new Error(`Expected ${expected.join(', ')} under @gild-ui, found ${installed.join(', ')}`)
  }

  for (const name of [
    '@gild-ui/react',
    '@gild-ui/core',
    '@soroush.tech/styled-system',
    '@umber-style/is-prop-valid',
    '@umber-style/styled',
    'react',
  ]) {
    const copies = run('npm', ['ls', name, '--all', '--parseable'], app)
    const paths = new Set(
      copies
        .split('\n')
        .filter(Boolean)
        .map((path) => path.trim())
    )
    if (paths.size !== 1) {
      throw new Error(`Expected one copy of ${name}, found:\n${[...paths].join('\n')}`)
    }
  }

  writeFileSync(join(app, 'check.cjs'), check('require'))
  run('node', ['check.cjs'], app)
  writeFileSync(join(app, 'check.mjs'), check('import'))
  run('node', ['check.mjs'], app)
  console.log(
    'check:single-copy: one copy of the package, in both formats; a component reads its provider.'
  )
} finally {
  rmSync(folder, { recursive: true, force: true })
}
