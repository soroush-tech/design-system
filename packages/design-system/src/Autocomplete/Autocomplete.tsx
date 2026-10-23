import { Fragment, useCallback, useContext, useEffect, useId, useRef, type ReactNode } from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, system, type Theme } from '../index'
import { useDefaultProps, useTheme } from '../theme'
import { getSurfaceRadius } from '../utils/getSurfaceRadius'
import { getFocusRing, getInputMinWidth } from '../utils/inputStyles'
import { useFormControl } from '../FormControl'
import { FormControlContext } from '../FormControl/FormControlContext'
import { Chip } from '../Chip'
import { Icon } from '../Icon'
import { Portal } from '../Portal'
import { themeDefault } from '../theme/utils/themeDefault'
import { inputVariantStyles } from '../utils/inputVariantStyles'
import { useAnchoredPlacement } from '../utils/useAnchoredPlacement'
import {
  useAutocomplete,
  type AutocompleteChangeReason,
  type AutocompleteInputReason,
  type AutocompleteValue,
} from './hooks/useAutocomplete'

export type {
  AutocompleteChangeReason,
  AutocompleteInputReason,
  AutocompleteValue,
} from './hooks/useAutocomplete'

export type AutocompleteVariant = 'default' | 'outlined' | 'text' | 'underline'

export interface AutocompleteProps<T = string, Multiple extends boolean | undefined = false>
  extends SpaceProps<Theme>, Pick<LayoutProps<Theme>, 'width' | 'minWidth' | 'maxWidth'> {
  /** What can be chosen - strings, or anything `getOptionLabel` can say. */
  options: readonly T[]
  /** The chosen option - `null` for none - or, with `multiple`, the chosen list. Controlled with `onChange`. */
  value?: AutocompleteValue<T, Multiple>
  /** The choice at first, when uncontrolled. */
  defaultValue?: AutocompleteValue<T, Multiple>
  /** Fired as the choice changes, with why. */
  onChange?: (
    event: React.SyntheticEvent,
    value: AutocompleteValue<T, Multiple>,
    reason: AutocompleteChangeReason
  ) => void
  /** The text in the field. Controlled with `onInputChange`. */
  inputValue?: string
  /** Fired as the text changes, with why. */
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputReason
  ) => void
  /** Chooses several: each shows as a `Chip`. */
  multiple?: Multiple
  /** Takes a typed text that is no option as the value - a string - on Enter, or on leaving the field. Default: `false`. */
  shouldAllowFreeText?: boolean
  /** What an option says, and what is typed to find it. Default: a string as it is, else its `label`. */
  getOptionLabel?: (option: T) => string
  /** Whether an option is the value. Default: `===`. */
  isOptionEqualToValue?: (option: T, value: T) => boolean
  /** The options that match what is typed. Default: those whose label holds it, in any case. */
  filterOptions?: (options: readonly T[], state: { inputValue: string }) => readonly T[]
  /** The group an option sits in - options of one group are next to one another. */
  groupBy?: (option: T) => string
  /** What an option shows in its row, in place of its label. */
  renderOption?: (option: T, state: { isSelected: boolean; isHighlighted: boolean }) => ReactNode
  /** Shows `loadingText` while there is nothing to list. Default: `false`. */
  isLoading?: boolean
  /** What the list says while it is loading - no built-in English. */
  loadingText?: string
  /** What the list says when nothing matches. Without it, the list stays closed. */
  noOptionsText?: string
  /** Names the clear control - without it, there is none. */
  clearLabel?: string
  /** Names the control that opens the list. */
  openLabel?: string
  /** Names the control that closes the list. */
  closeLabel?: string
  /** Names the control that removes a chip of `multiple`, by its label. Without it, a chip has none. */
  getRemoveLabel?: (label: string) => string
  placeholder?: string
  /** Frame of the field. Default: its `FormControl`'s, else `'default'`. */
  variant?: AutocompleteVariant
  /** Resolves against `theme.sizes`. Default: its `FormControl`'s, else `'md'`. */
  size?: keyof Theme['sizes']
  /** Focus color - resolves to `theme.palette`. Default: its `FormControl`'s, else `'primary'`. */
  color?: keyof Theme['palette']
  /** Text color, resolves against `theme.text`. Default: the focus color. */
  textColor?: keyof Theme['text']
  /** Corner radius of the field - only the `default` and `outlined` frames - and of the list. Resolves against `theme.radii`. The field is square by default; the list takes `theme.defaults.surfaceRadius`. */
  borderRadius?: keyof Theme['radii']
  /** Background of the list, resolves against `theme.background`. Default: `'modal'`. */
  bg?: keyof Theme['background']
  disabled?: boolean
  error?: boolean
  required?: boolean
  fullWidth?: boolean
  name?: string
  id?: string
  /** Stacking layer of the list, from `theme.zOrder`. Default: `'modal'`. */
  layer?: keyof Theme['zOrder']
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

