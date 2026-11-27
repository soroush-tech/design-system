'use client'

import { useMemo } from 'react'
import { ToggleButtonGroupContext, type ToggleButtonValue } from '../ToggleButtonGroupContext'
import { ButtonGroup, type ButtonGroupProps } from '../../ButtonGroup'
import { styled } from '../../style/styled'
import { type Theme } from '../../theme/themes'
import { useTheme } from '../../theme/hooks/useTheme'
import { themeDefault } from '@gild-ui/core/theme'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import type { ToggleButtonGroupSlot } from './ToggleButtonGroup.types'

export interface ToggleButtonGroupProps extends Omit<
  ButtonGroupProps,
  'variant' | 'onChange' | 'style' | 'slotProps'
> {
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<ToggleButtonGroupSlot>
  /** Selected value(s) - single when `isExclusive`, array otherwise. Controlled. */
  value?: ToggleButtonValue | ToggleButtonValue[] | null
  /**
   * Fired with the next selection: a single value or `null` when `isExclusive`,
   * an array (possibly empty) otherwise.
   */
  onChange?: (value: ToggleButtonValue | ToggleButtonValue[] | null) => void
  /** Only one child value can be selected at a time. Default: `false`. */
  isExclusive?: boolean
}

interface GroupRootProps {
  orientation?: NonNullable<ButtonGroupProps['orientation']>
  color?: NonNullable<ButtonGroupProps['color']>
}

// ButtonGroup's outlined divider logic clears each trailing child's leading border
// edge; restore it on selected children so their active-color outline stays closed.
const selectedEdgeStyles = ({
  theme,
  orientation = 'horizontal',
  color = themeDefault(theme, 'neutralColor', 'default'),
}: GroupRootProps & { theme: Theme }) => {
  const edge = orientation === 'vertical' ? 'borderTopColor' : 'borderLeftColor'
  return {
    '& > [aria-pressed="true"]:not(:first-of-type)': {
      [edge]: theme.palette[color].main,
    },
  }
}

const ToggleButtonGroupRoot = styled(ButtonGroup, {
  name: 'ToggleButtonGroup',
  label: 'ToggleButtonGroup',
})<GroupRootProps>(selectedEdgeStyles)

/**
 * A `ButtonGroup` of `ToggleButton`s with single (exclusive) or multiple selection,
 * provided to children via `ToggleButtonGroupContext`. Controlled - the consumer
 * owns `value`. Visual props (`color` / `size` / `disabled` / `fullWidth`) broadcast
 * through `ButtonGroup` as usual.
 */
export function ToggleButtonGroup({
  value = null,
  onChange,
  isExclusive = false,
  color: colorProp,
  children,
  style,
  className,
  slotProps,
  ...rest
}: Readonly<ToggleButtonGroupProps>) {
  const theme = useTheme()
  const color = colorProp ?? themeDefault(theme, 'neutralColor', 'default')
  const context = useMemo(() => {
    const handleToggle = (buttonValue: ToggleButtonValue) => {
      if (isExclusive) {
        onChange?.(value === buttonValue ? null : buttonValue)
        return
      }
      const current = Array.isArray(value) ? value : []
      onChange?.(
        current.includes(buttonValue)
          ? current.filter((v) => v !== buttonValue)
          : [...current, buttonValue]
      )
    }
    return { value, onToggle: handleToggle }
  }, [value, onChange, isExclusive])

  return (
    <ToggleButtonGroupContext.Provider value={context}>
      <ToggleButtonGroupRoot
        color={color}
        {...rest}
        {...mergeOverrides(slotProps?.root, { style, className })}
      >
        {children}
      </ToggleButtonGroupRoot>
    </ToggleButtonGroupContext.Provider>
  )
}
