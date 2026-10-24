import type { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider, createTheme, baseTheme } from '@soroush.tech/design-system/theme'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import type { ControlModel } from '../../utils/controlsFor'
import { ControlsPanel } from './ControlsPanel'

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const renderWithTheme = (ui: ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

const controls: ControlModel[] = [
  { kind: 'boolean', name: 'disabled' },
  { kind: 'select', name: 'size', options: ['sm', 'md'] },
]

describe('ControlsPanel', () => {
  it('renders one control per model and threads changes through', () => {
    const onChange = vi.fn()
    renderWithTheme(
      <ControlsPanel controls={controls} values={{ size: 'md' }} onChange={onChange} />
    )
    expect(screen.getByRole('combobox', { name: 'size' })).toHaveValue('md')
    fireEvent.click(screen.getByRole('switch', { name: 'disabled' }))
    expect(onChange).toHaveBeenCalledWith('disabled', true)
  })

  it('names each control above it, a switch included', () => {
    renderWithTheme(<ControlsPanel controls={controls} values={{}} onChange={vi.fn()} />)
    expect(screen.getByText('disabled')).toBeInTheDocument()
    expect(screen.getByText('size')).toBeInTheDocument()
  })

  it('has no heading when no control names a category', () => {
    const { container } = renderWithTheme(
      <ControlsPanel controls={controls} values={{}} onChange={vi.fn()} />
    )
    expect(container.querySelectorAll('section')).toHaveLength(1)
  })

  it('groups the controls under their categories, in the order they are first met', () => {
    const grouped: ControlModel[] = [
      { kind: 'boolean', name: 'disabled', category: 'Behavior' },
      { kind: 'select', name: 'size', options: ['sm'], category: 'Visual' },
      { kind: 'boolean', name: 'loading', category: 'Behavior' },
    ]
    const { container } = renderWithTheme(
      <ControlsPanel controls={grouped} values={{}} onChange={vi.fn()} />
    )
    const sections = Array.from(container.querySelectorAll('section'))
    expect(sections.map((section) => section.firstElementChild?.textContent)).toEqual([
      'Behavior',
      'Visual',
    ])
    expect(sections[0].querySelectorAll('[role="switch"]')).toHaveLength(2)
    expect(sections[1].querySelector('select')).toBeInTheDocument()
  })

  it('gives a row of four options or more two columns, and a shorter one the usual one', () => {
    const rows: ControlModel[] = [
      { kind: 'inline-radio', name: 'shape', options: ['a', 'b', 'c', 'd'] },
      { kind: 'inline-radio', name: 'size', options: ['a', 'b', 'c'] },
    ]
    renderWithTheme(<ControlsPanel controls={rows} values={{}} onChange={vi.fn()} />)
    const cellOf = (name: string) =>
      screen.getByRole('radiogroup', { name }).parentElement!.parentElement!
    expect(cellOf('shape')).toHaveStyle({ gridColumn: 'span 2' })
    expect(cellOf('size').style.gridColumn).toBe('')
  })
})