// ─── Frame ────────────────────────────────────────────────────────────────────

interface RootStyle
  extends SpaceProps<Theme>, Pick<LayoutProps<Theme>, 'width' | 'minWidth' | 'maxWidth'> {
  color: keyof Theme['palette']
  textColor?: keyof Theme['text']
  borderRadius?: keyof Theme['radii']
  variant: AutocompleteVariant
  isError: boolean
  isDisabled: boolean
  isFullWidth: boolean
  isInField: boolean
}

const widthStyles = system({ width: true, minWidth: true, maxWidth: true })

const frameStyle = ({
  theme,
  color,
  textColor,
  borderRadius,
  variant,
  isError,
  isDisabled,
  isFullWidth,
  isInField,
}: RootStyle & { theme: Theme }) => {
  const hasCorners = variant === 'default' || variant === 'outlined'
  const main = get(theme, `palette.${color}.main`)
  const border = isError ? get(theme, 'palette.error.main') : get(theme, `palette.${color}.light`)
  return {
    display: isFullWidth || isInField ? 'flex' : 'inline-flex',
    ...(isFullWidth && { width: '100%' }),
    ...(isInField && !isFullWidth && { width: 'fit-content' }),
    minWidth: getInputMinWidth(theme),
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: theme.space[1],
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s ease',
    backgroundColor: get(theme, `background.${themeDefault(theme, 'inputBg', 'terminal')}`),
    color: textColor ? get(theme, `text.${textColor}`) : main,
    ...(hasCorners && borderRadius && { borderRadius: get(theme, `radii.${borderRadius}`) }),
    fontFamily: get(theme, 'fonts.body'),
    lineHeight: get(theme, 'lineHeights.base'),
    borderColor: border,
    '&:focus-within': { borderColor: isError ? get(theme, 'palette.error.main') : main },
    '&:has(:focus-visible)': getFocusRing(theme, color, isError),
    ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' as const }),
  }
}

const AutocompleteRoot = styled('div', {
  name: 'Autocomplete',
  label: 'Autocomplete',
  shouldForwardProp: createShouldForwardProp([
    ...props,
    'color',
    'textColor',
    'borderRadius',
    'variant',
    'isError',
    'isDisabled',
    'isFullWidth',
    'isInField',
  ]),
  systemProps: [space, widthStyles],
})<RootStyle>(inputVariantStyles, frameStyle)

const AutocompleteTags = styled('span', {
  name: 'Autocomplete',
  slot: 'tags',
  label: 'AutocompleteTags',
})(({ theme }) => ({
  display: 'contents',
  // The chips sit in the frame's own padding, so the field's size is the input's.
  '& > *': { marginInlineStart: theme.space[1] },
}))

const AutocompleteInput = styled('input', {
  name: 'Autocomplete',
  slot: 'input',
  label: 'AutocompleteInput',
  shouldForwardProp: createShouldForwardProp(['sizeToken']),
})<{ sizeToken: keyof Theme['sizes'] }>(({ theme, sizeToken }) => {
  const s = theme.sizes[sizeToken]
  return {
    flex: '1 1 6rem',
    minWidth: 0,
    // No width of its own, or its size would widen the field past its least width.
    width: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    paddingTop: theme.space[s.paddingTop],
    paddingBottom: theme.space[s.paddingBottom],
    paddingLeft: theme.space[s.paddingLeft],
    paddingRight: theme.space[s.paddingRight],
    fontSize: theme.fontSizes[s.fontSize],
    '&::placeholder': { color: 'inherit', opacity: 0.5 },
    '&:disabled': { cursor: 'not-allowed' },
  }
})

const indicatorStyle = (theme: Theme) => ({
  appearance: 'none' as const,
  display: 'inline-grid',
  placeItems: 'center',
  flexShrink: 0,
  width: theme.icon.lg,
  height: theme.icon.lg,
  margin: 0,
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  opacity: 0.8,
  '&:hover': { opacity: 1 },
})

const AutocompleteClear = styled('button', {
  name: 'Autocomplete',
  slot: 'clearIndicator',
  label: 'AutocompleteClearIndicator',
})(({ theme }) => indicatorStyle(theme))

