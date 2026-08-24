import { describe, it, expect } from 'vitest'
import { inferDependencies } from './inferDependencies'

describe('inferDependencies', () => {
  it('resolves scoped and unscoped subpath imports to their package roots', () => {
    const source = [
      "import { Button } from '@soroush.tech/design-system/Button'",
      "import { css } from '@emotion/css'",
      "import lzString from 'lz-string/libs/lz-string'",
      "import Demo from './Demo'",
    ].join('\n')
    expect(inferDependencies(source, { '@soroush.tech/design-system': '^1.2.3' })).toEqual({
      '@soroush.tech/design-system': '^1.2.3',
      '@emotion/css': 'latest',
      'lz-string': 'latest',
    })
  })
})
