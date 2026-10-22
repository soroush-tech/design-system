import { describe, it, expect, vi, afterEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { ThemeProvider } from '../theme'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { Rating } from './Rating'

afterEach(() => vi.restoreAllMocks())

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const radio = (name: string) => screen.getByRole('radio', { name })
const radios = () => screen.getAllByRole('radio')
const group = () => screen.getByRole('radiogroup')
const iconOf = (name: string) => radio(name).closest('label')!.firstElementChild as HTMLElement
// A filled item is in the rating's color, an empty one quiet - read off the icons.
const filledCount = () =>
  radios().filter(
    (item) =>
      getComputedStyle(item.closest('label')!.firstElementChild!).color ===
      getComputedStyle(iconOf('1')).color
  ).length
const toRgb = (hex: string) => {
  const [red, green, blue] = [1, 3, 5].map((start) =>
    Number.parseInt(hex.slice(start, start + 2), 16)
  )
  return `rgb(${red}, ${green}, ${blue})`
}
const isFilled = (name: string) =>
  getComputedStyle(iconOf(name)).color === toRgb(baseTheme.palette.warning.main)

// jsdom lays nothing out: the pointer needs a box to be along.
const layOut = (width = 100, left = 0) =>
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    left,
    right: left + width,
    width,
    top: 0,
    bottom: 20,
    height: 20,
    x: left,
    y: 0,
    toJSON: () => ({}),
  })

