import { describe, it, expect } from 'vitest'
import { inferDependencies } from './inferDependencies'

describe('inferDependencies', () => {
  it('resolves scoped and unscoped subpath imports to their package roots', () => {
    const source = [
      "import { Button } from '@gild-ui/react/Button'",
      "import { css } from '@umber-style/css'",
      "import lzString from 'lz-string/libs/lz-string'",
      "import Demo from './Demo'",
    ].join('\n')
    expect(inferDependencies(source, { '@gild-ui/react': '^1.2.3' })).toEqual({
      '@gild-ui/react': '^1.2.3',
      '@umber-style/css': 'latest',
      'lz-string': 'latest',
    })
  })
})
