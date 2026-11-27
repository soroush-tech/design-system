# Import map: every public path and name of 2.2.0 -> 0.1.0

Generated from `imports.json`. Status: `kept` = same relative path under the renamed package; `moved` = another path; `removed`. No name was renamed.

## `@soroush.tech/design-system`

Target: split - `@soroush.tech/styled-system` (233), `@gild-ui/react` (4), `@soroush.tech/styled-system/should-forward-prop` (2), `@gild-ui/core/theme` (2), `removed` (1)

| Kind  | Status  | New path                                          | Rule             | Names                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----- | ------- | ------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | moved   | `@soroush.tech/styled-system/should-forward-prop` | IMP-ROOT-SP      | `createShouldForwardProp` `props`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| value | kept    | `@gild-ui/react`                                  | IMP-ROOT-STYLING | `css` `keyframes` `styled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| value | moved   | `@soroush.tech/styled-system`                     | IMP-ROOT-SS      | `style` `width` `height` `minWidth` `minHeight` `maxWidth` `maxHeight` `size` `verticalAlign` `display` `overflow` `overflowX` `overflowY` `opacity` `fontSize` `fontFamily` `fontWeight` `lineHeight` `textAlign` `fontStyle` `textTransform` `textAlignLast` `textDecoration` `textDecorationLine` `textDecorationStyle` `textDecorationThickness` `textDecorationColor` `letterSpacing` `whiteSpace` `textOverflow` `alignItems` `alignContent` `justifyItems` `justifyContent` `flexWrap` `flexDirection` `flex` `flexGrow` `flexShrink` `flexBasis` `justifySelf` `alignSelf` `order` `gridGap` `gridColumnGap` `gridRowGap` `gridColumn` `gridRow` `gridAutoFlow` `gridAutoColumns` `gridAutoRows` `gridTemplateColumns` `gridTemplateRows` `gridTemplateAreas` `gridArea` `borderWidth` `borderStyle` `borderColor` `borderTop` `borderRight` `borderBottom` `borderLeft` `borderRadius` `backgroundImage` `backgroundSize` `backgroundPosition` `backgroundRepeat` `zIndex` `top` `right` `bottom` `left` `background` `border` `borders` `boxShadow` `shadow` `textShadow` `breakpointQueries` `buttonStyle` `color` `colorStyle` `compose` `containerKey` `createContainerQueries` `createMediaHelpers` `createMediaQuery` `createParser` `createStyleFunction` `flexbox` `gap` `get` `grid` `layout` `layoutFrame` `layoutGrid` `layoutGridStyles` `margin` `padding` `position` `responsiveQueries` `space` `span` `system` `textStyle` `typography` `variant`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| type  | kept    | `@gild-ui/react`                                  | IMP-ROOT-TYPES   | `CSSObject`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| type  | moved   | `@gild-ui/core/theme`                             | IMP-ROOT-TYPES   | `PaletteColor` `Theme`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| type  | removed | -                                                 | EXP-001          | `ThemeCustomizationOptions` - The styled option types are no longer exported; `styled(tag, { name, slot, systemProps, overridesResolver })` still takes them.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| type  | moved   | `@soroush.tech/styled-system`                     | IMP-ROOT-SS      | `AlignContentProps` `AlignItemsProps` `AlignSelfProps` `AspectRatioProps` `BackgroundColorProps` `BackgroundImageProps` `BackgroundPositionProps` `BackgroundProps` `BackgroundRepeatProps` `BackgroundSizeProps` `BorderBottomProps` `BorderColorProps` `BorderLeftProps` `BorderProps` `BorderRadiusProps` `BorderRightProps` `BorderStyleProps` `BorderTopProps` `BorderWidthProps` `BottomProps` `BoxShadowProps` `BreakpointInput` `BreakpointName` `Breakpoints` `ButtonStyleProps` `ColorProps` `ColorStyleProps` `ColumnGapProps` `Config` `SystemConfig` `ConfigFunction` `StyleFn` `ConfigStyle` `ContainerProps` `ContainerQueries` `DisplayProps` `FlexBasisProps` `FlexDirectionProps` `FlexGrowProps` `FlexProps` `FlexShrinkProps` `FlexWrapProps` `FlexboxProps` `FontFamilyProps` `FontSizeProps` `FontStyleProps` `FontWeightProps` `GapProps` `GridAreaProps` `GridAutoColumnsProps` `GridAutoFlowProps` `GridAutoRowsProps` `GridColumnGapProps` `GridColumnProps` `GridGapProps` `GridProps` `GridRowGapProps` `GridRowProps` `GridTemplateAreasProps` `GridTemplateColumnsProps` `GridTemplateRowsProps` `HeightProps` `JustifyContentProps` `JustifyItemsProps` `JustifySelfProps` `LayoutFrameProps` `LayoutGridEntry` `LayoutGridGap` `LayoutGridProps` `LayoutGridValue` `LayoutProps` `LeftProps` `LetterSpacingProps` `LineHeightProps` `LowLevelStyleFunctionArguments` `MarginProps` `MaxHeightProps` `MaxWidthProps` `MinHeightProps` `MinWidthProps` `ObjectOrArray` `OpacityProps` `OrderProps` `OverflowProps` `PaddingProps` `Parser` `styleFn` `ParserConfig` `PositionProps` `Props` `QueryHelpers` `RequiredTheme` `ResponsiveQueries` `ResponsiveValue` `RightProps` `RowGapProps` `Scale` `ShadowProps` `SizeProps` `SpaceProps` `SpanProps` `StyleObject` `StyleOptions` `TLengthStyledSystem` `TextAlignLastProps` `TextAlignProps` `TextColorProps` `TextDecorationColorProps` `TextDecorationLineProps` `TextDecorationProps` `TextDecorationStyleProps` `TextDecorationThicknessProps` `TextOverflowProps` `TextShadowProps` `TextStyleProps` `TextTransformProps` `ThemeValue` `TopProps` `Transform` `TypographyProps` `VariantArgs` `VariantOptions` `VerticalAlignProps` `WhiteSpaceProps` `WidthProps` `ZIndexProps` |

## `@soroush.tech/design-system/Accordion`

Target: `@gild-ui/react/Accordion`

| Kind  | Status | New path                   | Rule     | Names                                                                                                                                                                                     |
| ----- | ------ | -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Accordion` | IMP-COMP | `Accordion` `AccordionActions` `AccordionDetails` `AccordionGroup` `AccordionSummary`                                                                                                     |
| type  | kept   | `@gild-ui/react/Accordion` | IMP-COMP | `AccordionActionsProps` `AccordionDetailsProps` `AccordionGroupProps` `AccordionGroupVariant` `AccordionHeadingLevel` `AccordionProps` `AccordionSummaryProps` `AccordionTransitionProps` |

