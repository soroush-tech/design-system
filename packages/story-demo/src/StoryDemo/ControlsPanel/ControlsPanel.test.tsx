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
})
