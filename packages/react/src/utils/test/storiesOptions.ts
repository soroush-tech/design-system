import type { ButtonColor, ButtonSize } from '../../Button'
import type { CircularProgressColor } from '../../CircularProgress'
import type { LinearProgressColor } from '../../LinearProgress'
import type { CheckboxColor, CheckboxSize } from '../../Checkbox'
import type { RadioColor, RadioSize } from '../../Radio'
import type { SwitchColor, SwitchSize } from '../../Switch'
import type { TextInputColor, TextInputSize } from '../../TextInput'
import type { SelectColor, SelectSize } from '../../Select'
import type { FormControlProps } from '../../FormControl'
import type { AppBarSize } from '../../AppBar'
import { baseTheme, type CSSObject } from '../../theme/themes'
import { space, typography } from '@gild-ui/core/theme'
import {
  radii,
  sizes,
  borderWidths,
  fontSizes,
  lineHeights,
  letterSpacings,
  fonts,
  fontWeights,
  avatar,
} from '@gild-ui/core/theme'

// Value lists owned by the components' catalogs (`X/X.catalog.ts`), under their story names.
export {
  buttonVariantValues as buttonVariantTokens,
  buttonShapeValues as buttonShapeTokens,
  buttonLoadingPositionValues as buttonLoadingPositionTokens,
} from '@gild-ui/core/catalog/entries'
export { cardVariantValues as cardVariantTokens } from '@gild-ui/core/catalog/entries'
export { selectVariantValues as selectVariantTokens } from '@gild-ui/core/catalog/entries'
export {
  tableSizeValues as tableSizeTokens,
  tableCellPaddingValues as tableCellPaddingTokens,
} from '@gild-ui/core/catalog/entries'
export {
  tableCellVariantValues as tableCellVariantTokens,
  tableCellAlignValues as tableCellAlignTokens,
} from '@gild-ui/core/catalog/entries'
export { appBarPositionValues as positionTokens } from '@gild-ui/core/catalog/entries'
export { avatarVariantValues as avatarVariantTokens } from '@gild-ui/core/catalog/entries'
export {
  flexDirectionValues as flexDirectionTokens,
  flexJustifyContentValues as flexJustifyContentTokens,
  flexAlignItemsValues as flexAlignItemsTokens,
  flexAlignContentValues as flexAlignContentTokens,
  flexWrapValues as flexWrapTokens,
} from '@gild-ui/core/catalog/entries'
export {
  gridAutoFlowValues as gridAutoFlowTokens,
  gridJustifyContentValues as gridJustifyContentTokens,
  gridAlignItemsValues as gridAlignItemsTokens,
  gridAlignContentValues as gridAlignContentTokens,
  gridJustifyItemsValues as gridJustifyItemsTokens,
} from '@gild-ui/core/catalog/entries'
export { imageObjectFitValues as objectFitTokens } from '@gild-ui/core/catalog/entries'
export {
  linkUnderlineValues as linkUnderlineTokens,
  linkTargetValues as linkTargetTokens,
} from '@gild-ui/core/catalog/entries'
export { typographyAlignValues as alignTokens } from '@gild-ui/core/catalog/entries'
export {
  skeletonVariantValues as skeletonVariantTokens,
  skeletonAnimationValues as skeletonAnimationTokens,
} from '@gild-ui/core/catalog/entries'
export {
  circularProgressVariantValues as circularProgressVariantTokens,
  circularProgressEasingValues as circularProgressEasingTokens,
} from '@gild-ui/core/catalog/entries'
export {
  linearProgressVariantValues as linearProgressVariantTokens,
  linearProgressEasingValues as linearProgressEasingTokens,
} from '@gild-ui/core/catalog/entries'
export { drawerAnchorValues as anchorTokens } from '@gild-ui/core/catalog/entries'
export { modalScrollValues as modalScrollTokens } from '@gild-ui/core/catalog/entries'
export { breadcrumbsSeparatorValues as breadcrumbsSeparatorTokens } from '@gild-ui/core/catalog/entries'
export {
  numberInputSpinButtonsValues as numberInputSpinButtonsTokens,
  numberInputVariantValues as numberInputVariantTokens,
} from '@gild-ui/core/catalog/entries'
export {
  rangeInputOrientationValues as rangeInputOrientationTokens,
  rangeInputTrackValues as rangeInputTrackTokens,
  rangeInputValueLabelValues as rangeInputValueLabelTokens,
} from '@gild-ui/core/catalog/entries'
export { ratingPrecisionValues as ratingPrecisionTokens } from '@gild-ui/core/catalog/entries'
export { transitionEasingValues as transitionEasingTokens } from '@gild-ui/core/catalog/entries'
export { collapseOrientationValues as collapseOrientationTokens } from '@gild-ui/core/catalog/entries'
export { slideDirectionValues as slideDirectionTokens } from '@gild-ui/core/catalog/entries'
export { menuItemRoleValues as menuItemRoleTokens } from '@gild-ui/core/catalog/entries'
export { menuAlignValues as menuAlignTokens } from '@gild-ui/core/catalog/entries'
export {
  tabsVariantValues as tabsVariantTokens,
  tabsOrientationValues as tabsOrientationTokens,
  tabsOverflowBehaviorValues as tabsOverflowBehaviorTokens,
  tabsScrollButtonsValues as tabsScrollButtonsTokens,
} from '@gild-ui/core/catalog/entries'
export { tabIconPositionValues as tabIconPositionTokens } from '@gild-ui/core/catalog/entries'
export { tabScrollDirectionValues as tabScrollDirectionTokens } from '@gild-ui/core/catalog/entries'
export { pressableFeedbackValues as pressableFeedbackTokens } from '@gild-ui/core/catalog/entries'
export {
  switchVariantValues as switchVariantTokens,
  switchEdgeValues as switchEdgeTokens,
} from '@gild-ui/core/catalog/entries'
export { textInputVariantValues as textInputVariantTokens } from '@gild-ui/core/catalog/entries'

