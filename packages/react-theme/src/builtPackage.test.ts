// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import manifest from '../package.json'

const root = process.cwd()
const dist = join(root, 'dist')
const require = createRequire(join(dist, 'x.cjs'))
const published = Object.entries(manifest.publishConfig.exports) as [
  string,
  { import: { default: string }; require: { default: string } },
][]

// The workspace serves @soroush.design/core as source; the built package requires its build.
const Module = require('node:module')
const resolveFilename = Module._resolveFilename
const coreDist = join(root, '..', 'core', 'dist')

beforeAll(() => {
  Module._resolveFilename = (request: string, ...rest: unknown[]) =>
    resolveFilename.call(
      Module,
      request.replace(/^@soroush\.design\/core\/(.*)$/, (_, path) => join(coreDist, `${path}.cjs`)),
      ...rest
    )
})

afterAll(() => {
  Module._resolveFilename = resolveFilename
})

const read = (extension: string) =>
  readdirSync(dist)
    .filter((file) => file.endsWith(extension))
    .map((file) => ({ file, source: readFileSync(join(dist, file), 'utf8') }))

describe('the built package', () => {
  it.each(published)(
    '%s loads, and its CommonJS build exports what its ES module does',
    async (_subpath, files) => {
      const cjs = require(join(root, files.require.default))
      const esm = await import(
        /* @vite-ignore */ pathToFileURL(join(root, files.import.default)).href
      )
      expect(Object.keys(cjs).sort()).toEqual(Object.keys(esm).sort())
    }
  )

  it('renders a styled element on the server in both formats, with the soroush prefix', async () => {
    const { createElement } = require('react')
    const { renderToString } = require('react-dom/server')
    const esm = await import(/* @vite-ignore */ pathToFileURL(join(dist, 'index.mjs')).href)
    const outputs = [require(join(dist, 'index.cjs')), esm].map(
      ({ ThemeProvider, styled, createTheme, baseTheme }) => {
        const Badge = styled('span')(({ theme }: { theme: typeof baseTheme }) => ({
          color: theme.palette.primary.main,
        }))
        const theme = createTheme(baseTheme, { palette: { primary: { main: '#0a7a5a' } } })
        return renderToString(
          createElement(ThemeProvider, { theme }, createElement(Badge, null, 'hi'))
        )
      }
    )
    expect(outputs[0]).toMatch(/<span class="soroush-[a-z0-9]+">hi<\/span>/)
    expect(outputs[0]).toContain('#0a7a5a')
    expect(outputs[1]).toBe(outputs[0])
  })

  it.each([
    ['.mjs', (entry: string) => `from "@soroush.design/core/${entry}"`],
    ['.cjs', (entry: string) => `require("@soroush.design/core/${entry}")`],
  ])(
    'imports the core by the package name in %s files and holds no copy of it',
    (extension, specifier) => {
      const all = read(extension)
      expect(all.some(({ source }) => source.includes(specifier('theme')))).toBe(true)
      for (const { file, source } of all) {
        expect(source, `${file} defines createTheme`).not.toMatch(
          /function createTheme\b|const createTheme =/
        )
        expect(source, `${file} defines deepMerge`).not.toMatch(
          /function deepMerge\b|const deepMerge =/
        )
      }
    }
  )

  it('holds one engine configuration, shared by the entry points', () => {
    const configurations = read('.mjs').filter(({ source }) => source.includes('hasValueRepair'))
    expect(configurations).toHaveLength(1)
  })
})