const AutocompletePopupIndicator = styled('button', {
  name: 'Autocomplete',
  slot: 'popupIndicator',
  label: 'AutocompletePopupIndicator',
})(({ theme }) => indicatorStyle(theme))

// ─── The list ─────────────────────────────────────────────────────────────────

const AutocompletePopup = styled('div', {
  name: 'Autocomplete',
  slot: 'popup',
  label: 'AutocompletePopup',
  shouldForwardProp: createShouldForwardProp(['layer', 'borderRadius', 'bg']),
})<{
  layer: keyof Theme['zOrder']
  borderRadius?: keyof Theme['radii']
  bg?: keyof Theme['background']
}>(({ theme, layer, borderRadius, bg }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  // Shown by the placement, as it is placed.
  visibility: 'hidden',
  zIndex: theme.zOrder[layer],
  boxSizing: 'border-box',
  maxHeight: '16rem',
  overflowY: 'auto',
  borderRadius: getSurfaceRadius(theme, borderRadius),
  boxShadow: theme.shadows[8],
  backgroundColor: get(theme, `background.${bg ?? 'modal'}`),
  color: get(theme, 'text.initial'),
  fontFamily: get(theme, 'fonts.body'),
  fontSize: theme.fontSizes[1],
}))

const AutocompleteListbox = styled('ul', {
  name: 'Autocomplete',
  slot: 'listbox',
  label: 'AutocompleteListbox',
})({ margin: 0, padding: 0, listStyle: 'none' })

const AutocompleteGroup = styled('li', {
  name: 'Autocomplete',
  slot: 'group',
  label: 'AutocompleteGroup',
})({ margin: 0, padding: 0, listStyle: 'none' })

const AutocompleteGroupLabel = styled('div', {
  name: 'Autocomplete',
  slot: 'groupLabel',
  label: 'AutocompleteGroupLabel',
})(({ theme }) => ({
  padding: `${theme.space[1]} ${theme.space[2]}`,
  fontWeight: get(theme, 'fontWeights.semiBold'),
  color: get(theme, 'text.secondary'),
}))

const AutocompleteGroupItems = styled('ul', {
  name: 'Autocomplete',
  slot: 'groupItems',
  label: 'AutocompleteGroupItems',
})({ margin: 0, padding: 0, listStyle: 'none' })

const AutocompleteOption = styled('li', {
  name: 'Autocomplete',
  slot: 'option',
  label: 'AutocompleteOption',
  shouldForwardProp: createShouldForwardProp(['isHighlighted', 'isSelected']),
})<{ isHighlighted: boolean; isSelected: boolean }>(({ theme, isHighlighted, isSelected }) => ({
  margin: 0,
  padding: `${theme.space[1]} ${theme.space[2]}`,
  cursor: 'pointer',
  ...(isSelected && { fontWeight: get(theme, 'fontWeights.semiBold') }),
  ...(isHighlighted && { backgroundColor: get(theme, 'background.secondary') }),
}))

const AutocompleteStatus = styled('li', {
  name: 'Autocomplete',
  slot: 'status',
  label: 'AutocompleteStatus',
})(({ theme }) => ({
  margin: 0,
  padding: `${theme.space[1]} ${theme.space[2]}`,
  listStyle: 'none',
  color: get(theme, 'text.secondary'),
}))

// The options whose label holds what is typed, in any case.
const defaultFilter = <T,>(
  options: readonly T[],
  { inputValue }: { inputValue: string },
  getOptionLabel: (option: T) => string
) => {
  const wanted = inputValue.toLowerCase()
  return options.filter((option) => getOptionLabel(option).toLowerCase().includes(wanted))
}

const defaultGetOptionLabel = (option: unknown) => {
  if (typeof option === 'string') return option
  return String((option as { label?: unknown }).label ?? option)
}

// The origins of the list: under the field, along its start edge.
const getOrigins = ({ isRtl }: { isRtl: boolean }) => {
  const edge = isRtl ? 'right' : 'left'
  return {
    anchorOrigin: { vertical: 'bottom', horizontal: edge } as const,
    transformOrigin: { vertical: 'top', horizontal: edge } as const,
  }
}

/**
 * @description A field whose text finds an option in a list: a `role="combobox"` input with a
 * listbox below it, `aria-activedescendant` on the highlighted option. ArrowDown and ArrowUp open
 * it and step through the options, Home and End go to the first and the last while it is being
 * walked, Enter chooses, Escape closes. `multiple` shows the choice as `Chip`s, and Backspace in
 * the empty field takes the last off; `shouldAllowFreeText` takes what is typed as a value. In a
 * `FormControl` its `FormLabel` names it, and its size, color, error and disabled state apply.
 */
