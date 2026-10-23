import type { Theme } from '../theme/themes'
import { themeDefault } from '../theme/utils/themeDefault'

/** The corner radius of a surface: the one asked for, else `theme.defaults.surfaceRadius`, else square. */
export const getSurfaceRadius = (theme: Theme, borderRadius?: keyof Theme['radii']) =>
  theme.radii[borderRadius ?? themeDefault(theme, 'surfaceRadius', 'sq')]
