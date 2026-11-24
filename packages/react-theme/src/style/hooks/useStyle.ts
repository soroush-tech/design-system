import { useTheme } from '../../theme/hooks/useTheme'
import type { CSSObject, Theme } from '../../theme/themes'

export type StyleFactory = { getStyles: (theme: Theme) => CSSObject }
export type StyleInput = CSSObject | StyleFactory

export function useStyle(style: StyleInput): CSSObject {
  const theme = useTheme() as Theme
  return typeof (style as StyleFactory).getStyles === 'function'
    ? (style as StyleFactory).getStyles(theme)
    : (style as CSSObject)
}