describe('Rating', () => {
  it('is a group of radios, one per item, named by their number, none chosen at first', () => {
    renderWithTheme(<Rating />)
    expect(group().tagName).toBe('SPAN')
    expect(radios()).toHaveLength(5)
    expect(radios().map((item) => item.getAttribute('value'))).toEqual(['1', '2', '3', '4', '5'])
    expect(radio('3')).toBeInTheDocument()
    expect(radios().some((item) => (item as HTMLInputElement).checked)).toBe(false)
  })

  it('names each item by getLabelText, and the radios share one name', () => {
    renderWithTheme(
      <Rating max={3} getLabelText={(value) => `${value} of 3`} name="quality" defaultValue={2} />
    )
    expect(radio('2 of 3')).toBeChecked()
    expect(radios().map((item) => item.getAttribute('name'))).toEqual([
      'quality',
      'quality',
      'quality',
    ])
  })

  it('generates a name of its own, unique to each rating', () => {
    renderWithTheme(
      <>
        <Rating max={1} />
        <Rating max={1} />
      </>
    )
    const [first, second] = radios().map((item) => item.getAttribute('name'))
    expect(first).toBeTruthy()
    expect(first).not.toBe(second)
  })

  it('fills every item up to the rating, and changes it when one is chosen', () => {
    const onChange = vi.fn()
    renderWithTheme(<Rating defaultValue={2} onChange={onChange} />)
    expect(radio('2')).toBeChecked()
    expect(isFilled('1')).toBe(true)
    expect(isFilled('2')).toBe(true)
    expect(isFilled('3')).toBe(false)
    fireEvent.click(radio('4'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 4)
    expect(radio('4')).toBeChecked()
    expect(filledCount()).toBe(4)
  })

  it('follows a controlled value, and null is none', () => {
    const onChange = vi.fn()
    const { rerender } = renderWithTheme(<Rating value={2} onChange={onChange} />)
    fireEvent.click(radio('5'))
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 5)
    expect(radio('2')).toBeChecked()
    rerender(<Rating value={3} onChange={onChange} />)
    expect(radio('3')).toBeChecked()
    rerender(<Rating value={null} onChange={onChange} />)
    expect(radios().some((item) => (item as HTMLInputElement).checked)).toBe(false)
  })

  it('goes by halves with a precision of 0.5, rounding the rating to it', () => {
    renderWithTheme(<Rating precision={0.5} value={2.3} />)
    expect(radios()).toHaveLength(10)
    expect(
      radios()
        .map((item) => item.getAttribute('value'))
        .slice(0, 4)
    ).toEqual(['0.5', '1', '1.5', '2'])
    expect(radio('2.5')).toBeChecked()
  })

  it('previews the value under the pointer, telling onChangeActive, and ends with it', () => {
    layOut()
    const onChangeActive = vi.fn()
    renderWithTheme(<Rating defaultValue={1} onChangeActive={onChangeActive} />)
    fireEvent.mouseMove(group(), { clientX: 50 })
    expect(onChangeActive).toHaveBeenCalledWith(expect.anything(), 3)
    expect(filledCount()).toBe(3)
    // The same place again changes nothing to tell.
    fireEvent.mouseMove(group(), { clientX: 52 })
    expect(onChangeActive).toHaveBeenCalledTimes(1)
    expect(getComputedStyle(iconOf('3')).transform).toBe('scale(1.2)')
    fireEvent.mouseLeave(group())
    expect(onChangeActive).toHaveBeenLastCalledWith(expect.anything(), -1)
    expect(filledCount()).toBe(1)
    expect(getComputedStyle(iconOf('1')).transform).toBe('none')
  })

  it('has nothing to tell when the pointer leaves a rating it never entered', () => {
    const onChangeActive = vi.fn()
    renderWithTheme(<Rating onChangeActive={onChangeActive} />)
    fireEvent.mouseLeave(group())
    expect(onChangeActive).not.toHaveBeenCalled()
  })

  it('ignores the pointer when it has no box to be along', () => {
    const onChangeActive = vi.fn()
    renderWithTheme(<Rating onChangeActive={onChangeActive} />)
    fireEvent.mouseMove(group(), { clientX: 50 })
    expect(onChangeActive).not.toHaveBeenCalled()
  })

  it('measures the pointer from the right edge right to left', () => {
    layOut(100, 0)
    const onChangeActive = vi.fn()
    render(
      <div dir="rtl">
        <ThemeProvider>
          <Rating onChangeActive={onChangeActive} />
        </ThemeProvider>
      </div>
    )
    fireEvent.mouseMove(group(), { clientX: 90 })
    expect(onChangeActive).toHaveBeenCalledWith(expect.anything(), 1)
  })

  it("takes the pointer's value over the key's when both change at once", () => {
    layOut()
    const onChange = vi.fn()
    renderWithTheme(<Rating onChange={onChange} />)
    fireEvent.mouseMove(group(), { clientX: 50 })
    fireEvent.click(radio('4'), { clientX: 50, clientY: 5 })
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 3)
  })

  it('clears the chosen item when it is pressed again, but not from the keys', () => {
    const onChange = vi.fn()
    renderWithTheme(<Rating defaultValue={3} onChange={onChange} emptyLabelText="None" />)
    // A key's click has no position.
    fireEvent.click(radio('3'))
    expect(onChange).not.toHaveBeenCalled()
    expect(radio('3')).toBeChecked()
    fireEvent.click(radio('3'), { clientX: 5, clientY: 5 })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), null)
    expect(radio('None')).toBeChecked()
  })

  it("doesn't report a clear when a press chooses another item", () => {
    const onChange = vi.fn()
    renderWithTheme(<Rating defaultValue={3} onChange={onChange} />)
    fireEvent.click(radio('4'), { clientX: 5, clientY: 5 })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 4)
  })

  it('shows the focused item, then the rating again when focus goes', () => {
    renderWithTheme(<Rating defaultValue={1} />)
    fireEvent.focus(radio('3'))
    expect(filledCount()).toBe(3)
    fireEvent.blur(radio('3'))
    expect(filledCount()).toBe(1)
  })

  it('keeps the hovered value when a blur comes while the pointer is on it', () => {
    layOut()
    renderWithTheme(<Rating defaultValue={1} />)
    fireEvent.mouseMove(group(), { clientX: 50 })
    fireEvent.blur(radio('3'))
    expect(filledCount()).toBe(3)
  })

  it('draws a "no rating" radio only when it is named, and choosing it clears the rating', () => {
    const onChange = vi.fn()
    const { unmount } = renderWithTheme(<Rating defaultValue={2} />)
    expect(radios()).toHaveLength(5)
    unmount()
    renderWithTheme(<Rating defaultValue={2} emptyLabelText="No rating" onChange={onChange} />)
    expect(radios()).toHaveLength(6)
    expect(radio('No rating')).not.toBeChecked()
    fireEvent.click(radio('No rating'))
    expect(onChange).toHaveBeenCalledWith(expect.anything(), null)
    expect(radio('No rating')).toBeChecked()
  })

  it('fills only the chosen item with highlightSelectedOnly', () => {
    renderWithTheme(<Rating defaultValue={3} highlightSelectedOnly />)
    expect([isFilled('1'), isFilled('2'), isFilled('3'), isFilled('4')]).toEqual([
      false,
      false,
      true,
      false,
    ])
  })

  it('draws the icons it is given', () => {
    renderWithTheme(
      <Rating
        max={2}
        defaultValue={1}
        icon={<i data-testid="full" />}
        emptyIcon={<i data-testid="empty" />}
      />
    )
    expect(screen.getAllByTestId('full')).toHaveLength(1)
    expect(screen.getAllByTestId('empty')).toHaveLength(1)
  })

  it("is one image named by its rating when it is read-only, with no radios and no hover's reach", () => {
    renderWithTheme(<Rating readOnly value={3.2} getLabelText={(value) => `${value} stars`} />)
    expect(screen.queryAllByRole('radio')).toHaveLength(0)
    expect(screen.getByRole('img', { name: '3 stars' })).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveStyle({ pointerEvents: 'none' })
  })

  it('names a read-only rating with no value 0, or as it is told', () => {
    const { unmount } = renderWithTheme(<Rating readOnly />)
    expect(screen.getByRole('img', { name: '0' })).toBeInTheDocument()
    unmount()
    renderWithTheme(<Rating readOnly aria-label="Average" value={4} />)
    expect(screen.getByRole('img', { name: 'Average' })).toBeInTheDocument()
  })

  it('draws a read-only fractional rating with the steps of its icons', () => {
    renderWithTheme(<Rating readOnly precision={0.5} value={2.5} max={3} />)
    const icons = screen.getByRole('img').querySelectorAll('span > span')
    expect(icons.length).toBeGreaterThan(3)
  })

  it('shares an icon among its steps, the one at the chosen value spanning part of it', () => {
    renderWithTheme(<Rating precision={0.5} defaultValue={1.5} max={2} />)
    // Item 1 holds 0.5 and 1, item 2 holds 1.5 and 2: the last of each is the whole icon.
    expect(radio('0.5').closest('label')).toHaveStyle({ width: '0%', position: 'absolute' })
    expect(radio('1.5').closest('label')).toHaveStyle({ width: '50%', position: 'absolute' })
    expect(radio('1').closest('label')).not.toHaveStyle({ position: 'absolute' })
    expect(radio('2').closest('label')).not.toHaveStyle({ position: 'absolute' })
    // A part's label clips its icon rather than squeezing it.
    expect(iconOf('1.5')).toHaveStyle({ width: 'max-content' })
  })

  it('is off when disabled: its radios disabled, taking no pointer, with no "no rating" radio', () => {
    renderWithTheme(<Rating disabled defaultValue={2} emptyLabelText="None" />)
    expect(radios()).toHaveLength(5)
    expect(radios().every((item) => (item as HTMLInputElement).disabled)).toBe(true)
    expect(group()).toHaveStyle({ pointerEvents: 'none', opacity: '0.5' })
  })

  it('submits its rating in a form - none when disabled or read-only', () => {
    const submitted = (ui: ReactNode) => {
      const { container, unmount } = renderWithTheme(<form>{ui}</form>)
      const data = [...new FormData(container.querySelector('form')!).entries()]
      unmount()
      return data
    }
    expect(submitted(<Rating name="rating" defaultValue={2} />)).toEqual([['rating', '2']])
    expect(submitted(<Rating name="rating" />)).toEqual([])
    expect(submitted(<Rating name="rating" defaultValue={2} disabled />)).toEqual([])
    expect(submitted(<Rating name="rating" defaultValue={2} readOnly />)).toEqual([])
    expect(submitted(<Rating name="rating" emptyLabelText="None" />)).toEqual([['rating', '']])
  })

  it('marks its radios required, and its group', () => {
    renderWithTheme(<Rating required error />)
    expect(radios().every((item) => (item as HTMLInputElement).required)).toBe(true)
    expect(group()).toHaveAttribute('aria-required', 'true')
    expect(group()).toHaveAttribute('aria-invalid', 'true')
  })

  it('forwards the aria props, class, test id and space props to its group', () => {
    renderWithTheme(
      <Rating
        aria-label="Quality"
        aria-describedby="hint"
        className="mine"
        data-testid="rating"
        id="own-id"
        p={1}
      />
    )
    const root = screen.getByTestId('rating')
    expect(root).toBe(group())
    expect(root).toHaveAttribute('aria-label', 'Quality')
    expect(root).toHaveAttribute('aria-describedby', 'hint')
    expect(root).toHaveClass('mine')
    expect(root).toHaveAttribute('id', 'own-id')
    expect(root).toHaveStyle({ padding: baseTheme.space[1] })
  })

  it('takes size and color: the icons as large as the theme says, in the color it is given', () => {
    renderWithTheme(<Rating size="lg" color="success" defaultValue={1} />)
    expect(group()).toHaveStyle({ fontSize: baseTheme.icon.lg })
    expect(getComputedStyle(iconOf('1')).color).not.toBe(getComputedStyle(iconOf('3')).color)
  })

  it('colors its empty items with the error color when it is in error', () => {
    renderWithTheme(<Rating error defaultValue={1} />)
    const error = getComputedStyle(iconOf('3')).color
    expect(error).not.toBe(getComputedStyle(iconOf('1')).color)
    expect(error).toBe(
      getComputedStyle(
        renderWithTheme(<Rating error color="error" defaultValue={5} />).container.querySelector(
          'label > span'
        )!
      ).color
    )
  })

  describe('in a FormControl', () => {
    it('is named by its FormLabel, described by its helper text, and takes the id', () => {
      renderWithTheme(
        <FormControl id="quality">
          <FormLabel>Quality</FormLabel>
          <Rating />
          <FormHelperText>How was it?</FormHelperText>
        </FormControl>
      )
      const found = screen.getByRole('radiogroup', { name: 'Quality' })
      expect(found).toHaveAttribute('id', 'quality')
      expect(found).toHaveAttribute('aria-describedby', 'quality-helper')
      expect(found).toHaveAccessibleDescription('How was it?')
    })

    it('is a block under its label in a field, and in a line out of one', () => {
      const { unmount } = renderWithTheme(
        <FormControl>
          <Rating />
        </FormControl>
      )
      expect(group()).toHaveStyle({ display: 'flex' })
      unmount()
      renderWithTheme(<Rating />)
      expect(group()).toHaveStyle({ display: 'inline-flex' })
    })

    it('has no label to point at without a FormLabel', () => {
      renderWithTheme(
        <FormControl id="quality">
          <Rating />
        </FormControl>
      )
      expect(group()).not.toHaveAttribute('aria-labelledby')
      expect(group()).not.toHaveAttribute('aria-describedby')
    })

    it("takes the field's size, color, error, disabled and required state - its own props winning", () => {
      const { unmount } = renderWithTheme(
        <FormControl size="sm" error required disabled>
          <Rating />
        </FormControl>
      )
      expect(group()).toHaveStyle({ fontSize: baseTheme.icon.sm })
      expect(group()).toHaveAttribute('aria-invalid', 'true')
      expect(radios().every((item) => (item as HTMLInputElement).disabled)).toBe(true)
      unmount()
      renderWithTheme(
        <FormControl size="sm" disabled>
          <Rating size="lg" disabled={false} error={false} />
        </FormControl>
      )
      expect(group()).toHaveStyle({ fontSize: baseTheme.icon.lg })
      expect(radios().every((item) => !(item as HTMLInputElement).disabled)).toBe(true)
    })
  })

  it("takes the theme's defaults for every rating, its own props winning", () => {
    const theme = createTheme(baseTheme, {
      components: {
        Rating: {
          defaultProps: {
            max: 3,
            precision: 0.5,
            highlightSelectedOnly: true,
            size: 'sm',
            color: 'success',
          },
        },
      },
    })
    const { unmount } = render(<Rating />, { wrapper: withTheme(theme) })
    expect(radios()).toHaveLength(6)
    expect(group()).toHaveStyle({ fontSize: baseTheme.icon.sm })
    unmount()
    render(<Rating max={4} precision={1} size="lg" highlightSelectedOnly={false} />, {
      wrapper: withTheme(theme),
    })
    expect(radios()).toHaveLength(4)
    expect(group()).toHaveStyle({ fontSize: baseTheme.icon.lg })
  })
})