## `@soroush.tech/design-system/Alert`

Target: `@gild-ui/react/Alert`

| Kind  | Status | New path               | Rule     | Names                                                         |
| ----- | ------ | ---------------------- | -------- | ------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Alert` | IMP-COMP | `Alert` `AlertTitle`                                          |
| type  | kept   | `@gild-ui/react/Alert` | IMP-COMP | `AlertProps` `AlertSeverity` `AlertTitleProps` `AlertVariant` |

## `@soroush.tech/design-system/AppBar`

Target: `@gild-ui/react/AppBar`

| Kind  | Status | New path                | Rule     | Names                                                     |
| ----- | ------ | ----------------------- | -------- | --------------------------------------------------------- |
| value | kept   | `@gild-ui/react/AppBar` | IMP-COMP | `AppBar`                                                  |
| type  | kept   | `@gild-ui/react/AppBar` | IMP-COMP | `AppBarColor` `AppBarPosition` `AppBarSize` `AppBarProps` |

## `@soroush.tech/design-system/Autocomplete`

Target: `@gild-ui/react/Autocomplete`

| Kind  | Status | New path                      | Rule     | Names                                                                                                              |
| ----- | ------ | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/Autocomplete` | IMP-COMP | `Autocomplete`                                                                                                     |
| type  | kept   | `@gild-ui/react/Autocomplete` | IMP-COMP | `AutocompleteVariant` `AutocompleteProps` `AutocompleteChangeReason` `AutocompleteInputReason` `AutocompleteValue` |

## `@soroush.tech/design-system/Avatar`

Target: `@gild-ui/react/Avatar`

| Kind  | Status | New path                | Rule     | Names                                                                          |
| ----- | ------ | ----------------------- | -------- | ------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/Avatar` | IMP-COMP | `Avatar`                                                                       |
| type  | kept   | `@gild-ui/react/Avatar` | IMP-COMP | `AvatarVariant` `AvatarSize` `AvatarRingColor` `AvatarRingWidth` `AvatarProps` |

## `@soroush.tech/design-system/Backdrop`

Target: `@gild-ui/react/Backdrop`

| Kind  | Status | New path                  | Rule     | Names           |
| ----- | ------ | ------------------------- | -------- | --------------- |
| value | kept   | `@gild-ui/react/Backdrop` | IMP-COMP | `Backdrop`      |
| type  | kept   | `@gild-ui/react/Backdrop` | IMP-COMP | `BackdropProps` |

## `@soroush.tech/design-system/Badge`

Target: `@gild-ui/react/Badge`

| Kind  | Status | New path               | Rule     | Names                                                                       |
| ----- | ------ | ---------------------- | -------- | --------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Badge` | IMP-COMP | `Badge`                                                                     |
| type  | kept   | `@gild-ui/react/Badge` | IMP-COMP | `BadgeVariant` `BadgeOverlap` `BadgeColor` `BadgeAnchorOrigin` `BadgeProps` |

## `@soroush.tech/design-system/Breadcrumbs`

Target: `@gild-ui/react/Breadcrumbs`

| Kind  | Status | New path                     | Rule     | Names              |
| ----- | ------ | ---------------------------- | -------- | ------------------ |
| value | kept   | `@gild-ui/react/Breadcrumbs` | IMP-COMP | `Breadcrumbs`      |
| type  | kept   | `@gild-ui/react/Breadcrumbs` | IMP-COMP | `BreadcrumbsProps` |

## `@soroush.tech/design-system/Button`

Target: `@gild-ui/react/Button`

| Kind  | Status | New path                | Rule     | Names                                                                                                     |
| ----- | ------ | ----------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Button` | IMP-COMP | `Button`                                                                                                  |
| type  | kept   | `@gild-ui/react/Button` | IMP-COMP | `ButtonColor` `ButtonLoadingPosition` `ButtonProps` `ButtonShape` `ButtonSize` `ButtonVariant` `GapToken` |

## `@soroush.tech/design-system/ButtonGroup`

Target: `@gild-ui/react/ButtonGroup`

| Kind  | Status | New path                     | Rule     | Names                                                                                     |
| ----- | ------ | ---------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/ButtonGroup` | IMP-COMP | `ButtonGroup` `ButtonGroupContext`                                                        |
| type  | kept   | `@gild-ui/react/ButtonGroup` | IMP-COMP | `ButtonGroupContextValue` `ButtonGroupOrientation` `ButtonGroupProps` `ButtonGroupRadius` |

## `@soroush.tech/design-system/Card`

Target: `@gild-ui/react/Card`

| Kind  | Status | New path              | Rule     | Names                     |
| ----- | ------ | --------------------- | -------- | ------------------------- |
| value | kept   | `@gild-ui/react/Card` | IMP-COMP | `Card`                    |
| type  | kept   | `@gild-ui/react/Card` | IMP-COMP | `CardVariant` `CardProps` |

## `@soroush.tech/design-system/Checkbox`

Target: `@gild-ui/react/Checkbox`

| Kind  | Status | New path                  | Rule     | Names                                          |
| ----- | ------ | ------------------------- | -------- | ---------------------------------------------- |
| value | kept   | `@gild-ui/react/Checkbox` | IMP-COMP | `Checkbox`                                     |
| type  | kept   | `@gild-ui/react/Checkbox` | IMP-COMP | `CheckboxColor` `CheckboxSize` `CheckboxProps` |

## `@soroush.tech/design-system/Chip`

Target: `@gild-ui/react/Chip`

| Kind  | Status | New path              | Rule     | Names                                                        |
| ----- | ------ | --------------------- | -------- | ------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/Chip` | IMP-COMP | `Chip`                                                       |
| type  | kept   | `@gild-ui/react/Chip` | IMP-COMP | `ChipVariant` `ChipColor` `ChipSize` `ChipShape` `ChipProps` |

## `@soroush.tech/design-system/CircularProgress`

Target: `@gild-ui/react/CircularProgress`

| Kind  | Status | New path                          | Rule     | Names                                                                                              |
| ----- | ------ | --------------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/CircularProgress` | IMP-COMP | `CircularProgress`                                                                                 |
| type  | kept   | `@gild-ui/react/CircularProgress` | IMP-COMP | `CircularProgressVariant` `CircularProgressColor` `CircularProgressEasing` `CircularProgressProps` |

## `@soroush.tech/design-system/Collapse`

Target: `@gild-ui/react/Collapse`

