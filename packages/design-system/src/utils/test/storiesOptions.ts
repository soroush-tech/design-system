import type { ButtonColor, ButtonSize } from '@soroush.tech/design-system/Button'
import type { CircularProgressColor } from '@soroush.tech/design-system/CircularProgress'
import type { LinearProgressColor } from '@soroush.tech/design-system/LinearProgress'
import type { CheckboxColor, CheckboxSize } from '@soroush.tech/design-system/Checkbox'
import type { RadioColor, RadioSize } from '@soroush.tech/design-system/Radio'
import type { SwitchColor, SwitchSize } from '@soroush.tech/design-system/Switch'
import type { TextInputColor, TextInputSize } from '@soroush.tech/design-system/TextInput'
import type { SelectColor, SelectSize } from '@soroush.tech/design-system/Select'
import type { FormControlProps } from '@soroush.tech/design-system/FormControl'
import type { AppBarSize } from '@soroush.tech/design-system/AppBar'
import {
  baseTheme,
  radii,
  sizes,
  borderWidths,
  fontSizes,
  lineHeights,
  letterSpacings,
  fonts,
  fontWeights,
  avatar,
  space,
  typography,
  type CSSObject,
} from '@soroush.tech/design-system/theme'

// Value lists owned by the components' catalogs (`X/X.catalog.ts`), under their story names.
export {
  buttonVariantValues as buttonVariantTokens,
  buttonShapeValues as buttonShapeTokens,
  buttonLoadingPositionValues as buttonLoadingPositionTokens,
} from '../../Button/Button.catalog'
export { cardVariantValues as cardVariantTokens } from '../../Card/Card.catalog'
export { selectVariantValues as selectVariantTokens } from '../../Select/Select.catalog'
export {
  tableSizeValues as tableSizeTokens,
  tableCellPaddingValues as tableCellPaddingTokens,
} from '../../Table/Table/Table.catalog'
export {
  tableCellVariantValues as tableCellVariantTokens,
  tableCellAlignValues as tableCellAlignTokens,
} from '../../Table/TableCell/TableCell.catalog'
export { appBarPositionValues as positionTokens } from '../../AppBar/AppBar.catalog'
export { avatarVariantValues as avatarVariantTokens } from '../../Avatar/Avatar.catalog'
export {
  flexDirectionValues as flexDirectionTokens,
  flexJustifyContentValues as flexJustifyContentTokens,
  flexAlignItemsValues as flexAlignItemsTokens,
  flexAlignContentValues as flexAlignContentTokens,
  flexWrapValues as flexWrapTokens,
} from '../../Flex/Flex.catalog'
export {
  gridAutoFlowValues as gridAutoFlowTokens,
  gridJustifyContentValues as gridJustifyContentTokens,
  gridAlignItemsValues as gridAlignItemsTokens,
  gridAlignContentValues as gridAlignContentTokens,
  gridJustifyItemsValues as gridJustifyItemsTokens,
} from '../../Grid/Grid.catalog'
export { imageObjectFitValues as objectFitTokens } from '../../Image/Image.catalog'
export {
  linkUnderlineValues as linkUnderlineTokens,
  linkTargetValues as linkTargetTokens,
} from '../../Link/Link.catalog'
export { typographyAlignValues as alignTokens } from '../../Typography/Typography.catalog'
export {
  skeletonVariantValues as skeletonVariantTokens,
  skeletonAnimationValues as skeletonAnimationTokens,
} from '../../Skeleton/Skeleton.catalog'
export {
  circularProgressVariantValues as circularProgressVariantTokens,
  circularProgressEasingValues as circularProgressEasingTokens,
} from '../../CircularProgress/CircularProgress.catalog'
export {
  linearProgressVariantValues as linearProgressVariantTokens,
  linearProgressEasingValues as linearProgressEasingTokens,
} from '../../LinearProgress/LinearProgress.catalog'
export { drawerAnchorValues as anchorTokens } from '../../Drawer/Drawer.catalog'
export { modalScrollValues as modalScrollTokens } from '../../Modal/Modal.catalog'
export { breadcrumbsSeparatorValues as breadcrumbsSeparatorTokens } from '../../Breadcrumbs/Breadcrumbs.catalog'
export {
  numberFieldSpinButtonsValues as numberFieldSpinButtonsTokens,
  numberFieldVariantValues as numberFieldVariantTokens,
} from '../../NumberField/NumberField.catalog'
export { ratingPrecisionValues as ratingPrecisionTokens } from '../../Rating/Rating.catalog'
export { menuItemRoleValues as menuItemRoleTokens } from '../../MenuItem/MenuItem.catalog'
export { menuAlignValues as menuAlignTokens } from '../../Menu/Menu/Menu.catalog'
export {
  tabsVariantValues as tabsVariantTokens,
  tabsOrientationValues as tabsOrientationTokens,
  tabsOverflowBehaviorValues as tabsOverflowBehaviorTokens,
  tabsScrollButtonsValues as tabsScrollButtonsTokens,
} from '../../Tabs/Tabs/Tabs.catalog'
export { tabIconPositionValues as tabIconPositionTokens } from '../../Tabs/Tab/Tab.catalog'
export { tabScrollDirectionValues as tabScrollDirectionTokens } from '../../Tabs/TabScrollButton/TabScrollButton.catalog'
export { pressableFeedbackValues as pressableFeedbackTokens } from '../../Pressable/Pressable.catalog'
export {
  switchVariantValues as switchVariantTokens,
  switchEdgeValues as switchEdgeTokens,
} from '../../Switch/Switch.catalog'
export { textInputVariantValues as textInputVariantTokens } from '../../TextInput/TextInput.catalog'

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
