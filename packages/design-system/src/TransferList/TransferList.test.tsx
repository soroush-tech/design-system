import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import type { ReactNode } from 'react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { ThemeProvider } from '../theme'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { TransferList, type TransferListProps } from './TransferList'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const items = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry' },
  { value: 'd', label: 'Date', disabled: true },
]

const labels = {
  leftLabel: 'Choices',
  rightLabel: 'Chosen',
  moveAllRightLabel: 'Move all right',
  moveRightLabel: 'Move right',
  moveLeftLabel: 'Move left',
  moveAllLeftLabel: 'Move all left',
}

const list = (props: Partial<TransferListProps> = {}) => (
  <TransferList items={items} {...labels} data-testid="transfer" {...props} />
)

const lists = () => screen.getAllByRole('list')
const rowsOf = (index: number) => within(lists()[index]).queryAllByRole('listitem')
const names = (index: number) =>
  rowsOf(index).map((row) => within(row).getByRole('checkbox').getAttribute('aria-labelledby'))
const labelsOf = (index: number) => rowsOf(index).map((row) => row.textContent)
const box = (name: string) => screen.getByRole('checkbox', { name }) as HTMLInputElement
const button = (name: string) => screen.getByRole('button', { name }) as HTMLButtonElement

describe('TransferList', () => {
  it('draws two named lists of rows, every item on the left at first', () => {
    renderWithTheme(list())
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Choices' })).toBe(lists()[0])
    expect(screen.getByRole('list', { name: 'Chosen' })).toBe(lists()[1])
    expect(labelsOf(0)).toEqual(['Apple', 'Banana', 'Cherry', 'Date'])
    expect(rowsOf(1)).toHaveLength(0)
  })

  it("names each row's checkbox by its label, and every id is one word", () => {
    renderWithTheme(list({ items: [{ value: 'two words', label: 'Two words' }] }))
    const checkbox = box('Two words')
    const labelledby = checkbox.getAttribute('aria-labelledby')!
    expect(labelledby).not.toMatch(/\s/)
    expect(document.getElementById(labelledby)).toHaveTextContent('Two words')
    expect(names(0)).toEqual([labelledby])
  })

  it('leaves a list unnamed when it has no title', () => {
    renderWithTheme(<TransferList items={items} />)
    expect(lists()[0]).not.toHaveAttribute('aria-labelledby')
  })

  it('puts the values given on the right', () => {
    renderWithTheme(list({ defaultValue: ['c', 'a'] }))
    expect(labelsOf(0)).toEqual(['Banana', 'Date'])
    // The items keep their own order on each side.
    expect(labelsOf(1)).toEqual(['Apple', 'Cherry'])
  })

  it('moves the checked items right and left, unchecking what it moves', () => {
    const onChange = vi.fn()
    renderWithTheme(list({ onChange }))
    fireEvent.click(box('Banana'))
    fireEvent.click(box('Apple'))
    fireEvent.click(button('Move right'))
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b'])
    expect(labelsOf(0)).toEqual(['Cherry', 'Date'])
    expect(labelsOf(1)).toEqual(['Apple', 'Banana'])
    expect(box('Apple').checked).toBe(false)
    expect(button('Move right').disabled).toBe(true)

    fireEvent.click(box('Apple'))
    fireEvent.click(button('Move left'))
    expect(onChange).toHaveBeenLastCalledWith(['b'])
    expect(labelsOf(0)).toEqual(['Apple', 'Cherry', 'Date'])
    expect(labelsOf(1)).toEqual(['Banana'])
  })

  it('unchecks a checked item that is checked again', () => {
    renderWithTheme(list())
    fireEvent.click(box('Apple'))
    expect(box('Apple').checked).toBe(true)
    expect(button('Move right').disabled).toBe(false)
    fireEvent.click(box('Apple'))
    expect(box('Apple').checked).toBe(false)
    expect(button('Move right').disabled).toBe(true)
  })

  it('turns a move off with nothing checked on its side', () => {
    renderWithTheme(list({ defaultValue: ['a'] }))
    expect(button('Move right').disabled).toBe(true)
    expect(button('Move left').disabled).toBe(true)
    fireEvent.click(box('Apple'))
    expect(button('Move left').disabled).toBe(false)
    expect(button('Move right').disabled).toBe(true)
  })

  it('draws no move-all buttons unless asked', () => {
    renderWithTheme(list())
    expect(screen.queryByRole('button', { name: 'Move all right' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Move all left' })).not.toBeInTheDocument()
  })

  it('moves every enabled item at once, leaving the disabled one', () => {
    const onChange = vi.fn()
    renderWithTheme(list({ shouldShowMoveAll: true, onChange }))
    fireEvent.click(button('Move all right'))
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b', 'c'])
    expect(labelsOf(0)).toEqual(['Date'])
    expect(labelsOf(1)).toEqual(['Apple', 'Banana', 'Cherry'])
    fireEvent.click(button('Move all left'))
    expect(onChange).toHaveBeenLastCalledWith([])
    expect(labelsOf(0)).toEqual(['Apple', 'Banana', 'Cherry', 'Date'])
  })

  it('turns move-all off when its source has nothing enabled', () => {
    renderWithTheme(list({ shouldShowMoveAll: true, defaultValue: ['d'] }))
    // Left: Apple, Banana, Cherry. Right: only the disabled Date.
    expect(button('Move all right').disabled).toBe(false)
    expect(button('Move all left').disabled).toBe(true)
    fireEvent.click(button('Move all right'))
    expect(button('Move all right').disabled).toBe(true)
  })

  it('keeps a disabled item unchecked and put', () => {
    renderWithTheme(list({ shouldShowMoveAll: true }))
    expect(box('Date').disabled).toBe(true)
    fireEvent.click(box('Date'))
    expect(box('Date').checked).toBe(false)
    expect(button('Move right').disabled).toBe(true)
  })

  describe('controlled', () => {
    it('shows its value, and moves only as its owner moves it', () => {
      const onChange = vi.fn()
      const { rerender } = render(list({ value: ['a'], onChange }), {
        wrapper: withTheme(baseTheme),
      })
      fireEvent.click(box('Banana'))
      fireEvent.click(button('Move right'))
      expect(onChange).toHaveBeenCalledWith(['a', 'b'])
      expect(labelsOf(1)).toEqual(['Apple'])
      rerender(list({ value: ['a', 'b'], onChange }))
      expect(labelsOf(1)).toEqual(['Apple', 'Banana'])
    })
  })

  describe('hasSelectAll', () => {
    it('draws no header checkbox or count without it', () => {
      renderWithTheme(list())
      expect(screen.getAllByRole('checkbox')).toHaveLength(items.length)
      expect(screen.queryByText('0/4')).not.toBeInTheDocument()
    })

    it('shows the count of each list, and checks all, some or none in its header', () => {
      renderWithTheme(list({ hasSelectAll: true }))
      const all = box('Choices')
      expect(screen.getByText('0/4')).toBeInTheDocument()
      expect(all.checked).toBe(false)
      expect(all.indeterminate).toBe(false)

      fireEvent.click(box('Apple'))
      expect(screen.getByText('1/4')).toBeInTheDocument()
      expect(all.checked).toBe(false)
      expect(all.indeterminate).toBe(true)

      fireEvent.click(all)
      // Every enabled item, never the disabled Date.
      expect(box('Apple').checked && box('Banana').checked && box('Cherry').checked).toBe(true)
      expect(box('Date').checked).toBe(false)
      expect(screen.getByText('3/4')).toBeInTheDocument()
      expect(all.checked).toBe(true)
      expect(all.indeterminate).toBe(false)

      fireEvent.click(all)
      expect(screen.getByText('0/4')).toBeInTheDocument()
      expect(all.checked).toBe(false)
    })

    it('turns the header checkbox off for a list with nothing enabled', () => {
      renderWithTheme(list({ hasSelectAll: true }))
      expect(box('Chosen').disabled).toBe(true)
      expect(box('Chosen').checked).toBe(false)
      expect(screen.getByText('0/0')).toBeInTheDocument()
    })

    it('says the count as the app words it', () => {
      renderWithTheme(
        list({ hasSelectAll: true, getCountLabel: (checked, total) => `${checked} of ${total}` })
      )
      expect(screen.getAllByText('0 of 4')).toHaveLength(1)
      expect(screen.getByText('0 of 0')).toBeInTheDocument()
    })
  })

  describe('disabled', () => {
    it('turns every checkbox and button off', () => {
      renderWithTheme(list({ disabled: true, shouldShowMoveAll: true, hasSelectAll: true }))
      screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).toBeDisabled())
      screen.getAllByRole('button').forEach((control) => expect(control).toBeDisabled())
    })
  })

  describe('error', () => {
    it('draws the lists in the error color', () => {
      renderWithTheme(list({ error: true }))
      lists().forEach((items) =>
        expect(items.parentElement).toHaveStyle({ borderColor: baseTheme.palette.error.main })
      )
    })

    it('does not by default', () => {
      renderWithTheme(list())
      lists().forEach((items) =>
        expect(items.parentElement).not.toHaveStyle({ borderColor: baseTheme.palette.error.main })
      )
    })
  })

  describe('in a FormControl', () => {
    it('is named by the label, described by the helper text, and takes its state', () => {
      renderWithTheme(
        <FormControl id="fruit" error>
          <FormLabel>Fruit</FormLabel>
          <TransferList items={items} {...labels} />
          <FormHelperText>Pick some.</FormHelperText>
        </FormControl>
      )
      const group = screen.getByRole('group', { name: 'Fruit' })
      expect(group).toHaveAttribute('id', 'fruit')
      expect(group).toHaveAccessibleDescription('Pick some.')
      expect(box('Apple').closest('[data-side]')).toHaveStyle({
        borderColor: baseTheme.palette.error.main,
      })
    })

    it('takes the disabled state of the field', () => {
      renderWithTheme(
        <FormControl disabled>
          <FormLabel>Fruit</FormLabel>
          <TransferList items={items} {...labels} />
        </FormControl>
      )
      expect(box('Apple')).toBeDisabled()
      expect(button('Move right')).toBeDisabled()
    })
  })

  it('takes its own aria props, and an own one wins over those of the field', () => {
    renderWithTheme(
      <FormControl>
        <FormLabel>Fruit</FormLabel>
        <TransferList
          items={items}
          aria-label="Own"
          aria-labelledby="own-label"
          aria-describedby="own-help"
        />
      </FormControl>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('aria-label', 'Own')
    expect(group).toHaveAttribute('aria-labelledby', 'own-label')
    expect(group).toHaveAttribute('aria-describedby', 'own-help')
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          TransferList: {
            defaultProps: {
              shouldShowMoveAll: true,
              hasSelectAll: true,
              moveAllRightLabel: 'Everything right',
              moveRightLabel: 'To the right',
              moveLeftLabel: 'To the left',
              moveAllLeftLabel: 'Everything left',
              size: 'sm',
              color: 'secondary',
            },
          },
        },
      })
      render(<TransferList items={items} moveRightLabel="Own" />, { wrapper: withTheme(theme) })
      expect(button('Everything right')).toBeInTheDocument()
      expect(button('Own')).toBeInTheDocument()
      expect(button('To the left')).toBeInTheDocument()
      expect(button('Everything left')).toBeInTheDocument()
      expect(screen.getByText('0/4')).toBeInTheDocument()
    })

    it('styles each slot from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          TransferList: {
            styleOverrides: { items: { height: '5rem' } },
          },
        },
      })
      render(list(), { wrapper: withTheme(theme) })
      expect(lists()[0]).toHaveStyle({ height: '5rem' })
    })
  })

  it('takes space props, className and a test id on its root', () => {
    renderWithTheme(list({ className: 'extra', p: 2 }))
    const root = screen.getByTestId('transfer')
    expect(root).toHaveClass('extra')
    expect(root).toHaveStyle({ padding: baseTheme.space[2] })
  })
})
