// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import main from '@soroush.design/cli'

vi.mock('@soroush.design/cli', async (importOriginal) => ({
  ...(await importOriginal<object>()),
  default: vi.fn(async () => 3),
}))

describe('bin', () => {
  afterEach(() => {
    process.exitCode = undefined
  })

  it('runs the command line of @soroush.design/cli for this package, and exits with its code', async () => {
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
