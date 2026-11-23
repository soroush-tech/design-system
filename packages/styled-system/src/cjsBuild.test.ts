import { readFileSync, readdirSync } from 'node:fs'
import { createRequire, registerHooks } from 'node:module'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import manifest from '../package.json'

const root = process.cwd()

// In the workspace the core is TypeScript source; a consumer has its built files. Resolve the core
// to them, as an install would.
registerHooks({
  resolve(specifier, context, nextResolve) {
    const entry = /^@soroush\.design\/core\/(.+)$/.exec(specifier)?.[1]
    if (!entry) return nextResolve(specifier, context)
    const isRequire = context.conditions.includes('require')
    const built = join(root, '..', 'core', 'dist', `${entry}.${isRequire ? 'cjs' : 'mjs'}`)
    return {
      url: pathToFileURL(built).href,
      format: isRequire ? 'commonjs' : 'module',
      shortCircuit: true,
    }
  },
})
const require = createRequire(join(root, 'dist', 'x.cjs'))
const published = Object.entries(manifest.publishConfig.exports) as [
  string,
  { import: { default: string }; require: { default: string } },
][]

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

  it('filters props with the check of the engine', () => {
    const { createShouldForwardProp } = require(join(root, 'dist/should-forward-prop.cjs'))
    const shouldForwardProp = createShouldForwardProp(['color'])
    expect([shouldForwardProp('id'), shouldForwardProp('color'), shouldForwardProp('as')]).toEqual([
      true,
      false,
      false,
    ])
  })
})

describe('the dependency on the core', () => {
  const built = readdirSync(join(root, 'dist'))
    .filter((file) => /\.(mjs|cjs)$/.test(file))
    .map((file) => readFileSync(join(root, 'dist', file), 'utf8'))
  const specifiers = built.flatMap((source) =>
    [...source.matchAll(/(?:from|require\()\s*["']([^"']+)["']/g)].map((match) => match[1])
  )

  it('imports the core breakpoint helpers, and nothing else of the core', () => {
    expect(new Set(specifiers.filter((name) => name.startsWith('@soroush.design/core')))).toEqual(
      new Set(['@soroush.design/core/breakpoints'])
    )
  })

  it('does not bundle the helpers it imports', () => {
    expect(built.filter((source) => source.includes('Unknown breakpoint'))).toEqual([])
  })

  it('declares the core as a dependency, not a peer', () => {
    expect(manifest.dependencies['@soroush.design/core']).toBe('workspace:^')
    expect(manifest).not.toHaveProperty('peerDependencies.@soroush.design/core')
  })
})
