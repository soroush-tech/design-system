import { describe, it, expect } from 'vitest'
import { act, render, renderHook, screen } from '@testing-library/react'
import { useMemo, type ReactNode } from 'react'
import { StyleSheet, css, useStyle, useStyleValue } from './styled'
import { Paper } from '../Paper'
import { ThemeProvider } from '../theme/ThemeProvider'
import { baseTheme } from '../theme/themes'
import { getStyleRulesFor } from '../utils/test/getStyleRulesFor'

const sheet = StyleSheet.create((theme) => ({
  tinted: { color: theme.text.primary },
  plain: { opacity: 0.5 },
}))
const objectSheet = StyleSheet.create({ box: { opacity: 0.25 } })

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>
)

describe('useStyle', () => {
  it('resolves a sheet of the theme into one entry per name', () => {
    const { result } = renderHook(() => useStyle(sheet), { wrapper })
    expect(Object.keys(result.current)).toEqual(['tinted', 'plain'])
    expect(result.current.tinted.className).toMatch(/\S/)
  })

  it('gives an object sheet back as it is', () => {
    const { result } = renderHook(() => useStyle(objectSheet), { wrapper })
    expect(result.current.box).toBe(objectSheet.box)
  })

  it('gives entries that go in the style prop of a component, over its own styles', () => {
    function Probe() {
      const styles = useStyle(sheet)
      return (
        <Paper data-testid="probe" style={[styles.tinted, false, styles.plain]}>
          x
        </Paper>
      )
    }
    render(<Probe />, { wrapper })
    const probe = screen.getByTestId('probe')
    expect(getStyleRulesFor(probe).some((rule) => rule.style.opacity === '0.5')).toBe(true)
  })
})

describe('a live value in the style prop', () => {
  it('goes through css(): one entry, one class, however often the value changes', () => {
    let setLeft: (next: number) => void = () => {}
    function Thumb() {
      const [left, set] = useStyleValue(10, '%')
      setLeft = set
      const style = useMemo(() => css({ left: `${left}` }), [left])
      return (
        <Paper data-testid="thumb" style={style}>
          x
        </Paper>
      )
    }
    render(<Thumb />, { wrapper })
    const thumb = screen.getByTestId('thumb')
    const className = thumb.className
    const leftRules = () => getStyleRulesFor(thumb).filter((rule) => rule.style.left.includes('--'))
    expect(leftRules().length).toBeGreaterThan(0)
    act(() => setLeft(50))
    expect(thumb.className).toBe(className)
    expect(thumb).not.toHaveAttribute('style')
  })
})
