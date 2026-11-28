import type { ComponentProps, ElementType, FunctionComponent } from 'react'
import type { SheetEntry, StyledStatics } from '@umber-style/react'

/**
 * What the `style` prop of a component takes: an entry of `StyleSheet.create`, or a list of them with
 * `false`, `null` and `undefined` for a condition that is off. A plain style object is not one: it is a
 * type error. An entry of a sheet that reads the theme comes from `useStyle(sheet)`.
 */
export type StyleOverride = SheetEntry | false | null | undefined | readonly StyleOverride[]

/**
 * What one slot of a component takes in `slotProps`: a `style` (as above), a `className`, and `data-*`
 * and `aria-*` attributes. Nothing a component controls (its handlers, `ref`, `id`, `role`) is here.
 */
export type SlotOverride = {
  style?: StyleOverride
  className?: string
} & { [K in `data-${string}` | `aria-${string}`]?: string | number | boolean | undefined }

/** The `slotProps` of a component: one `SlotOverride` for each slot it declares for the theme (`<Name>Slot`). */
export type SlotProps<Slot extends string> = { [S in Slot]?: SlotOverride }

/**
 * Several overrides of one element, merged in order: the later wins. Classes are joined, the styles
 * become one list, and the attributes are spread. One style stays as it is (not wrapped in a list), so
 * an entry given alone keeps its own class and the rendered HTML is the same as without the merge.
 * The root merges `slotProps.root` first and the `style` and `className` props after, so they win.
 */
export function mergeOverrides(...parts: (SlotOverride | undefined)[]): SlotOverride {
  const styles = parts.flatMap((part) => (part?.style ? [part.style] : []))
  return {
    ...Object.assign({}, ...parts),
    className:
      parts
        .map((part) => part?.className)
        .filter(Boolean)
        .join(' ') || undefined,
    style: styles.length > 1 ? styles : styles[0],
  }
}

/**
 * A component made by `styled` with its `style` narrowed to `StyleOverride`, for one the library
 * exports: `styled` itself takes any style on the element it makes.
 */
export type StrictStyled<C extends ElementType & StyledStatics> = FunctionComponent<
  Omit<ComponentProps<C>, 'style' | 'slotProps'> & {
    style?: StyleOverride
    slotProps?: SlotProps<'root'>
  }
> &
  StyledStatics
