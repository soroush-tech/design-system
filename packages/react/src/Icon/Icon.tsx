import { type ComponentType, type ElementType, type SVGProps } from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { styled } from '../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../style/overrides'
import type { IconSlot } from './Icon.types'
import { createShouldForwardProp, props } from '@soroush.tech/styled-system/should-forward-prop'
import { system, layout, space } from '@soroush.tech/styled-system'
import { useTheme } from '../theme/hooks/useTheme'
import { type TextColorToken } from '../Typography'
import { icons, type IconName } from './icons'
import { themeDefault, type ThemeIconSizes } from '@gild-ui/core/theme'

export interface IconProps
  extends
    Omit<
      SVGProps<SVGSVGElement>,
      'color' | 'ref' | 'width' | 'height' | 'display' | 'overflow' | 'style'
    >,
    LayoutProps,
    SpaceProps {
  /** Registry key of the icon to render. */
  name: IconName
  /** Resolves against theme.text - applied as `color`, which the SVG inherits via `currentColor`. */
  color?: TextColorToken
  /**
   * Sets both width and height (icons are square): one of the theme's icon sizes (`'sm'`, `'md'`,
   * `'lg'`), or any CSS length. Default: the theme's `iconSize`, else `'lg'`.
   */
  size?: keyof ThemeIconSizes | (string & {}) | number
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<IconSlot>
}

const shouldForwardProp = createShouldForwardProp([...props])

// color → theme.text; the styled svg's `fill: currentColor` then resolves to it,
// overriding the asset's baked fill attribute (CSS beats presentation attributes).
const colorSystem = system({
  color: { property: 'color', scale: 'text' },
})

const StyledIcon = styled('svg', {
  name: 'Icon',
  label: 'icon',
  shouldForwardProp,
  systemProps: [layout, space, colorSystem],
})({ fill: 'currentColor' }) as ComponentType<Omit<IconProps, 'name'> & { as?: ElementType }>

export function Icon({
  name,
  color,
  size,
  style,
  className,
  slotProps,
  ...rest
}: Readonly<IconProps>) {
  const theme = useTheme()
  // A name of the theme's icon sizes is that size; anything else is a length as it stands.
  const named =
    typeof size === 'string' && Object.hasOwn(theme.icon, size)
      ? theme.icon[size as keyof ThemeIconSizes]
      : size
  const resolvedSize = named ?? theme.icon[themeDefault(theme, 'iconSize', 'lg')]
  return (
    <StyledIcon
      as={icons[name]}
      color={color ?? themeDefault(theme, 'accentTextColor', 'primary')}
      width={resolvedSize}
      height={resolvedSize}
      aria-hidden
      {...mergeOverrides(slotProps?.root, { style, className })}
      {...rest}
    />
  )
}