| Kind  | Status | New path                  | Rule     | Names                                 |
| ----- | ------ | ------------------------- | -------- | ------------------------------------- |
| value | kept   | `@gild-ui/react/Collapse` | IMP-COMP | `Collapse`                            |
| type  | kept   | `@gild-ui/react/Collapse` | IMP-COMP | `CollapseOrientation` `CollapseProps` |

## `@soroush.tech/design-system/Drawer`

Target: `@gild-ui/react/Drawer`

| Kind  | Status | New path                | Rule     | Names                                                                |
| ----- | ------ | ----------------------- | -------- | -------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Drawer` | IMP-COMP | `Drawer` `DrawerToggle`                                              |
| type  | kept   | `@gild-ui/react/Drawer` | IMP-COMP | `DrawerAnchor` `DrawerCloseReason` `DrawerProps` `DrawerToggleProps` |

## `@soroush.tech/design-system/Fab`

Target: `@gild-ui/react/Fab`

| Kind  | Status | New path             | Rule     | Names                   |
| ----- | ------ | -------------------- | -------- | ----------------------- |
| value | kept   | `@gild-ui/react/Fab` | IMP-COMP | `Fab`                   |
| type  | kept   | `@gild-ui/react/Fab` | IMP-COMP | `FabProps` `FabVariant` |

## `@soroush.tech/design-system/FabMenu`

Target: `@gild-ui/react/FabMenu`

| Kind  | Status | New path                 | Rule     | Names                                                               |
| ----- | ------ | ------------------------ | -------- | ------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/FabMenu` | IMP-COMP | `FabMenu` `FabMenuItem`                                             |
| type  | kept   | `@gild-ui/react/FabMenu` | IMP-COMP | `FabMenuAlign` `FabMenuDirection` `FabMenuItemProps` `FabMenuProps` |

## `@soroush.tech/design-system/Fade`

Target: `@gild-ui/react/Fade`

| Kind  | Status | New path              | Rule     | Names       |
| ----- | ------ | --------------------- | -------- | ----------- |
| value | kept   | `@gild-ui/react/Fade` | IMP-COMP | `Fade`      |
| type  | kept   | `@gild-ui/react/Fade` | IMP-COMP | `FadeProps` |

## `@soroush.tech/design-system/Flex`

Target: `@gild-ui/react/Flex`

| Kind  | Status | New path              | Rule     | Names                  |
| ----- | ------ | --------------------- | -------- | ---------------------- |
| value | kept   | `@gild-ui/react/Flex` | IMP-COMP | `Flex`                 |
| type  | kept   | `@gild-ui/react/Flex` | IMP-COMP | `FlexProps` `GapToken` |

## `@soroush.tech/design-system/FocusTrap`

Target: `@gild-ui/react/FocusTrap`

| Kind  | Status | New path                   | Rule     | Names            |
| ----- | ------ | -------------------------- | -------- | ---------------- |
| value | kept   | `@gild-ui/react/FocusTrap` | IMP-COMP | `FocusTrap`      |
| type  | kept   | `@gild-ui/react/FocusTrap` | IMP-COMP | `FocusTrapProps` |

## `@soroush.tech/design-system/Form`

Target: `@gild-ui/react/Form`

| Kind  | Status | New path              | Rule     | Names                          |
| ----- | ------ | --------------------- | -------- | ------------------------------ |
| value | kept   | `@gild-ui/react/Form` | IMP-COMP | `Form` `FormContext`           |
| type  | kept   | `@gild-ui/react/Form` | IMP-COMP | `FormProps` `FormContextValue` |

## `@soroush.tech/design-system/FormControl`

Target: `@gild-ui/react/FormControl`

| Kind  | Status | New path                     | Rule     | Names                                                                                     |
| ----- | ------ | ---------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/FormControl` | IMP-COMP | `FormControl` `useFormControl` `FormControlContext`                                       |
| type  | kept   | `@gild-ui/react/FormControl` | IMP-COMP | `FormControlProps` `FormControlContextValue` `FormControlOverrides` `ResolvedFormControl` |

## `@soroush.tech/design-system/FormHelperText`

Target: `@gild-ui/react/FormHelperText`

| Kind  | Status | New path                        | Rule     | Names                 |
| ----- | ------ | ------------------------------- | -------- | --------------------- |
| value | kept   | `@gild-ui/react/FormHelperText` | IMP-COMP | `FormHelperText`      |
| type  | kept   | `@gild-ui/react/FormHelperText` | IMP-COMP | `FormHelperTextProps` |

## `@soroush.tech/design-system/FormLabel`

Target: `@gild-ui/react/FormLabel`

| Kind  | Status | New path                   | Rule     | Names            |
| ----- | ------ | -------------------------- | -------- | ---------------- |
| value | kept   | `@gild-ui/react/FormLabel` | IMP-COMP | `FormLabel`      |
| type  | kept   | `@gild-ui/react/FormLabel` | IMP-COMP | `FormLabelProps` |

## `@soroush.tech/design-system/Grid`

Target: `@gild-ui/react/Grid`

| Kind  | Status | New path              | Rule     | Names                  |
| ----- | ------ | --------------------- | -------- | ---------------------- |
| value | kept   | `@gild-ui/react/Grid` | IMP-COMP | `Grid`                 |
| type  | kept   | `@gild-ui/react/Grid` | IMP-COMP | `GapToken` `GridProps` |

## `@soroush.tech/design-system/Grow`

Target: `@gild-ui/react/Grow`

| Kind  | Status | New path              | Rule     | Names       |
| ----- | ------ | --------------------- | -------- | ----------- |
| value | kept   | `@gild-ui/react/Grow` | IMP-COMP | `Grow`      |
| type  | kept   | `@gild-ui/react/Grow` | IMP-COMP | `GrowProps` |

## `@soroush.tech/design-system/Icon`

Target: `@gild-ui/react/Icon`

| Kind  | Status | New path              | Rule     | Names                  |
| ----- | ------ | --------------------- | -------- | ---------------------- |
| value | kept   | `@gild-ui/react/Icon` | IMP-COMP | `Icon` `icons`         |
| type  | kept   | `@gild-ui/react/Icon` | IMP-COMP | `IconName` `IconProps` |

## `@soroush.tech/design-system/Image`

Target: `@gild-ui/react/Image`

| Kind  | Status | New path               | Rule     | Names        |
| ----- | ------ | ---------------------- | -------- | ------------ |
| value | kept   | `@gild-ui/react/Image` | IMP-COMP | `Image`      |
| type  | kept   | `@gild-ui/react/Image` | IMP-COMP | `ImageProps` |

## `@soroush.tech/design-system/NavTree`

Target: `@gild-ui/react/NavTree`

| Kind  | Status | New path                 | Rule     | Names                                         |
| ----- | ------ | ------------------------ | -------- | --------------------------------------------- |
| value | kept   | `@gild-ui/react/NavTree` | IMP-COMP | `NavGroup` `NavLink` `NavTree`                |
| type  | kept   | `@gild-ui/react/NavTree` | IMP-COMP | `NavGroupProps` `NavLinkProps` `NavTreeProps` |

## `@soroush.tech/design-system/RangeInput`

Target: `@gild-ui/react/RangeInput`

| Kind  | Status | New path                    | Rule     | Names                                                                       |
| ----- | ------ | --------------------------- | -------- | --------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/RangeInput` | IMP-COMP | `RangeInput`                                                                |
| type  | kept   | `@gild-ui/react/RangeInput` | IMP-COMP | `RangeInputTrack` `RangeInputValueLabel` `RangeInputProps` `RangeInputMark` |

