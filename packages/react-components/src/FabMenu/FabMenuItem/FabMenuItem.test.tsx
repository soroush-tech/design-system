import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { baseTheme } from '../../theme/themes'
import { FabMenu } from '../FabMenu'
import { FabMenuItem } from './FabMenuItem'

describe('FabMenuItem', () => {
  const inMenu = (item: React.ReactNode) =>
    renderWithTheme(
      <FabMenu aria-label="Create" defaultOpen>
        {item}
      </FabMenu>
    )

  it('is a button named by its label, with its icon before it', () => {
    inMenu(<FabMenuItem icon={<i data-testid="icon" />}>Document</FabMenuItem>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Document')).toBeInTheDocument()
  })

  it('takes any fab prop but its shape, passing the rest to its button', () => {
    inMenu(
      <FabMenuItem data-testid="item" title="Hint" m={2}>
        Document
      </FabMenuItem>
    )
    expect(screen.getByTestId('item')).toHaveAttribute('title', 'Hint')
    expect(screen.getByTestId('item')).toHaveStyle({ margin: baseTheme.space[2] })
  })

  it('runs its own onClick before the menu closes', () => {
    const calls: string[] = []
    renderWithTheme(
      <FabMenu aria-label="Create" defaultOpen onClose={() => calls.push('close')}>
        <FabMenuItem onClick={() => calls.push('click')}>Document</FabMenuItem>
      </FabMenu>
    )
    fireEvent.click(screen.getByText('Document'))
    expect(calls).toEqual(['click', 'close'])
  })

  it('needs a menu around it', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(() => render(<FabMenuItem>Lost</FabMenuItem>)).toThrow(
      'A FabMenuItem must be inside a FabMenu.'
    )
    error.mockRestore()
  })
})
