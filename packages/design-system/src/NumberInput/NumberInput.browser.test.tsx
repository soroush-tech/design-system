import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { NumberInput } from './NumberInput'

// Real events and timers: a held button repeats on its own clock, and the wheel's default - the
// page scrolling - is something only a browser has to be kept from.

const field = () => screen.getByRole('spinbutton') as HTMLInputElement

describe('NumberInput in a browser', () => {
  it('repeats a held button, and stops when it is released', async () => {
    renderWithTheme(
      <NumberInput defaultValue={0} incrementLabel="Increase" decrementLabel="Decrease" />
    )
    const increase = screen.getByRole('button', { name: 'Increase' })
    increase.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
    await vi.waitFor(() => expect(field()).toHaveValue('1'))
    // After the pause, it goes on by itself.
    await vi.waitFor(() => expect(Number(field().value)).toBeGreaterThan(3), { timeout: 2000 })
    increase.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
    const stopped = field().value
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(field().value).toBe(stopped)
  })

  it('steps a focused field by the wheel and keeps the page from scrolling', async () => {
    renderWithTheme(<NumberInput defaultValue={5} shouldScrubOnWheel />)
    field().focus()
    const wheel = new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true })
    field().dispatchEvent(wheel)
    expect(wheel.defaultPrevented).toBe(true)
    await vi.waitFor(() => expect(field()).toHaveValue('6'))
  })

  it("leaves the wheel to the page when the field isn't focused", () => {
    renderWithTheme(<NumberInput defaultValue={5} shouldScrubOnWheel />)
    const wheel = new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true })
    field().dispatchEvent(wheel)
    expect(wheel.defaultPrevented).toBe(false)
    expect(field()).toHaveValue('5')
  })
})
