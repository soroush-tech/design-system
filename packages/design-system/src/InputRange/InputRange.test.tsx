import { describe, it, expect, vi, afterEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { ThemeProvider } from '../theme'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { InputRange, type InputRangeProps } from './InputRange'

afterEach(() => vi.restoreAllMocks())

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const sliders = () => screen.getAllByRole('slider') as HTMLInputElement[]
const slider = () => sliders()[0]
const root = () => screen.getByTestId('range')
const press = (key: string, index = 0, init: Partial<KeyboardEventInit> = {}) =>
  fireEvent.keyDown(sliders()[index], { key, ...init })

const range = (props: Partial<InputRangeProps> = {}) => (
  <InputRange data-testid="range" aria-label="Volume" {...props} />
)

// jsdom lays nothing out: the pointer needs a box - 200 wide and tall, its start at 100 - to be along.
const layOut = (width = 200, height = 200) =>
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    left: 100,
    right: 100 + width,
    top: 100,
    bottom: 100 + height,
    width,
    height,
    x: 100,
    y: 100,
    toJSON: () => ({}),
  })

const pointer = (
  type: 'Down' | 'Move' | 'Up' | 'Cancel',
  x: number,
  init: PointerEventInit = {}
) => {
  const fire = {
    Down: fireEvent.pointerDown,
    Move: fireEvent.pointerMove,
    Up: fireEvent.pointerUp,
    Cancel: fireEvent.pointerCancel,
  }[type]
  fire(root(), { clientX: x, clientY: 100, pointerId: 1, button: 0, buttons: 1, ...init })
}

