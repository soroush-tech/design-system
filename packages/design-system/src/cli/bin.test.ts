// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import { main } from './main'

vi.mock('./main', () => ({ main: vi.fn(async () => 3) }))

describe('bin', () => {
  afterEach(() => {
    process.exitCode = undefined
  })

  it('runs the command line on the arguments after the script, and exits with its code', async () => {
    const argv = process.argv
    process.argv = ['node', 'bin.mjs', 'init', '--yes']
    try {
      await import('./bin')
    } finally {
      process.argv = argv
    }
    expect(main).toHaveBeenCalledWith(
      ['init', '--yes'],
      expect.objectContaining({ cwd: process.cwd() }),
      expect.objectContaining({ name: '@soroush.tech/design-system' })
    )
    expect(process.exitCode).toBe(3)
  })
})