## `@soroush.tech/design-system/LinearProgress`

Target: `@gild-ui/react/LinearProgress`

| Kind  | Status | New path                        | Rule     | Names                                                                                      |
| ----- | ------ | ------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/LinearProgress` | IMP-COMP | `LinearProgress`                                                                           |
| type  | kept   | `@gild-ui/react/LinearProgress` | IMP-COMP | `LinearProgressVariant` `LinearProgressColor` `LinearProgressEasing` `LinearProgressProps` |

## `@soroush.tech/design-system/Link`

Target: `@gild-ui/react/Link`

| Kind  | Status | New path              | Rule     | Names                       |
| ----- | ------ | --------------------- | -------- | --------------------------- |
| value | kept   | `@gild-ui/react/Link` | IMP-COMP | `Link`                      |
| type  | kept   | `@gild-ui/react/Link` | IMP-COMP | `LinkUnderline` `LinkProps` |

## `@soroush.tech/design-system/Menu`

Target: `@gild-ui/react/Menu`

| Kind  | Status | New path              | Rule     | Names                                                                                                                                                                                                                                     |
| ----- | ------ | --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Menu` | IMP-COMP | `ContextMenu` `Menu` `MenuDivider` `MenuItems` `MenuList` `MenuListContext` `useMenuListContext`                                                                                                                                          |
| type  | kept   | `@gild-ui/react/Menu` | IMP-COMP | `ContextMenuProps` `MenuAlign` `MenuCloseReason` `MenuDividerData` `MenuDividerProps` `MenuItemData` `MenuItemRowData` `MenuItemValue` `MenuItemsProps` `MenuListContextValue` `MenuListProps` `MenuListSlotProps` `MenuProps` `MenuStep` |

## `@soroush.tech/design-system/MenuItem`

Target: `@gild-ui/react/MenuItem`

| Kind  | Status | New path                  | Rule     | Names                                                                             |
| ----- | ------ | ------------------------- | -------- | --------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/MenuItem` | IMP-COMP | `MenuItem`                                                                        |
| type  | kept   | `@gild-ui/react/MenuItem` | IMP-COMP | `MenuItemColor` `MenuItemProps` `MenuItemRole` `MenuItemSize` `MenuItemTextColor` |

## `@soroush.tech/design-system/Modal`

Target: `@gild-ui/react/Modal`

| Kind  | Status | New path               | Rule     | Names                                                                                                                                      |
| ----- | ------ | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/Modal` | IMP-COMP | `Modal` `ModalManager` `exposeToAria` `hideFromAria` `useModal`                                                                            |
| type  | kept   | `@gild-ui/react/Modal` | IMP-COMP | `ManagedModal` `ManagedModalProps` `ModalCloseReason` `ModalManager` `ModalProps` `ModalScroll` `UseModalParameters` `UseModalReturnValue` |

## `@soroush.tech/design-system/NativeSelect`

Target: `@gild-ui/react/NativeSelect`

| Kind  | Status | New path                      | Rule     | Names                                                                                                                                                       |
| ----- | ------ | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/NativeSelect` | IMP-COMP | `NativeSelect`                                                                                                                                              |
| type  | kept   | `@gild-ui/react/NativeSelect` | IMP-COMP | `NativeSelectColor` `NativeSelectTextColor` `NativeSelectBackgroundToken` `NativeSelectVariant` `NativeSelectSize` `NativeSelectOption` `NativeSelectProps` |

## `@soroush.tech/design-system/NumberInput`

Target: `@gild-ui/react/NumberInput`

| Kind  | Status | New path                     | Rule     | Names                                                            |
| ----- | ------ | ---------------------------- | -------- | ---------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/NumberInput` | IMP-COMP | `NumberInput`                                                    |
| type  | kept   | `@gild-ui/react/NumberInput` | IMP-COMP | `NumberInputVariant` `NumberInputSpinButtons` `NumberInputProps` |

## `@soroush.tech/design-system/Pagination`

Target: `@gild-ui/react/Pagination`

| Kind  | Status | New path                    | Rule     | Names                                                                                                                                                                                                                                                                   |
| ----- | ------ | --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Pagination` | IMP-COMP | `Pagination` `PaginationItem` `usePagination`                                                                                                                                                                                                                           |
| type  | kept   | `@gild-ui/react/Pagination` | IMP-COMP | `PaginationColor` `PaginationItemColor` `PaginationItemProps` `PaginationItemShape` `PaginationItemSize` `PaginationItemType` `PaginationItemVariant` `PaginationProps` `PaginationShape` `PaginationSize` `PaginationVariant` `UsePaginationItem` `UsePaginationProps` |

## `@soroush.tech/design-system/Paper`

Target: `@gild-ui/react/Paper`

| Kind  | Status | New path               | Rule     | Names                         |
| ----- | ------ | ---------------------- | -------- | ----------------------------- |
| value | kept   | `@gild-ui/react/Paper` | IMP-COMP | `Paper`                       |
| type  | kept   | `@gild-ui/react/Paper` | IMP-COMP | `PaperElevation` `PaperProps` |

## `@soroush.tech/design-system/Popover`

Target: `@gild-ui/react/Popover`

| Kind  | Status | New path                 | Rule     | Names                                                                                                  |
| ----- | ------ | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/Popover` | IMP-COMP | `Popover`                                                                                              |
| type  | kept   | `@gild-ui/react/Popover` | IMP-COMP | `PopoverActions` `PopoverProps` `PopoverAnchorEl` `PopoverOrigin` `PopoverPosition` `PopoverReference` |

## `@soroush.tech/design-system/Portal`

Target: `@gild-ui/react/Portal`

