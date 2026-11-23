import { createRequire } from 'node:module'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import manifest from '../package.json'

const root = process.cwd()
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