export function Autocomplete<T = string, Multiple extends boolean | undefined = false>({
  options,
  value,
  defaultValue,
  onChange,
  inputValue: inputValueProp,
  onInputChange,
  multiple,
  shouldAllowFreeText: shouldAllowFreeTextProp,
  getOptionLabel = defaultGetOptionLabel,
  isOptionEqualToValue = (option, chosen) => option === chosen,
  filterOptions,
  groupBy,
  renderOption,
  isLoading = false,
  loadingText: loadingTextProp,
  noOptionsText: noOptionsTextProp,
  clearLabel: clearLabelProp,
  openLabel: openLabelProp,
  closeLabel: closeLabelProp,
  getRemoveLabel,
  placeholder,
  variant: variantProp,
  size: sizeProp,
  color: colorProp,
  textColor: textColorProp,
  borderRadius: borderRadiusProp,
  bg: bgProp,
  disabled: disabledProp,
  error: errorProp,
  required: requiredProp,
  fullWidth: fullWidthProp,
  name,
  id: idProp,
  layer: layerProp,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<AutocompleteProps<T, Multiple>>) {
  const theme = useTheme()
  const dp = useDefaultProps('Autocomplete')
  const isInField = useContext(FormControlContext) !== null
  const fc = useFormControl({
    id: idProp,
    error: errorProp,
    disabled: disabledProp,
    required: requiredProp,
    size: sizeProp ?? dp.size,
    fullWidth: fullWidthProp,
    color: colorProp ?? dp.color,
    textColor: textColorProp ?? dp.textColor,
  })
  const color = fc.color ?? themeDefault(theme, 'color', 'primary')
  const variant = variantProp ?? dp.variant ?? themeDefault(theme, 'inputVariant', 'default')
  const shouldAllowFreeText = shouldAllowFreeTextProp ?? dp.shouldAllowFreeText ?? false
  const layer = layerProp ?? dp.layer ?? 'modal'
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const bg = bgProp ?? dp.bg
  const clearLabel = clearLabelProp ?? dp.clearLabel
  const openLabel = openLabelProp ?? dp.openLabel
  const closeLabel = closeLabelProp ?? dp.closeLabel
  const loadingText = loadingTextProp ?? dp.loadingText
  const noOptionsText = noOptionsTextProp ?? dp.noOptionsText
  const baseId = useId()
  const listboxId = `${baseId}-listbox`
  const optionId = (index: number) => `${baseId}-option-${index}`

  const state = useAutocomplete<T, Multiple>({
    options,
    multiple,
    value,
    defaultValue,
    onChange,
    inputValue: inputValueProp,
    onInputChange,
    getOptionLabel,
    isOptionEqualToValue,
    filterOptions: filterOptions ?? ((list, query) => defaultFilter(list, query, getOptionLabel)),
    shouldAllowFreeText,
    disabled: fc.disabled,
  })
  const { filtered, highlight } = state

  // The list shows what there is to choose, a word that there is nothing, or that it is coming.
  const hasStatus = filtered.length === 0 && (isLoading || noOptionsText !== undefined)
  const isShown = state.isOpen && !fc.disabled && (filtered.length > 0 || hasStatus)

  // Required of the field until something is chosen.
  const isRequired = fc.required && state.selected.length === 0

  const frameRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const onPlaced = useCallback(({ anchorRect }: { anchorRect: DOMRect }) => {
    // As wide as the field, at the least.
    ;(popupRef.current as HTMLDivElement).style.minWidth = `${anchorRect.width}px`
  }, [])
  useAnchoredPlacement({
    isOpen: isShown,
    anchorRef: frameRef,
    surfaceRef: popupRef,
    getOrigins,
    margin: 8,
    onPlaced,
  })

  // The highlighted option is kept in view as the keys walk the list.
  useEffect(() => {
    if (!isShown || highlight === -1) return
    document.getElementById(optionId(highlight))?.scrollIntoView?.({ block: 'nearest' })
    // The id of an option is its place under this one base.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShown, highlight, baseId])

  const renderRow = (option: T, index: number) => {
    const isSelected = state.isSelected(option)
    const isHighlighted = index === highlight
    return (
      <AutocompleteOption
        key={index}
        id={optionId(index)}
        role="option"
        aria-selected={isSelected}
        isSelected={isSelected}
        isHighlighted={isHighlighted}
        onClick={(event) => state.selectOption(event, option)}
        onMouseMove={() => !isHighlighted && state.setHighlight(index)}
      >
        {renderOption
          ? renderOption(option, { isSelected, isHighlighted })
          : getOptionLabel(option)}
      </AutocompleteOption>
    )
  }

  // Grouped: a heading, and the options of the group under it - each counted in the whole list.
  const renderRows = () => {
    if (!groupBy) return filtered.map(renderRow)
    const groups: { label: string; rows: { option: T; index: number }[] }[] = []
    filtered.forEach((option, index) => {
      const label = groupBy(option)
      const last = groups[groups.length - 1]
      if (last && last.label === label) last.rows.push({ option, index })
      else groups.push({ label, rows: [{ option, index }] })
    })
    return groups.map((group, position) => {
      const groupId = `${baseId}-group-${position}`
      return (
        <AutocompleteGroup key={groupId} role="presentation">
          <AutocompleteGroupLabel id={groupId}>{group.label}</AutocompleteGroupLabel>
          <AutocompleteGroupItems role="group" aria-labelledby={groupId}>
            {group.rows.map(({ option, index }) => renderRow(option, index))}
          </AutocompleteGroupItems>
        </AutocompleteGroup>
      )
    })
  }

  const handleKeyDown = state.handlers.onKeyDown

  return (
    <>
      <AutocompleteRoot
        ref={frameRef}
        color={color}
        textColor={fc.textColor}
        borderRadius={borderRadius}
        variant={variant}
        isError={fc.error}
        isDisabled={fc.disabled}
        isFullWidth={fc.fullWidth}
        isInField={isInField}
        className={className}
        data-testid={dataTestid}
        onMouseDown={(event) => {
          // A press on the frame - not on the input or a control - puts the cursor in the field.
          if (event.target === event.currentTarget) {
            event.preventDefault()
            inputRef.current?.focus()
          }
        }}
        {...spaceProps}
      >
        {multiple === true && state.selected.length > 0 ? (
          <AutocompleteTags>
            {state.selected.map((option, index) => {
              const label = getOptionLabel(option)
              return (
                <Fragment key={`${label}-${index}`}>
                  <Chip
                    label={label}
                    size="sm"
                    disabled={fc.disabled}
                    onDelete={
                      getRemoveLabel ? (event) => state.removeOption(event, option) : undefined
                    }
                    deleteLabel={getRemoveLabel?.(label)}
                  />
                </Fragment>
              )
            })}
          </AutocompleteTags>
        ) : null}
        <AutocompleteInput
          ref={inputRef}
          id={fc.id}
          name={name}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isShown}
          aria-controls={isShown ? listboxId : undefined}
          aria-activedescendant={isShown && highlight !== -1 ? optionId(highlight) : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby ?? fc['aria-describedby']}
          aria-invalid={fc.error || undefined}
          aria-required={isRequired || undefined}
          autoComplete="off"
          sizeToken={fc.size}
          placeholder={placeholder}
          disabled={fc.disabled}
          required={isRequired}
          value={state.inputValue}
          onChange={state.handlers.onChange}
          onKeyDown={handleKeyDown}
          onBlur={state.handlers.onBlur}
        />
        {clearLabel !== undefined && state.hasClearable && !fc.disabled ? (
          <AutocompleteClear
            type="button"
            tabIndex={-1}
            aria-label={clearLabel}
            onClick={state.clear}
          >
            <Icon name="close" size={fc.size} color="inherit" />
          </AutocompleteClear>
        ) : null}
        <AutocompletePopupIndicator
          type="button"
          tabIndex={-1}
          aria-label={isShown ? closeLabel : openLabel}
          aria-hidden={isShown ? closeLabel === undefined : openLabel === undefined}
          disabled={fc.disabled}
          // A press must not take the focus from the field - or it would close as it leaves.
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            state.toggle()
            inputRef.current?.focus()
          }}
        >
          <Icon name={isShown ? 'expand_less' : 'expand_more'} size={fc.size} color="inherit" />
        </AutocompletePopupIndicator>
      </AutocompleteRoot>
      {isShown && (
        <Portal>
          <AutocompletePopup
            ref={popupRef}
            layer={layer}
            borderRadius={borderRadius}
            bg={bg}
            // A press on the list must not take the focus from the field.
            onMouseDown={(event) => event.preventDefault()}
          >
            <AutocompleteListbox
              id={listboxId}
              role="listbox"
              aria-multiselectable={multiple || undefined}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
            >
              {filtered.length > 0 ? (
                renderRows()
              ) : (
                <AutocompleteStatus role="presentation">
                  {isLoading ? loadingText : noOptionsText}
                </AutocompleteStatus>
              )}
            </AutocompleteListbox>
          </AutocompletePopup>
        </Portal>
      )}
    </>
  )
}