| Kind  | Status | New path                | Rule     | Names         |
| ----- | ------ | ----------------------- | -------- | ------------- |
| value | kept   | `@gild-ui/react/Portal` | IMP-COMP | `Portal`      |
| type  | kept   | `@gild-ui/react/Portal` | IMP-COMP | `PortalProps` |

## `@soroush.tech/design-system/Pressable`

Target: `@gild-ui/react/Pressable`

| Kind  | Status | New path                   | Rule     | Names                                                 |
| ----- | ------ | -------------------------- | -------- | ----------------------------------------------------- |
| value | kept   | `@gild-ui/react/Pressable` | IMP-COMP | `Pressable`                                           |
| type  | kept   | `@gild-ui/react/Pressable` | IMP-COMP | `PressableColor` `PressableFeedback` `PressableProps` |

## `@soroush.tech/design-system/Quote`

Target: `@gild-ui/react/Quote`

| Kind  | Status | New path               | Rule     | Names        |
| ----- | ------ | ---------------------- | -------- | ------------ |
| value | kept   | `@gild-ui/react/Quote` | IMP-COMP | `Quote`      |
| type  | kept   | `@gild-ui/react/Quote` | IMP-COMP | `QuoteProps` |

## `@soroush.tech/design-system/Radio`

Target: `@gild-ui/react/Radio`

| Kind  | Status | New path               | Rule     | Names                                 |
| ----- | ------ | ---------------------- | -------- | ------------------------------------- |
| value | kept   | `@gild-ui/react/Radio` | IMP-COMP | `Radio`                               |
| type  | kept   | `@gild-ui/react/Radio` | IMP-COMP | `RadioColor` `RadioSize` `RadioProps` |

## `@soroush.tech/design-system/Rating`

Target: `@gild-ui/react/Rating`

| Kind  | Status | New path                | Rule     | Names         |
| ----- | ------ | ----------------------- | -------- | ------------- |
| value | kept   | `@gild-ui/react/Rating` | IMP-COMP | `Rating`      |
| type  | kept   | `@gild-ui/react/Rating` | IMP-COMP | `RatingProps` |

## `@soroush.tech/design-system/ScrollArea`

Target: `@gild-ui/react/ScrollArea`

| Kind  | Status | New path                    | Rule     | Names                          |
| ----- | ------ | --------------------------- | -------- | ------------------------------ |
| value | kept   | `@gild-ui/react/ScrollArea` | IMP-COMP | `ScrollArea`                   |
| type  | kept   | `@gild-ui/react/ScrollArea` | IMP-COMP | `ScrollAxes` `ScrollAreaProps` |

## `@soroush.tech/design-system/Select`

Target: `@gild-ui/react/Select`

| Kind  | Status | New path                | Rule     | Names                                                                                                            |
| ----- | ------ | ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Select` | IMP-COMP | `Select`                                                                                                         |
| type  | kept   | `@gild-ui/react/Select` | IMP-COMP | `SelectColor` `SelectTextColor` `SelectBackgroundToken` `SelectVariant` `SelectSize` `SelectProps` `SelectValue` |

## `@soroush.tech/design-system/Sidebar`

Target: `@gild-ui/react/Sidebar`

| Kind  | Status | New path                 | Rule     | Names                                                                                                                          |
| ----- | ------ | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/Sidebar` | IMP-COMP | `Sidebar` `SidebarContext` `SidebarItem`                                                                                       |
| type  | kept   | `@gild-ui/react/Sidebar` | IMP-COMP | `SidebarAnchor` `SidebarContextValue` `SidebarItemProps` `SidebarItemSize` `SidebarItemVariant` `SidebarLayout` `SidebarProps` |

## `@soroush.tech/design-system/Skeleton`

Target: `@gild-ui/react/Skeleton`

| Kind  | Status | New path                  | Rule     | Names                                                                  |
| ----- | ------ | ------------------------- | -------- | ---------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Skeleton` | IMP-COMP | `Skeleton`                                                             |
| type  | kept   | `@gild-ui/react/Skeleton` | IMP-COMP | `SkeletonVariant` `SkeletonAnimation` `SkeletonRadius` `SkeletonProps` |

## `@soroush.tech/design-system/Slide`

Target: `@gild-ui/react/Slide`

| Kind  | Status | New path               | Rule     | Names                         |
| ----- | ------ | ---------------------- | -------- | ----------------------------- |
| value | kept   | `@gild-ui/react/Slide` | IMP-COMP | `Slide`                       |
| type  | kept   | `@gild-ui/react/Slide` | IMP-COMP | `SlideDirection` `SlideProps` |

## `@soroush.tech/design-system/Snackbar`

Target: `@gild-ui/react/Snackbar`

| Kind  | Status | New path                  | Rule     | Names                                                                        |
| ----- | ------ | ------------------------- | -------- | ---------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Snackbar` | IMP-COMP | `Snackbar`                                                                   |
| type  | kept   | `@gild-ui/react/Snackbar` | IMP-COMP | `SnackbarCloseReason` `SnackbarAnchorOrigin` `SnackbarShape` `SnackbarProps` |

## `@soroush.tech/design-system/Switch`

Target: `@gild-ui/react/Switch`

| Kind  | Status | New path                | Rule     | Names                                                                 |
| ----- | ------ | ----------------------- | -------- | --------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Switch` | IMP-COMP | `Switch`                                                              |
| type  | kept   | `@gild-ui/react/Switch` | IMP-COMP | `SwitchColor` `SwitchSize` `SwitchEdge` `SwitchVariant` `SwitchProps` |

## `@soroush.tech/design-system/Table`

Target: `@gild-ui/react/Table`

| Kind  | Status | New path               | Rule     | Names                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----- | ------ | ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Table` | IMP-COMP | `Table` `TableBody` `TableCell` `TableContainer` `TableContext` `TableControl` `TableFooter` `TableHead` `TablePagination` `TablePaginationActions` `TableRow` `TableSectionContext` `TableSortLabel` `useTablePagination` `useTableSelection` `useTableSort`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| type  | kept   | `@gild-ui/react/Table` | IMP-COMP | `TableAlign` `TableBackgroundToken` `TableBodyBackgroundToken` `TableBodyBorderColorToken` `TableBodyColorToken` `TableBodyProps` `TableBorderColorToken` `TableCellAlign` `TableCellBackgroundToken` `TableCellBorderColorToken` `TableCellColorToken` `TableCellPadding` `TableCellProps` `TableCellSortDirection` `TableCellVariant` `TableContainerProps` `TableContextValue` `TableControlProps` `TableFooterBackgroundToken` `TableFooterBorderColorToken` `TableFooterColorToken` `TableFooterProps` `TableHeadBackgroundToken` `TableHeadBorderColorToken` `TableHeadColorToken` `TableHeadProps` `TablePaginationActionType` `TablePaginationActionsProps` `TablePaginationDisplayedRowsInfo` `TablePaginationProps` `TablePaginationState` `TableProps` `TableRowBackgroundToken` `TableRowBorderColorToken` `TableRowColor` `TableRowProps` `TableSection` `TableSelection` `TableSelectionAllProps` `TableSelectionRowProps` `TableSize` `TableSortEntry` `TableSortLabelDirection` `TableSortLabelProps` `TableSortMap` `UseTablePaginationOptions` |

