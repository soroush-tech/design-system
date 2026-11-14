// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import designSystem from '../../design-system/package.json'
import cli from '../package.json'
import { getDesignSystemVersion } from './designSystemVersion'
import { main } from './main'

vi.mock('./main', () => ({ main: vi.fn(async () => 3) }))

describe('bin', () => {
  afterEach(() => {
    process.exitCode = undefined
  })

  it("runs the command line for the workspace's design system, and exits with its code", async () => {
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
      {
        name: '@soroush.tech/design-system',
        version: getDesignSystemVersion(designSystem.version, cli.version),
        peerDependencies: designSystem.peerDependencies,
      }
    )
    expect(process.exitCode).toBe(3)
  })
})
