import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import checksums from '../../vendor/a2ui/v1_0/checksums.json'

const VENDOR = fileURLToPath(new URL('../../vendor/a2ui/v1_0/', import.meta.url))

describe('the vendored A2UI files', () => {
  it.each(Object.entries(checksums))('%s is byte-for-byte what was copied', (file, expected) => {
    // An edit here would quietly stop this package validating A2UI v1.0 (vendor/.../SOURCE.md).
    const actual = createHash('sha256')
      .update(readFileSync(`${VENDOR}${file}`))
      .digest('hex')

    expect(actual).toBe(expected)
  })

  it('carries the license they are distributed under', () => {
    expect(readFileSync(`${VENDOR}LICENSE`, 'utf8')).toContain('Apache License')
  })
})