describe('InputRange', () => {
  it('has one native range input for a number, with its range and value', () => {
    renderWithTheme(range({ defaultValue: 30, min: 10, max: 90, step: 5, name: 'volume' }))
    expect(sliders()).toHaveLength(1)
    expect(slider()).toHaveAttribute('type', 'range')
    expect(slider()).toHaveValue('30')
    expect(slider()).toHaveAttribute('min', '10')
    expect(slider()).toHaveAttribute('max', '90')
    expect(slider()).toHaveAttribute('step', '5')
    expect(slider()).toHaveAttribute('name', 'volume')
    expect(slider()).toHaveAttribute('aria-valuenow', '30')
    expect(slider()).toHaveAttribute('aria-valuemin', '10')
    expect(slider()).toHaveAttribute('aria-valuemax', '90')
    expect(slider()).toHaveAttribute('aria-orientation', 'horizontal')
    expect(slider()).toHaveAccessibleName('Volume')
  })

  it('starts at the least, in the range of 0 to 100 with a step of 1', () => {
    renderWithTheme(range())
    expect(slider()).toHaveValue('0')
    expect(slider()).toHaveAttribute('max', '100')
    expect(slider()).toHaveAttribute('step', '1')
  })

  it('has an input for each value of a range - sorted, clamped, each named', () => {
    renderWithTheme(
      range({
        defaultValue: [80, 20, 150],
        getAriaLabel: (index) => `Thumb ${index + 1}`,
        'aria-label': undefined,
      })
    )
    expect(sliders().map((input) => input.value)).toEqual(['20', '80', '100'])
    expect(screen.getByRole('slider', { name: 'Thumb 2' })).toHaveValue('80')
  })

  it('has no step attribute to speak of with no step, so any value fits between the marks', () => {
    renderWithTheme(range({ step: null, marks: [{ value: 0 }, { value: 100 }] }))
    expect(slider()).toHaveAttribute('step', 'any')
  })

  it('follows a controlled value, and asks for the change rather than making it', () => {
    const onChange = vi.fn()
    const { rerender } = renderWithTheme(range({ value: 40, onChange }))
    press('ArrowRight')
    expect(onChange).toHaveBeenCalledWith(expect.any(Event), 41, 0)
    expect(slider()).toHaveValue('40')
    rerender(range({ value: 70, onChange }))
    expect(slider()).toHaveValue('70')
  })

  it('tells a change with a target a form library can read: its value and its name', () => {
    const onChange = vi.fn()
    renderWithTheme(range({ defaultValue: 10, onChange, name: 'volume' }))
    press('ArrowRight')
    const event = onChange.mock.calls[0][0] as Event
    expect(event.target).toEqual({ value: 11, name: 'volume' })
  })

  describe('keys', () => {
    it.each([
      ['ArrowRight', 51],
      ['ArrowUp', 51],
      ['ArrowLeft', 49],
      ['ArrowDown', 49],
      ['PageUp', 60],
      ['PageDown', 40],
      ['Home', 0],
      ['End', 100],
    ])('%s goes to %s', (key, expected) => {
      renderWithTheme(range({ defaultValue: 50 }))
      press(key)
      expect(slider()).toHaveValue(String(expected))
    })

    it('steps by the large step with Shift, and tells each change and each commit', () => {
      const onChange = vi.fn()
      const onChangeCommitted = vi.fn()
      renderWithTheme(range({ defaultValue: 50, onChange, onChangeCommitted, shiftStep: 25 }))
      press('ArrowRight', 0, { shiftKey: true })
      expect(slider()).toHaveValue('75')
      expect(onChangeCommitted).toHaveBeenCalledWith(expect.anything(), 75)
      press('End')
      press('End')
      // At the end the value doesn't change, but each key is still a commit.
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChangeCommitted).toHaveBeenCalledTimes(3)
    })

    it('goes the other way right to left', () => {
      render(
        <div dir="rtl">
          <ThemeProvider>{range({ defaultValue: 50 })}</ThemeProvider>
        </div>
      )
      press('ArrowRight')
      expect(slider()).toHaveValue('49')
      press('ArrowLeft')
      press('ArrowLeft')
      expect(slider()).toHaveValue('51')
    })

    it("leaves the keys it doesn't take alone", () => {
      renderWithTheme(range({ defaultValue: 50 }))
      expect(fireEvent.keyDown(slider(), { key: 'a' })).toBe(true)
      expect(fireEvent.keyDown(slider(), { key: 'ArrowRight' })).toBe(false)
    })

    it('goes from mark to mark with no step, stopping at the last', () => {
      renderWithTheme(
        range({ defaultValue: 20, step: null, marks: [{ value: 0 }, { value: 20 }, { value: 70 }] })
      )
      press('ArrowRight')
      expect(slider()).toHaveValue('70')
      press('ArrowRight')
      expect(slider()).toHaveValue('70')
      press('Home')
      expect(slider()).toHaveValue('0')
    })

    it('moves nothing with no step and no marks', () => {
      renderWithTheme(range({ defaultValue: 20, step: null }))
      press('ArrowRight')
      expect(slider()).toHaveValue('20')
    })

    it("moves a range's thumb past its neighbour, the focus following it", () => {
      renderWithTheme(range({ defaultValue: [40, 42] }))
      press('ArrowRight', 0, { shiftKey: true })
      expect(sliders().map((input) => input.value)).toEqual(['42', '50'])
      expect(sliders()[1]).toHaveFocus()
    })

    it('stops a thumb at its neighbour without swapping', () => {
      renderWithTheme(range({ defaultValue: [40, 42], shouldSwapThumbs: false }))
      press('ArrowRight', 0, { shiftKey: true })
      expect(sliders().map((input) => input.value)).toEqual(['42', '42'])
    })
  })

  it('takes a change the native input reports - assistive technology sets it directly', () => {
    const onChange = vi.fn()
    renderWithTheme(range({ defaultValue: 10, onChange }))
    fireEvent.change(slider(), { target: { value: '35' } })
    expect(onChange).toHaveBeenCalledWith(expect.any(Event), 35, 0)
  })

  it('snaps what the native input reports to the nearest mark with no step', () => {
    renderWithTheme(
      range({ defaultValue: 0, step: null, marks: [{ value: 0 }, { value: 30 }, { value: 100 }] })
    )
    fireEvent.change(slider(), { target: { value: '40' } })
    expect(slider()).toHaveValue('30')
  })

  it('takes what the native input reports as it is with no step and no marks', () => {
    renderWithTheme(range({ defaultValue: 0, step: null }))
    fireEvent.change(slider(), { target: { value: '40' } })
    expect(slider()).toHaveValue('40')
  })

  describe('the pointer', () => {
    it('sets the value under a press, and focuses the thumb', () => {
      layOut()
      const onChange = vi.fn()
      renderWithTheme(range({ onChange }))
      pointer('Down', 200)
      expect(slider()).toHaveValue('50')
      expect(onChange).toHaveBeenCalledWith(expect.any(Event), 50, 0)
      expect(slider()).toHaveFocus()
    })

    it('follows a drag, and commits what it ended on - telling each value once', () => {
      layOut()
      const onChange = vi.fn()
      const onChangeCommitted = vi.fn()
      renderWithTheme(range({ defaultValue: 50, onChange, onChangeCommitted }))
      pointer('Down', 200)
      pointer('Move', 240)
      pointer('Move', 240)
      pointer('Move', 260)
      pointer('Up', 260)
      expect(slider()).toHaveValue('80')
      expect(onChange.mock.calls.map((call) => call[1])).toEqual([70, 80])
      expect(onChangeCommitted).toHaveBeenCalledTimes(1)
      expect(onChangeCommitted).toHaveBeenCalledWith(expect.anything(), 80)
    })

    it('commits the value a press began with when nothing moved it', () => {
      layOut()
      const onChangeCommitted = vi.fn()
      renderWithTheme(range({ defaultValue: 50, onChangeCommitted }))
      pointer('Down', 200)
      pointer('Up', 200)
      expect(onChangeCommitted).toHaveBeenCalledWith(expect.anything(), 50)
    })

    it('counts from the right right to left', () => {
      layOut()
      render(
        <div dir="rtl">
          <ThemeProvider>{range({ defaultValue: 0 })}</ThemeProvider>
        </div>
      )
      pointer('Down', 120)
      expect(slider()).toHaveValue('90')
    })

    it('counts up from the bottom when vertical', () => {
      layOut()
      renderWithTheme(range({ orientation: 'vertical' }))
      fireEvent.pointerDown(root(), {
        clientX: 100,
        clientY: 100,
        pointerId: 1,
        button: 0,
        buttons: 1,
      })
      expect(slider()).toHaveValue('100')
      expect(slider()).toHaveAttribute('aria-orientation', 'vertical')
    })

    it("ignores another pointer's moves and releases", () => {
      layOut()
      const onChange = vi.fn()
      renderWithTheme(range({ defaultValue: 50, onChange }))
      pointer('Down', 200)
      pointer('Move', 300, { pointerId: 2 })
      pointer('Up', 300, { pointerId: 2 })
      expect(onChange).not.toHaveBeenCalled()
      pointer('Up', 200)
    })

    it('keeps the value when the slider has lost its box mid-drag', () => {
      const box = layOut()
      const onChange = vi.fn()
      renderWithTheme(range({ defaultValue: 50, onChange }))
      pointer('Down', 200)
      box.mockReturnValue(new DOMRect(0, 0, 0, 0))
      pointer('Move', 300)
      expect(onChange).not.toHaveBeenCalled()
      pointer('Up', 300)
    })

    it('ignores a move with no press before it', () => {
      layOut()
      const onChange = vi.fn()
      renderWithTheme(range({ onChange }))
      pointer('Move', 300)
      expect(onChange).not.toHaveBeenCalled()
    })

    it('ends a drag whose release never came: a move with no button down', () => {
      layOut()
      const onChangeCommitted = vi.fn()
      renderWithTheme(range({ defaultValue: 0, onChangeCommitted }))
      pointer('Down', 200)
      pointer('Move', 260, { buttons: 0 })
      expect(onChangeCommitted).toHaveBeenCalledTimes(1)
      expect(slider()).toHaveValue('50')
    })

    it('ends a drag when the pointer is cancelled or loses its capture', () => {
      layOut()
      const onChangeCommitted = vi.fn()
      renderWithTheme(range({ onChangeCommitted }))
      pointer('Down', 200)
      pointer('Cancel', 200)
      pointer('Down', 200)
      fireEvent.lostPointerCapture(root(), { pointerId: 1 })
      expect(onChangeCommitted).toHaveBeenCalledTimes(2)
    })

    it('ignores a press that is not the primary button, a prevented one, and any when disabled', () => {
      layOut()
      const onChange = vi.fn()
      const { unmount } = renderWithTheme(range({ onChange }))
      pointer('Down', 200, { button: 2 })
      fireEvent.pointerDown(root(), {
        clientX: 200,
        clientY: 100,
        pointerId: 1,
        button: 0,
        cancelable: true,
      })
      expect(onChange).toHaveBeenCalledTimes(1)
      unmount()
      const next = renderWithTheme(range({ onChange, disabled: true }))
      pointer('Down', 200)
      expect(onChange).toHaveBeenCalledTimes(1)
      next.unmount()
      renderWithTheme(
        <div onPointerDownCapture={(event) => event.preventDefault()}>{range({ onChange })}</div>
      )
      pointer('Down', 200)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('ignores a press with no box to be along', () => {
      const onChange = vi.fn()
      renderWithTheme(range({ onChange }))
      pointer('Down', 200)
      expect(onChange).not.toHaveBeenCalled()
    })

    it('takes the nearest thumb of a range, and keeps it through a drag', () => {
      layOut()
      renderWithTheme(range({ defaultValue: [20, 80] }))
      pointer('Down', 180)
      expect(sliders().map((input) => input.value)).toEqual(['40', '80'])
      expect(sliders()[0]).toHaveFocus()
      pointer('Move', 220)
      expect(sliders().map((input) => input.value)).toEqual(['60', '80'])
    })

    it('gives a tie to the later thumb', () => {
      layOut()
      renderWithTheme(range({ defaultValue: [20, 60] }))
      pointer('Down', 180)
      expect(sliders().map((input) => input.value)).toEqual(['20', '40'])
      expect(sliders()[1]).toHaveFocus()
    })

    it('swaps thumbs as one is dragged past the other, the drag following it', () => {
      layOut()
      renderWithTheme(range({ defaultValue: [20, 40] }))
      pointer('Down', 140)
      pointer('Move', 300)
      expect(sliders().map((input) => input.value)).toEqual(['40', '100'])
      expect(sliders()[1]).toHaveFocus()
    })

    it('stops a thumb at its neighbour when swapping is off', () => {
      layOut()
      renderWithTheme(range({ defaultValue: [20, 40], shouldSwapThumbs: false }))
      pointer('Down', 140)
      pointer('Move', 300)
      expect(sliders().map((input) => input.value)).toEqual(['40', '40'])
    })

    it('snaps to the nearest mark with no step', () => {
      layOut()
      renderWithTheme(range({ step: null, marks: [{ value: 0 }, { value: 30 }, { value: 100 }] }))
      pointer('Down', 190)
      expect(slider()).toHaveValue('30')
    })

    it('marks the thumb pressed, and keeps the others out of its way', () => {
      layOut()
      renderWithTheme(range({ defaultValue: [20, 80] }))
      pointer('Down', 140)
      const thumbs = root().querySelectorAll('[data-index]:not(input)')
      expect(thumbs[0]).toHaveStyle({ zIndex: '1' })
      expect(thumbs[1]).toHaveStyle({ pointerEvents: 'none' })
      pointer('Up', 140)
      expect(thumbs[1]).not.toHaveStyle({ pointerEvents: 'none' })
    })
  })

  describe('marks', () => {
    it('are one at every step for true, in the range', () => {
      renderWithTheme(range({ marks: true, step: 25 }))
      expect(root().querySelectorAll('[data-mark]')).toHaveLength(5)
    })

    it('show their labels under them, and only the marks inside the range', () => {
      renderWithTheme(
        range({
          marks: [
            { value: 0, label: 'min' },
            { value: 50 },
            { value: 100, label: 'max' },
            { value: 500, label: 'away' },
          ],
        })
      )
      expect(screen.getByText('min')).toHaveAttribute('aria-hidden', 'true')
      expect(screen.getByText('max')).toBeInTheDocument()
      expect(screen.queryByText('away')).toBeNull()
    })

    it('are lit while the track covers them - from the start, between a range, or inverted the rest', () => {
      const lit = (values: number[]) =>
        values.map(
          (value) =>
            getComputedStyle(root().querySelector(`[data-mark="${value}"]`)!).backgroundColor
        )
      const marks = { marks: [{ value: 0 }, { value: 50 }, { value: 100 }] }
      const { unmount } = renderWithTheme(range({ ...marks, defaultValue: 50 }))
      const single = lit([0, 50, 100])
      expect(single[0]).toBe(single[1])
      expect(single[1]).not.toBe(single[2])
      unmount()
      const ranged = renderWithTheme(range({ ...marks, defaultValue: [50, 100] }))
      const between = lit([0, 50, 100])
      expect(between[0]).not.toBe(between[1])
      expect(between[1]).toBe(between[2])
      ranged.unmount()
      const inverted = renderWithTheme(
        range({ ...marks, defaultValue: [50, 100], track: 'inverted' })
      )
      const outside = lit([0, 50, 100])
      expect(outside[0]).not.toBe(outside[1])
      expect(outside[0]).not.toBe(outside[2])
      inverted.unmount()
      renderWithTheme(range({ ...marks, defaultValue: 50, track: false }))
      const none = lit([0, 50, 100])
      expect(new Set(none).size).toBe(1)
    })
  })

  it('draws marks and their labels beside a vertical slider', () => {
    renderWithTheme(
      range({ orientation: 'vertical', marks: [{ value: 0, label: 'low' }, { value: 100 }] })
    )
    expect(screen.getByText('low')).toHaveStyle({ bottom: '0%' })
    expect(root().querySelector('[data-mark="100"]')).toHaveStyle({ bottom: '100%' })
  })

  it('draws a size the theme adds with a rail of the medium thickness', () => {
    const theme = createTheme(baseTheme, {
      sizes: { xl: { ...baseTheme.sizes.lg } },
      icon: { xl: '2rem' },
    } as never)
    render(range({ size: 'xl' as never }), { wrapper: withTheme(theme) })
    expect(root()).toHaveStyle({ height: '2rem' })
  })

  describe('the track', () => {
    it('runs from the start for a number, and between the thumbs for a range', () => {
      const { unmount } = renderWithTheme(range({ defaultValue: 40 }))
      const track = () => root().querySelector('span:nth-child(2)') as HTMLElement
      expect(track()).toHaveStyle({ width: '40%' })
      unmount()
      renderWithTheme(range({ defaultValue: [20, 70] }))
      expect(track()).toHaveStyle({ width: '50%' })
    })

    it('is drawn from the bottom when vertical, is not drawn when false, and inverted fills the rest', () => {
      const { unmount } = renderWithTheme(range({ defaultValue: 40, orientation: 'vertical' }))
      expect(root().querySelector('span:nth-child(2)')).toHaveStyle({ bottom: '0%', height: '40%' })
      unmount()
      const none = renderWithTheme(range({ defaultValue: 40, track: false }))
      expect(root().querySelectorAll(':scope > span')).toHaveLength(2)
      none.unmount()
      renderWithTheme(range({ defaultValue: 40, track: 'inverted' }))
      expect(root().querySelectorAll(':scope > span')).toHaveLength(3)
    })
  })

  describe('the value label', () => {
    const label = () => screen.queryByText('30')

    it('is not drawn when off, and always shown when on', () => {
      const { unmount } = renderWithTheme(range({ defaultValue: 30 }))
      expect(label()).toBeNull()
      unmount()
      renderWithTheme(range({ defaultValue: 30, valueLabel: 'on' }))
      expect(label()).toHaveAttribute('aria-hidden', 'true')
      expect(label()).toHaveStyle({ visibility: 'visible' })
    })

    it('shows while a thumb is hovered, focused or pressed, with auto', () => {
      layOut()
      renderWithTheme(range({ defaultValue: 30, valueLabel: 'auto' }))
      const thumb = root().querySelector('[data-index]:not(input)') as HTMLElement
      expect(label()).toHaveStyle({ visibility: 'hidden' })
      fireEvent.mouseEnter(thumb)
      expect(label()).toHaveStyle({ visibility: 'visible' })
      fireEvent.mouseLeave(thumb)
      expect(label()).toHaveStyle({ visibility: 'hidden' })
      fireEvent.focus(slider())
      expect(label()).toHaveStyle({ visibility: 'visible' })
      fireEvent.blur(slider())
      expect(label()).toHaveStyle({ visibility: 'hidden' })
      pointer('Down', 160)
      expect(screen.getByText('30')).toHaveStyle({ visibility: 'visible' })
    })

    it('says what formatValueLabel says of the scaled value', () => {
      renderWithTheme(
        range({
          defaultValue: 3,
          valueLabel: 'on',
          scale: (value) => value * 10,
          formatValueLabel: (value, index) => `${index}: ${value}%`,
        })
      )
      expect(screen.getByText('0: 30%')).toBeInTheDocument()
    })
  })

  it('announces the scaled value, and the text it is given', () => {
    renderWithTheme(
      range({
        defaultValue: 2,
        min: 0,
        max: 5,
        scale: (value) => 2 ** value,
        getAriaValueText: (value) => `${value} units`,
      })
    )
    expect(slider()).toHaveAttribute('aria-valuenow', '4')
    expect(slider()).toHaveAttribute('aria-valuemin', '1')
    expect(slider()).toHaveAttribute('aria-valuemax', '32')
    expect(slider()).toHaveAttribute('aria-valuetext', '4 units')
    expect(slider()).toHaveValue('2')
  })

  it('submits each thumb under its name in a form, none when disabled', () => {
    const submitted = (props: Partial<InputRangeProps>) => {
      const { container, unmount } = renderWithTheme(
        <form>{range({ name: 'range', ...props })}</form>
      )
      const data = [...new FormData(container.querySelector('form')!).entries()]
      unmount()
      return data
    }
    expect(submitted({ defaultValue: [10, 90] })).toEqual([
      ['range', '10'],
      ['range', '90'],
    ])
    expect(submitted({ defaultValue: 5, disabled: true })).toEqual([])
  })

  it('is off when disabled: its inputs disabled, dimmed and taking no pointer', () => {
    renderWithTheme(range({ disabled: true }))
    expect(slider()).toBeDisabled()
    expect(root()).toHaveStyle({ opacity: '0.5', pointerEvents: 'none' })
  })

  it('forwards its class, test id, aria props and space and size props', () => {
    renderWithTheme(
      range({
        className: 'mine',
        'aria-describedby': 'hint',
        'aria-labelledby': 'heading',
        p: 1,
        width: '300px',
        id: 'own-id',
      })
    )
    expect(root()).toHaveClass('mine')
    expect(root()).toHaveStyle({ padding: baseTheme.space[1], width: '300px' })
    expect(slider()).toHaveAttribute('aria-describedby', 'hint')
    expect(slider()).toHaveAttribute('aria-labelledby', 'heading')
    expect(slider()).toHaveAttribute('id', 'own-id')
  })

  it('takes a size, and a vertical one stands up', () => {
    const { unmount } = renderWithTheme(range({ size: 'lg' }))
    expect(root()).toHaveStyle({ height: baseTheme.icon.lg })
    unmount()
    renderWithTheme(range({ orientation: 'vertical' }))
    expect(root()).toHaveStyle({ height: '12rem' })
  })

  describe('in a FormControl', () => {
    it('is targeted by its FormLabel on the first thumb, named by it on each, described by its helper', () => {
      renderWithTheme(
        <FormControl id="volume">
          <FormLabel>Volume</FormLabel>
          <InputRange data-testid="range" defaultValue={[10, 20]} />
          <FormHelperText>Loud or quiet.</FormHelperText>
        </FormControl>
      )
      expect(sliders()[0]).toHaveAttribute('id', 'volume')
      expect(sliders()[1]).not.toHaveAttribute('id')
      expect(screen.getByLabelText('Volume', { selector: 'input[data-index="0"]' })).toBe(
        sliders()[0]
      )
      expect(
        sliders().every((input) => input.getAttribute('aria-labelledby') === 'volume-label')
      ).toBe(true)
      expect(sliders()[0]).toHaveAccessibleDescription('Loud or quiet.')
    })

    it('has no label to point at without a FormLabel', () => {
      renderWithTheme(
        <FormControl id="volume">
          <InputRange data-testid="range" aria-label="Volume" />
        </FormControl>
      )
      expect(slider()).not.toHaveAttribute('aria-labelledby')
      expect(slider()).not.toHaveAttribute('aria-describedby')
    })

    it("takes the field's size, error and disabled state - its own props winning", () => {
      const { unmount } = renderWithTheme(
        <FormControl size="lg" error disabled>
          <InputRange data-testid="range" aria-label="Volume" />
        </FormControl>
      )
      expect(root()).toHaveStyle({ height: baseTheme.icon.lg })
      expect(slider()).toHaveAttribute('aria-invalid', 'true')
      expect(slider()).toBeDisabled()
      unmount()
      renderWithTheme(
        <FormControl size="lg" disabled>
          <InputRange data-testid="range" aria-label="Volume" size="sm" disabled={false} />
        </FormControl>
      )
      expect(slider()).toBeEnabled()
      expect(root()).toHaveStyle({ height: baseTheme.icon.sm })
    })

    it("takes the field's color, and the error color over it", () => {
      const color = (error: boolean) => {
        const { unmount } = renderWithTheme(
          <FormControl color="success" error={error}>
            <InputRange data-testid="range" aria-label="Volume" valueLabel="on" />
          </FormControl>
        )
        const background = getComputedStyle(screen.getByText('0')).backgroundColor
        unmount()
        return background
      }
      expect(color(false)).not.toBe(color(true))
    })
  })

  it("takes the theme's defaults for every slider, its own props winning", () => {
    const theme = createTheme(baseTheme, {
      components: {
        InputRange: {
          defaultProps: {
            size: 'lg',
            color: 'success',
            orientation: 'vertical',
            track: 'inverted',
            step: 5,
            shiftStep: 25,
            valueLabel: 'on',
            shouldSwapThumbs: false,
          },
        },
      },
    })
    const { unmount } = render(range({ defaultValue: [10, 12] }), { wrapper: withTheme(theme) })
    expect(root()).toHaveStyle({ height: '12rem' })
    expect(slider()).toHaveAttribute('step', '5')
    expect(screen.getByText('10')).toBeInTheDocument()
    press('ArrowRight', 0, { shiftKey: true })
    expect(sliders().map((input) => input.value)).toEqual(['12', '12'])
    unmount()
    render(
      range({
        defaultValue: 10,
        orientation: 'horizontal',
        step: null,
        valueLabel: 'off',
        track: 'normal',
      }),
      {
        wrapper: withTheme(theme),
      }
    )
    expect(slider()).toHaveAttribute('step', 'any')
    expect(screen.queryByText('10')).toBeNull()
  })
})