## `@soroush.tech/design-system/Tabs`

Target: `@gild-ui/react/Tabs`

| Kind  | Status | New path              | Rule     | Names                                                                                                                                                                                                                                     |
| ----- | ------ | --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Tabs` | IMP-COMP | `Tab` `TabContext` `TabList` `TabPanel` `TabScrollButton` `Tabs`                                                                                                                                                                          |
| type  | kept   | `@gild-ui/react/Tabs` | IMP-COMP | `TabContextProps` `TabIconPosition` `TabListProps` `TabPanelProps` `TabProps` `TabScrollButtonProps` `TabScrollDirection` `TabValue` `TabsActions` `TabsOrientation` `TabsOverflowBehavior` `TabsProps` `TabsScrollButtons` `TabsVariant` |

## `@soroush.tech/design-system/TextInput`

Target: `@gild-ui/react/TextInput`

| Kind  | Status | New path                   | Rule     | Names                                                                                                        |
| ----- | ------ | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/TextInput` | IMP-COMP | `TextInput`                                                                                                  |
| type  | kept   | `@gild-ui/react/TextInput` | IMP-COMP | `TextInputColor` `TextInputTextColor` `TextInputVariant` `TextInputSize` `TextInputClasses` `TextInputProps` |

## `@soroush.tech/design-system/Tooltip`

Target: `@gild-ui/react/Tooltip`

| Kind  | Status | New path                 | Rule     | Names                                                                                                           |
| ----- | ------ | ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/Tooltip` | IMP-COMP | `TooltipGroup` `Tooltip`                                                                                        |
| type  | kept   | `@gild-ui/react/Tooltip` | IMP-COMP | `TooltipSlots` `TooltipSlotProps` `TooltipForwardedProps` `TooltipProps` `TooltipGroupProps` `TooltipPlacement` |

## `@soroush.tech/design-system/Zoom`

Target: `@gild-ui/react/Zoom`

| Kind  | Status | New path              | Rule     | Names       |
| ----- | ------ | --------------------- | -------- | ----------- |
| value | kept   | `@gild-ui/react/Zoom` | IMP-COMP | `Zoom`      |
| type  | kept   | `@gild-ui/react/Zoom` | IMP-COMP | `ZoomProps` |

## `@soroush.tech/design-system/catalog`

Target: `@gild-ui/react/catalog`

| Kind  | Status | New path                 | Rule        | Names                                                                                                                                         |
| ----- | ------ | ------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react/catalog` | IMP-CATALOG | `catalog`                                                                                                                                     |
| type  | kept   | `@gild-ui/react/catalog` | IMP-CATALOG | `CatalogContent` `CatalogEntry` `CatalogOption` `CatalogTwoWay` `CatalogVariant` `DesignSystemCatalog` `ExampleNode` `JsonValue` `ThemeScale` |

## `@soroush.tech/design-system/theme`

Target: split - `@gild-ui/core/theme` (70), `@gild-ui/react` (9), `removed` (5), `@gild-ui/react/Tabs` (4), `@gild-ui/react/Accordion` (3), `@gild-ui/react/Menu` (3), `@gild-ui/core/breakpoints` (2), `@gild-ui/react/Alert` (1), `@gild-ui/react/Autocomplete` (1), `@gild-ui/react/Badge` (1), `@gild-ui/react/Breadcrumbs` (1), `@gild-ui/react/Button` (1), `@gild-ui/react/Card` (1), `@gild-ui/react/Chip` (1), `@gild-ui/react/Collapse` (1), `@gild-ui/react/FabMenu` (1), `@gild-ui/react/Fab` (1), `@gild-ui/react/MenuItem` (1), `@gild-ui/react/NumberInput` (1), `@gild-ui/react/Pressable` (1), `@gild-ui/react/RangeInput` (1), `@gild-ui/react/Rating` (1), `@gild-ui/react/ScrollArea` (1), `@gild-ui/react/Snackbar` (1), `@gild-ui/react/Tooltip` (1), `@gild-ui/react/TransferList` (1)

