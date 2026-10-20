import { type ComponentType, type ElementType, type SVGProps } from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { styled, createShouldForwardProp, props, layout, space, system } from '../index'
import { useTheme } from '../theme'
import { type TextColorToken } from '../Typography'
import { icons, type IconName } from './icons'
import { themeDefault } from '../theme/utils/themeDefault'
import type { ThemeIconSizes } from '../theme/themes'

export interface IconProps
  extends
    Omit<SVGProps<SVGSVGElement>, 'color' | 'ref' | 'width' | 'height' | 'display' | 'overflow'>,
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

export function Icon({ name, color, size, ...rest }: Readonly<IconProps>) {
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
      {...rest}
    />
  )
}
