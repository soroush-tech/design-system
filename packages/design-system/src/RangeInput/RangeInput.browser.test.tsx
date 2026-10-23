import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { View } from '../View'
import { RangeInput } from './RangeInput'

// Real layout and a real pointer: a press is captured by the slider, a drag follows it past the
// slider's own box, and a release lets it go - none of which jsdom can do.

const inputs = () => screen.getAllByRole('slider') as HTMLInputElement[]
const root = () => screen.getByTestId('range')

// A thumb's room on each side: the slider is drawn this far in.
const edge = () => root().getBoundingClientRect()

describe('RangeInput in a browser', () => {
  it('follows a mouse drag across the slider and commits where it ended', async () => {
    const onChangeCommitted = vi.fn()
    renderWithTheme(
      <View width="400px">
        <RangeInput
          data-testid="range"
          aria-label="Volume"
          defaultValue={0}
          onChangeCommitted={onChangeCommitted}
        />
      </View>
    )
    const box = edge()
    await userEvent.dragAndDrop(root(), root(), {
      sourcePosition: { x: 2, y: box.height / 2 },
      targetPosition: { x: box.width * 0.75, y: box.height / 2 },
    })
    await vi.waitFor(() => expect(Number(inputs()[0].value)).toBeGreaterThanOrEqual(73))
    expect(Number(inputs()[0].value)).toBeLessThanOrEqual(77)
    await vi.waitFor(() => expect(onChangeCommitted).toHaveBeenCalledTimes(1))
    expect(root().hasPointerCapture(1)).toBe(false)
    expect(inputs()[0]).toHaveFocus()
  })

  it('moves the nearer thumb of a range, and counts up from the bottom when vertical', async () => {
    renderWithTheme(
      <View height="300px">
        <RangeInput
          data-testid="range"
          aria-label="Level"
          orientation="vertical"
          defaultValue={[10, 90]}
        />
      </View>
    )
    const box = edge()
    // Near the top: the value is near 100, so the upper thumb takes it.
    await userEvent.click(root(), { position: { x: box.width / 2, y: box.height * 0.2 } })
    await vi.waitFor(() => expect(Number(inputs()[1].value)).toBeLessThan(90))
    expect(Number(inputs()[1].value)).toBeGreaterThan(70)
    expect(inputs()[0]).toHaveValue('10')
  })
})
