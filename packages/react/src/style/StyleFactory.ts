import type { CSSObject, Theme } from '../theme/themes'

export type StyleFactory = { getStyles: (theme: Theme) => CSSObject }
export type StyleInput = CSSObject | StyleFactory