const objectKeys = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>

// --- Derived from component mappings ---

export const typographyVariantTokens = objectKeys(typography)
export const textColorTokens = objectKeys(baseTheme.text)
export const backgroundTokens = objectKeys(baseTheme.background)
export const borderColorTokens = objectKeys(baseTheme.border)

export const spaceTokens = objectKeys(space).map((k) => (k === 'auto' ? k : Number(k)))

export const fontFamilyTokens = objectKeys(fonts)
export const fontSizeIndices = fontSizes.map((_, i) => i)
export const fontWeightTokens = objectKeys(fontWeights)
export const lineHeightTokens = objectKeys(lineHeights)
export const letterSpacingTokens = objectKeys(letterSpacings)
export const borderRadiiTokens = objectKeys(radii)
export const borderWidthTokens = objectKeys(borderWidths)
export const avatarSizeTokens = objectKeys(avatar)
export const buttonColorTokens = objectKeys(baseTheme.palette) satisfies ButtonColor[]
export const buttonSizeTokens = objectKeys(sizes) satisfies ButtonSize[]
export const circularProgressColorTokens = [
  ...buttonColorTokens,
  'inherit',
] satisfies CircularProgressColor[]
export const linearProgressColorTokens = [
  ...buttonColorTokens,
  'inherit',
] satisfies LinearProgressColor[]
export const checkboxColorTokens = buttonColorTokens satisfies CheckboxColor[]
export const checkboxSizeTokens = objectKeys(sizes) satisfies CheckboxSize[]
export const radioColorTokens = buttonColorTokens satisfies RadioColor[]
export const radioSizeTokens = objectKeys(sizes) satisfies RadioSize[]
export const switchColorTokens = buttonColorTokens satisfies SwitchColor[]
export const switchSizeTokens = objectKeys(sizes) satisfies SwitchSize[]
export const textInputColorTokens = [...buttonColorTokens] satisfies TextInputColor[]
export const textInputSizeTokens = objectKeys(sizes) satisfies TextInputSize[]
export const selectColorTokens = buttonColorTokens satisfies SelectColor[]
export const selectSizeTokens = textInputSizeTokens satisfies SelectSize[]
export const appBarSizeTokens = objectKeys(sizes) satisfies AppBarSize[]
export const formSizeTokens = objectKeys(sizes) satisfies NonNullable<FormControlProps['size']>[]
export const formColorTokens = [...buttonColorTokens] satisfies NonNullable<
  FormControlProps['color']
>[]
export const linkRelTokens = [
  'noopener noreferrer',
  'alternate',
  'author',
  'bookmark',
  'external',
  'help',
  'license',
  'me',
  'next',
  'nofollow',
  'noopener',
  'noreferrer',
  'opener',
  'prev',
  'privacy-policy',
  'search',
  'tag',
  'terms-of-service',
] as const

// --- Hardcoded: no theme/component backing ---

// TypographyAlign is a union type with no runtime object

// HTML element names - arbitrary set chosen for the as prop
export const asTokens = [
  'p',
  'span',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'label',
  'li',
] as const

// AvatarVariant has no runtime mapping object in Avatar.tsx

// Raw CSS values - not backed by any theme scale

export const fontStyleTokens = ['normal', 'italic', 'oblique'] satisfies CSSObject['fontStyle']

export const displayTokens = [
  'block',
  'flex',
  'inline',
  'inline-flex',
  'inline-block',
  'grid',
  'none',
] satisfies CSSObject['display']

export const cursorTokens = [
  'auto',
  'default',
  'pointer',
  'move',
  'not-allowed',
  'wait',
  'text',
  'crosshair',
  'grab',
  'grabbing',
  'zoom-in',
  'zoom-out',
  'none',
] satisfies CSSObject['cursor']

export const borderStyleTokens = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'none',
] satisfies CSSObject['borderStyle']

export const zOrderTokens = objectKeys(baseTheme.zOrder)
