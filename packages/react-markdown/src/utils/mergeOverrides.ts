import type { SlotOverride } from '@gild-ui/react'

/**
 * The override of a root: `slotProps.root` first, then the `style` and `className` props, so they
 * win. One style stays as it is, not wrapped in a list, and an unset one adds nothing to the element.
 */
export function mergeOverrides(...parts: (SlotOverride | undefined)[]): SlotOverride {
  const styles = parts.flatMap((part) => (part?.style ? [part.style] : []))
  return {
    ...Object.assign({}, ...parts),
    className:
      parts.flatMap((part) => (part?.className ? [part.className] : [])).join(' ') || undefined,
    style: styles.length > 1 ? styles : styles[0],
  }
}
