import { describe, it, expect, vi } from 'vitest'

vi.mock('vike-react/config', () => ({ default: {} }))

import { config } from './+config'

describe('config', () => {
  it('has prerender enabled when SKIP_PRERENDER is unset', async () => {
    vi.stubEnv('SKIP_PRERENDER', '')
    vi.resetModules()
    const { config: freshConfig } = await import('./+config')
    expect(freshConfig.prerender).toBe(true)
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('has prerender disabled when SKIP_PRERENDER=true', async () => {
    vi.stubEnv('SKIP_PRERENDER', 'true')
    vi.resetModules()
    const { config: freshConfig } = await import('./+config')
    expect(freshConfig.prerender).toBe(false)
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('has clientRouting enabled', () => {
    expect(config.clientRouting).toBe(true)
  })

  it('has hydrationCanBeAborted enabled', () => {
    expect(config.hydrationCanBeAborted).toBe(true)
  })

  it('defines title, description, and robots meta with server and client env', () => {
    expect(config.meta?.title?.env).toEqual({ server: true, client: true })
    expect(config.meta?.description?.env).toEqual({ server: true, client: true })
    expect(config.meta?.robots?.env).toEqual({ server: true, client: true })
  })
})
