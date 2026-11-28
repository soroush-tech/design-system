import { type CSSProperties, type ElementType } from 'react'
import { styled } from '../style/styled'
import { mergeOverrides, type SlotProps } from '../style/overrides'
import type { PaperSlot } from './Paper.types'
import { type Theme } from '../theme/themes'
import { createShouldForwardProp } from '@soroush.tech/styled-system/should-forward-prop'
import { system } from '@soroush.tech/styled-system'
import { useTheme } from '../theme/hooks/useTheme'
import { Flex, type FlexProps } from '../Flex'
import { themeDefault } from '@gild-ui/core/theme'

export type PaperElevation =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24

export interface PaperProps extends FlexProps {
  /** Shadow depth - 0 (flat) to 24 (highest). Resolves to theme.shadows[n]. Default: 1. */
  elevation?: PaperElevation
  /** CSS transition for surface animations (e.g. hover elevation change). */
  transition?: CSSProperties['transition']
  /** Resolves against theme.border - light · primary · dark */
  borderColor?: keyof Theme['border']
  /** Resolves against theme.borderWidths - none · thin · base · thick */
  borderWidth?: keyof Theme['borderWidths']
  /** CSS border-style value (e.g. 'solid', 'dashed'). */
  borderStyle?: CSSProperties['borderStyle']
  /** Renders the surface as a different element (e.g. 'section'). */
  as?: ElementType
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<PaperSlot>
}

// aspectRatio needs no manual wiring since @soroush.tech/styled-system 5.8.0 - it
// arrives through View's `layout` parser and `LayoutProps`.
const shouldForwardProp = createShouldForwardProp([
  'elevation',
  'transition',
  'borderColor',
  'borderWidth',
  'borderStyle',
])

const paperSystem = system({
  elevation: { property: 'boxShadow', scale: 'shadows' },
  transition: { property: 'transition' },
  borderColor: { property: 'borderColor', scale: 'border' },
  borderWidth: { property: 'borderWidth', scale: 'borderWidths' },
  borderStyle: { property: 'borderStyle' },
})

const PaperRoot = styled(Flex, {
  name: 'Paper',
  label: 'paper',
  shouldForwardProp,
})<PaperProps>(paperSystem)

export function Paper({
  elevation = 1,
  p = 2,
  bg,
  borderRadius,
  style,
  className,
  slotProps,
  ...rest
}: Readonly<PaperProps>) {
  const theme = useTheme()
  return (
    <PaperRoot
      elevation={elevation}
      p={p}
      bg={bg ?? themeDefault(theme, 'surfaceBg', 'paper')}
      borderRadius={borderRadius ?? themeDefault(theme, 'surfaceRadius', 'sq')}
      {...mergeOverrides(slotProps?.root, { style, className })}
      {...rest}
    />
  )
}
