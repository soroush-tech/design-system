import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { Autocomplete } from '../Autocomplete'
import { NativeSelect } from '../NativeSelect'
import { NumberInput } from '../NumberInput'
import { Select } from '../Select'
import { TextInput } from '../TextInput'
import { MenuItem } from '../MenuItem'

// The inputs share one least width, from the theme, and an instance's own minWidth wins.

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const inputs = (props: { minWidth?: string } = {}) => (
  <>
    <TextInput data-testid="text" aria-label="t" {...props} />
    <NativeSelect data-testid="native" options={[{ value: 'a', label: 'A' }]} {...props} />
    <Select data-testid="select" aria-label="s" {...props}>
      <MenuItem value="a">A</MenuItem>
    </Select>
    <NumberInput data-testid="number" aria-label="n" {...props} />
    <Autocomplete data-testid="auto" options={['a']} aria-label="a" {...props} />
  </>
)
const ids = ['text', 'native', 'select', 'number', 'auto']

describe('input least width', () => {
  it('is 12rem on every input by default', () => {
    render(inputs(), { wrapper: withTheme(baseTheme) })
    for (const id of ids) expect(screen.getByTestId(id)).toHaveStyle({ minWidth: '12rem' })
  })

  it('is what the theme sets', () => {
    const theme = createTheme(baseTheme, { defaults: { inputMinWidth: '9rem' } })
    render(inputs(), { wrapper: withTheme(theme) })
    for (const id of ids) expect(screen.getByTestId(id)).toHaveStyle({ minWidth: '9rem' })
  })

  it('is overridden by a minWidth of the instance', () => {
    render(inputs({ minWidth: '5rem' }), { wrapper: withTheme(baseTheme) })
    for (const id of ids) expect(screen.getByTestId(id)).toHaveStyle({ minWidth: '5rem' })
  })
})
