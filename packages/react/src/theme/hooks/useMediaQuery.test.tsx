import { renderHook } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

const stubMatchMedia = (matches: boolean) =>
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }))
  )

afterEach(() => vi.unstubAllGlobals())

describe('useMediaQuery', () => {
  it('answers with what the browser says for the query', () => {
    stubMatchMedia(true)
    expect(renderHook(() => useMediaQuery('(min-width: 600px)')).result.current).toBe(true)
    stubMatchMedia(false)
    expect(renderHook(() => useMediaQuery('(min-width: 600px)')).result.current).toBe(false)
  })

  it('answers false on the server, or what defaultMatches says', () => {
    const Probe = ({ defaultMatches }: { defaultMatches?: boolean }) => (
      <i>{String(useMediaQuery('(min-width: 600px)', { defaultMatches }))}</i>
    )
    expect(renderToString(<Probe />)).toContain('false')
    expect(renderToString(<Probe defaultMatches />)).toContain('true')
  })
})