| Kind  | Status  | New path                      | Rule                  | Names                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----- | ------- | ----------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | moved   | `@gild-ui/react`              | IMP-THEME-REACT       | `LayoutProvider` `ThemeProvider` `useDefaultProps` `useTheme` `withTheme`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| value | moved   | `@gild-ui/core/theme`         | IMP-THEME-CORE        | `avatar` `baseTheme` `between` `borderWidths` `breakpoints` `containerQueries` `createTheme` `down` `fontSizes` `fontWeights` `fonts` `icon` `layout` `letterSpacings` `lineHeights` `not` `only` `radii` `sizes` `space` `themeDefault` `transitions` `typography` `up` `zOrder`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| value | moved   | `@gild-ui/core/breakpoints`   | IMP-THEME-BREAKPOINTS | `withBreakpointHelpers`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type  | moved   | `@gild-ui/react/Accordion`    | IMP-THEME-OWNERSTATE  | `AccordionGroupOwnerState` `AccordionOwnerState` `AccordionSummaryOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| type  | moved   | `@gild-ui/react/Alert`        | IMP-THEME-OWNERSTATE  | `AlertOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| type  | moved   | `@gild-ui/react/Autocomplete` | IMP-THEME-OWNERSTATE  | `AutocompleteOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| type  | moved   | `@gild-ui/react/Badge`        | IMP-THEME-OWNERSTATE  | `BadgeOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| type  | moved   | `@gild-ui/react/Breadcrumbs`  | IMP-THEME-OWNERSTATE  | `BreadcrumbsOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type  | moved   | `@gild-ui/core/breakpoints`   | IMP-THEME-BREAKPOINTS | `BreakpointHelpers`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| type  | moved   | `@gild-ui/core/theme`         | IMP-THEME-CORE        | `BreakpointKey` `BreakpointOverrides` `ButtonVariants` `DeepPartial` `DefaultBreakpoints` `LayoutBars` `LayoutContent` `LayoutEntry` `LayoutLength` `LayoutPanel` `LayoutPanels` `LayoutSpace` `OpenScale` `PaletteColor` `PaletteEntry` `SizeEntry` `Theme` `ThemeAvatarSizes` `ThemeBackground` `ThemeBorder` `ThemeBorderWidths` `ThemeBreakpoints` `ThemeDefaults` `ThemeFontWeights` `ThemeFonts` `ThemeIconSizes` `ThemeLayout` `ThemeLetterSpacings` `ThemeLineHeights` `ThemeOverride` `ThemePalette` `ThemeRadii` `ThemeShadow` `ThemeSizes` `ThemeSkeleton` `ThemeSpace` `ThemeSwitch` `ThemeText` `ThemeTransitionDuration` `ThemeTransitionEasing` `ThemeTransitions` `ThemeTypographyVariants` `ThemeZOrder` `TypographyVariant` `TypographyVariantStyle` |
| type  | moved   | `@gild-ui/react/Button`       | IMP-THEME-OWNERSTATE  | `ButtonOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| type  | moved   | `@gild-ui/react`              | IMP-THEME-REACT       | `CSSObject` `ComponentConfig` `LayoutProviderProps` `ThemeComponents`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| type  | moved   | `@gild-ui/react/Card`         | IMP-THEME-OWNERSTATE  | `CardOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| type  | removed | -                             | EXP-003               | `CardSlotIconProps` `CardSlotTypographyProps` - Not exported; take the props from `ComponentProps` of the icon.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| type  | moved   | `@gild-ui/react/Chip`         | IMP-THEME-OWNERSTATE  | `ChipOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| type  | moved   | `@gild-ui/react/Collapse`     | IMP-THEME-OWNERSTATE  | `CollapseOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| type  | removed | -                             | EXP-002               | `ComponentStyle` `ComponentVariant` - Not exported; a style from `theme.components` is `CSSObject` or `({ theme, ownerState }) => CSSObject`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| type  | moved   | `@gild-ui/react/Menu`         | IMP-THEME-OWNERSTATE  | `ContextMenuOwnerState` `MenuListOwnerState` `MenuOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| type  | moved   | `@gild-ui/react/FabMenu`      | IMP-THEME-OWNERSTATE  | `FabMenuOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| type  | moved   | `@gild-ui/react/Fab`          | IMP-THEME-OWNERSTATE  | `FabOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| type  | moved   | `@gild-ui/react/MenuItem`     | IMP-THEME-OWNERSTATE  | `MenuItemOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| type  | moved   | `@gild-ui/react/NumberInput`  | IMP-THEME-OWNERSTATE  | `NumberInputOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type  | moved   | `@gild-ui/react/Pressable`    | IMP-THEME-OWNERSTATE  | `PressableOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| type  | moved   | `@gild-ui/react/RangeInput`   | IMP-THEME-OWNERSTATE  | `RangeInputOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| type  | moved   | `@gild-ui/react/Rating`       | IMP-THEME-OWNERSTATE  | `RatingOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| type  | moved   | `@gild-ui/react/ScrollArea`   | IMP-THEME-OWNERSTATE  | `ScrollAreaOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| type  | moved   | `@gild-ui/react/Snackbar`     | IMP-THEME-OWNERSTATE  | `SnackbarOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| type  | moved   | `@gild-ui/react/Tabs`         | IMP-THEME-OWNERSTATE  | `TabOwnerState` `TabPanelOwnerState` `TabScrollButtonOwnerState` `TabsOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| type  | removed | -                             | EXP-004               | `TabsVariants` - No longer an augmentable interface: a Tabs look is declared by a registered theme (`components.Tabs.variants`); `TabsVariant` (from `@gild-ui/react/Tabs`) is the union.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type  | moved   | `@gild-ui/react/Tooltip`      | IMP-THEME-OWNERSTATE  | `TooltipOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| type  | moved   | `@gild-ui/react/TransferList` | IMP-THEME-OWNERSTATE  | `TransferListOwnerState`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## `@soroush.tech/design-system/testing`

Target: `@gild-ui/react/testing`

| Kind  | Status | New path                 | Rule        | Names            |
| ----- | ------ | ------------------------ | ----------- | ---------------- |
| value | kept   | `@gild-ui/react/testing` | IMP-TESTING | `installPopover` |

## `@soroush.tech/design-system/style`

Target: split - `@gild-ui/react` (5)

| Kind  | Status | New path         | Rule      | Names                                    |
| ----- | ------ | ---------------- | --------- | ---------------------------------------- |
| value | moved  | `@gild-ui/react` | IMP-STYLE | `useStyle` `withStyles` `StylesConsumer` |
| type  | moved  | `@gild-ui/react` | IMP-STYLE | `StyleFactory` `StyleInput`              |

## `@soroush.tech/design-system/ToggleButton`

Target: `@gild-ui/react/ToggleButton`

| Kind  | Status | New path                      | Rule     | Names                                                                                            |
| ----- | ------ | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/ToggleButton` | IMP-COMP | `ToggleButton` `ToggleButtonGroup` `ToggleButtonGroupContext`                                    |
| type  | kept   | `@gild-ui/react/ToggleButton` | IMP-COMP | `ToggleButtonGroupContextValue` `ToggleButtonGroupProps` `ToggleButtonProps` `ToggleButtonValue` |

## `@soroush.tech/design-system/TransferList`

Target: `@gild-ui/react/TransferList`

| Kind  | Status | New path                      | Rule     | Names                                                      |
| ----- | ------ | ----------------------------- | -------- | ---------------------------------------------------------- |
| value | kept   | `@gild-ui/react/TransferList` | IMP-COMP | `TransferList`                                             |
| type  | kept   | `@gild-ui/react/TransferList` | IMP-COMP | `TransferListProps` `TransferListItem` `TransferListValue` |

## `@soroush.tech/design-system/Typography`

Target: `@gild-ui/react/Typography`

