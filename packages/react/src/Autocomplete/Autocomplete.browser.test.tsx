import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { View } from '../View'
import { Autocomplete } from './Autocomplete'

// Real layout, focus and keyboard: where the list lands and how it is walked - none of which jsdom can do.

const CITIES = ['Berlin', 'Lisbon', 'Oslo', 'Rome']
const view = (top = 100) => (
  <View position="absolute" top={`${top}px`} left="100px">
    <Autocomplete options={CITIES} aria-label="City" noOptionsText="Nothing" />
  </View>
)

describe('Autocomplete in a browser', () => {
  it('opens under the field, as wide as it, along its start edge', async () => {
    renderWithTheme(view())
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.keyboard('{ArrowDown}')
    const list = screen.getByRole('listbox').parentElement as HTMLElement
    await vi.waitFor(() => expect(list).toBeVisible())
    const frame = (
      screen.getByRole('combobox').parentElement as HTMLElement
    ).getBoundingClientRect()
    const surface = list.getBoundingClientRect()
    expect(surface.top).toBeCloseTo(frame.bottom, 0)
    expect(surface.left).toBeCloseTo(frame.left, 0)
    expect(surface.width).toBeGreaterThanOrEqual(frame.width)
  })

  it('flips above the field where there is no room below it', async () => {
    renderWithTheme(view(window.innerHeight - 50))
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.keyboard('{ArrowDown}')
    const list = screen.getByRole('listbox').parentElement as HTMLElement
    await vi.waitFor(() => expect(list).toBeVisible())
    const frame = (
      screen.getByRole('combobox').parentElement as HTMLElement
    ).getBoundingClientRect()
    expect(list.getBoundingClientRect().bottom).toBeLessThanOrEqual(frame.top)
  })

  it('is walked and chosen from with the keyboard, the focus staying in the field', async () => {
    renderWithTheme(view())
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{Enter}')
    expect(screen.getByRole('combobox')).toHaveValue('Lisbon')
    expect(screen.getByRole('combobox')).toHaveFocus()
    await userEvent.keyboard('{ArrowDown}')
    expect(screen.getByRole('option', { name: 'Lisbon' })).toHaveAttribute('aria-selected', 'true')
  })

  it('chooses with a click on an option, and closes when the field is left', async () => {
    renderWithTheme(view())
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.keyboard('o')
    await userEvent.click(screen.getByRole('option', { name: 'Oslo' }))
    expect(screen.getByRole('combobox')).toHaveValue('Oslo')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.tab()
    await vi.waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
  })
})
