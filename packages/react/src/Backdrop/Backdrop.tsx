import { styled } from '../style/styled'
import { mergeOverrides, type SlotProps } from '../style/overrides'
import type { BackdropSlot } from './Backdrop.types'
import { View, type ViewProps } from '../View'

export interface BackdropProps extends ViewProps {
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<BackdropSlot>
}

// Full-viewport scrim. Sits behind the modal content (z-index -1) and is purely
// visual: `pointer-events: none` lets wheel and click pass through to the modal
// root, so the root (the scroll container in `scroll="body"`) handles both.
const BackdropRoot = styled(View, { name: 'Backdrop', label: 'Backdrop' })({
  position: 'fixed',
  inset: 0,
  zIndex: -1,
  pointerEvents: 'none',
})

/**
 * @description Dimmed overlay rendered behind a modal's content. Defaults to the
 * theme `backdrop` background; forwards click and other props to the surface.
 */
export function Backdrop({ style, className, slotProps, ...rest }: Readonly<BackdropProps>) {
  return (
    <BackdropRoot
      bg="backdrop"
      {...mergeOverrides(slotProps?.root, { style, className })}
      {...rest}
    />
  )
}
