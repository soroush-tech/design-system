import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../ThemeProvider'
import { createTheme, baseTheme } from '../themes'
import { useDefaultProps } from './useDefaultProps'

describe('useDefaultProps', () => {
  it('returns an empty object when the theme has no components config', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    )
    const { result } = renderHook(() => useDefaultProps('Widget'), { wrapper })
    expect(result.current).toEqual({})
  })

  it('returns an empty object when the component entry has no defaultProps', () => {
    const theme = createTheme(baseTheme, { components: { Widget: { styleOverrides: {} } } })
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
    const { result } = renderHook(() => useDefaultProps('Widget'), { wrapper })
    expect(result.current).toEqual({})
  })

  it('returns the theme-contributed default props', () => {
    const theme = createTheme(baseTheme, {
      components: { Widget: { defaultProps: { size: 'sm', shape: 'rounded' } } },
    })
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
    const { result } = renderHook(() => useDefaultProps('Widget'), { wrapper })
    expect(result.current).toEqual({ size: 'sm', shape: 'rounded' })
  })
})
