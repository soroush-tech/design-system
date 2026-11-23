import { useEngineTheme } from '../engine'
import type { Theme } from '../themes'

/**
 * The active theme, typed as this package's own `Theme` - the engine is an
 * internal implementation detail, never part of the public type surface.
 */
export const useTheme = (): Theme => useEngineTheme() as unknown as Theme
