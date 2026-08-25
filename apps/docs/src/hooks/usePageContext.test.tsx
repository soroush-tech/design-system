import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import type { PageContext as VikePageContext } from 'vike/types'
import { PageContext } from 'src/common/PageContext'
import { usePageContext } from './usePageContext'

describe('usePageContext', () => {
  it('returns the provided page context', () => {
    const pageContext = { urlPathname: '/design-system/' } as VikePageContext
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
    )
    const { result } = renderHook(() => usePageContext(), { wrapper })
    expect(result.current.urlPathname).toBe('/design-system/')
  })

  it('throws outside the provider', () => {
    expect(() => renderHook(() => usePageContext())).toThrow(
      'usePageContext must be used within PageContext.Provider'
    )
  })
})
