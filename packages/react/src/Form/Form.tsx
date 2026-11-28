'use client'

import { useMemo, type ReactNode, type SyntheticEvent } from 'react'
import { type Theme } from '../theme/themes'
import { styled } from '../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../style/overrides'
import type { FormSlot } from './Form.types'
import { FormContext } from './FormContext'

// Named styled root - the `<form>` element is theme-customizable via
// `theme.components.Form.styleOverrides.root`.
const FormRoot = styled('form', { name: 'Form', label: 'Form' })()

export interface FormProps {
  children: ReactNode
  onSubmit?: (event: SyntheticEvent<HTMLFormElement>) => void
  /** Default control size for every field - overridable per FormControl/control. */
  size?: keyof Theme['sizes']
  /** Default accent color for every field. */
  color?: keyof Theme['palette']
  /** Default text color for every field's label/helper/input - resolves against `theme.text`. */
  textColor?: keyof Theme['text']
  /** Disables every field. */
  disabled?: boolean
  /** Stretches every field to fill its container. */
  fullWidth?: boolean
  id?: string
  className?: string
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<FormSlot>
  /** Skips native browser validation so field-level validation owns the UX. */
  noValidate?: boolean
  'data-testid'?: string
}

/**
 * Renders a `<form>` and provides form-wide defaults via FormContext - the lowest
 * priority in the override chain (FormControl and explicit control props win).
 */
export function Form({
  children,
  onSubmit,
  size,
  color,
  textColor,
  disabled,
  fullWidth,
  id,
  className,
  style,
  slotProps,
  noValidate,
  'data-testid': dataTestid,
}: Readonly<FormProps>) {
  const value = useMemo(
    () => ({ size, color, textColor, disabled, fullWidth }),
    [size, color, textColor, disabled, fullWidth]
  )

  return (
    <FormContext.Provider value={value}>
      <FormRoot
        id={id}
        {...mergeOverrides(slotProps?.root, { style, className })}
        noValidate={noValidate}
        onSubmit={onSubmit}
        data-testid={dataTestid}
      >
        {children}
      </FormRoot>
    </FormContext.Provider>
  )
}
