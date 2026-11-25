import type { ComponentConfig } from '../theme/themes'

/** The resolved props Skeleton's styled elements receive - what `ownerState` exposes. */
export type SkeletonOwnerState = Record<string, unknown>

/** The slots of Skeleton a theme can style with `styleOverrides`. */
export type SkeletonSlot = 'root' | 'content'

/** What `theme.components.Skeleton` takes. */
export type SkeletonThemeConfig = ComponentConfig<SkeletonOwnerState, SkeletonSlot>
