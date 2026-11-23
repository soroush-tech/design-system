import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { useState } from 'react'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Autocomplete, type AutocompleteProps } from './Autocomplete'

const CITIES = ['Berlin', 'Lisbon', 'Oslo', 'Rome']

const view = (props: Partial<AutocompleteProps<string, boolean>> = {}) => (
  <Autocomplete
    options={CITIES}
    aria-label="City"
    noOptionsText="Nothing"
    {...(props as Partial<AutocompleteProps<string>>)}
  />
)
const input = () => screen.getByRole('combobox')
const listbox = () => screen.getByRole('listbox')
const noListbox = () => expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
const options = () => screen.getAllByRole('option').map((option) => option.textContent)
const key = (name: string) => fireEvent.keyDown(input(), { key: name })
const type = (text: string) => fireEvent.change(input(), { target: { value: text } })

describe('Autocomplete', () => {
  it('is a combobox with a collapsed list', () => {
    renderWithTheme(view({ placeholder: 'Pick' }))
    expect(input()).toHaveAttribute('aria-expanded', 'false')
    expect(input()).toHaveAttribute('aria-autocomplete', 'list')
    expect(input()).toHaveAttribute('placeholder', 'Pick')
    noListbox()
  })

  it('opens on typing and narrows the options to those that hold the text', () => {
    renderWithTheme(view())
    type('o')
    expect(input()).toHaveAttribute('aria-expanded', 'true')
    expect(input()).toHaveAttribute('aria-controls', listbox().id)
    expect(options()).toEqual(['Lisbon', 'Oslo', 'Rome'])
    type('OS')
    expect(options()).toEqual(['Oslo'])
  })

  it('says there is nothing, or stays closed without words for it', () => {
    const { rerender } = renderWithTheme(view())
    type('zzz')
    expect(screen.getByText('Nothing')).toBeInTheDocument()
    rerender(view({ noOptionsText: undefined }))
    noListbox()
  })

  it('says it is loading while there is nothing to list', () => {
    renderWithTheme(view({ options: [], isLoading: true, loadingText: 'Loading' }))
    fireEvent.focus(input())
    key('ArrowDown')
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('chooses an option on click and shows its label', () => {
    const onChange = vi.fn()
    const onInputChange = vi.fn()
    renderWithTheme(view({ onChange, onInputChange }))
    type('r')
    fireEvent.click(screen.getByRole('option', { name: 'Rome' }))
    expect(input()).toHaveValue('Rome')
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 'Rome', 'selectOption')
    expect(onInputChange).toHaveBeenLastCalledWith(expect.anything(), 'Rome', 'reset')
    noListbox()
    // Opened again: the whole list shows, the chosen option marked.
    key('ArrowDown')
    expect(options()).toEqual(CITIES)
    expect(screen.getByRole('option', { name: 'Rome' })).toHaveAttribute('aria-selected', 'true')
  })

  it('walks the list with the arrow keys, round the ends, and chooses with Enter', () => {
    const onChange = vi.fn()
    renderWithTheme(view({ onChange }))
    key('ArrowDown')
    expect(input()).not.toHaveAttribute('aria-activedescendant')
    key('ArrowDown')
    expect(screen.getByRole('option', { name: 'Berlin' }).id).toBe(
      input().getAttribute('aria-activedescendant')
    )
    key('ArrowUp')
    expect(screen.getByRole('option', { name: 'Rome' }).id).toBe(
      input().getAttribute('aria-activedescendant')
    )
    key('ArrowDown')
    expect(screen.getByRole('option', { name: 'Berlin' }).id).toBe(
      input().getAttribute('aria-activedescendant')
    )
    key('ArrowDown')
    key('Enter')
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 'Lisbon', 'selectOption')
  })

  it('starts from the last option with ArrowUp when none is highlighted', () => {
    renderWithTheme(view())
    key('ArrowUp')
    key('ArrowUp')
    expect(screen.getByRole('option', { name: 'Rome' }).id).toBe(
      input().getAttribute('aria-activedescendant')
    )
  })

  it('goes to the ends with Home and End only while the list is being walked', () => {
    renderWithTheme(view())
    key('Home')
    noListbox()
    key('ArrowDown')
    key('End')
    expect(input()).not.toHaveAttribute('aria-activedescendant')
    key('ArrowDown')
    key('End')
    expect(screen.getByRole('option', { name: 'Rome' }).id).toBe(
      input().getAttribute('aria-activedescendant')
    )
    key('Home')
    expect(screen.getByRole('option', { name: 'Berlin' }).id).toBe(
      input().getAttribute('aria-activedescendant')
    )
  })

  it('closes on Escape, and ignores it while closed', () => {
    renderWithTheme(view())
    key('Escape')
    noListbox()
    key('ArrowDown')
    expect(listbox()).toBeInTheDocument()
    key('Escape')
    noListbox()
  })

  it('does nothing for other keys and for Enter with nothing highlighted', () => {
    const onChange = vi.fn()
    renderWithTheme(view({ onChange }))
    key('a')
    key('Enter')
    key('Backspace')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('highlights the option under the pointer', () => {
    renderWithTheme(view())
    key('ArrowDown')
    const oslo = screen.getByRole('option', { name: 'Oslo' })
    fireEvent.mouseMove(oslo)
    expect(input()).toHaveAttribute('aria-activedescendant', oslo.id)
    // Moving again over the same option changes nothing.
    fireEvent.mouseMove(oslo)
    expect(input()).toHaveAttribute('aria-activedescendant', oslo.id)
  })

  it('keeps the focus in the field when the list or the frame is pressed', () => {
    renderWithTheme(view({ openLabel: 'Open', closeLabel: 'Close' }))
    key('ArrowDown')
    const press = (target: Element) => {
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
      target.dispatchEvent(event)
      return event.defaultPrevented
    }
    expect(press(listbox().parentElement as Element)).toBe(true)
    expect(press(screen.getByRole('button', { name: 'Close' }))).toBe(true)
    // A press on the frame itself puts the cursor in the field; on a child it does not.
    const frame = input().parentElement as Element
    expect(press(frame)).toBe(true)
    expect(input()).toHaveFocus()
    expect(press(input())).toBe(false)
  })

  it('opens and closes with its indicator, named by the words it is given', () => {
    renderWithTheme(view({ openLabel: 'Open', closeLabel: 'Close' }))
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(listbox()).toBeInTheDocument()
    expect(input()).toHaveFocus()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    noListbox()
  })

  it('hides an indicator that has no name from the tree', () => {
    renderWithTheme(view())
    const indicator = input().parentElement?.querySelector('button') as HTMLElement
    expect(indicator).toHaveAttribute('aria-hidden', 'true')
    fireEvent.click(indicator)
    expect(indicator).toHaveAttribute('aria-hidden', 'true')
  })

  it('clears the choice and the text, when it is given a name for the control', () => {
    const onChange = vi.fn()
    const onInputChange = vi.fn()
    renderWithTheme(view({ defaultValue: 'Oslo', clearLabel: 'Clear', onChange, onInputChange }))
    expect(input()).toHaveValue('Oslo')
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
    expect(input()).toHaveValue('')
    expect(onChange).toHaveBeenCalledWith(expect.anything(), null, 'clear')
    expect(onInputChange).toHaveBeenCalledWith(expect.anything(), '', 'clear')
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
  })

  it('has no clear control without its name', () => {
    renderWithTheme(view({ defaultValue: 'Oslo' }))
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
  })

  it('puts back the chosen label when the field is left with text that matches no choice', () => {
    renderWithTheme(view({ defaultValue: 'Oslo' }))
    type('zz')
    fireEvent.blur(input())
    expect(input()).toHaveValue('Oslo')
    noListbox()
    // Left with nothing typed: nothing to put back.
    fireEvent.blur(input())
    expect(input()).toHaveValue('Oslo')
  })

  it('takes a typed text as the value with free text, on Enter and on leaving', () => {
    const onChange = vi.fn()
    renderWithTheme(view({ shouldAllowFreeText: true, onChange }))
    type('Paris')
    key('Enter')
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 'Paris', 'createOption')
    expect(input()).toHaveValue('Paris')
    type('Rio')
    fireEvent.blur(input())
    expect(onChange).toHaveBeenLastCalledWith(expect.anything(), 'Rio', 'createOption')
    // Left as it is, or emptied: nothing to create.
    onChange.mockClear()
    type('')
    fireEvent.blur(input())
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not create a text that is the chosen label, nor with free text off', () => {
    const onChange = vi.fn()
    renderWithTheme(view({ shouldAllowFreeText: true, defaultValue: 'Oslo', onChange }))
    type('Oslo')
    fireEvent.blur(input())
    expect(onChange).not.toHaveBeenCalled()
  })

  describe('multiple', () => {
    it('adds options as chips, toggles them off, and empties the text', () => {
      const onChange = vi.fn()
      renderWithTheme(view({ multiple: true, onChange, getRemoveLabel: (l) => `Remove ${l}` }))
      type('o')
      fireEvent.click(screen.getByRole('option', { name: 'Oslo' }))
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), ['Oslo'], 'selectOption')
      expect(input()).toHaveValue('')
      expect(listbox()).toHaveAttribute('aria-multiselectable', 'true')
      expect(screen.getByRole('button', { name: 'Remove Oslo' })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('option', { name: 'Oslo' }))
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), [], 'removeOption')
      expect(screen.queryByRole('button', { name: 'Remove Oslo' })).not.toBeInTheDocument()
    })

    it('removes a chip with its control, and the last one with Backspace in an empty field', () => {
      const onChange = vi.fn()
      renderWithTheme(
        view({
          multiple: true,
          defaultValue: ['Oslo', 'Rome'],
          onChange,
          getRemoveLabel: (l) => `Remove ${l}`,
        })
      )
      fireEvent.click(screen.getByRole('button', { name: 'Remove Oslo' }))
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), ['Rome'], 'removeOption')
      key('Backspace')
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), [], 'removeOption')
      key('Backspace')
      expect(onChange).toHaveBeenCalledTimes(2)
    })

    it('leaves the chips be on Backspace while there is text', () => {
      const onChange = vi.fn()
      renderWithTheme(view({ multiple: true, defaultValue: ['Oslo'], onChange }))
      type('x')
      key('Backspace')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('has chips with no remove control without the words for it', () => {
      renderWithTheme(view({ multiple: true, defaultValue: ['Oslo'] }))
      expect(screen.getByText('Oslo')).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('creates free text as one more chip', () => {
      const onChange = vi.fn()
      renderWithTheme(view({ multiple: true, shouldAllowFreeText: true, onChange }))
      type('Paris')
      key('Enter')
      expect(onChange).toHaveBeenCalledWith(expect.anything(), ['Paris'], 'createOption')
      expect(input()).toHaveValue('')
    })

    it('clears all chips', () => {
      const onChange = vi.fn()
      renderWithTheme(
        view({ multiple: true, defaultValue: ['Oslo'], clearLabel: 'Clear', onChange })
      )
      fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
      expect(onChange).toHaveBeenCalledWith(expect.anything(), [], 'clear')
    })

    it('disables its chips with the field', () => {
      renderWithTheme(
        view({
          multiple: true,
          disabled: true,
          defaultValue: ['Oslo'],
          getRemoveLabel: (l) => `Remove ${l}`,
        })
      )
      expect(screen.getByRole('button', { name: 'Remove Oslo' })).toBeDisabled()
    })
  })

  describe('controlled', () => {
    it('takes its value and its text from its owner', () => {
      const onChange = vi.fn()
      const onInputChange = vi.fn()
      const { rerender } = renderWithTheme(
        view({ value: 'Oslo', inputValue: 'Os', onChange, onInputChange })
      )
      expect(input()).toHaveValue('Os')
      type('Osl')
      expect(onInputChange).toHaveBeenCalledWith(expect.anything(), 'Osl', 'input')
      expect(input()).toHaveValue('Os')
      rerender(view({ value: 'Rome', inputValue: 'Osl' }))
      expect(input()).toHaveValue('Osl')
    })

    it('follows a value its owner sets', () => {
      const Owned = () => {
        const [value, setValue] = useState<string | null>('Lisbon')
        return (
          <>
            <button type="button" onClick={() => setValue('Rome')}>
              Set
            </button>
            <Autocomplete
              options={CITIES}
              aria-label="City"
              value={value}
              onChange={(_, next) => setValue(next)}
            />
          </>
        )
      }
      renderWithTheme(<Owned />)
      expect(input()).toHaveValue('Lisbon')
      fireEvent.click(screen.getByRole('button', { name: 'Set' }))
      expect(input()).toHaveValue('Rome')
    })
  })

  describe('options of other types', () => {
    const PLACES = [
      { label: 'Austria', continent: 'Europe' },
      { label: 'Germany', continent: 'Europe' },
      { label: 'Japan', continent: 'Asia' },
    ]

    it('says an object by its label, and compares by a function', () => {
      const onChange = vi.fn()
      renderWithTheme(
        <Autocomplete
          options={PLACES}
          aria-label="Place"
          defaultValue={{ label: 'Japan', continent: 'Asia' }}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          onChange={onChange}
        />
      )
      expect(input()).toHaveValue('Japan')
      key('ArrowDown')
      expect(screen.getByRole('option', { name: 'Japan' })).toHaveAttribute('aria-selected', 'true')
    })

    it('says an object with no label by its text', () => {
      renderWithTheme(<Autocomplete options={[{ id: 1 }]} aria-label="Place" />)
      key('ArrowDown')
      expect(options()).toEqual(['[object Object]'])
    })

    it('groups options under headings, counting them across the groups', () => {
      renderWithTheme(
        <Autocomplete options={PLACES} aria-label="Place" groupBy={(place) => place.continent} />
      )
      key('ArrowDown')
      const groups = screen.getAllByRole('group')
      expect(groups).toHaveLength(2)
      expect(groups[0]).toHaveAccessibleName('Europe')
      expect(groups[1]).toHaveAccessibleName('Asia')
      key('ArrowUp')
      expect(screen.getByRole('option', { name: 'Japan' }).id).toBe(
        input().getAttribute('aria-activedescendant')
      )
    })

    it('draws a row of its own, told if it is chosen and highlighted', () => {
      renderWithTheme(
        <Autocomplete
          options={CITIES}
          aria-label="City"
          defaultValue="Oslo"
          renderOption={(option, { isSelected, isHighlighted }) =>
            `${option}:${isSelected ? 'chosen' : 'free'}:${isHighlighted ? 'lit' : 'dim'}`
          }
        />
      )
      key('ArrowDown')
      key('ArrowDown')
      expect(options()).toEqual([
        'Berlin:free:lit',
        'Lisbon:free:dim',
        'Oslo:chosen:dim',
        'Rome:free:dim',
      ])
    })

    it('filters with a function of its own', () => {
      renderWithTheme(
        view({
          filterOptions: (list, { inputValue }) => list.filter((o) => o.startsWith(inputValue)),
        })
      )
      type('R')
      expect(options()).toEqual(['Rome'])
    })

    it('says an option by a function of its own', () => {
      renderWithTheme(
        <Autocomplete
          options={[1, 2]}
          aria-label="Number"
          getOptionLabel={(n) => `No. ${n}`}
          defaultValue={2}
        />
      )
      expect(input()).toHaveValue('No. 2')
    })
  })

  describe('disabled', () => {
    it('does not open, and has no live indicator', () => {
      renderWithTheme(view({ disabled: true, defaultValue: 'Oslo', clearLabel: 'Clear' }))
      expect(input()).toBeDisabled()
      key('ArrowDown')
      noListbox()
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
    })
  })

  describe('in a FormControl', () => {
    it('is named by its label, described by its helper text, and takes its state', () => {
      renderWithTheme(
        <FormControl error required size="sm" color="secondary">
          <FormLabel>City</FormLabel>
          <Autocomplete options={CITIES} noOptionsText="Nothing" />
          <FormHelperText>Where you live</FormHelperText>
        </FormControl>
      )
      expect(input()).toHaveAccessibleName(/City/)
      expect(input()).toHaveAccessibleDescription('Where you live')
      expect(input()).toHaveAttribute('aria-invalid', 'true')
      expect(input()).toBeRequired()
      expect(screen.getByText(/^City/).closest('label')).toHaveAttribute('for', input().id)
    })

    it('is not required once something is chosen', () => {
      renderWithTheme(view({ required: true, multiple: true, defaultValue: ['Oslo'] }))
      expect(input()).not.toBeRequired()
    })

    it('can name itself by another element and describe itself', () => {
      renderWithTheme(
        <>
          <span id="name">Where</span>
          <span id="hint">A city</span>
          <Autocomplete
            options={CITIES}
            aria-labelledby="name"
            aria-describedby="hint"
            fullWidth
            error
            name="city"
            id="city"
            className="mine"
            data-testid="auto"
          />
        </>
      )
      expect(input()).toHaveAccessibleName('Where')
      expect(input()).toHaveAccessibleDescription('A city')
      expect(input()).toHaveAttribute('name', 'city')
      expect(screen.getByTestId('auto')).toHaveClass('mine')
    })
  })

  describe('layout', () => {
    it('places its list under a field in a right-to-left page', () => {
      renderWithTheme(
        <div dir="rtl">
          <Autocomplete options={CITIES} aria-label="City" layer="tooltip" variant="outlined" />
        </div>
      )
      key('ArrowDown')
      expect(listbox()).toBeInTheDocument()
    })

    it('makes its list as wide as the field', () => {
      renderWithTheme(view())
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        width: 240,
        height: 40,
        top: 0,
        left: 0,
        right: 240,
        bottom: 40,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      })
      key('ArrowDown')
      expect((listbox().parentElement as HTMLElement).style.minWidth).toBe('240px')
      vi.restoreAllMocks()
    })
  })

  describe('looks', () => {
    const frame = () => input().parentElement as HTMLElement
    const popup = () => listbox().parentElement as HTMLElement

    it('has a square frame and list, in the focus color, by default', () => {
      renderWithTheme(view({ variant: 'outlined' }))
      key('ArrowDown')
      expect(frame()).toHaveStyle({
        borderRadius: baseTheme.radii.sq,
        color: baseTheme.palette.primary.main,
      })
      expect(popup()).toHaveStyle({
        borderRadius: baseTheme.radii.sq,
        backgroundColor: baseTheme.background.modal,
      })
    })

    it('takes a radius, a text color and a list background of its own', () => {
      renderWithTheme(
        view({ variant: 'outlined', borderRadius: 'lg', textColor: 'secondary', bg: 'paper' })
      )
      key('ArrowDown')
      expect(frame()).toHaveStyle({
        borderRadius: baseTheme.radii.lg,
        color: baseTheme.text.secondary,
      })
      expect(popup()).toHaveStyle({
        borderRadius: baseTheme.radii.lg,
        backgroundColor: baseTheme.background.paper,
      })
    })

    it('rounds no frame that is only a line or text', () => {
      renderWithTheme(view({ variant: 'underline', borderRadius: 'lg' }))
      expect(frame()).not.toHaveStyle({ borderRadius: baseTheme.radii.lg })
    })

    it('takes its text color from its FormControl', () => {
      renderWithTheme(
        <FormControl textColor="secondary">
          <Autocomplete options={CITIES} aria-label="City" />
        </FormControl>
      )
      expect(frame()).toHaveStyle({ color: baseTheme.text.secondary })
    })
  })

  describe('theme', () => {
    it('takes its defaults and its labels from the theme', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Autocomplete: {
            defaultProps: {
              shouldAllowFreeText: true,
              clearLabel: 'Wipe',
              openLabel: 'Show',
              closeLabel: 'Hide',
              noOptionsText: 'Empty',
              loadingText: 'Wait',
              layer: 'tooltip',
              variant: 'outlined',
              size: 'sm',
              color: 'secondary',
            },
          },
        },
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <Autocomplete options={CITIES} aria-label="City" defaultValue="Oslo" />
        </ThemeProvider>
      )
      expect(screen.getByRole('button', { name: 'Wipe' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Show' })).toBeInTheDocument()
      type('zz')
      expect(screen.getByText('Empty')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Hide' })).toBeInTheDocument()
    })

    it('styles every part of the open list from the theme', () => {
      const style = { outlineColor: 'rgb(1, 2, 3)' }
      const theme = createTheme(baseTheme, {
        components: {
          Autocomplete: {
            styleOverrides: {
              popup: style,
              listbox: style,
              group: style,
              groupLabel: style,
              groupItems: style,
              option: style,
              status: style,
            },
          },
        },
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <Autocomplete
            options={[{ label: 'A', group: 'g' }]}
            groupBy={(o) => o.group}
            aria-label="X"
            noOptionsText="None"
          />
        </ThemeProvider>
      )
      key('ArrowDown')
      for (const part of [
        listbox(),
        listbox().parentElement,
        screen.getByRole('group'),
        screen.getByRole('group').parentElement,
        screen.getByRole('group').previousElementSibling,
        screen.getByRole('option'),
      ]) {
        expect(part).toHaveStyle({ outlineColor: 'rgb(1, 2, 3)' })
      }
      type('zzz')
      expect(screen.getByText('None').closest('li')).toHaveStyle({ outlineColor: 'rgb(1, 2, 3)' })
    })
  })
})
