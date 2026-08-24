import { describe, it, expect } from 'vitest'
import lzString from 'lz-string'
import { createSandboxParameters } from './createSandboxParameters'

describe('createSandboxParameters', () => {
  it('round-trips the file map through URL-safe base64 LZ compression', () => {
    const files = { 'src/Demo.tsx': { content: 'export default () => null' } }
    const parameters = createSandboxParameters(files)
    expect(parameters).not.toMatch(/[+/=]/)
    const restored = lzString.decompressFromBase64(
      parameters.replaceAll('-', '+').replaceAll('_', '/')
    )
    expect(JSON.parse(restored)).toEqual({ files })
  })
})
