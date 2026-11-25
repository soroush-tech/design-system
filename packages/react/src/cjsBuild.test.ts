// @vitest-environment node
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import manifest from '../package.json'

const root = process.cwd()
const require = createRequire(join(root, 'dist', 'x.cjs'))
const published = Object.entries(manifest.publishConfig.exports) as [
  string,
  { import: { default: string }; require: { default: string } },
][]

// The workspace serves @soroush.design/styled-system, @soroush.design/core and
// @soroush.design/react-hooks as source; the built package requires their builds.
const Module = require('node:module')
const resolveFilename = Module._resolveFilename
const styledSystemDist = join(root, '..', 'styled-system', 'dist')
const coreDist = join(root, '..', 'core', 'dist')
const hooksDist = join(root, '..', 'react-hooks', 'dist')

beforeAll(() => {
  Module._resolveFilename = (request: string, ...rest: unknown[]) =>
    resolveFilename.call(
      Module,
      request
        .replace(/^@soroush\.design\/styled-system\/?(.*)$/, (_, path) =>
          join(styledSystemDist, `${path || 'index'}.cjs`)
        )
        .replace(/^@soroush\.design\/core\/(.*)$/, (_, path) => join(coreDist, `${path}.cjs`))
        .replace(/^@soroush\.design\/react-hooks\/(.*)$/, (_, path) =>
          join(hooksDist, `${path}.cjs`)
        ),
      ...rest
    )
})

afterAll(() => {
  Module._resolveFilename = resolveFilename
})

describe('the CommonJS build', () => {
  it.each(published)(
    '%s loads and exports what its ES module does',
    async (_subpath, files) => {
      const cjs = require(join(root, files.require.default))
      const esm = await import(
        /* @vite-ignore */ pathToFileURL(join(root, files.import.default)).href
      )
      expect(Object.keys(cjs).sort()).toEqual(Object.keys(esm).sort())
    },
    60_000
  )

  it('renders a styled Button on the server', () => {
    const { createElement } = require('react')
    const { renderToString } = require('react-dom/server')
    const { ThemeProvider } = require(join(root, 'dist/ThemeProvider.cjs'))
    const { Button } = require(join(root, 'dist/Button.cjs'))
    const html: string = renderToString(
      createElement(ThemeProvider, null, createElement(Button, null, 'Save'))
    )
    expect(html).toMatch(/<button[^>]* class="[^"]*soroush-/)
    expect(html).toContain('<style')
  })
})
