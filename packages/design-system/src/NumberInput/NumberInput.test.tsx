import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { useRef, useState, type ReactNode } from 'react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { ThemeProvider } from '../theme'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { useHoldRepeat } from './hooks/useHoldRepeat'
import { NumberInput, type NumberInputProps } from './NumberInput'

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const field = () => screen.getByRole('spinbutton') as HTMLInputElement
const type = (text: string) => fireEvent.change(field(), { target: { value: text } })
const press = (key: string, modifiers: Partial<KeyboardEventInit> = {}) =>
  fireEvent.keyDown(field(), { key, ...modifiers })

const labelled = (props: Partial<NumberInputProps> = {}) => (
  <NumberInput incrementLabel="Increase" decrementLabel="Decrease" {...props} />
)

describe('NumberInput', () => {
  it('is a spinbutton with its number and range, in a text input', () => {
    renderWithTheme(<NumberInput defaultValue={5} min={0} max={10} aria-label="Quantity" />)
    expect(field().type).toBe('text')
    expect(field()).toHaveValue('5')
    expect(field()).toHaveAttribute('aria-valuenow', '5')
    expect(field()).toHaveAttribute('aria-valuemin', '0')
    expect(field()).toHaveAttribute('aria-valuemax', '10')
    expect(field()).toHaveAccessibleName('Quantity')
    expect(field()).toHaveAttribute('autocomplete', 'off')
  })

  it('is empty with no number, and offers a decimal or a numeric keyboard as the range allows', () => {
    const { unmount } = renderWithTheme(<NumberInput />)
    expect(field()).toHaveValue('')
    expect(field()).not.toHaveAttribute('aria-valuenow')
    expect(field()).toHaveAttribute('inputmode', 'decimal')
    unmount()
    const next = renderWithTheme(<NumberInput min={0} />)
    expect(field()).toHaveAttribute('inputmode', 'numeric')
    next.unmount()
    renderWithTheme(<NumberInput min={0} step={0.5} />)
    expect(field()).toHaveAttribute('inputmode', 'decimal')
  })

  it('tells the number as it is typed, keeping what is typed until it is settled', () => {
    const onChange = vi.fn()
    renderWithTheme(<NumberInput onChange={onChange} />)
    type('1')
    type('12.')
    expect(onChange).toHaveBeenNthCalledWith(1, 1)
    expect(onChange).toHaveBeenNthCalledWith(2, 12)
    // The text stays as typed - a trailing point is the user's to finish.
    expect(field()).toHaveValue('12.')
    type('12.5')
    expect(onChange).toHaveBeenLastCalledWith(12.5)
  })

  it('leaves text that is not yet a number to be finished, and none is empty', () => {
    const onChange = vi.fn()
    renderWithTheme(<NumberInput defaultValue={3} onChange={onChange} />)
    type('-')
    expect(onChange).not.toHaveBeenCalled()
    expect(field()).toHaveValue('-')
    type('')
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('settles on blur and Enter: formatted, clamped to the range, and told', () => {
    const onChange = vi.fn()
    const onChangeCommitted = vi.fn()
    renderWithTheme(
      <NumberInput
        defaultValue={1}
        min={0}
        max={10}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
    )
    type('25')
    expect(onChange).toHaveBeenLastCalledWith(25)
    fireEvent.blur(field())
    expect(field()).toHaveValue('10')
    expect(onChange).toHaveBeenLastCalledWith(10)
    expect(onChangeCommitted).toHaveBeenLastCalledWith(10)
    type('-4')
    press('Enter')
    expect(field()).toHaveValue('0')
    expect(onChangeCommitted).toHaveBeenLastCalledWith(0)
  })

  it('settles empty text as none, and unreadable text as the number it had', () => {
    const onChangeCommitted = vi.fn()
    renderWithTheme(<NumberInput defaultValue={4} onChangeCommitted={onChangeCommitted} />)
    type('abc')
    fireEvent.blur(field())
    expect(field()).toHaveValue('4')
    expect(onChangeCommitted).toHaveBeenLastCalledWith(4)
    type('')
    fireEvent.blur(field())
    expect(field()).toHaveValue('')
    expect(onChangeCommitted).toHaveBeenLastCalledWith(null)
  })

  it('has nothing to settle when nothing was typed', () => {
    const onChangeCommitted = vi.fn()
    renderWithTheme(<NumberInput defaultValue={4} onChangeCommitted={onChangeCommitted} />)
    fireEvent.blur(field())
    expect(onChangeCommitted).not.toHaveBeenCalled()
  })

  it('follows a controlled number, and null is none', () => {
    const onChange = vi.fn()
    const { rerender } = renderWithTheme(<NumberInput value={2} onChange={onChange} />)
    press('ArrowUp')
    expect(onChange).toHaveBeenCalledWith(3)
    expect(field()).toHaveValue('2')
    rerender(<NumberInput value={7} onChange={onChange} />)
    expect(field()).toHaveValue('7')
    rerender(<NumberInput value={null} onChange={onChange} />)
    expect(field()).toHaveValue('')
  })

  it('steps by the arrow keys - by the small step with Alt, the large with Shift', () => {
    const onChangeCommitted = vi.fn()
    renderWithTheme(<NumberInput defaultValue={10} onChangeCommitted={onChangeCommitted} />)
    press('ArrowUp')
    expect(field()).toHaveValue('11')
    press('ArrowDown')
    press('ArrowDown')
    expect(field()).toHaveValue('9')
    press('ArrowUp', { altKey: true })
    expect(field()).toHaveValue('9.1')
    press('ArrowUp', { shiftKey: true })
    expect(field()).toHaveValue('19.1')
    expect(onChangeCommitted).toHaveBeenCalledTimes(5)
  })

  it('steps without float noise, from the number being typed, and from none as from 0', () => {
    const { unmount } = renderWithTheme(<NumberInput defaultValue={0.1} step={0.2} />)
    press('ArrowUp')
    expect(field()).toHaveValue('0.3')
    type('8')
    press('ArrowUp')
    expect(field()).toHaveValue('8.2')
    unmount()
    renderWithTheme(<NumberInput />)
    press('ArrowUp')
    expect(field()).toHaveValue('1')
  })

  it('steps from the last number when what is typed is not one', () => {
    renderWithTheme(<NumberInput defaultValue={4} />)
    type('abc')
    press('ArrowUp')
    expect(field()).toHaveValue('5')
  })

  it('clamps a step to the range, and snaps it to the grid of the step when told', () => {
    const { unmount } = renderWithTheme(<NumberInput defaultValue={9.5} max={10} />)
    press('ArrowUp')
    expect(field()).toHaveValue('10')
    unmount()
    renderWithTheme(
      <NumberInput defaultValue={7} step={5} min={2} shouldSnapOnStep onChangeCommitted={vi.fn()} />
    )
    press('ArrowUp')
    expect(field()).toHaveValue('12')
  })

  it('goes to the ends of its range with Home and End, and has none to go to without one', () => {
    const { unmount } = renderWithTheme(<NumberInput defaultValue={5} min={1} max={9} />)
    press('End')
    expect(field()).toHaveValue('9')
    press('Home')
    expect(field()).toHaveValue('1')
    unmount()
    renderWithTheme(<NumberInput defaultValue={5} />)
    press('End')
    press('Home')
    expect(field()).toHaveValue('5')
  })

  it("ignores the keys it doesn't take", () => {
    renderWithTheme(<NumberInput defaultValue={5} />)
    press('a')
    expect(field()).toHaveValue('5')
  })

  it('takes no change when it is read-only or disabled', () => {
    const { unmount } = renderWithTheme(<NumberInput defaultValue={5} readOnly />)
    press('ArrowUp')
    press('End')
    press('Enter')
    expect(field()).toHaveValue('5')
    expect(field()).toHaveAttribute('readonly')
    unmount()
    renderWithTheme(<NumberInput defaultValue={5} disabled />)
    press('ArrowUp')
    expect(field()).toHaveValue('5')
    expect(field()).toBeDisabled()
  })

  it('writes and reads the number in its locale, in the format it is given', () => {
    const onChange = vi.fn()
    renderWithTheme(
      <NumberInput
        defaultValue={1234.5}
        locale="de-DE"
        format={{ useGrouping: true }}
        onChange={onChange}
      />
    )
    expect(field()).toHaveValue('1.234,5')
    type('2,5')
    expect(onChange).toHaveBeenLastCalledWith(2.5)
  })

  it('reads a percent as its fraction', () => {
    const onChange = vi.fn()
    renderWithTheme(
      <NumberInput
        defaultValue={0.5}
        locale="en-US"
        format={{ style: 'percent' }}
        onChange={onChange}
      />
    )
    expect(field()).toHaveValue('50%')
    type('25%')
    expect(onChange).toHaveBeenLastCalledWith(0.25)
  })

  it('submits the raw number through a hidden input, off when disabled', () => {
    const submitted = (props: Partial<NumberInputProps>) => {
      const { container, unmount } = renderWithTheme(
        <form>
          <NumberInput name="quantity" {...props} />
        </form>
      )
      const data = [...new FormData(container.querySelector('form')!).entries()]
      unmount()
      return data
    }
    expect(submitted({ defaultValue: 1234.5, locale: 'de-DE' })).toEqual([['quantity', '1234.5']])
    expect(submitted({})).toEqual([['quantity', '']])
    expect(submitted({ defaultValue: 3, disabled: true })).toEqual([])
    // The visible field carries no name of its own, so it isn't sent twice.
    expect(field).toThrow()
  })

  it('has no hidden input without a name', () => {
    const { container } = renderWithTheme(<NumberInput defaultValue={3} />)
    expect(container.querySelector('input[type="hidden"]')).toBeNull()
  })

  it('forwards its text, aria props, class, test id and space and width props', () => {
    renderWithTheme(
      <NumberInput
        placeholder="Qty"
        aria-labelledby="heading"
        aria-describedby="hint"
        className="mine"
        data-testid="field"
        id="own-id"
        autoFocus
        required
        p={1}
        width="200px"
      />
    )
    expect(field()).toHaveAttribute('placeholder', 'Qty')
    expect(field()).toHaveAttribute('aria-labelledby', 'heading')
    expect(field()).toHaveAttribute('aria-describedby', 'hint')
    expect(field()).toHaveAttribute('id', 'own-id')
    expect(field()).toBeRequired()
    expect(field()).toHaveFocus()
    expect(screen.getByTestId('field')).toHaveClass('mine')
    expect(screen.getByTestId('field')).toHaveStyle({ padding: baseTheme.space[1], width: '200px' })
  })

  it('sets its value in its color, a textColor winning over it', () => {
    renderWithTheme(
      <>
        <NumberInput color="error" data-testid="follows" />
        <NumberInput color="error" textColor="info" data-testid="wins" />
      </>
    )
    expect(screen.getByTestId('follows')).toHaveStyle({ color: baseTheme.palette.error.main })
    expect(screen.getByTestId('wins')).toHaveStyle({ color: baseTheme.text.info })
  })

  it('takes a frame, a size, colors and the full width of its room', () => {
    renderWithTheme(
      <NumberInput
        variant="outlined"
        size="lg"
        color="success"
        textColor="secondary"
        fullWidth
        error
        data-testid="field"
      />
    )
    const root = screen.getByTestId('field')
    expect(root).toHaveStyle({ display: 'flex', width: '100%', borderStyle: 'solid' })
    expect(root).toHaveStyle({ color: baseTheme.text.secondary })
    expect(field()).toHaveAttribute('aria-invalid', 'true')
    expect(field()).toHaveStyle({ paddingTop: baseTheme.space[baseTheme.sizes.lg.paddingTop] })
  })

  it('is off when disabled: dimmed and taking no pointer', () => {
    renderWithTheme(<NumberInput disabled data-testid="field" />)
    expect(screen.getByTestId('field')).toHaveStyle({ opacity: '0.5', pointerEvents: 'none' })
  })

  describe('spin buttons', () => {
    it('are stacked at the end by default - an increase over a decrease', () => {
      renderWithTheme(labelled({ defaultValue: 1 }))
      const buttons = screen.getAllByRole('button')
      expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual([
        'Increase',
        'Decrease',
      ])
      expect(buttons.every((button) => button.tabIndex === -1)).toBe(true)
      expect(field().nextElementSibling!.tagName).toBe('SPAN')
    })

    it('are either side of the field - a decrease before, an increase after', () => {
      renderWithTheme(labelled({ defaultValue: 1, spinButtons: 'sides' }))
      const buttons = screen.getAllByRole('button')
      expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual([
        'Decrease',
        'Increase',
      ])
      expect(field().previousElementSibling).toBe(buttons[0])
      expect(field().nextElementSibling).toBe(buttons[1])
      expect(field()).toHaveStyle({ textAlign: 'center' })
    })

    it('are none when told so', () => {
      renderWithTheme(<NumberInput spinButtons="none" />)
      expect(screen.queryAllByRole('button')).toHaveLength(0)
    })

    it("step on a click that no press came before - a key's or assistive technology's", () => {
      renderWithTheme(labelled({ defaultValue: 5 }))
      fireEvent.click(screen.getByRole('button', { name: 'Increase' }))
      expect(field()).toHaveValue('6')
      fireEvent.click(screen.getByRole('button', { name: 'Decrease' }))
      fireEvent.click(screen.getByRole('button', { name: 'Decrease' }))
      expect(field()).toHaveValue('4')
      // A click that follows a press is that press's, already stepped.
      fireEvent.click(screen.getByRole('button', { name: 'Increase' }), { detail: 1 })
      expect(field()).toHaveValue('4')
    })

    it('step on a press, and keep the focus in the field', () => {
      renderWithTheme(labelled({ defaultValue: 5 }))
      field().focus()
      const increase = screen.getByRole('button', { name: 'Increase' })
      expect(fireEvent.mouseDown(increase)).toBe(false)
      fireEvent.pointerDown(increase, { button: 0 })
      expect(field()).toHaveValue('6')
      expect(field()).toHaveFocus()
      fireEvent.pointerUp(increase)
    })

    it('ignore a press that is not the primary one', () => {
      renderWithTheme(labelled({ defaultValue: 5 }))
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Increase' }), { button: 2 })
      expect(field()).toHaveValue('5')
    })

    it('repeat while held, after a pause, and stop on release, leave and cancel', () => {
      vi.useFakeTimers()
      renderWithTheme(labelled({ defaultValue: 0 }))
      const increase = screen.getByRole('button', { name: 'Increase' })
      fireEvent.pointerDown(increase, { button: 0 })
      expect(field()).toHaveValue('1')
      act(() => vi.advanceTimersByTime(399))
      expect(field()).toHaveValue('1')
      // As a browser runs them: the field draws between one repeat and the next.
      act(() => vi.advanceTimersByTime(1))
      for (let tick = 0; tick < 3; tick += 1) act(() => vi.advanceTimersByTime(60))
      expect(field()).toHaveValue('4')
      fireEvent.pointerUp(increase)
      act(() => vi.advanceTimersByTime(1000))
      expect(field()).toHaveValue('4')
      for (const stop of [fireEvent.pointerLeave, fireEvent.pointerCancel]) {
        fireEvent.pointerDown(increase, { button: 0 })
        stop(increase)
        const held = field().value
        act(() => vi.advanceTimersByTime(1000))
        expect(field()).toHaveValue(held)
      }
    })

    it('stop repeating when the button goes off under the press, at the end of the range', () => {
      vi.useFakeTimers()
      const onChangeCommitted = vi.fn()
      renderWithTheme(labelled({ defaultValue: 8, max: 10, onChangeCommitted }))
      const increase = screen.getByRole('button', { name: 'Increase' })
      fireEvent.pointerDown(increase, { button: 0 })
      act(() => vi.advanceTimersByTime(400))
      for (let tick = 0; tick < 3; tick += 1) act(() => vi.advanceTimersByTime(60))
      expect(field()).toHaveValue('10')
      expect(increase).toBeDisabled()
      // No release came, yet nothing steps - or commits - again.
      const commits = onChangeCommitted.mock.calls.length
      act(() => vi.advanceTimersByTime(1000))
      expect(onChangeCommitted).toHaveBeenCalledTimes(commits)
    })

    it('are off at the ends of the range, and when the field takes no change', () => {
      const { unmount } = renderWithTheme(labelled({ defaultValue: 10, min: 0, max: 10 }))
      expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Decrease' })).toBeEnabled()
      fireEvent.click(screen.getByRole('button', { name: 'Decrease' }))
      fireEvent.click(screen.getByRole('button', { name: 'Increase' }))
      expect(field()).toHaveValue('10')
      unmount()
      const next = renderWithTheme(labelled({ defaultValue: 0, min: 0, max: 10 }))
      expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled()
      next.unmount()
      renderWithTheme(labelled({ defaultValue: 5, readOnly: true }))
      expect(
        screen.getAllByRole('button').every((button) => (button as HTMLButtonElement).disabled)
      ).toBe(true)
    })

    it('are both on with no number, whatever the range', () => {
      renderWithTheme(labelled({ min: 0, max: 10 }))
      expect(
        screen.getAllByRole('button').every((button) => (button as HTMLButtonElement).disabled)
      ).toBe(false)
    })

    it('stop holding when the field goes', () => {
      vi.useFakeTimers()
      const clear = vi.spyOn(window, 'clearInterval')
      const { unmount } = renderWithTheme(labelled({ defaultValue: 0 }))
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Increase' }), { button: 0 })
      act(() => vi.advanceTimersByTime(500))
      unmount()
      expect(clear).toHaveBeenCalled()
    })
  })

  describe('the wheel', () => {
    it('steps a focused field, up for a wheel up, with the page held still', () => {
      renderWithTheme(<NumberInput defaultValue={5} shouldScrubOnWheel />)
      field().focus()
      expect(fireEvent.wheel(field(), { deltaY: -10 })).toBe(false)
      expect(field()).toHaveValue('6')
      fireEvent.wheel(field(), { deltaY: 10 })
      fireEvent.wheel(field(), { deltaY: 10 })
      expect(field()).toHaveValue('4')
    })

    it('turns no number on a field that takes no change', () => {
      renderWithTheme(<NumberInput defaultValue={5} shouldScrubOnWheel readOnly />)
      field().focus()
      fireEvent.wheel(field(), { deltaY: -10 })
      expect(field()).toHaveValue('5')
    })

    it("does nothing to a field that isn't focused, or when it isn't asked to", () => {
      const { unmount } = renderWithTheme(<NumberInput defaultValue={5} shouldScrubOnWheel />)
      fireEvent.wheel(field(), { deltaY: -10 })
      expect(field()).toHaveValue('5')
      unmount()
      renderWithTheme(<NumberInput defaultValue={5} />)
      field().focus()
      fireEvent.wheel(field(), { deltaY: -10 })
      expect(field()).toHaveValue('5')
    })
  })

  describe('in a FormControl', () => {
    it('is targeted by its FormLabel, described by its helper text, and takes the id', () => {
      renderWithTheme(
        <FormControl id="quantity">
          <FormLabel>Quantity</FormLabel>
          <NumberInput />
          <FormHelperText>How many?</FormHelperText>
        </FormControl>
      )
      expect(field()).toHaveAttribute('id', 'quantity')
      expect(screen.getByLabelText('Quantity')).toBe(field())
      expect(field()).toHaveAccessibleDescription('How many?')
    })

    it("takes the field's size, error, disabled and required state - its own props winning", () => {
      const { unmount } = renderWithTheme(
        <FormControl size="sm" error required disabled>
          <NumberInput />
        </FormControl>
      )
      expect(field()).toHaveStyle({ paddingTop: baseTheme.space[baseTheme.sizes.sm.paddingTop] })
      expect(field()).toHaveAttribute('aria-invalid', 'true')
      expect(field()).toBeRequired()
      expect(field()).toBeDisabled()
      unmount()
      renderWithTheme(
        <FormControl size="sm" disabled>
          <NumberInput size="lg" disabled={false} />
        </FormControl>
      )
      expect(field()).toBeEnabled()
      expect(field()).toHaveStyle({ paddingTop: baseTheme.space[baseTheme.sizes.lg.paddingTop] })
    })

    it('is a block under its label in a field, and in a line out of one', () => {
      const { unmount } = renderWithTheme(
        <FormControl>
          <NumberInput data-testid="field" />
        </FormControl>
      )
      expect(screen.getByTestId('field')).toHaveStyle({ display: 'flex', width: 'fit-content' })
      unmount()
      renderWithTheme(<NumberInput data-testid="field" />)
      expect(screen.getByTestId('field')).toHaveStyle({ display: 'inline-flex' })
    })

    it("takes the field's colors and full width", () => {
      renderWithTheme(
        <FormControl color="success" textColor="secondary" fullWidth>
          <NumberInput data-testid="field" />
        </FormControl>
      )
      expect(screen.getByTestId('field')).toHaveStyle({
        color: baseTheme.text.secondary,
        width: '100%',
      })
    })
  })

  it("takes the theme's defaults for every field, its own props winning", () => {
    const theme = createTheme(baseTheme, {
      components: {
        NumberInput: {
          defaultProps: {
            variant: 'outlined',
            size: 'sm',
            color: 'success',
            spinButtons: 'sides',
            step: 5,
            smallStep: 1,
            largeStep: 50,
            shouldSnapOnStep: true,
            shouldScrubOnWheel: true,
            incrementLabel: 'Augmenter',
            decrementLabel: 'Diminuer',
          },
        },
      },
    })
    const { unmount } = render(<NumberInput defaultValue={0} data-testid="field" />, {
      wrapper: withTheme(theme),
    })
    expect(screen.getByRole('button', { name: 'Augmenter' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Diminuer' })).toBeInTheDocument()
    press('ArrowUp')
    expect(field()).toHaveValue('5')
    press('ArrowUp', { altKey: true })
    expect(field()).toHaveValue('5')
    press('ArrowUp', { shiftKey: true })
    expect(field()).toHaveValue('55')
    expect(screen.getByTestId('field')).toHaveStyle({ borderStyle: 'solid' })
    unmount()
    render(
      <NumberInput defaultValue={0} spinButtons="none" step={2} variant="underline" size="lg" />,
      { wrapper: withTheme(theme) }
    )
    expect(screen.queryAllByRole('button')).toHaveLength(0)
    press('ArrowUp')
    expect(field()).toHaveValue('2')
  })
})

describe('useHoldRepeat', () => {
  function Holder({ onRepeat }: Readonly<{ onRepeat: () => void }>) {
    const hold = useHoldRepeat(onRepeat, { delay: 100, interval: 10 })
    const count = useRef(0)
    const [, setTick] = useState(0)
    return (
      <button
        type="button"
        onPointerDown={() => {
          count.current += 1
          setTick(count.current)
          hold.start()
        }}
        onPointerUp={hold.stop}
      >
        hold
      </button>
    )
  }

  it('runs at once, then again every interval after the delay, until released', () => {
    vi.useFakeTimers()
    const onRepeat = vi.fn()
    renderWithTheme(<Holder onRepeat={onRepeat} />)
    const button = screen.getByRole('button')
    fireEvent.pointerDown(button)
    expect(onRepeat).toHaveBeenCalledTimes(1)
    act(() => vi.advanceTimersByTime(130))
    expect(onRepeat).toHaveBeenCalledTimes(4)
    fireEvent.pointerUp(button)
    act(() => vi.advanceTimersByTime(500))
    expect(onRepeat).toHaveBeenCalledTimes(4)
  })

  it('starts over when it is pressed again while held', () => {
    vi.useFakeTimers()
    const onRepeat = vi.fn()
    renderWithTheme(<Holder onRepeat={onRepeat} />)
    const button = screen.getByRole('button')
    fireEvent.pointerDown(button)
    act(() => vi.advanceTimersByTime(50))
    fireEvent.pointerDown(button)
    expect(onRepeat).toHaveBeenCalledTimes(2)
    act(() => vi.advanceTimersByTime(99))
    expect(onRepeat).toHaveBeenCalledTimes(2)
  })
})
