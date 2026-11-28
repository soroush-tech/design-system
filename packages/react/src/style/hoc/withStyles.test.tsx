import { Component, type ReactNode } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Paper } from '../../Paper'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme, type Theme } from '../../theme/themes'
import { getStyleRulesFor } from '../../utils/test/getStyleRulesFor'
import type { StyleOverride } from '../overrides'
import { StyleSheet } from '../styled'
import { withStyles } from './withStyles'

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>
)

const factory = { getStyles: (theme: Theme) => ({ opacity: 0.5, color: theme.text.primary }) }
const object = { opacity: 0.25 }

function FunctionBase({ styles }: { styles: StyleOverride }) {
  return <Paper data-testid="out" style={styles} />
}

class ClassBase extends Component<{ styles: StyleOverride }> {
  render() {
    return <Paper data-testid="out" style={this.props.styles} />
  }
}

describe('withStyles', () => {
  it.each([
    ['a function component', FunctionBase],
    ['a class component', ClassBase],
  ])('hands %s the entry of a { getStyles } resolved with the theme', (_name, Base) => {
    const Enhanced = withStyles<object>(factory)(Base)
    render(<Enhanced />, { wrapper })
    const out = screen.getByTestId('out')
    expect(getComputedStyle(out).opacity).toBe('0.5')
    expect(getStyleRulesFor(out).map((rule) => rule.style.color)).toContain(
      'var(--soroush-text-primary)'
    )
  })

  it.each([
    ['a function component', FunctionBase],
    ['a class component', ClassBase],
  ])('hands %s the entry of an object', (_name, Base) => {
    const Enhanced = withStyles<object>(object)(Base)
    render(<Enhanced />, { wrapper })
    expect(getComputedStyle(screen.getByTestId('out')).opacity).toBe('0.25')
  })

  it('passes the other props through', () => {
    const Enhanced = withStyles<{ label: string }>(object)(
      ({ label, styles }: { label: string; styles: StyleOverride }) => (
        <Paper data-testid="out" style={styles}>
          {label}
        </Paper>
      )
    )
    render(<Enhanced label="hi" />, { wrapper })
    expect(screen.getByTestId('out').textContent).toBe('hi')
  })

  it('makes the sheet once, not on each render', () => {
    const create = vi.spyOn(StyleSheet, 'create')
    const Enhanced = withStyles<{ n: number }>(factory)(FunctionBase)
    expect(create).toHaveBeenCalledTimes(1)
    const { rerender } = render(<Enhanced n={1} />, { wrapper })
    rerender(<Enhanced n={2} />)
    expect(create).toHaveBeenCalledTimes(1)
    create.mockRestore()
  })
})
