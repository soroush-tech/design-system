import { useContext, useEffect, type ComponentType, type ReactNode } from 'react'
import { styled } from '../index'
import { Typography, type TypographyProps } from '../Typography'
import { FormControlContext } from '../FormControl/FormControlContext'
import { FormContext } from '../Form/FormContext'

// Typography forwards unknown DOM attributes but does not declare `htmlFor` (a label-only
// attribute) in its props. Render it through this alias so `htmlFor` type-checks.
const LabelTypography = Typography as ComponentType<TypographyProps & { htmlFor?: string }>

// Named styled root - theme-customizable via
// `theme.components.FormLabel.styleOverrides.root`.
const FormLabelRoot = styled(LabelTypography, { name: 'FormLabel', label: 'FormLabel' })()

export interface FormLabelProps extends TypographyProps {
  children: ReactNode
  /** Appends a `*` indicator. Falls back to the FormControl `required` value. */
  required?: boolean
  /** Target control id. Falls back to the FormControl id. */
  htmlFor?: string
}

/**
 * Renders a `<label>` linked to the control via `htmlFor`, reading the id and
 * `required` flag from FormControl context. All Typography props pass through,
 * so callers can restyle freely while keeping the wiring automatic.
 */
export function FormLabel({
  children,
  required,
  htmlFor,
  id,
  color,
  ...rest
}: Readonly<FormLabelProps>) {
  const control = useContext(FormControlContext)
  const form = useContext(FormContext)
  const isRequired = required ?? control?.required ?? false
  const resolvedFor = htmlFor ?? control?.id
  const renderedId = id ?? control?.labelId
  // Registers the id it renders, so a group control names itself by it only while it is rendered.
  const setLabelId = control?.setLabelId
  useEffect(() => {
    if (!setLabelId || !renderedId) return undefined
    setLabelId(renderedId)
    return () => setLabelId(null)
  }, [setLabelId, renderedId])
  // Explicit color wins, then per-field `textColor`, then form-wide `textColor`.
  const resolvedColor = color ?? control?.textColor ?? form.textColor

  return (
    <FormLabelRoot
      as="label"
      id={renderedId}
      htmlFor={resolvedFor}
      variant="body2"
      {...rest}
      color={resolvedColor}
    >
      {children}
      {isRequired ? ' *' : ''}
    </FormLabelRoot>
  )
}
