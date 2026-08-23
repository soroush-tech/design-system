import type { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider, createTheme, baseTheme } from '@soroush.tech/design-system/theme'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import type { ControlModel } from '../../utils/controlsFor'
import { ArgControl } from './ArgControl'

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const renderWithTheme = (ui: ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('ArgControl', () => {
  it('renders a switch for boolean controls', () => {
    const onChange = vi.fn()
    const control: ControlModel = { kind: 'boolean', name: 'disabled' }
    renderWithTheme(<ArgControl control={control} value={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch', { name: 'disabled' }))
    expect(onChange).toHaveBeenCalledWith('disabled', true)
  })

  it('renders a native select showing the documented default while unset', () => {
    const onChange = vi.fn()
    const control: ControlModel = {
      kind: 'select',
      name: 'size',
      description: 'Density token.',
      defaultValue: 'lg',
      options: ['sm', 'md'],
    }
    renderWithTheme(<ArgControl control={control} value={undefined} onChange={onChange} />)
    // The placeholder is the argType's table.defaultValue.summary, not "unset".
    const select = screen.getByRole('combobox', { name: 'size' })
    expect(select.querySelector('option')!.textContent).toBe('lg')
    fireEvent.change(select, { target: { value: 'md' } })
    expect(onChange).toHaveBeenCalledWith('size', 'md')
  })

  it('falls back to an unset placeholder without a documented default', () => {
    const control: ControlModel = { kind: 'select', name: 'tone', options: ['calm'] }
    renderWithTheme(<ArgControl control={control} value={undefined} onChange={vi.fn()} />)
    const select = screen.getByRole('combobox', { name: 'tone' })
    expect(select.querySelector('option')!.textContent).toBe('unset')
  })

  it('renders toggle buttons for inline-radio controls', () => {
    const onChange = vi.fn()
    const control: ControlModel = {
      kind: 'inline-radio',
      name: 'variant',
      options: ['contained', 'outlined'],
    }
    renderWithTheme(<ArgControl control={control} value="contained" onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'contained' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    fireEvent.click(screen.getByRole('button', { name: 'outlined' }))
    expect(onChange).toHaveBeenCalledWith('variant', 'outlined')
  })

  it('renders a range input with its bounds', () => {
    const onChange = vi.fn()
    const control: ControlModel = { kind: 'range', name: 'm', min: 0, max: 10, step: 1 }
    renderWithTheme(<ArgControl control={control} value={2} onChange={onChange} />)
    const slider = screen.getByRole('slider', { name: 'm' })
    fireEvent.change(slider, { target: { value: '4' } })
    expect(onChange).toHaveBeenCalledWith('m', 4)
  })

  it('falls back to min or zero when a range has no numeric value', () => {
    const onChange = vi.fn()
    renderWithTheme(
      <ArgControl
        control={{ kind: 'range', name: 'p', min: 1 }}
        value={undefined}
        onChange={onChange}
      />
    )
    expect(screen.getByRole('slider', { name: 'p' })).toHaveValue('1')
    renderWithTheme(
      <ArgControl control={{ kind: 'range', name: 'q' }} value={undefined} onChange={onChange} />
    )
    expect(screen.getByRole('slider', { name: 'q' })).toHaveValue('0')
  })

  it('renders a text input for text controls, defaulting its placeholder', () => {
    const onChange = vi.fn()
    const control: ControlModel = { kind: 'text', name: 'children', defaultValue: 'Action' }
    renderWithTheme(<ArgControl control={control} value="Hello" onChange={onChange} />)
    const input = screen.getByRole('textbox', { name: 'children' })
    expect(input).toHaveValue('Hello')
    expect(input).toHaveAttribute('placeholder', 'Action')
    fireEvent.change(input, { target: { value: 'Bye' } })
    expect(onChange).toHaveBeenCalledWith('children', 'Bye')
  })

  it('renders a number input that parses values and clears to undefined', () => {
    const onChange = vi.fn()
    const control: ControlModel = { kind: 'number', name: 'gap', min: 0 }
    const { unmount } = renderWithTheme(
      <ArgControl control={control} value={undefined} onChange={onChange} />
    )
    fireEvent.change(screen.getByRole('spinbutton', { name: 'gap' }), { target: { value: '3' } })
    expect(onChange).toHaveBeenCalledWith('gap', 3)
    unmount()
    renderWithTheme(<ArgControl control={control} value={3} onChange={onChange} />)
    fireEvent.change(screen.getByRole('spinbutton', { name: 'gap' }), { target: { value: '' } })
    expect(onChange).toHaveBeenCalledWith('gap', undefined)
  })
})
