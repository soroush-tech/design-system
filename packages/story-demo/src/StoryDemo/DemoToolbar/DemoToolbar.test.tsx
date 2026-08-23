import type { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider, createTheme, baseTheme } from '@soroush.tech/design-system/theme'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import { DemoToolbar, type DemoToolbarProps } from './DemoToolbar'

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const renderWithTheme = (ui: ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

const baseProps: DemoToolbarProps = {
  language: 'ts',
  onLanguageChange: vi.fn(),
  copied: false,
  onCopy: vi.fn(),
  onOpenSandbox: vi.fn(),
  onReset: vi.fn(),
  isExpanded: false,
  onToggleExpanded: vi.fn(),
  hasControls: true,
  isControlsOpen: false,
  onToggleControls: vi.fn(),
}

describe('DemoToolbar', () => {
  it('wires up every action', () => {
    const props = {
      ...baseProps,
      onLanguageChange: vi.fn(),
      onCopy: vi.fn(),
      onOpenSandbox: vi.fn(),
      onReset: vi.fn(),
      onToggleExpanded: vi.fn(),
      onToggleControls: vi.fn(),
    }
    renderWithTheme(<DemoToolbar {...props} />)
    const controls = screen.getByRole('button', { name: 'Controls' })
    expect(controls).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(controls)
    expect(props.onToggleControls).toHaveBeenCalled()
    const expand = screen.getByRole('button', { name: 'Expand code' })
    expect(expand).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(expand)
    expect(props.onToggleExpanded).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'JS' }))
    expect(props.onLanguageChange).toHaveBeenCalledWith('js')
    // Clicking the already-selected language fires the group's deselect (null) - guarded.
    fireEvent.click(screen.getByRole('button', { name: 'TS' }))
    expect(props.onLanguageChange).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByRole('button', { name: 'Edit in CodeSandbox' }))
    expect(props.onOpenSandbox).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Copy the source' }))
    expect(props.onCopy).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Reset demo' }))
    expect(props.onReset).toHaveBeenCalled()
  })

  it('reflects the js, copied, expanded, and open-controls states', () => {
    const onLanguageChange = vi.fn()
    renderWithTheme(
      <DemoToolbar
        {...baseProps}
        language="js"
        onLanguageChange={onLanguageChange}
        copied
        isExpanded
        isControlsOpen
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'TS' }))
    expect(onLanguageChange).toHaveBeenCalledWith('ts')
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Collapse code' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Controls' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('hides the controls toggle for stories without controls', () => {
    renderWithTheme(<DemoToolbar {...baseProps} hasControls={false} />)
    expect(screen.queryByRole('button', { name: 'Controls' })).not.toBeInTheDocument()
  })
})