| Kind  | Status | New path                    | Rule     | Names                                                                                      |
| ----- | ------ | --------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/Typography` | IMP-COMP | `Typography`                                                                               |
| type  | kept   | `@gild-ui/react/Typography` | IMP-COMP | `BackgroundToken` `TextColorToken` `TypographyAlign` `TypographyProps` `TypographyVariant` |

## `@soroush.tech/design-system/View`

Target: `@gild-ui/react/View`

| Kind  | Status | New path              | Rule     | Names                                                                                                                    |
| ----- | ------ | --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| value | kept   | `@gild-ui/react/View` | IMP-COMP | `View`                                                                                                                   |
| type  | kept   | `@gild-ui/react/View` | IMP-COMP | `ViewBackgroundToken` `ViewBorderColorToken` `ViewBorderRadiusToken` `ViewBorderWidthToken` `ViewColorToken` `ViewProps` |

## `@soroush.tech/design-system/utils`

Target: split - `@gild-ui/core/utils` (4)

| Kind  | Status | New path              | Rule      | Names                                           |
| ----- | ------ | --------------------- | --------- | ----------------------------------------------- |
| value | moved  | `@gild-ui/core/utils` | IMP-UTILS | `clamp` `luminance` `generateBoxShadow` `alpha` |

## `@soroush.tech/design-system/engine`

Target: split - `@gild-ui/react/engine` (4), `@gild-ui/react` (1)

| Kind  | Status | New path                | Rule              | Names                                                     |
| ----- | ------ | ----------------------- | ----------------- | --------------------------------------------------------- |
| value | moved  | `@gild-ui/react`        | IMP-ENGINE-GLOBAL | `Global`                                                  |
| value | kept   | `@gild-ui/react/engine` | IMP-ENGINE        | `globalStyles` `CacheProvider` `createCache` `styleCache` |

## `@soroush.tech/markdown/CodeBlock`

Target: `@gild-ui/react-markdown/CodeBlock`

| Kind  | Status | New path                            | Rule   | Names                                  |
| ----- | ------ | ----------------------------------- | ------ | -------------------------------------- |
| value | kept   | `@gild-ui/react-markdown/CodeBlock` | IMP-MD | `CodeBlock` `syntaxDark` `syntaxLight` |
| type  | kept   | `@gild-ui/react-markdown/CodeBlock` | IMP-MD | `CodeBlockProps` `ThemeSyntax`         |

## `@soroush.tech/markdown/Control`

Target: `@gild-ui/react-markdown/Control`

| Kind  | Status | New path                          | Rule   | Names          |
| ----- | ------ | --------------------------------- | ------ | -------------- |
| value | kept   | `@gild-ui/react-markdown/Control` | IMP-MD | `Control`      |
| type  | kept   | `@gild-ui/react-markdown/Control` | IMP-MD | `ControlProps` |

## `@soroush.tech/markdown/Editor`

Target: `@gild-ui/react-markdown/Editor`

| Kind  | Status | New path                         | Rule   | Names         |
| ----- | ------ | -------------------------------- | ------ | ------------- |
| value | kept   | `@gild-ui/react-markdown/Editor` | IMP-MD | `Editor`      |
| type  | kept   | `@gild-ui/react-markdown/Editor` | IMP-MD | `EditorProps` |

## `@soroush.tech/markdown`

Target: `@gild-ui/react-markdown`

| Kind  | Status | New path                  | Rule   | Names                                                                                                                                                                                                                             |
| ----- | ------ | ------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value | kept   | `@gild-ui/react-markdown` | IMP-MD | `CodeBlock` `Control` `Editor` `LiveEdit` `MarkdownContext` `Mermaid` `Preview` `TablePicker` `Toolbar` `syntaxDark` `syntaxLight` `useMarkdownContext`                                                                           |
| type  | kept   | `@gild-ui/react-markdown` | IMP-MD | `MermaidThemeVariables` `CodeBlockProps` `ControlProps` `DiagramProps` `EditorProps` `LiveEditProps` `MarkdownContextValue` `MarkdownSelection` `MermaidProps` `PreviewProps` `PreviewSlotProps` `TablePickerProps` `ThemeSyntax` |

## `@soroush.tech/markdown/LiveEdit`

Target: `@gild-ui/react-markdown/LiveEdit`

| Kind  | Status | New path                           | Rule   | Names           |
| ----- | ------ | ---------------------------------- | ------ | --------------- |
| value | kept   | `@gild-ui/react-markdown/LiveEdit` | IMP-MD | `LiveEdit`      |
| type  | kept   | `@gild-ui/react-markdown/LiveEdit` | IMP-MD | `LiveEditProps` |

## `@soroush.tech/markdown/Mermaid`

Target: `@gild-ui/react-markdown/Mermaid`

| Kind  | Status | New path                          | Rule   | Names                         |
| ----- | ------ | --------------------------------- | ------ | ----------------------------- |
| value | kept   | `@gild-ui/react-markdown/Mermaid` | IMP-MD | `Mermaid`                     |
| type  | kept   | `@gild-ui/react-markdown/Mermaid` | IMP-MD | `DiagramProps` `MermaidProps` |

## `@soroush.tech/markdown/Preview`

Target: `@gild-ui/react-markdown/Preview`

| Kind  | Status | New path                          | Rule   | Names                             |
| ----- | ------ | --------------------------------- | ------ | --------------------------------- |
| value | kept   | `@gild-ui/react-markdown/Preview` | IMP-MD | `Preview`                         |
| type  | kept   | `@gild-ui/react-markdown/Preview` | IMP-MD | `PreviewProps` `PreviewSlotProps` |

## `@soroush.tech/markdown/Toolbar`

Target: `@gild-ui/react-markdown/Toolbar`

| Kind  | Status | New path                          | Rule   | Names                   |
| ----- | ------ | --------------------------------- | ------ | ----------------------- |
| value | kept   | `@gild-ui/react-markdown/Toolbar` | IMP-MD | `Toolbar` `TablePicker` |
| type  | kept   | `@gild-ui/react-markdown/Toolbar` | IMP-MD | `TablePickerProps`      |

## `@soroush.tech/hooks/useCopyToClipboard` (not published)

Target: `@gild-ui/hooks/useCopyToClipboard`

| Kind  | Status | New path                            | Rule      | Names                                  |
| ----- | ------ | ----------------------------------- | --------- | -------------------------------------- |
| value | kept   | `@gild-ui/hooks/useCopyToClipboard` | IMP-HOOKS | `useCopyToClipboard` `COPIED_RESET_MS` |
| type  | kept   | `@gild-ui/hooks/useCopyToClipboard` | IMP-HOOKS | `UseCopyToClipboardResult`             |

## `@soroush.tech/markdown/MarkdownContext`

Target: `@gild-ui/react-markdown` - reachable through the `./*` wildcard of 1.3.0 (dist/MarkdownContext.mjs); the new package has no wildcard and no such entry

| Kind  | Status | New path                  | Rule   | Names                                      |
| ----- | ------ | ------------------------- | ------ | ------------------------------------------ |
| value | moved  | `@gild-ui/react-markdown` | IMP-MD | `MarkdownContext` `useMarkdownContext`     |
| type  | moved  | `@gild-ui/react-markdown` | IMP-MD | `MarkdownContextValue` `MarkdownSelection` |
