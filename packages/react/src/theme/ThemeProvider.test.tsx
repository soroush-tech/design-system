import { renderHook } from '@testing-library/react'
import { useTheme } from './hooks/useTheme'
import { afterEach, describe, it, expect, vi } from 'vitest'
import type { ReactNode } from 'react'
import { createTheme } from '@soroush.design/core/theme'
import { baseTheme } from './themes'
import { ThemeProvider } from './ThemeProvider'

// A second theme with a distinct name - proves the theme prop replaces the default.
const light = createTheme(baseTheme, { name: 'light' })

const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>

describe('ThemeProvider', () => {
  it('provides the built-in base theme by default', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toMatchObject({ name: baseTheme.name })
  })

  it('provides the theme passed via the theme prop', () => {
    const lightWrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={light}>{children}</ThemeProvider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper: lightWrapper })
    expect(result.current).toMatchObject({ name: light.name })
  })

  it('accepts a theme extended from the defaults via createTheme', () => {
    const brand = createTheme(baseTheme, { palette: { primary: { main: '#123456' } } })
    const brandWrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={brand}>{children}</ThemeProvider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper: brandWrapper })
    expect(result.current.palette.primary.main).toBe('#123456')
    expect(result.current.palette.primary.contrastText).toBe(baseTheme.palette.primary.contrastText)
  })

  it('gives a hand-built theme the breakpoint helpers', () => {
    const handBuilt = { ...baseTheme, breakpoints: { ...baseTheme.breakpoints, sm: '500px' } }
    const handWrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={handBuilt as typeof baseTheme}>{children}</ThemeProvider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper: handWrapper })
    expect(result.current.breakpoints.up('sm')).toBe('@media (width >= 500px)')
  })

  describe('defaults prop', () => {
    it('merges component default keys into the provided theme', () => {
      const defaultsWrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider defaults={{ size: 'lg', switchVariant: 'inside' }}>{children}</ThemeProvider>
      )
      const { result } = renderHook(() => useTheme(), { wrapper: defaultsWrapper })
      expect(result.current.defaults).toEqual({ size: 'lg', switchVariant: 'inside' })
      expect(result.current.name).toBe(baseTheme.name)
    })

    it('leaves the theme untouched when omitted', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.defaults).toBeUndefined()
      expect(result.current).toEqual(baseTheme)
    })
  })
})

describe('ThemeProvider, the theme the engine gets', () => {
  const themeOf = (props: { theme?: Theme; defaults?: { size: 'lg' | 'sm' } }) =>
    renderHook(() => useTheme(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <ThemeProvider {...props}>{children}</ThemeProvider>
      ),
    }).result.current

  it('is the same object for the same theme, render after render', () => {
    expect(themeOf({ theme: light })).toBe(themeOf({ theme: light }))
    expect(themeOf({})).toBe(themeOf({}))
  })

  it('is another object for another theme, and the given theme is never changed', () => {
    expect(themeOf({ theme: light })).not.toBe(themeOf({ theme: baseTheme }))
    expect(light.defaults).toBeUndefined()
  })

  it('is the same object for the same theme and the same defaults contents, an inline literal too', () => {
    expect(themeOf({ theme: light, defaults: { size: 'lg' } })).toBe(
      themeOf({ theme: light, defaults: { size: 'lg' } })
    )
    expect(themeOf({ theme: light, defaults: { size: 'lg' } })).not.toBe(themeOf({ theme: light }))
    expect(themeOf({ theme: light, defaults: { size: 'lg' } })).not.toBe(
      themeOf({ theme: baseTheme, defaults: { size: 'lg' } })
    )
    expect(themeOf({ theme: light, defaults: { size: 'lg' } })).not.toBe(
      themeOf({ theme: light, defaults: { size: 'sm' } })
    )
  })
})

describe('ThemeProvider in development', () => {
  const themeWith = (components: object) => ({ ...baseTheme, components }) as Theme
  const mount = (theme: Theme) =>
    renderHook(() => useTheme(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    })

  afterEach(() => vi.restoreAllMocks())

  it('warns once for each distinct problem in the components, naming the path', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const components = {
      Tabs: { styleOverrides: { indicater: {} }, defaultProps: { colour: 'primary' } },
      Buton: {},
    }
    mount(themeWith(components))
    mount(themeWith({ ...components }))
    const messages = warn.mock.calls.map(([message]) => message)
    expect(messages).toHaveLength(3)
    expect(messages).toContain(
      'components.Tabs.styleOverrides.indicater is not a slot of Tabs (root, list, indicator, startContent, endContent, scrollButton, overflowButton, overflowClose)'
    )
    expect(
      messages.some((message) => message.startsWith('components.Tabs.defaultProps.colour'))
    ).toBe(true)
    expect(
      messages.some((message) => message.startsWith('components.Buton is not a component'))
    ).toBe(true)
  })

  it('checks a components object once, however many renders use it', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const theme = themeWith({ Button: { defaultProps: { shape: 'squarish' } } })
    mount(theme)
    mount(theme)
    expect(warn).toHaveBeenCalledTimes(1)
  })

  it('says nothing for correct components, and for a theme with none', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(themeWith({ Button: { defaultProps: { shape: 'pill' } } }))
    mount(baseTheme)
    expect(warn).not.toHaveBeenCalled()
  })

  it('does not check in production', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.stubEnv('NODE_ENV', 'production')
    mount(themeWith({ Nothing: {} }))
    vi.unstubAllEnvs()
    expect(warn).not.toHaveBeenCalled()
  })
})
