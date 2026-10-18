import { describe, it, expect } from 'vitest'
import type { ReactNode } from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { View } from '../View'
import { useTheme } from './hooks/useTheme'
import { LayoutProvider } from './LayoutProvider'
import { ThemeProvider } from './ThemeProvider'
import { baseTheme, createTheme, type Theme, type ThemeLayout } from './themes'

const light = createTheme(baseTheme, { palette: { primary: { main: '#111111' } } })
const dark = createTheme(baseTheme, { palette: { primary: { main: '#eeeeee' } } })
const page: ThemeLayout = { lg: { content: { maxWidth: '1376px' } } }

const scoped = (theme: Theme, layout: ThemeLayout) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider theme={theme}>
        <LayoutProvider layout={layout}>{children}</LayoutProvider>
      </ThemeProvider>
    )
  }

describe('LayoutProvider', () => {
  it('changes only the layout: every other branch is the surrounding theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: scoped(light, page) })
    expect(result.current.layout.lg?.content?.maxWidth).toBe('1376px')
    for (const key of ['palette', 'text', 'space', 'typography', 'breakpoints'] as const) {
      expect(result.current[key]).toBe(light[key])
    }
    expect(result.current.breakpoints.up('md')).toBe(light.breakpoints.up('md'))
    // The outer theme is not mutated.
    expect(light.layout.lg?.content?.maxWidth).toBe('1200px')
  })

  it('merges per field, keeping the rest of the breakpoint and the other breakpoints', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: scoped(light, page) })
    const { lg, md } = result.current.layout
    expect(lg?.content).toMatchObject({ mode: 'fixed', maxWidth: '1376px' })
    expect(lg?.panels).toEqual(light.layout.lg?.panels)
    expect(md).toEqual(light.layout.md)
  })

  it("holds a page value from its breakpoint up, over the theme's later change", () => {
    const { result } = renderHook(() => useTheme(), { wrapper: scoped(light, page) })
    // The base theme's xl sets maxWidth 1600px; the page's lg value wins there too.
    expect(result.current.layout.xl?.content?.maxWidth).toBe('1376px')
    const restated = { ...page, xl: { content: { maxWidth: '1500px' } } }
    const { result: own } = renderHook(() => useTheme(), { wrapper: scoped(light, restated) })
    expect(own.current.layout.xl?.content?.maxWidth).toBe('1500px')
  })

  it('follows a theme switch around it, keeping the page layout', () => {
    let theme = light
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={theme}>
        <LayoutProvider layout={page}>{children}</LayoutProvider>
      </ThemeProvider>
    )
    const { result, rerender } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current.palette.primary.main).toBe('#111111')
    theme = dark
    rerender()
    expect(result.current.palette.primary.main).toBe('#eeeeee')
    expect(result.current.layout.lg?.content?.maxWidth).toBe('1376px')
  })

  it('stacks: an inner provider builds on the outer one', () => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={light}>
        <LayoutProvider layout={page}>
          <LayoutProvider layout={{ lg: { content: { margin: 6 } } }}>{children}</LayoutProvider>
        </LayoutProvider>
      </ThemeProvider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current.layout.lg?.content).toMatchObject({ maxWidth: '1376px', margin: 6 })
  })

  it('builds on the base theme without a ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <LayoutProvider layout={page}>{children}</LayoutProvider>,
    })
    expect(result.current.palette).toBe(baseTheme.palette)
    expect(result.current.layout.lg?.content?.maxWidth).toBe('1376px')
  })

  it("puts the components inside on the page's frame", () => {
    // jsdom applies no media query, so the base (xs) entry is the one to see.
    render(
      <ThemeProvider theme={light}>
        <LayoutProvider layout={{ xs: { content: { margin: 0 } } }}>
          <View layout>framed</View>
        </LayoutProvider>
      </ThemeProvider>
    )
    expect(screen.getByText('framed')).toHaveStyle({ paddingInline: '0px' })
  })
})
