import{n as e}from"../chunks/chunk-aKtaBQYM.js";import{A as t,f as n,j as r,k as i,n as a,t as o,u as s}from"../chunks/chunk-BF5idQyo.js";import{W as c}from"../chunks/chunk-BkML6sXq.js";import{n as l,t as u}from"../chunks/chunk-B11dARQk.js";var d=Object.assign({"../../packages/styled-system/docs/README.md":`# Documentation

Full documentation for [\`@soroush.tech/styled-system\`](../README.md) - a maintained,
first-class-TypeScript rewrite of [styled-system](https://github.com/jxnblk/styled-system)
v5. It is a drop-in replacement for the \`styled-system\` runtime and ships its own types
(replacing \`@types/styled-system\`).

Ported and adapted from the original styled-system documentation.

## Introduction

- [Getting Started](./getting-started.md) - install, create a component, theming, margin/padding, layout
- [How it Works](./how-it-works.md) - the props-to-style-object pattern
- [Rationale](./rationale.md) - why style props and scales
- [TypeScript](./typescript.md) - typed, theme-scale-aware props (this package's headline feature)

## Core concepts

- [Responsive Styles](./responsive-styles.md) - mobile-first array & object syntax
- [Theming](./theming.md) - referencing theme values in props
- [Theme Specification](./theme-specification.md) - the full theme object shape and scales
- [Variants](./variants.md) - \`variant\`, \`buttonStyle\`, \`textStyle\`, \`colorStyle\`
- [Custom Style Props](./custom-props.md) - build your own with \`system\` and \`compose\`

## Reference

- [API](./api.md) - every style function and utility
- [Reference Table](./table.md) - every style prop, its CSS property, and theme scale
- [css / theme-get / props](./css.md) - the \`/css\`, \`/theme-get\`, \`/props\` subpath exports

## Guides

- [Build a Box](./guides/build-a-box.md)
- [Spacing](./guides/spacing.md)
- [Default Values](./guides/default-values.md)
- [Why Powers of Two](./guides/why-powers-of-two.md)
- [Removing Props from HTML](./guides/removing-props-from-html.md)
- [Theming](./guides/theming.md)
- [Array Scales](./guides/array-scales.md)
- [Array Props](./guides/array-props.md)
- [Color Modes](./guides/color-modes.md)
- [Component Types](./guides/component-types.md)
- [Scale Aliases](./guides/scale-aliases.md)
- [Migrating to v5](./guides/migrating.md)
- [Exceptions](./guides/exceptions.md)

## Package exports

This single package replaces the original family of \`@styled-system/*\` packages via
subpath exports:

| Import                                            | Original package                     |
| ------------------------------------------------- | ------------------------------------ |
| \`@soroush.tech/styled-system\`                     | \`styled-system\`                      |
| \`@soroush.tech/styled-system/css\`                 | \`@styled-system/css\`                 |
| \`@soroush.tech/styled-system/theme-get\`           | \`@styled-system/theme-get\`           |
| \`@soroush.tech/styled-system/props\`               | \`@styled-system/props\`               |
| \`@soroush.tech/styled-system/should-forward-prop\` | \`@styled-system/should-forward-prop\` |

## Examples

Runnable demos live in the [examples repo](https://github.com/soroush-tech/examples/tree/main/styled-system) -
\`basic\` (styled-components), \`emotion\`, \`css\`, \`responsive-objects\`, \`theme-aliases\`,
\`svelte\`, and \`typescript\` (typed, \`tsc\`-verified).
`,"../../packages/styled-system/docs/api.md":`# API

## Space

\`\`\`js
import { space } from '@soroush.tech/styled-system'
\`\`\`

The space utility converts shorthand margin, padding and gap props to margin, padding and gap CSS declarations.

- Numbers from 0 to the length of \`theme.space\` are converted to values on the [space scale](#defaults).
- Negative values can be used for negative margins.
- Numbers greater than the length of the \`theme.space\` array are converted to raw pixel values.
- String values are passed as raw CSS values.
- And array values are converted into [responsive values][responsive-styles].

Margin and padding props follow a shorthand syntax for specifying direction.

| Prop                  | CSS Property                   |
| --------------------- | ------------------------------ |
| \`margin\`, \`m\`         | margin                         |
| \`marginTop\`, \`mt\`     | margin-top                     |
| \`marginRight\`, \`mr\`   | margin-right                   |
| \`marginBottom\`, \`mb\`  | margin-bottom                  |
| \`marginLeft\`, \`ml\`    | margin-left                    |
| \`marginX\`, \`mx\`       | margin-left and margin-right   |
| \`marginY\`, \`my\`       | margin-top and margin-bottom   |
| \`padding\`, \`p\`        | padding                        |
| \`paddingTop\`, \`pt\`    | padding-top                    |
| \`paddingRight\`, \`pr\`  | padding-right                  |
| \`paddingBottom\`, \`pb\` | padding-bottom                 |
| \`paddingLeft\`, \`pl\`   | padding-left                   |
| \`paddingX\`, \`px\`      | padding-left and padding-right |
| \`paddingY\`, \`py\`      | padding-top and padding-bottom |
| \`gap\`                 | gap                            |
| \`rowGap\`              | row-gap                        |
| \`columnGap\`           | column-gap                     |

\`\`\`jsx
// examples (margin prop)

// sets margin value of \`theme.space[2]\`
<Box m={2} />

// sets margin value of \`-1 * theme.space[2]\`
<Box m={-2} />

// sets a margin value of \`16px\` since it's greater than \`theme.space.length\`
<Box m={16} />

// sets margin \`'auto'\`
<Box m='auto' />

// sets margin \`8px\` on all viewports and \`16px\` from the first breakpoint and up
<Box m={[ 2, 3 ]} />
\`\`\`

As of v4.0.0, verbose margin and padding props (e.g. \`margin\`, \`marginTop\`) can also be used instead of the shorthand props.

## Color

\`\`\`js
import { color } from '@soroush.tech/styled-system'
\`\`\`

The color utility parses a component's \`color\` and \`bg\` props and converts them into CSS declarations.
By default the raw value of the prop is returned.
Color palettes can be configured with the [ThemeProvider][theming] to use keys as prop values, with support for dot notation.

| Prop                    | CSS Property     |
| ----------------------- | ---------------- |
| \`color\`                 | color            |
| \`bg\`, \`backgroundColor\` | background-color |
| \`opacity\`               | opacity          |

\`\`\`jsx
// examples
// picks the value defined in \`theme.colors.blue\`
<Box color='blue' />

// picks up a nested color value using dot notation
// \`theme.colors.gray[0]\`
<Box color='gray.0' />

// raw CSS color value
<Box color='#f00' />

// background colors
<Box bg='blue' />

// verbose prop
<Box backgroundColor='blue' />
\`\`\`

## Typography

\`\`\`js
import { typography } from '@soroush.tech/styled-system'
\`\`\`

The typography utility includes the following style props.

| Prop                      | CSS Property              |
| ------------------------- | ------------------------- |
| \`fontFamily\`              | font-family               |
| \`fontSize\`                | font-size                 |
| \`fontWeight\`              | font-weight               |
| \`lineHeight\`              | line-height               |
| \`letterSpacing\`           | letter-spacing            |
| \`textAlign\`               | text-align                |
| \`fontStyle\`               | font-style                |
| \`textTransform\`           | text-transform            |
| \`textAlignLast\`           | text-align-last           |
| \`textDecoration\`          | text-decoration           |
| \`textDecorationLine\`      | text-decoration-line      |
| \`textDecorationStyle\`     | text-decoration-style     |
| \`textDecorationThickness\` | text-decoration-thickness |
| \`textDecorationColor\`     | text-decoration-color     |
| \`whiteSpace\`              | white-space               |
| \`textOverflow\`            | text-overflow             |

\`\`\`jsx
// examples
// font-size of \`theme.fontSizes[3]\`
<Text fontSize={3} />

// font-size \`32px\`
<Text fontSize={32} />

// font-size \`'2em'\`
<Text fontSize='2em' />

// font-size \`10px\` on all viewports and \`12px\` from the first breakpoint and up
<Text fontSize={[ 10, 12 ]} />

// fontFamily
<Text fontFamily='mono' />

// textAlign
<Text textAlign='center' />
<Text textAlign={[ 'center', 'left' ]} />

// lineHeight
<Text lineHeight='1.25' />

// fontWeight
<Text fontWeight='bold' />

// letterSpacing
<Text letterSpacing='0.1em' />
\`\`\`

## Layout

\`\`\`js
import { layout } from '@soroush.tech/styled-system'
\`\`\`

The layout utility includes the following style props.

| Prop            | CSS Property     |
| --------------- | ---------------- |
| \`width\`         | width            |
| \`height\`        | height           |
| \`minWidth\`      | min-width        |
| \`maxWidth\`      | max-width        |
| \`minHeight\`     | min-height       |
| \`maxHeight\`     | max-height       |
| \`size\`          | width and height |
| \`display\`       | display          |
| \`verticalAlign\` | vertical-align   |
| \`aspectRatio\`   | aspect-ratio     |
| \`overflow\`      | overflow         |
| \`overflowX\`     | overflow-x       |
| \`overflowY\`     | overflow-y       |

The \`width\` prop is transformed based on the following:

- Numbers from 0-1 are converted to percentage widths.
- Numbers greater than 1 are converted to pixel values.
- String values are passed as raw CSS values.
- And arrays are converted to [responsive width styles][responsive-styles].
- If \`theme.sizes\` is defined, the \`width\` prop will attempt to pick up values from the theme

\`\`\`jsx
// examples

// width \`50%\`
<Box width={1/2} />

// width \`256px\`
<Box width={256} />

// width \`'2em'\`
<Box width='2em' />

// width \`100%\` on all viewports and \`50%\` from the smallest breakpoint and up
<Box width={[ 1, 1/2 ]} />

// width from \`theme.sizes\`
<Box width='medium' />

// display
<Box display='inline-block' />
<Box display={[ 'block', 'inline-block' ]} />

// maxWidth
<Box maxWidth={1024} />
<Box maxWidth={[ 768, null, null, 1024 ]} />

// minWidth
<Box minWidth={128} />
<Box minWidth={[ 96, 128 ]} />

// height
<Box height={64} />
<Box height={[ 48, 64 ]} />

// maxHeight
<Box maxHeight={512} />
<Box maxHeight={[ 384, 512 ]} />

// minHeight
<Box minHeight={512} />
<Box minHeight={[ 384, 512 ]} />

// size (width & height)
<Box size={32} />
<Box size={[ 32, 48 ]} />

// overflow
<Box overflow='hidden' />

// overflowX
<Box overflowX='hidden' />

// overflowY
<Box overflowY='hidden' />
\`\`\`

## Flexbox

\`\`\`js
import { flexbox } from '@soroush.tech/styled-system'
\`\`\`

The \`flexbox\` utility includes the following style props.

| Prop             | CSS Property    |
| ---------------- | --------------- |
| \`alignItems\`     | align-items     |
| \`alignContent\`   | align-content   |
| \`justifyItems\`   | justify-items   |
| \`justifyContent\` | justify-content |
| \`flexWrap\`       | flex-wrap       |
| \`flexDirection\`  | flex-direction  |
| \`flex\`           | flex            |
| \`flexGrow\`       | flex-grow       |
| \`flexShrink\`     | flex-shrink     |
| \`flexBasis\`      | flex-basis      |
| \`justifySelf\`    | justify-self    |
| \`alignSelf\`      | align-self      |
| \`order\`          | order           |

\`\`\`jsx
// alignItems
<Flex alignItems='center' />

// alignContent
<Flex alignContent='center' />

// justifyContent
<Flex justifyContent='center' />

// flexWrap
<Flex flexWrap='wrap' />

// flexBasis
<Flex flexBasis='auto' />

// flexDirection
<Flex flexDirection='column' />

// flex
<Box flex='1 1 auto' />

// justifySelf
<Box justifySelf='center' />

// alignSelf
<Box alignSelf='center' />

// order
<Box order='2' />
\`\`\`

## Grid Layout

\`\`\`js
import { grid } from '@soroush.tech/styled-system'
\`\`\`

The \`grid\` utility includes the following style props.

| Prop                  | CSS Property          |
| --------------------- | --------------------- |
| \`gridGap\`             | grid-gap              |
| \`gridColumnGap\`       | grid-column-gap       |
| \`gridRowGap\`          | grid-row-gap          |
| \`gridColumn\`          | grid-column           |
| \`gridRow\`             | grid-row              |
| \`gridAutoFlow\`        | grid-auto-flow        |
| \`gridAutoColumns\`     | grid-auto-columns     |
| \`gridAutoRows\`        | grid-auto-rows        |
| \`gridTemplateColumns\` | grid-template-columns |
| \`gridTemplateRows\`    | grid-template-rows    |
| \`gridTemplateAreas\`   | grid-template-areas   |
| \`gridArea\`            | grid-area             |

\`\`\`jsx
// gridGap
<Box gridGap={10} />
<Box gridGap={[ 1, 2 ]} />

// gridColumnGap
<Box gridColumnGap={10} />
<Box gridColumnGap={[ 1, 2 ]} />

// gridRowGap
<Box gridRowGap={10} />
<Box gridRowGap={[ 1, 2 ]} />

// gridColumn
<Box gridColumn={1} />

// gridRow
<Box gridRow={1} />

// gridAutoFlow
<Box gridAutoFlow='row' />

// gridAutoColumns
<Box gridAutoColumns='auto' />

// gridAutoRows
<Box gridAutoRows='auto' />

// gridTemplateColumns
<Box gridTemplateColumns='1fr 2fr' />

// gridTemplateRows
<Box gridTemplateRows='auto' />

// gridTemplateAreas
<Box gridTemplateAreas='a b' />

// gridArea
<Box gridArea='a' />
\`\`\`

## Background

\`\`\`js
import { background } from '@soroush.tech/styled-system'
\`\`\`

The \`background\` utility includes the following style props.

| Prop                               | CSS Property        |
| ---------------------------------- | ------------------- |
| \`background\`                       | background          |
| \`backgroundImage\`, \`bgImage\`       | background-image    |
| \`backgroundSize\`, \`bgSize\`         | background-size     |
| \`backgroundPosition\`, \`bgPosition\` | background-position |
| \`backgroundRepeat\`, \`bgRepeat\`     | background-repeat   |

\`\`\`jsx
// example
<Box
  backgroundImage="url('kitten.png')"
  backgroundSize="cover"
  backgroundPosition="center"
  backgroundRepeat="repeat-x"
/>
\`\`\`

## Border

\`\`\`js
import { border } from '@soroush.tech/styled-system'
\`\`\`

The \`border\` utility includes the following style props.

| Prop                      | CSS Property                 |
| ------------------------- | ---------------------------- |
| \`border\`                  | border                       |
| \`borderWidth\`             | border-width                 |
| \`borderStyle\`             | border-style                 |
| \`borderColor\`             | border-color                 |
| \`borderRadius\`            | border-radius                |
| \`borderTop\`               | border-top                   |
| \`borderTopWidth\`          | border-top-width             |
| \`borderTopStyle\`          | border-top-style             |
| \`borderTopColor\`          | border-top-color             |
| \`borderTopLeftRadius\`     | border-top-left-radius       |
| \`borderTopRightRadius\`    | border-top-right-radius      |
| \`borderRight\`             | border-right                 |
| \`borderRightWidth\`        | border-right-width           |
| \`borderRightStyle\`        | border-right-style           |
| \`borderRightColor\`        | border-right-color           |
| \`borderBottom\`            | border-bottom                |
| \`borderBottomWidth\`       | border-bottom-width          |
| \`borderBottomStyle\`       | border-bottom-style          |
| \`borderBottomColor\`       | border-bottom-color          |
| \`borderBottomLeftRadius\`  | border-bottom-left-radius    |
| \`borderBottomRightRadius\` | border-bottom-right-radius   |
| \`borderLeft\`              | border-left                  |
| \`borderLeftWidth\`         | border-left-width            |
| \`borderLeftStyle\`         | border-left-style            |
| \`borderLeftColor\`         | border-left-color            |
| \`borderX\`                 | border-left and border-right |
| \`borderY\`                 | border-top and border-bottom |

\`\`\`jsx
<Box border='1px solid' />
<Box borderTop='1px solid' />
<Box borderRight='1px solid' />
<Box borderBottom='1px solid' />
<Box borderLeft='1px solid' />

// borderWidth
<Box borderWidth='4px' />

// borderStyle
<Box borderStyle='dotted' />

// borderColor
<Box borderColor='blue' />

// borderRadius
<Box borderRadius={4} />
\`\`\`

## Position

\`\`\`js
import { position } from '@soroush.tech/styled-system'
\`\`\`

The \`position\` utility includes the following style props.

| Prop       | CSS Property |
| ---------- | ------------ |
| \`position\` | position     |
| \`zIndex\`   | z-index      |
| \`top\`      | top          |
| \`right\`    | right        |
| \`bottom\`   | bottom       |
| \`left\`     | left         |

\`\`\`jsx
// position
<Box position='absolute' />

// zIndex
<Absolute zIndex={2} />

// top, right, bottom, left
<Fixed
  top='0'
  right='0'
  bottom='0'
  left='0'
/>
\`\`\`

## Shadow

\`\`\`js
import { shadow } from '@soroush.tech/styled-system'
\`\`\`

The \`shadow\` utility includes the following style props.

| Prop         | CSS Property |
| ------------ | ------------ |
| \`textShadow\` | text-shadow  |
| \`boxShadow\`  | box-shadow   |

\`\`\`jsx
<Box textShadow="small" boxShadow="medium" />
\`\`\`

---

## Compose

The \`compose\` utility is used to combine multiple style functions together into one.
This utility can help improve performance when using multiple style props functions on the same component.

\`\`\`js
import styled from 'styled-components'
import { compose, typography, space, color } from '@soroush.tech/styled-system'

export const Text = styled('div')(compose(typography, space, color))
\`\`\`

<!--
### themeGet

The \`themeGet\` function is an existential getter function
that can be used in any style declaration to get a value
from your theme, with support for fallback values.
This helps prevent errors from throwing when a theme value is missing,
which can be helpful when unit testing styled-components.

\`\`\`js
themeGet(objectPath, fallbackValue)(props)
\`\`\`

\`themeGet\` returns a function that accepts props as an argument
(\`themeGet(objectPath)(props)\`), which when used in a tagged template
literal should look like this:

\`\`\`js
import styled from 'styled-components'
import { themeGet } from '@soroush.tech/styled-system/theme-get'

const Box = styled.div\`
  border-radius: \${themeGet('radii.small', '4px')};
\`
\`\`\`

When used with object literal syntax, \`themeGet\` needs to be in a
function call and have \`props\` passed to it:

\`\`\`js
import styled from 'styled-components'
import { themeGet } from '@soroush.tech/styled-system/theme-get'

const Box = styled('div')(props => ({
  borderRadius: themeGet('radii.small', '4px')(props),
}))
\`\`\`

-->

<!--
### propTypes

Prop type definitions are available for each style function to add to your component's propTypes object.
Each value in \`propTypes\` is an object which should be assigned (or spread) to the component's \`propTypes\`.

\`\`\`jsx
import styled from 'styled-components'
import { width } from '@soroush.tech/styled-system'

const Box = styled.div\`
  \${width}
\`

Box.propTypes = {
  ...width.propTypes,
}
\`\`\`
-->

---

## System

To create custom props for other CSS properties, use the \`system\` low-level utility.
The \`system\` function takes a configuration object as its only argument and returns a style function that can be used like any other Styled System function.
Each key in the configuration object can define the following:

- \`property\`: the CSS property to use in the returned style object
- \`properties\`: an array of multiple properties (e.g. \`[ 'marginLeft', 'marginRight' ]\`)
- \`scale\`: a string referencing a key in the \`theme\` object
- \`transform\`: a function to transform the raw value based on the scale
- \`defaultScale\` a fallback scale object for when there isn't one defined in the \`theme\` object

\`\`\`js
// example
import styled from 'styled-components'
import { system } from '@soroush.tech/styled-system'

const Text = styled('div')(
  system({
    fontSize: {
      property: 'fontSize',
      scale: 'fontSizes',
      defaultScale: [12, 14, 16, 20, 24, 32, 48],
    },
    lineHeight: {
      property: 'lineHeight',
      scale: 'lineHeights',
    },
    // shorthand definition
    textAlign: true,
  })
)
\`\`\`

By default, Styled System will return either a value from the theme, based on a key, or the raw value.
To change how a style prop value is transformed, provide a custom \`transform\` function.
The function takes two arguments: \`(value, scale)\`, where \`value\` is the raw prop value, and \`scale\` is a theme scale object or array.

## Variant

Creates a custom style utility to apply complex styles based on a single prop.

\`\`\`js
import styled from 'styled-components'
import { variant } from '@soroush.tech/styled-system'

const Card = styled.div\`
  \${variant({
    variants: {
      normal: {
        p: 2,
        boxShadow: 'default',
        borderRadius: 2,
      },
      large: {
        p: 3,
        boxShadow: 'large',
        borderRadius: 4,
      },
    },
  })}
\`
Card.defaultProps = {
  variant: 'normal',
}
// <Card variant='large' />
\`\`\`

## Legacy Variants

The legacy variants require styles to be defined in the theme object and do _not_ use \`@soroush.tech/styled-system/css\` for transformation.

\`\`\`js
import { textStyle, colorStyle, buttonStyle } from '@soroush.tech/styled-system'
\`\`\`

\`\`\`jsx
// textStyle
<Text textStyle='caps' />

// colorStyle
<Box colors='warning' />

// buttonStyle
<Button variant='primary' />
\`\`\`

---

## Defaults

Some style props include default, fallback scales if not defined in the \`theme\` object.

\`\`\`js
// Default Breakpoints
const breakpoints = ['40em', '52em', '64em']
// @media screen and (min-width: 40em)
// @media screen and (min-width: 52em)
// @media screen and (min-width: 64em)

// default fontSizes
const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72]

// default space for margin and padding
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]
\`\`\`

[responsive-styles]: ./responsive-styles.md
[theming]: ./getting-started.md#theming
`,"../../packages/styled-system/docs/css.md":`# css

\`\`\`js
import { css } from '@soroush.tech/styled-system/css'
\`\`\`

The \`css\` utility converts a theme-aware style object into a plain CSS-in-JS style
object. It resolves values against the [theme specification](./theme-specification.md)
scales (e.g. \`color: 'primary'\` → \`theme.colors.primary\`), supports the shorthand
prop aliases (\`m\`, \`px\`, \`bg\`, ...), and expands [responsive](./responsive-styles.md)
array / object values into media queries.

It returns a function of \`theme\` (or \`props.theme\`), so it slots directly into any
CSS-in-JS library:

\`\`\`jsx
import styled from '@emotion/styled'
import { css } from '@soroush.tech/styled-system/css'

const Box = styled('div')(
  css({
    p: 4,
    bg: 'primary',
    color: 'white',
    borderRadius: 2,
    '&:hover': {
      bg: 'secondary',
    },
    fontSize: [2, 3, 4], // responsive
  })
)
\`\`\`

Use it standalone too:

\`\`\`js
css({ color: 'primary', m: 2 })(theme)
// → { color: theme.colors.primary, margin: theme.space[2] }
\`\`\`

This is the engine behind the inline [\`variant\`](./variants.md) API.

## theme-get

\`\`\`js
import { themeGet } from '@soroush.tech/styled-system/theme-get'
\`\`\`

\`themeGet\` reads a single value from the theme by dot-path, with an optional
fallback. Handy inside template literals:

\`\`\`jsx
import styled from '@emotion/styled'
import { themeGet } from '@soroush.tech/styled-system/theme-get'

const Button = styled('button')\`
  color: \${themeGet('colors.primary', '#0077cc')};
  padding: \${themeGet('space.3')}px;
\`
\`\`\`

## props

\`\`\`js
import { pick, omit } from '@soroush.tech/styled-system/props'
\`\`\`

\`pick\` and \`omit\` split a props object by whether each key is a known style prop -
useful for forwarding only valid HTML attributes to the DOM. See also
[Removing props from HTML](./guides/removing-props-from-html.md) and
\`@soroush.tech/styled-system/should-forward-prop\`.
`,"../../packages/styled-system/docs/custom-props.md":`# Custom Style Props

To extend Styled System for other CSS properties that aren't included in the library,
use the [\`system\`](./api.md#system) utility to create your own style functions.

All Styled System functions rely on these low-level utilities.

- \`system\` creates a style prop function
- \`compose\` combines multiple style prop functions into one

## Example

\`\`\`jsx
import styled from 'styled-components'
import { system } from '@soroush.tech/styled-system'

const textDecoration = system({
  textDecoration: true,
})

const Link = styled.a\`
  \${system({
    textDecoration: true,
    fontWeight: {
      property: 'fontWeight',
      scale: 'fontWeights',
    },
  })}
\`

export default Link
\`\`\`

The \`system\` function accepts an object with keys that represent style props for your component.
Each key can define the following:

- \`property\`: the CSS property to use in the returned style object
- \`properties\`: an array of multiple properties (e.g. \`[ 'marginLeft', 'marginRight' ]\`)
- \`scale\`: a string referencing a key in the \`theme\` object
- \`transform\`: a function to transform the raw value based on the scale
- \`defaultScale\` a fallback scale object for when there isn't one defined in the \`theme\` object

### \`transform\`

By default, Styled System will return either a value from the theme, based on a key, or the raw value.
To change how a style prop value is transformed, provide a custom \`transform\` function.
The function takes two arguments: \`(value, scale)\`, where \`value\` is the raw prop value, and \`scale\` is a theme scale object or array.

### Shortcut definition

If your style prop does not need to pick up values from the theme and the prop matches the intended CSS property, you can use a shortcut definition in the \`system\` function argument.

\`\`\`js
system({
  transition: true,
})
\`\`\`

This will take the \`transition\` prop and translate it into a style object.

### Style prop function

The \`system\` function returns a style prop function that can be used in Styled Components, Emotion, or other CSS-in-JS libraries.
This function takes \`props\` as an argument and returns a style object.
The style prop function includes a \`.propNames\` static array that can be used to detect which props the function accepts.

### Aliases

To create aliases for props with the \`system\` function, add a key for the aliased prop name.

\`\`\`js
// example alias
import { system } from '@soroush.tech/styled-system'

const config = {
  color: {
    property: 'color',
    scale: 'colors',
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
}
// alias
config.bg = config.backgroundColor

export const color = system(config)
\`\`\`

## Composition

To combine multiple Styled System functions in a single component, use the \`compose\` utility.

\`\`\`js
import styled from 'styled-components'
import { space, layout, color, compose } from '@soroush.tech/styled-system'

const Box = styled('div')(compose(space, layout, color))
\`\`\`
`,"../../packages/styled-system/docs/getting-started.md":`# Getting Started

Styled System is a collection of utility functions that add style props
to your React components
and allows you to control styles based on a global theme object
with typographic scales, colors, and layout properties.

To use Styled System, install a CSS-in-JS library such as [Styled Components][] or [Emotion][].

\`\`\`sh
npm i @soroush.tech/styled-system styled-components
\`\`\`

## Create a Component

Create a new component that uses style functions from Styled System.
To start with, add the \`color\` function to the component's styles argument.

\`\`\`javascript
import styled from 'styled-components'
import { color } from '@soroush.tech/styled-system'

const Box = styled.div\`
  \${color}
\`

export default Box
\`\`\`

Now, this component will have two style props available: \`color\` to set foreground color, and \`bg\` to set background color.
(You can also use \`backgroundColor\` if you're adverse to terse naming conventions.)

\`\`\`jsx
<Box color="#fff" bg="tomato">
  Tomato
</Box>
\`\`\`

So far, this component can be styled with any valid CSS color.
To create a more consistent UI, create a theme module with a \`colors\` object.

\`\`\`js
// theme.js
export default {
  colors: {
    black: '#000e1a',
    white: '#fff',
    blue: '#007ce0',
    navy: '#004175',
  },
}
\`\`\`

## Theming

Most CSS-in-JS libraries include a ThemeProvider to provide values through React context.
Import the styled-components [ThemeProvider][] in the root of your application and pass the theme to the \`theme\` prop.

\`\`\`jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './theme'

const App = (props) => <ThemeProvider theme={theme}>{/* application elements */}</ThemeProvider>

export default App
\`\`\`

[themeprovider]: https://www.styled-components.com/docs/advanced#theming

With the ThemeProvider added, the Box component now has access to the colors defined in the theme object.

\`\`\`jsx
<Box color="black" bg="blue">
  Blue Box
</Box>
\`\`\`

Styled System will attempt to find a value based on keys in the theme and fallback to the raw value if it's not defined in the theme.

\`\`\`jsx
// this example uses the CSS color keyword \`tomato\` since it's not defined in the theme
<Box bg="tomato" />
\`\`\`

To make the Box component a little more useful, add a few more Styled System functions
to handle layout styles.

\`\`\`jsx
import styled from 'styled-components'
import { space, layout, color } from '@soroush.tech/styled-system'

const Box = styled.div\`
  \${space}
  \${layout}
  \${color}
\`

export default Box
\`\`\`

If you prefer using the plain object syntax, you can pass Styled System functions in as arguments.

\`\`\`js
// example using object syntax
const Box = styled('div')(
  {
    boxSizing: 'border-box',
  },
  space,
  layout,
  color
)
\`\`\`

## Margin & Padding

The \`space\` function adds margin and padding props.
The margin and padding props use a shorthand syntax, similar to
[Basscss][basscss], [Tachyons][tachyons], and [Bootstrap][bootstrap].

[basscss]: http://basscss.com/#basscss-margin
[tachyons]: http://tachyons.io/docs/layout/spacing/
[bootstrap]: https://getbootstrap.com/docs/4.1/utilities/spacing/

### Margin Props

- \`m\` margin
- \`mt\` margin-top
- \`mr\` margin-right
- \`mb\` margin-bottom
- \`ml\` margin-left
- \`mx\` margin-left and margin-right
- \`my\` margin-top and margin-bottom

### Padding Props

- \`p\` padding
- \`pt\` padding-top
- \`pr\` padding-right
- \`pb\` padding-bottom
- \`pl\` padding-left
- \`px\` padding-left and padding-right
- \`py\` padding-top and padding-bottom

Note: you can also use longform prop names (e.g. \`margin\`, \`paddingTop\`) if you prefer.

### Space Theming

To set a consistent negative-space scale, add a \`space\` array to your theme.
Use numbers to set pixel values, or use strings for other CSS units such as \`rem\`.
It's recommended to set \`0\` as the first value in the array.

\`\`\`js
// theme.js
export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}
\`\`\`

All spacing props accept numbers, strings, or arrays as values, where:

- Numbers between 0 and the last index of the \`space\` array are values from the \`space\` array defined in theme
- Numbers greater than the length of the \`space\` array are converted to pixels
- String values can be used for any valid CSS value (e.g. \`'auto'\` or \`'2em'\`)
- Margin props accept negative values to set negative margin
- Arrays can be used for [responsive styles](#responsive-styles)
- Note: numeric strings without a CSS unit will be used as indices for the array (e.g. \`space['0']\`)

## Layout

The \`layout\` function adds props for widths, heights, display, and more.
Widths and heights can use values defined in \`theme.sizes\` to help ensure consistency in layout styles.

The \`width\` prop accepts number, string, or array values, where:

- Numbers between 0 and 1 are converted to percentage based widths (e.g. \`1/2\` becomes \`'50%'\`)
- Numbers greater than 1 are converted to pixels
- Strings can be used for other CSS values (e.g. \`'50vw'\` or \`'30em'\`)
- Arrays can be used for [responsive styles](#responsive-styles)
- If an array is used to define \`theme.sizes\`, \`width={0}\` will return \`theme.sizes[0]\` and \`width={1}\` will return \`theme.sizes[1]\`

## Responsive Styles

All Styled System functions accept arrays as values to set styles responsively using a mobile-first approach.

\`\`\`jsx
<Box
  width={[
    1, // 100% below the smallest breakpoint (all viewports)
    1 / 2, // 50% from the next breakpoint and up
    1 / 4, // 25% from the next breakpoint and up
  ]}
/>
\`\`\`

\`\`\`jsx
// responsive margin
<Text m={[ 0, 1, 2 ]} />

// responsive padding
<Text p={[ 2, 3, 4 ]} />

// responsive font-size
<Text fontSize={[ 3, 4, 5 ]} />
\`\`\`

Read the [Responsive Styles][] docs for more information.

## Other Props

Styled System includes pre-built functions for many other commonly used CSS properties.
For a complete list, see the [Reference Table][] of style functions.

[styled components]: https://github.com/styled-components/styled-components
[emotion]: https://github.com/emotion-js/emotion
[responsive styles]: ./responsive-styles.md
[reference table]: ./table.md
`,"../../packages/styled-system/docs/guides/array-props.md":`# Array Props

Using arrays as responsive props is one of the unique features that Styled System introduced to the React community.
While many people have adopted this approach and use it to great success, much like any new idea,
it can seem odd or off-putting to people new to the library.
If your team follows a mobile-first responsive design mindset,
this approach can help speed up UI development dramatically.

If you haven't read the [Responsive Styles](../responsive-styles.md) documentation,
you should start there before continuing.

## Origins

The array-based responsive props originates in the functional CSS approach of using namespaced classnames for media-query-scoped styles.
For example a div with a responsive width might have classnames like this:

\`\`\`html
<div class="col-12 sm-col-6 md-col-4 lg-col-3"></div>
\`\`\`

When this approach was adapted to React props, it became something like the following:

\`\`\`jsx
<Box width={1} smallWidth={1 / 2} mediumWidth={1 / 3} largeWidth={1 / 4} />
\`\`\`

After writing props like this over and over, it's easy to make the jump to an array-based syntax for these props:

\`\`\`jsx
<Box width={[1, 1 / 2, 1 / 3, 1 / 4]} />
\`\`\`

If you're already using a plain object for things like responsive widths, you can probably see how the abstraction above is useful.

\`\`\`jsx
// with plain objects (not all that different)
<Box width={{ default: 1, small: 1 / 2, medium: 1 / 3, large: 1 / 4 }} />
\`\`\`

By using arrays, you can avoid some issues with naming arbitrary breakpoints,
and it can make the code more visual in what it does with a terser syntax.
For example, this Box includes responsive width, margin, and padding:

\`\`\`jsx
<Box width={[1, 1 / 2]} padding={[2, 3]} marginBottom={[3, 4]} />
\`\`\`

To skip certain breakpoints, you can pass \`null\` to any position in the array to avoid generating unnecessary CSS.

\`\`\`jsx
<Box width={[1, null, 1 / 2]} />
\`\`\`

Styled System **supports both arrays and objects as responsive props**.
Whichever you choose to use, you should discuss the pros and cons with your team and ensure everyone is on board with the approach you take.
`,"../../packages/styled-system/docs/guides/array-scales.md":`# Array Scales

Using arrays for theme constants and style props can seem off-putting to some at first,
but can quickly become second-nature with a little effort.
The rationale for using arrays for design scales stems from the idea of constraint-based design.
Before using something like Styled System, it can seem scary to commit to such a limited data type,
but Styled System gives you a few escape hatches in the rare cases where you need to "break out" of the constraints encouraged in this library.

The first question that comes up with approaches like this is always, "what if...".
In software development, some people think that duplication is better than the wrong abstraction.
I tend to agree with this sentiment.
Instead of asking _what if_, I encourage you to try the Styled System approach in a smaller application and see if the benefits
of the constraints with this approach outweigh the limitations.
When using Styled System on a multidisciplinary team, you'll want to make sure your entire team, including designers,
are on board, but from my experience, many designers will want to work with constraints like the ones
encouraged here.

## Breakpoints

The \`breakpoints\` scale in Styled System is one of the most difficult to alter after introducing this library to an application.
It's recommended to audit the breakpoints that are currently in use and try to normalize them as much as possible.
Some people like to have a dozen or more breakpoints, but the reality of responsive design is that there are essentially two breakpoints: mobile and not-mobile.
You'll probably want more than two breakpoints to help with typographic style, but the most common responsive layouts
rarely do anything extremely complex.
Embrace your inner minimalist and see how much you can simplify your design system.

## Space, Font Sizes, and Other Scales

Using a consistent typographic scale and a limited set of spacing values are widely regarded as good practices in visual design.
By encoding these constraints with a library like Styled System, you can greatly speed up your development velocity
while making the visual design of your application inheritly more consistent.
Don't spend too much time debating what values to use in your \`fontSizes\` scale or
trying to boil the ocean.
Audit your current styles, normalize them, and decide on a good starting point with your team.
If you're unsure whether or not you might need a \`13px\` font size at some point in the future, don't sweat it,
because Styled System has a few options for handling those edge cases.

## Exceptions

Exceptions to the rule are to be expected.
Sometimes you're working on a tight deadline trying to close that ticket hours before the sprint is over.
It's okay if you have to break out of your design scales in some cases.
Just make sure you don't make too much of a habit out of it, and that it doesn't cause any styling side effects that you can't handle.
If you need to use a font size in one component that isn't part of your system, use a hard-coded value like \`fontSize='13px'\`.
It should be right where you need it and easy to delete and forget about when you refactor the code.
Optimize for throw-away code in situations like these.

## Aliases

If you've used JavaScript arrays to define your scales, you can easily add aliases to those arrays by defining custom keys.
For example, say your \`fontSizes\` scale looks like the following:

\`\`\`js
fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96]
\`\`\`

You find yourself using an \`18px\` font size in a lot of different places and don't want to hard-code that value throughout your application.
You can add a custom alias to the \`fontSizes\` for any values like this that crop up over time.

\`\`\`js
// example alias
fontSizes.lede = 18
\`\`\`

With this exceptional alias value added, you can now use it with the prop \`fontSize='lede'\`.

<!--
- array length
-->
`,"../../packages/styled-system/docs/guides/build-a-box.md":`# Build a Box

One of the most widely used styled component types is the coveted Box layout component.
While many component libraries include a Box layout component already, you may want to create your own depending on the needs of your application.
This guide will walk through creating a Box component like the one found in [Rebass](https://rebassjs.org/Box) and show you how you can add additional functionality using Styled System.

Import \`styled-components\` and create a new component.

\`\`\`js
// example Box.js
import styled from 'styled-components'

const Box = styled.div({})

export default Box
\`\`\`

## Base Styles

Add some base-level styles to the component.
Use \`boxSizing: 'border-box'\` to ensure that padding is included in width,
and use \`minWidth: 0\` to ensure the Box can shrink below its minimum content size when used as a flex item.

\`\`\`js
const Box = styled.div({
  boxSizing: 'border-box',
  minWidth: 0,
})
\`\`\`

## Style Props

Next, import a few core Styled System functions to expose styles as props.
As a general rule of thumb, you should only expose style props when it's something likely to change on a per-instance basis throughout your app.
For styles that don't change frequently, it's generally better to [extend the component](#extending).

\`\`\`js
// example Box.js
import styled from 'styled-components'
import { space, color, layout } from '@soroush.tech/styled-system'

const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  color,
  layout
)

export default Box
\`\`\`

With the component created above, you can quickly change styling contextually throughout your application.

\`\`\`js
// example usage
<Box width={[1, 1 / 2]} p={4} mb={3} bg="tomato">
  This is a tomato box, with responsive width, some padding, and margin bottom
</Box>
\`\`\`

## Flex Item Props

If you intend to use the Box component with flexbox, adding some more flexbox-specific style props can be helpful.
Add the following props to the Box.

\`\`\`js
// example Box.js
import styled from 'styled-components'
import { space, color, layout, flexbox } from '@soroush.tech/styled-system'

const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  color,
  layout,
  flexbox
)

export default Box
\`\`\`

Using the pattern above, you can add as much or as little as you like to your Box component.
If you find yourself writing the same Box component over-and-over again, you might want to consider using a library like [Rebass][] or publishing your own UI component library to npm for reuse.

## Extending

Not every style you use in an application needs to be added to a component as a style prop.
For one-off customizations, it's often easier to extend a simpler component than it is to maintain a more complex Box component.

There are primarily two ways to extend styled components with libraries like [Styled Components][] and [Emotion][]:

1. Using the \`css\` prop
2. Creating an extended styled component

## \`css\` prop

The \`css\` prop is a very popular way to handle one-off styles.
If your Box component needs a small style change you can make it inline or create an extended component for reuse.

To use the \`css\` prop, you'll need to make sure you have either
[\`babel-plugin-styled-components\`](https://www.styled-components.com/docs/api#css-prop) installed,
or a Babel plugin or custom JSX pragma configured for [Emotion](https://emotion.sh/docs/css-prop).

\`\`\`js
export default (props) => (
  <Box
    p={2}
    css={{
      borderBottom: '2px solid',
    }}
  >
    This Box is using the css prop inline
  </Box>
)
\`\`\`

To use the \`css\` prop to extend the Box component for reuse, you can do something like the following:

\`\`\`js
// extended Box component example
import React from 'react'

export default ({ large, ...props }) => (
  <Box
    {...props}
    p={large ? 4 : 2}
    css={{
      borderRadius: '4',
      border: '1px solid #f6f6f6',
      boxShadow: '0 2px 4px rgba(0, 0, 0, .125)',
    }}
  />
)
\`\`\`

## Extending with \`styled\`

An alternative to using the \`css\` prop is to create a completely new styled component using the \`styled\` HOC.
You can create these components anywhere,
but it's common to colocate these in the same module that they're used in.

\`\`\`js
import React from 'react'
import styled from 'styled-components'
import Box from './Box'

// extended Box component
const Card = styled(Box)({
  borderRadius: '4',
  border: '1px solid #f6f6f6',
  boxShadow: '0 2px 4px rgba(0, 0, 0, .125)',
})

// code for the component using the extended component below
\`\`\`

[rebass]: https://rebassjs.org
[styled components]: https://styled-components.com
[emotion]: https://emotion.sh
`,"../../packages/styled-system/docs/guides/color-modes.md":`# Color Modes

While there are many different ways to handle theming in a web application,
there are just as many ways to handle color schemes.
A common feature of modern web applications is including an optional dark mode.
Usually a dark mode feature includes changes to the colors of a site without changing other typographic or layout styles.
This guide will walk through one approach (the one used on this site) that includes multiple color modes that can be changed by the end user.

Since the only styles that change between these color modes are the colors themselves, the different color palettes are stored in the \`theme.colors\` object.
If you look at this site's [theme file][], you'll see that it includes a nested \`colors.modes\` object for the different color schemes.
Each color mode object matches the same shape as the base default colors and uses a simple naming abstraction for setting colors for the text, background, links, and other styles.
This site's colors object looks something like the following:

\`\`\`js
const colors = {
  text: '#000',
  background: '#fff',
  primary: '#00f',
  secondary: '#00a',
  gray: '#eee',
  lightgray: '#fafafa',
  modes: {
    dark: {
      text: '#fff',
      background: '#000',
      primary: '#0cf',
      secondary: '#f0e',
      gray: '#222',
      lightgray: '#111',
    },
    // other color modes...
  },
}
\`\`\`

## Using the theme colors

By default the base colors are picked up by other components using Styled System. For example, the root layout component uses Emotion's \`Global\` component to set text and background colors.

\`\`\`jsx
// example
<Global
  styles={css({
    body: {
      color: 'text',
      bg: 'background',
    },
  })}
/>
\`\`\`

## Adding color mode state

The root layout component also uses React state to cycle through the different color modes and creates a new \`theme\` object based on state.
There are several different ways to store this state persistently, but this is outside of the scope of this guide.
The following is an example of one way to set up the color mode state in your app.

\`\`\`jsx
import React, { useState } from 'react'
import merge from 'lodash.merge'
import get from 'lodash.get'
// the full theme object
import baseTheme from './theme'

// options for different color modes
const modes = [
  'light',
  'dark',
  // more than two modes can follow...
]

// merge the color mode with the base theme
// to create a new theme object
const getTheme = (mode) =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors),
  })

export default (props) => {
  // state for changing modes dynamically
  const [mode, setMode] = useState(modes[0])
  const theme = getTheme(mode)

  return <ThemeProvider theme={theme}>{/* application elements */}</ThemeProvider>
}
\`\`\`

Next you'll want to add the UI controls for changing between color modes.
With this basic approach, you should be able to add as many different color modes to your site as you wish.
Be sure that _all_ components within your application are using color values from the theme (not hard-coded values) in order for this to work as expected.

There are other ways to achieve a similar effect - this just demonstrates one approach.
For a different approach to persisting data, you may want to look into the [\`prefers-color-scheme\`][] media query, but it only handles binary \`light\` or \`dark\` modes.
You might also want to look into [CSS Custom Properties][],
which can be defined as inline styles, but be aware that they are not supported in IE11.

[theme file]: https://github.com/styled-system/styled-system/blob/master/docs/src/gatsby-plugin-theme-ui/index.js
[\`prefers-color-scheme\`]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[css custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

<!--
- media query
- css custom properties (IE11)
-->
`,"../../packages/styled-system/docs/guides/component-types.md":`# Component Types

Some teams that have adopted Styled System take an approach to organizing UI components by type,
creating separate layout, typography, flexbox, and other categories when adding style props.
This means that each _layout_ component type is guaranteed to have the same props API as the others.
For an example of this approach, see [Primer Components](https://primer.style/components/docs/system-props).

To create your own component types, use the \`compose\` utility
to create custom style functions that each new component can use.

## Creating a Layout component type

To group these shared Styled System props together, create a new module that will include these style functions.

\`\`\`js
// custom styled-system groupings
import { compose, space, color, display, width, maxWidth } from '@soroush.tech/styled-system'

export const layout = compose(space, display, width, maxWidth, color)
\`\`\`

To add these props to a component, import the composed \`layout\` function and pass it to the \`styled\` function.

\`\`\`js
// example component definition
import styled from 'styled-components'
import { layout } from './style-props'

export const Box = styled('div')(layout)
\`\`\`

## Creating other component types

Be sure to discuss with your team to figure out what makes sense as a component type.
The following is a list of commonly used component types as a guide.

- \`layout\`; used for page layout, grid systems, and spacing
- \`typography\`: headings, paragraphs, labels, etc.
- \`content\`: images, videos, diagrams, etc.
- \`position\`: position, z-index, etc.
- \`flexbox\`: flexbox-related styles
- \`border\`: border colors, widths, styles, and radii
`,"../../packages/styled-system/docs/guides/default-values.md":`# Default Values

A question that comes up quite often is how do you define defaults for Styled System props.

Let's say you have a Card component that nine times out of ten,
has a specific padding, but every once in a while, you need to change it up.
To add a default value for any Styled System prop, set a default parameter on a thin
wrapper component (React 19 removed the older \`defaultProps\` approach for function components).

\`\`\`js
// example
import styled from 'styled-components'
import { space, color } from '@soroush.tech/styled-system'

const CardBase = styled.div(
  {
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.125)',
  },
  space,
  color
)

// Set defaults with default parameters on a thin wrapper (React 19 removed \`defaultProps\`
// for function components).
const Card = ({ p = 2, bg = 'white', ...props }) => <CardBase p={p} bg={bg} {...props} />

export default Card
\`\`\`

With the default props above, your Card component will have padding and a white background by default.
You can override these styles when needed by passing a prop to the component.

\`\`\`jsx
// example overriding default styles
<Card p={3} bg="lightgray">
  <Image />
  <Text />
</Card>
\`\`\`
`,"../../packages/styled-system/docs/guides/exceptions.md":`# Exceptions

This page is a stub.

<!--
- "breaking the grid"
- style props
- css prop
-->
`,"../../packages/styled-system/docs/guides/index.md":`# Guides

- [Build a Box](./build-a-box.md)
- [Spacing](./spacing.md)
- [Default Values](./default-values.md)
- [Why Powers of Two](./why-powers-of-two.md)
- [Removing Props from HTML](./removing-props-from-html.md)
- [Theming](./theming.md)
- [Array Scales](./array-scales.md)
- [Array Props](./array-props.md)
- [Color Modes](./color-modes.md)
- [Migrating to v5](./migrating.md)
- [Scale Aliases](./scale-aliases.md)
- [Exceptions](./exceptions.md)
`,"../../packages/styled-system/docs/guides/migrating.md":"# Migrating to v5\n\nWhile the internal implementation of Styled System was completely refactored in version 5,\nmost of the v4 APIs have been shimmed to make migration as easy as possible.\nWe encourage you to take advantage of the new APIs and performance improvements introduced in v5 where possible,\nbut most of the v4 APIs should work as expected.\n\n## Removed\n\nThe following has been removed from v5 and you should make these changes to migrate:\n\n- The `themeGet` utility has been removed from the core package. Install and use the `@soroush.tech/styled-system/theme-get` package instead.\n- The following internal utilities and modules have been removed:\n  - `isObject`\n  - `is`\n  - `px`\n  - `num`\n  - `createMediaQuery`\n  - `cloneFunction`\n  - `mapProps`\n  - `defaultBreakpoints`\n- Style functions no longer include a `propTypes` property. Use the `@styled-system/prop-types` utility instead (See [Updating Prop Types](#updating-prop-types))\n\n## Changes\n\n- Number values are no longer converted to strings with `px` units. Most CSS-in-JS libraries now handle this, but if you need to use string values with units, provide them in your theme object and in prop values.\n- The `theme.breakpoints` object _must_ specify CSS units. Numbers are no longer converted to pixel values.\n- The theme keys `heights`, `minWidths`, `maxWidths`, `minHeights`, `maxHeights` have all been consolidated into a single `theme.sizes` scale\n- The internal `get` utility's implementation has changed, if you've made use of this utility, either fork the code from v4 or ensure that you are using it with the following arguments: `get(object, path, fallback)`\n- Functions no longer return `null`, but return an empty object (`{}`) instead\n- Negative padding values are no longer returned. This would have been invalid CSS and generally should not cause issues for migration.\n- The internal `merge` utility no longer deeply merges since it is not needed internally.\n\n## Prop types\n\n`@soroush.tech/styled-system` does not ship a `prop-types` package - the old\n`@styled-system/prop-types` is out of scope for this rewrite, and React 19 removed\n`propTypes` for function components entirely. Use TypeScript for prop typing instead\n(see [TypeScript](../typescript.md)): every style function carries its own typed prop\ninterface (`SpaceProps`, `ColorProps`, ...).\n\n## New Features\n\nThe core implementation of Styled System has changed to improve performance.\nShims for the v4 `styled` utility and other style functions are included,\nbut to ensure you get the benefit of the performance improvements,\nit's recommended to make some of the following changes.\n\n### Style Categories\n\nThe built-in style functions are now grouped by category, making it easier to create components for layout, typography, or other purposes.\nFor example, with v4 to add `width`, `height`, `display`, and other layout props, your code could have looked like the following:\n\n```js\n// version 4\nconst Box = styled('div')(width, height, display)\n```\n\nIn version 5, built-in styles are grouped, and the above can be replaced with:\n\n```js\n// version 5\nconst Box = styled('div')(layout)\n```\n\nThis API was inspired by [GitHub Primer][] and includes the following categories:\n\n| Module       | Style Props                                                                                                                                                                                                                                                                                                |\n| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `space`      | `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginX`, `marginY`, `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `paddingX`, `paddingY`, `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `gap`, `rowGap`, `columnGap`, |\n| `color`      | `color`, `backgroundColor`, `bg`                                                                                                                                                                                                                                                                           |\n| `layout`     | `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `display`, `verticalAlign`, `aspectRatio`, `size`, `overflow`, `overflowX`, `overflowY`                                                                                                                                               |\n| `typography` | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontStyle`, `textAlign`, `textTransform`, `textAlignLast`, `textDecoration`, `textDecorationLine`, `textDecorationStyle`, `textDecorationThickness`, `textDecorationColor`, `whiteSpace`, `textOverflow`                           |\n| `flexbox`    | `alignItems`, `alignContent`, `justifyItems`, `justifyContent`, `flexWrap`, `flexDirection`, `flex`, `flexGrow`, `flexShrink`, `flexBasis`, `justifySelf`, `alignSelf`, `order`                                                                                                                            |\n| `border`     | `border`, `borderWidth`, `borderStyle`, `borderColor`, `borderRadius`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderX`, `borderY`,                                                                                                                                                     |\n| `background` | `background`, `backgroundImage`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat`                                                                                                                                                                                                                |\n| `position`   | `position`, `zIndex`, `top`, `right`, `bottom`, `left`                                                                                                                                                                                                                                                     |\n| `grid`       | `gridGap`, `gridColumnGap`, `gridRowGap`, `gridColumn`, `gridRow`, `gridAutoFlow`, `gridAutoColumns`, `gridAutoRows`, `gridTemplateColumns`, `gridTemplateRows`, `gridTemplateAreas`, `gridArea`,                                                                                                          |\n\n[github primer]: https://primer.style/components/system-props#system-prop-categories\n\n### Compose\n\nWhen using multiple categories or style functions together, use the `compose` utility before passing the functions to the `styled` higher order component.\nThis will help ensure the best performance possible.\n\n```js\n// v4\nconst Box = styled('div')(space, color)\n```\n\n```js\n// v5\nconst styleProps = compose(space, color)\nconst Box = styled('div')(styleProps)\n```\n\n### Custom Styles\n\nWhile the `style` utility from v4 should continue to work as expected, you can take advantage of the new style customization API.\n\n```js\n// v4\nconst transition = style({\n  prop: 'transition',\n})\nconst Box = styled('div')(transition)\n```\n\n```js\n// v5\nconst Box = styled('div')(\n  system({\n    transition: true,\n  })\n)\n```\n\nThe new API allows you to define a set of custom style props together.\n\n```js\nconst Box = styled('div')(\n  system({\n    fontSize: {\n      property: 'fontSize',\n      scale: 'fontSizes',\n    },\n    // shortcut syntax\n    transition: true,\n  })\n)\n```\n","../../packages/styled-system/docs/guides/removing-props-from-html.md":`# Removing props from HTML elements

Due to the nature of the popular \`styled\` higher order component,
as an author you must rely on the CSS-in-JS library you're using to decide whether or not to forward props along to the HTML element.
For the most part, these libraries do a good job of not forwarding props that aren't valid HTML attributes.
However, the Styled System API uses a few prop names that are either deprecated HTML attributes or SVG attributes and aren't intended to be rendered in the output HTML.
While most browsers should handle these stray HTML attributes with no problem, there might be good reason to clean these up in production.

## Emotion

Emotion has first-class support in its API for determining which props are forwarded to the HTML element with its [\`shouldForwardProp\`](https://emotion.sh/docs/styled#customizing-prop-forwarding) API.
Styled System has a optional utility that can be passed directly to this API.

Install the following utility to make sure your Emotion styled components do not render style props as HTML.

\`\`\`sh
npm i @soroush.tech/styled-system
\`\`\`

In your styled component definition, pass this utility function as an option to the \`styled\` HOC.

\`\`\`js
import styled from '@emotion/styled'
import shouldForwardProp from '@soroush.tech/styled-system/should-forward-prop'
import { space, color } from '@soroush.tech/styled-system'

const Box = styled('div', {
  shouldForwardProp,
})(space, color)
\`\`\`

## Styled Components

Unfortunately, Styled Components does not currently support an API to control which props are forwarded to the HTML element.
**If you'd like to see support for this, please leave a comment on their long-running issue:**

**[Separate HTML attributes from styling props][styled components issue]**

[styled components issue]: https://github.com/styled-components/styled-components/issues/439

## \`css\` Prop

If you're a fan of using the [\`css\` prop][], you can easily control which props are forwarded to the HTML element, just like in any other React component. It might be a little more work up front, but can be useful in some cases.

\`\`\`js
// example using Emotion's css prop
import React from 'react'
import { color } from '@soroush.tech/styled-system'

export default ({ color, bg, ...props }) => (
  <div {...props} css={(theme) => color({ theme, color, bg })} />
)
\`\`\`

[\`css\` prop]: https://emotion.sh/docs/css-prop
`,"../../packages/styled-system/docs/guides/scale-aliases.md":`# Scale Aliases

This page is a stub.

<!--
- Rationale
- Scale aliases
- Breakpoint aliases
-->
`,"../../packages/styled-system/docs/guides/spacing.md":`# Spacing

There are many ways to approach spacing (margin and padding) in a web application,
and Styled System is intended to work at a low enough level to support several of these
depending on your team's preferences.

If you're not familiar with Styled System's \`space\` utility,
you might want to read the [Getting Started](../getting-started.md#margin--padding) documentation first.

## Where does space belong?

Generally speaking, it's a good idea to avoid adding default margins to reusable components in React.
Some people prefer to use a declarative approach by adding a "spacer" component in between other components.
This is the _[spacer.gif][]_ of React, and it's a completely acceptable practice, despite what some people may say.

[spacer.gif]: https://en.wikipedia.org/wiki/Spacer_GIF

Others prefer creating wrapper layout components that apply spacing to child components.
This is also an acceptable approach, but requires an additional layer of abstraction and creates a larger API surface area
for your component library. This approach will also be less familiar to people new to React.

The third common way, and the way that Styled System's API encourages you to approach this is through spacing props.

All three approaches are valid, and all three can be used together with Styled System helping ensure that the values used for spacing
are consistent across your entire application.

## Spacer Component

One of the simpler approaches comes from the early days of the web, and is a really great way to add space to UI.

To create a spacer component with Styled System, you can either reuse a [Box component](./build-a-box.md) or create a specialized component
for this purpose.

\`\`\`js
// example Spacer component
import styled from 'styled-components'
import { space } from '@soroush.tech/styled-system'

const Spacer = styled.div(space)
\`\`\`

To use the Spacer component, render it without any children and use the margin props.

\`\`\`js
// example Spacer usage
<Header />
<Spacer mb={4} />
<Section />
\`\`\`

The Spacer component is also really great for flexbox layouts, where \`margin: auto\` will fill any remaining space.

\`\`\`js
// example Spacer in flexbox
<Flex>
  <Logo />
  <Spacer m="auto" />
  <Link>Beep</Link>
  <Link>Boop</Link>
</Flex>
\`\`\`

## Wrapper Component

Some people use a wrapping parent component to control spacing on child components.
This is exactly what [Rebass Space][] does and can be useful for tiled layouts or grid systems.

To target child elements you can either use the \`React.Children\` API to map over child elements, or use child CSS selectors.
The use of child CSS selectors can lead to styling bugs and isn't generally recommended.

\`\`\`js
// example using child CSS selectors
import styled from 'styled-components'
import { space } from '@soroush.tech/styled-system'

const SpaceChildren = styled.div\`
  & > * {
    \${space}
  }
\`
\`\`\`

The following example comes from [Rebass Space][].
This approach does not create a wrapping element and does not rely on child CSS selectors.

\`\`\`jsx
import React from 'react'
import styled from 'styled-components'
import { space } from '@soroush.tech/styled-system'

const classnames = (...args) => args.join(' ')
const getClassName = (el) => (el.props && el.props.className) || ''

export const StyledChildren = ({ className, children, ...props }) => {
  const styledChildren = React.Children.toArray(children).map((child) =>
    React.cloneElement(child, {
      className: classnames(getClassName(child), className),
    })
  )
  return <>{styledChildren}</>
}

const SpaceChildren = styled(StyledChildren)(space)

SpaceChildren.propTypes = space.propTypes

export default SpaceChildren
\`\`\`

## Space Props

While the above approaches work perfectly fine, it can be useful to control margin and padding on a per-element basis.
This is where Styled System's \`space\` utility really shines.
It lets you add margin and padding props to any component, whether it's a Box layout component, a heading, or a button.
By including the \`space\` props in your components, you can quickly make one-off adjustments and adapt to changing requirements.

The \`space\` utility can be added to any component that accepts the \`className\` prop.

\`\`\`js
// example
import styled from 'styled-component'
import { space } from '@soroush.tech/styled-system'

const Heading = styled.h2(space)
\`\`\`

When using the component, you can adjust margin and padding in any direction needed.

\`\`\`jsx
// example usage
<Heading mt={0} mb={4} pl={0}>
  Hello
</Heading>
\`\`\`

[rebass space]: https://github.com/rebassjs/rebass/tree/master/packages/space

While the \`space\` utility is a perfect choice for most cases, it can be useful to add only margin or padding props to
a component. To handle those cases, Styled System provides subsets of the \`space\` utility: \`padding\` and \`margin\` utilities.

The \`padding\` utility adds only padding props to a component and the \`margin\` utility adds only margin props. Usage of
the utilities are the same as the usage of \`space\` utility

\`\`\`js
// margin utility example
import styled from 'styled-component'
import { margin } from '@soroush.tech/styled-system'

const Paragraph = styled.p(margin)
\`\`\`

When using the component, you can adjust margin, but not padding:

\`\`\`jsx
// example usage
<Paragraph mt={0} mb={4}>
  I have only margin props available
</Paragraph>
\`\`\`
`,"../../packages/styled-system/docs/guides/theming.md":`# Theming

Theming is an aspect of web application development that can be difficult to abstract.
Every application has its own needs and Styled System is intended to be extremely flexible
for most theming concerns while guiding you to the _pit of success_.

Styled System follows a convention for naming fields and scales in your theme,
but leaves the organization of those scales up to you to decide.
For example, Styled System expects a \`colors\` object in your theme,
but that object can be flat, deeply nested, or even functionally generated based on other inputs.

If you don't have a complex color system to begin with, it's recommended that you start with a flat object,
then expand upon that when needed.

## Scales

In Styled System, the objects used in your theme are referred to as _scales_.
The intent behind these scales stems from constraint-based design,
and they are meant to make it easy to do the right thing,
but possible to handle one-off exceptions where needed.

For example, many designs tend to follow a common typographic scale where a limited number of font sizes are available.
This not only helps create a consistent visual rhythm in your application,
but also reduces the amount of guesswork a developer might have to do.
Instead of reading a value from a redline spec, a developer can learn to eyeball what font size is used and associate that with a value on the scale.
This also makes nudging things like font size easier.
When a designer asks a developer to make the font size bigger,
the value can go from \`fontSize={4}\` to \`fontSize={5}\` while still conforming to the typographic scale.

## Ordinal Scales

For scales that tend to have an implied order, such as font-size, margin, and padding,
it's recommended to use an array for storing those scales.
Arrays are intentionally limiting, making it difficult to add _in-between_ sizes in the future,
so be sure you have a good scale defined before using these widely in your application.

One of the benefits of using arrays is the ability to use numbers that reference values on your scales.
For example, if you've added a \`margin={2}\` to a component in your application, but you need to add just a little bit more space around the element, adding one to the number (\`margin={3}\`) moves one step up in the scale and helps avoids guesswork as to what the correct value should be.

## Aliases

For _in-between_ sizes that do become part of your design system, you can consider creating aliases to avoid major breaking changes.
For example, if you've defined \`fontSizes\` as an array, but would like to add a new value in at a later time, using JavaScript you can add a key to the array like this:

\`\`\`js
const fontSizes = [12, 14, 16, 20, 24, 32, 48]

// aliased in-between value
fontSizes.lede = 18
\`\`\`

<!--
See the [Aliases Guide](./scale-aliases.md) for more.
-->

## Freeform Scales

For more complex and nuanced scales like color schemes, it's recommended to use plain objects with named keys.
If you're just starting out, it can be simpler to start with a flat object, but if you're working with a more complex color system, you can use nested arrays or nested plain objects.

\`\`\`js
// a simpler, flat color scheme
colors: {
  text: '#000',
  background: '#fff',
  primary: '#07c',
}
\`\`\`

\`\`\`js
// a more complex color scheme
colors: {
  text: '#000',
  background: '#fff',
  blue: [
    // values from https://primer.style/components/docs/primer-theme
    '#f1f8ff',
    '#dbedff',
    '#c8e1ff',
    '#79b8ff',
    '#2188ff',
    '#0366d6',
    '#005cc5',
    '#044289',
    '#032f62',
    '#05264c'
  ],
  // additional colors...
}
\`\`\`

With nested objects like the example above, the blue values can be accessed using dot notation.
This creates an ordered color scale that goes from light to dark and avoids the need to name hues with modifiers like \`dark\`, \`darker\`, or \`darkerer\`.
If you need to make the blue "just a little darker", it becomes a matter of incrementing the number.

\`\`\`jsx
// Example using dot notation
<Box color="blue.3" />
\`\`\`

## Mapping Values

Depending on the theming needs of your application, it can be useful to map generic keys on a scale to more tangible names.
For example, if your application requires a dark mode, or if you're building a whitelabel product, it might make sense to use an abstracted color naming system as opposed to using hue names.

If you don't have a need to create this sort of abstraction, it can be much more efficient to use the same language that your team naturally uses. If your team says, "use the blue button", creating an abstraction for that name like "primary" can be more effort than it's worth.

With Styled System, there's no right or wrong way to handle the definition of scales, but one useful approach is to create a base color object without any naming abstractions.

\`\`\`js
// example
const baseColors = {
  black: '#000',
  white: '#fff',
  blue: '#07c',
}
\`\`\`

This base color object can then be mapped to a color abstraction.

\`\`\`js
// example color abstraction
const colors = {
  text: baseColors.black,
  background: baseColors.white,
  primary: baseColors.blue,
}
\`\`\`

When creating scales like this, it's generally good practice to avoid unnecessary abstractions, so be sure to only go as far as you need to for your application.

## Extending

Since the Styled System theme object is a plain object, you can extend the theme however you see fit.
For example, if you have standard sizes for something like an avatar image that differ from other sizes used in your application,
it might make sense to add those values as a scale to your theme.
And remember, you can create [custom styled props](../custom-props.md) that map to any key in the theme.
`,"../../packages/styled-system/docs/guides/why-powers-of-two.md":`import { Flex, Box } from 'theme-ui'

# Why Powers of Two

If you're less familiar with functional CSS, the idea of an 8px grid,
come from libraries like Bootstrap, or just have ten fingers and ten toes,
then you might be less familiar with the rationale for Styled System's powers-of-two based spacing scale.
While most human numbering systems are base ten due to the number of "digits" we have on our hands,
base ten numbering systems aren't always the easiest to work with mathematically.
Computer displays for decades have been based on multiples of powers of two due to the constraints of binary data,
but using powers of two for layout in screen design makes a lot of sense.

When designing UI for the web, elements are often nested within other elements.
This means that padding on a child element will be added to the padding of its parent.
When you end up with multiple levels of nesting for different elements across a page,
it can be difficult to keep things aligned if you're not using a spacing scale like the one
included in Styled System.

Styled System's spacing scale is based on powers of two because of the tendency for elements to be nested.
For example, say you have a navigation bar, where links have a small amount of padding to make the tap target larger,
but less padding than the content below the navigation bar because that would space the links too far apart.
When using a powers-of-two scale, the links' padding will be added to the navigation bar's padding,
making it easier to align to items with double the padding below it.

The following example is an attempt to demonstrate:

<Box color="black">
  <Flex px={3} bg='#eee'>
    <Box p={3} width='auto' bg='#ddd'>
      Link with padding \`3\`
    </Box>
    <Box mx='auto' />
    <Box p={3} width='auto' bg='#ddd'>
      Link
    </Box>
    <Box p={3} width='auto' bg='#0cf'>
      Link
    </Box>
  </Flex>
  <Box p={4} bg='#f6f6f6'>
    Box with padding \`4\`
  </Box>
</Box>

The navigation bar has a higher density layout with left and right padding of \`3\` (\`16px\`) and nested links with padding \`3\` as well.
The content area below has a padding of \`4\` (\`32px\`) which equals the padding of the navigation bar and links added together.
Notice how the text in the navigation bar and the content below still align with each other.

This is a very simple example, but when adhering to this approach across a large application, the effect can be profound.
The default typographic scale (\`fontSizes\`) in Styled System is also loosely based on the same powers of two approach,
which is intended to make web app design more effortlessly consistent.

For further reading see [Mathematical Web Typography](https://jxnblk.com/blog/mathematical-web-typography/).
`,"../../packages/styled-system/docs/how-it-works.md":`# How it Works

Most CSS-in-JS libraries accept functions as arguments to create dynamic styles based on props.
For example, the following sets color dynamically in styled-components based on the \`color\` prop:

\`\`\`js
import styled from 'styled-components'

const Box = styled.div\`
  color: \${(props) => props.color};
\`
\`\`\`

Beyond just passing a dynamic value, an entire style declaration can be returned in functions like this.

\`\`\`js
import styled from 'styled-components'

const getColor = (props) => \`color: \${props.color};\`

const Box = styled.div\`
  \${getColor}
\`
\`\`\`

Style object can also be returned, which is a much simpler way to handle dynamic values in JavaScript.

\`\`\`js
import styled from 'styled-components'

// works exactly the same as the previous function
const getColor = (props) => ({
  color: props.color,
})

const Box = styled.div\`
  \${getColor}
\`
\`\`\`

By using style objects instead of embedded CSS strings, Styled System is compatible with a wide range of CSS-in-JS libraries.

The core utilities in Styled System are built on this pattern and consist of functions that take \`props\` as an argument
and return style objects,
while making it simpler to use values from a theme and apply styles responsively across breakpoints.

These style functions can be written on a one-off basis, but Styled System is meant to help **reduce boilerplate**, ensure a **consistent styling API**, and speed the development of component-based design systems.
`,"../../packages/styled-system/docs/rationale.md":`From [spectrum](https://spectrum.chat/thread/b9afb6f3-a675-4f97-bc78-66411292fab1)

    I'm sure Styled System isn't for everyone, but here's some of the thinking behind it.
    Styled System is meant to:
    - Help ensure you're using scales and values consistently across your app
    - Help ensure that if you *do* want to use style props, that there is some across-the-board consistency with the prop naming conventions, e.g. \`px={2}\` works the same for all components that use the \`space\` utility
    - Allow for setting single properties, such as width or font-size, responsively without needing to handle media queries
    - Write less CSS, e.g. Styled System is an abstraction built on top that gives you flexibility where needed
    - From my experience, many developers do not want to write CSS or end up writing a lot of duplicative code. Other developers like to write CSS, and that's also completely fine, but this library probably isn't necessary for teams of fewer than 10 people where most have a good understanding of CSS.
    - With styled-components and other libraries, you can still escape into low-level CSS using things like the \`.extend()\` method
    When I first released Basscss, people hated it. When I first introduced Rebass, people hated it. Some ideas like this take time to gain traction, but I've received a surprising amount of positive feedback around the library so far, and I suspect that there's some value in approaches like this
`,"../../packages/styled-system/docs/responsive-styles.md":`# Responsive Styles

Often when working on responsive layouts, it's useful to adjust styles along a singular dimension -
such as font-size, margin, padding, and width.
Instead of manually managing media queries and adding nested style objects throughout a code base,
Styled System offers a convenient shorthand syntax for adding responsive styles with a mobile-first approach.
While this syntax can seem odd at first, it can become a powerful way to manage responsive typography and layouts.

All style utilities add props that accept arrays as values for mobile-first responsive styles.

\`\`\`jsx
<Box
  width={[
    1,    // 100% below the smallest breakpoint
    1/2,  // 50% from the next breakpoint and up
    1/4   // 25% from the next breakpoint and up
  ]}
/>

// responsive font size
<Box fontSize={[ 1, 2, 3, 4 ]} />

// responsive margin
<Box m={[ 1, 2, 3, 4 ]} />

// responsive padding
<Box p={[ 1, 2, 3, 4 ]} />
\`\`\`

## What it does

This shortcut is an alternative to writing media queries out by hand.
Given the following:

\`\`\`jsx
<Box width={[1, 1 / 2, 1 / 4]} />
\`\`\`

Using Styled System with a CSS-in-JS library will generate something like the following CSS:

\`\`\`css
.Box-hash {
  width: 100%;
}

@media screen and (min-width: 40em) {
  .Box-hash {
    width: 50%;
  }
}

@media screen and (min-width: 52em) {
  .Box-hash {
    width: 25%;
  }
}
\`\`\`

## Using objects

Alternatively, you can define breakpoints with aliases and use plain objects as values. Any undefined alias key will define the base, non-responsive value.

\`\`\`js
// theme.js
const breakpoints = ['40em', '52em', '64em', '80em']

// aliases
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export default {
  breakpoints,
}
\`\`\`

\`\`\`jsx
<Box width={{ _: 1, sm: 1, md: 1 / 2, lg: 1 / 4 }} />
\`\`\`

Read more in the [Array Props Guide](./guides/array-props.md).
`,"../../packages/styled-system/docs/table.md":'# Reference Table\n\nStyled System is organized into categories of style props.\nEach function provides the following props and maps to scales defined in a theme.\n\n## Space\n\n```js\nimport { space } from \'@soroush.tech/styled-system\'\n`\n\n<Box m={2}>\n  Tomato\n</Box>\n```\n\n| Prop                  | CSS Property                       | Theme Field |\n| --------------------- | ---------------------------------- | ----------- |\n| `m`, `margin`         | `margin`                           | `space`     |\n| `mt`, `marginTop`     | `margin-top`                       | `space`     |\n| `mr`, `marginRight`   | `margin-right`                     | `space`     |\n| `mb`, `marginBottom`  | `margin-bottom`                    | `space`     |\n| `ml`, `marginLeft`    | `margin-left`                      | `space`     |\n| `mx`, `marginX`       | `margin-left` and `margin-right`   | `space`     |\n| `my`, `marginY`       | `margin-top` and `margin-bottom`   | `space`     |\n| `p`, `padding`        | `padding`                          | `space`     |\n| `pt`, `paddingTop`    | `padding-top`                      | `space`     |\n| `pr`, `paddingRight`  | `padding-right`                    | `space`     |\n| `pb`, `paddingBottom` | `padding-bottom`                   | `space`     |\n| `pl`, `paddingLeft`   | `padding-left`                     | `space`     |\n| `px`, `paddingX`      | `padding-left` and `padding-right` | `space`     |\n| `py`, `paddingY`      | `padding-top` and `padding-bottom` | `space`     |\n| `gap`                 | `gap`                              | `space`     |\n| `rowGap`              | `row-gap`                          | `space`     |\n| `columnGap`           | `column-gap`                       | `space`     |\n\nStyled System provides subsets of `space` category: `margin`, `padding` and `gap`.\n\n## Color\n\n```js\nimport { color } from \'@soroush.tech/styled-system\'\n;<Text color="white" bg="black">\n  Header\n</Text>\n```\n\n| Prop                    | CSS Property       | Theme Field |\n| ----------------------- | ------------------ | ----------- |\n| `color`                 | `color`            | `colors`    |\n| `bg`, `backgroundColor` | `background-color` | `colors`    |\n| `opacity`               | `opacity`          | none        |\n\n## Typography\n\n```js\nimport { typography } from \'@soroush.tech/styled-system\'\n;<Header fontFamily="Helvetica" fontSize={2}>\n  Hello!\n</Header>\n```\n\n| Prop                      | CSS Property                | Theme Field      |\n| ------------------------- | --------------------------- | ---------------- |\n| `fontFamily`              | `font-family`               | `fonts`          |\n| `fontSize`                | `font-size`                 | `fontSizes`      |\n| `fontWeight`              | `font-weight`               | `fontWeights`    |\n| `lineHeight`              | `line-height`               | `lineHeights`    |\n| `letterSpacing`           | `letter-spacing`            | `letterSpacings` |\n| `textAlign`               | `text-align`                | none             |\n| `fontStyle`               | `font-style`                | none             |\n| `textTransform`           | `text-transform`            | none             |\n| `textAlignLast`           | `text-align-last`           | none             |\n| `textDecoration`          | `text-decoration`           | none             |\n| `textDecorationLine`      | `text-decoration-line`      | none             |\n| `textDecorationStyle`     | `text-decoration-style`     | none             |\n| `textDecorationThickness` | `text-decoration-thickness` | none             |\n| `textDecorationColor`     | `text-decoration-color`     | `colors`         |\n| `whiteSpace`              | `white-space`               | none             |\n| `textOverflow`            | `text-overflow`             | none             |\n\n## Layout\n\n```js\nimport { layout } from \'@soroush.tech/styled-system\'\n;<Box width="100%" height={32} overflow="hidden" />\n```\n\n| Prop            | CSS Property     | Theme Field |\n| --------------- | ---------------- | ----------- |\n| `width`         | `width`          | `sizes`     |\n| `height`        | `height`         | `sizes`     |\n| `minWidth`      | `min-width`      | `sizes`     |\n| `maxWidth`      | `max-width`      | `sizes`     |\n| `minHeight`     | `min-height`     | `sizes`     |\n| `maxHeight`     | `max-height`     | `sizes`     |\n| `size`          | `width` `height` | `sizes`     |\n| `display`       | `display`        | none        |\n| `verticalAlign` | `vertical-align` | none        |\n| `aspectRatio`   | `aspect-ratio`   | none        |\n| `overflow`      | `overflow`       | none        |\n| `overflowX`     | `overflowX`      | none        |\n| `overflowY`     | `overflowY`      | none        |\n\n## Flexbox\n\n```js\nimport { flexbox } from \'@soroush.tech/styled-system\'\n;<Flex alignItems="center" justifyContent="space-between">\n  Blog\n</Flex>\n```\n\n| Prop             | CSS Property       | Theme Field |\n| ---------------- | ------------------ | ----------- |\n| `alignItems`     | `align-items`      | none        |\n| `alignContent`   | `align-content`    | none        |\n| `justifyItems`   | `justify-items`    | none        |\n| `justifyContent` | `justify-content`  | none        |\n| `flexWrap`       | `flex-wrap`        | none        |\n| `flexDirection`  | `flex-direction`   | none        |\n| `flex`           | `flex` (shorthand) | none        |\n| `flexGrow`       | `flex-grow`        | none        |\n| `flexShrink`     | `flex-shrink`      | none        |\n| `flexBasis`      | `flex-basis`       | none        |\n| `justifySelf`    | `justify-self`     | none        |\n| `alignSelf`      | `align-self`       | none        |\n| `order`          | `order`            | none        |\n\n## Grid Layout\n\n```js\nimport { grid } from \'@soroush.tech/styled-system\'\n;<Grid gridGap={2} gridAutoFlow="row dense">\n  Grid\n</Grid>\n```\n\n| Prop                  | CSS Property            | Theme Field |\n| --------------------- | ----------------------- | ----------- |\n| `gridGap`             | `grid-gap`              | `space`     |\n| `gridRowGap`          | `grid-row-gap`          | `space`     |\n| `gridColumnGap`       | `grid-column-gap`       | `space`     |\n| `gridColumn`          | `grid-column`           | none        |\n| `gridRow`             | `grid-row`              | none        |\n| `gridArea`            | `grid-area`             | none        |\n| `gridAutoFlow`        | `grid-auto-flow`        | none        |\n| `gridAutoRows`        | `grid-auto-rows`        | none        |\n| `gridAutoColumns`     | `grid-auto-columns`     | none        |\n| `gridTemplateRows`    | `grid-template-rows`    | none        |\n| `gridTemplateColumns` | `grid-template-columns` | none        |\n| `gridTemplateAreas`   | `grid-template-areas`   | none        |\n\n## Background\n\n```js\nimport { background } from \'@soroush.tech/styled-system\'\n;<Image\n  backgroundImage="url(\'/images/dog.png\')"\n  backgroundPosition="center"\n  backgroundRepeat="no-repeat"\n/>\n```\n\n| Prop                 | CSS Property          | Theme Field |\n| -------------------- | --------------------- | ----------- |\n| `background`         | `background`          | none        |\n| `backgroundImage`    | `background-image`    | none        |\n| `backgroundSize`     | `background-size`     | none        |\n| `backgroundPosition` | `background-position` | none        |\n| `backgroundRepeat`   | `background-repeat`   | none        |\n\n## Border\n\n```js\nimport { border } from \'@soroush.tech/styled-system\'\n;<Box border={1} borderRadius={2}>\n  Card\n</Box>\n```\n\n| Prop                      | CSS Property                   | Theme Field    |\n| ------------------------- | ------------------------------ | -------------- |\n| `border`                  | `border`                       | `borders`      |\n| `borderWidth`             | `border-width`                 | `borderWidths` |\n| `borderStyle`             | `border-style`                 | `borderStyles` |\n| `borderColor`             | `border-color`                 | `colors`       |\n| `borderRadius`            | `border-radius`                | `radii`        |\n| `borderTop`               | `border-top`                   | `borders`      |\n| `borderTopWidth`          | `border-top-width`             | `borderWidths` |\n| `borderTopStyle`          | `border-top-style`             | `borderStyles` |\n| `borderTopColor`          | `border-top-color`             | `colors`       |\n| `borderTopLeftRadius`     | `border-top-left-radius`       | `radii`        |\n| `borderTopRightRadius`    | `border-top-right-radius`      | `radii`        |\n| `borderRight`             | `border-right`                 | `borders`      |\n| `borderRightWidth`        | `border-right-width`           | `borderWidths` |\n| `borderRightStyle`        | `border-right-style`           | `borderStyles` |\n| `borderRightColor`        | `border-right-color`           | `colors`       |\n| `borderBottom`            | `border-bottom`                | `borders`      |\n| `borderBottomWidth`       | `border-bottom-width`          | `borderWidths` |\n| `borderBottomStyle`       | `border-bottom-style`          | `borderStyles` |\n| `borderBottomColor`       | `border-bottom-color`          | `colors`       |\n| `borderBottomLeftRadius`  | `border-bottom-left-radius`    | `radii`        |\n| `borderBottomRightRadius` | `border-bottom-right-radius`   | `radii`        |\n| `borderLeft`              | `border-left`                  | `borders`      |\n| `borderLeftWidth`         | `border-left-width`            | `borderWidths` |\n| `borderLeftStyle`         | `border-left-style`            | `borderStyles` |\n| `borderLeftColor`         | `border-left-color`            | `colors`       |\n| `borderX`                 | `border-left` & `border-right` | `borders`      |\n| `borderY`                 | `border-top` & `border-bottom` | `borders`      |\n\n## Position\n\n```js\nimport { position } from \'@soroush.tech/styled-system\'\n;<Box position="absolute" top={0} left={0} right={0} bottom={0}>\n  Cover\n</Box>\n```\n\n| Prop       | CSS Property | Theme Field |\n| ---------- | ------------ | ----------- |\n| `position` | `position`   | none        |\n| `zIndex`   | `z-index`    | `zIndices`  |\n| `top`      | `top`        | `space`     |\n| `right`    | `right`      | `space`     |\n| `bottom`   | `bottom`     | `space`     |\n| `left`     | `left`       | `space`     |\n\n## Shadow\n\n```js\nimport { shadow } from \'@soroush.tech/styled-system\'\n;<Text textShadow="2px 2px #ff0000" boxShadow="5px 10px #888888">\n  Text with shadows\n</Text>\n```\n\n| Prop         | CSS Property  | Theme Field |\n| ------------ | ------------- | ----------- |\n| `textShadow` | `text-shadow` | `shadows`   |\n| `boxShadow`  | `box-shadow`  | `shadows`   |\n\n## Variants\n\n**Note**: The prefered API for [variants](./variants.md) has changed. The following is a reference for legacy variant APIs.\n\n```js\nimport { textStyle, colorStyle, buttonStyle } from \'@soroush.tech/styled-system\'\n\n<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n```\n\n| Function Name | Prop        | Theme Field   |\n| ------------- | ----------- | ------------- |\n| `textStyle`   | `textStyle` | `textStyles`  |\n| `colorStyle`  | `colors`    | `colorStyles` |\n| `buttonStyle` | `variant`   | `buttons`     |\n',"../../packages/styled-system/docs/theme-specification.md":"# Theme Specification\n\n---\n\nThe Styled System theme object is intended to be a general purpose format for storing design system style values and scales.\nThe objects shape is based on the [System UI Theme Specification][].\nIt is not coupled to Styled System's implementation and can be used in other similar libraries\nwhere using common style values in multiple parts of a code base is desirable.\n\n[system ui theme specification]: https://system-ui.com/theme\n\n## Scale Objects\n\nMany CSS style properties accept open-ended values like lengths, colors, and font names.\nIn order to create a consistent styling system, the theme object is centered around the idea of scales, such as a typographic (font-size) scale, a spacing scale for margin and padding, and a color object.\nThese scales can be defined in multiple ways depending on needs, but tend to use arrays for ordinal values like font sizes, or plain objects for named values like colors, with the option of nesting objects for more complex systems.\n\n```js\n// example fontSizes scale as an array\nfontSizes: [12, 14, 16, 20, 24, 32]\n```\n\n```js\n// example colors object\ncolors: {\n  blue: '#07c',\n  green: '#0fa',\n}\n```\n\n```js\n// example nested colors object\ncolors: {\n  blue: '#07c',\n  blues: [\n    '#004170',\n    '#006fbe',\n    '#2d8fd5',\n    '#5aa7de',\n  ]\n}\n```\n\n### Scale Aliases\n\nFor typically ordinal values like font sizes that are stored in arrays, it can be helpful to create aliases by adding named properties to the object.\n\n```js\n// example fontSizes aliases\nfontSizes: [12, 14, 16, 20, 24, 32]\n// aliases\nfontSizes.body = fontSizes[2]\nfontSizes.display = fontSizes[5]\n```\n\n### Excluded Values\n\nSome CSS properties accept only a small, finite number of valid CSS values and should _not_ be included as a scale object.\nFor example, the `text-align` property accepts the following values:\n`left`, `right`, `center`, `justify`, `justify-all`, `start`, `end`, or `match-parent`.\nOther properties that are intentionally excluded from this specification include: `float`, `clear`, `display`, `overflow`, `position`, `vertical-align`, `align-items`, `justify-content`, and `flex-direction`.\n\n## Keys\n\nThe keys in the theme object should typically correspond with the CSS properties they are used for, and follow a plural naming convention.\nFor example, the CSS property `font-size` is expected to use values from the `fontSizes` scale, and the `color` property uses values from the `colors` scale.\n\nSome keys can be used for multiple CSS properties, where the data type is the same. The `color` object is intended to be used with any property that accepts a CSS color value, such as `background-color` or `border-color`.\n\n### Space\n\nThe `space` key is a specially-named scale intended for use with margin, padding, and other layout-related CSS properties.\nA space scale can be defined as either a plain object or an array, but by convention an array is preferred.\nThis is an intentional constraint that makes it difficult to add _\"one-off\"_ or _\"in-between\"_ sizes that could lead to unwanted and rippling affects to layout.\n\nWhen defining space scales as an array, it is conventional to use the value `0` as the first value so that `space[0] === 0`.\n\n```js\n// example space scale\nspace: [0, 4, 8, 16, 32, 64]\n```\n\n```js\n// example space scale object\nspace: {\n  small: 4,\n  medium: 8,\n  large: 16,\n}\n```\n\n```js\n// example space scale with aliases\nspace: [0, 4, 8, 16, 32]\nspace.small = space[1]\nspace.medium = space[2]\nspace.large = space[3]\n```\n\n### Breakpoints\n\nBreakpoints are CSS lengths intended for use in media queries.\nIn Styled System the breakpoints scale is used to create mobile-first responsive media queries based on array values.\n\nFor example, using a margin value of `[ 0, 1, 2 ]` creates styles with multiple mobile-first min-width media queries.\n\n```js\n// given this breakpoints scale:\nbreakpoints: ['40em', '52em', '64em']\n```\n\n```js\n// and this margin prop value\nm: [0, 1, 2]\n```\n\n```js\n// Styled System outputs this style object\n{\n  margin: 0,\n  '@media screen and (min-width: 40em)': {\n    margin: '4px',\n  },\n  '@media screen and (min-width: 52em)': {\n    margin: '8px',\n  }\n}\n```\n\n#### Media Queries\n\nFor convenience and for use with other styling approaches, a `mediaQueries` scale derived from the `breakpoints` scale can be added to the theme object.\n\n```js\nbreakpoints: [ '40em', '52em', '64em' ]\n\nmediaQueries: {\n  small: `@media screen and (min-width: ${breakpoints[0]})`,\n  medium: `@media screen and (min-width: ${breakpoints[1]})`,\n  large: `@media screen and (min-width: ${breakpoints[2]})`,\n}\n```\n\n### Key Reference\n\nThe following is a list of theme object keys and their corresponding CSS properties.\nThis list may be non-exhaustive.\n\n| Theme Key        | CSS Properties                                                                                                                                                                                                                     |\n| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `space`          | `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`, `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, `gap`, `row-gap`, `column-gap`, `grid-gap`, `grid-column-gap`, `grid-row-gap` |\n| `fontSizes`      | `font-size`                                                                                                                                                                                                                        |\n| `colors`         | `color`, `background-color`, `border-color`                                                                                                                                                                                        |\n| `fonts`          | `font-family`                                                                                                                                                                                                                      |\n| `fontWeights`    | `font-weight`                                                                                                                                                                                                                      |\n| `lineHeights`    | `line-height`                                                                                                                                                                                                                      |\n| `letterSpacings` | `letter-spacing`                                                                                                                                                                                                                   |\n| `sizes`          | `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`                                                                                                                                                            |\n| `borders`        | `border`, `border-top`, `border-right`, `border-bottom`, `border-left`                                                                                                                                                             |\n| `borderWidths`   | `border-width`                                                                                                                                                                                                                     |\n| `borderStyles`   | `border-style`                                                                                                                                                                                                                     |\n| `radii`          | `border-radius`                                                                                                                                                                                                                    |\n| `shadows`        | `box-shadow`, `text-shadow`                                                                                                                                                                                                        |\n| `zIndices`       | `z-index`                                                                                                                                                                                                                          |\n\n### Element Variants\n\nStyled System includes the ability to define style object variants for particular element types.\nFor example, button variants can be defined with the `buttons` key, which a Button component can then switch between on a per-instance basis.\n\n```js\n// example button variants\nbuttons: {\n  primary: {\n    color: colors.white,\n    backgroundColor: colors.blue,\n  },\n  secondary: {\n    color: colors.white,\n    backgroundColor: colors.green,\n  },\n  danger: {\n    color: colors.white,\n    backgroundColor: colors.red,\n  },\n}\n\n// using a button variant\n<Button variant='primary' />\n```\n\nWhich elements or components use these variant styles is left to the end-user and not restricted in any way.\nCommon style variants include: `textStyles`, `colorStyles`, and `buttons`.\n","../../packages/styled-system/docs/theming.md":`# Theming

One of the core features of Styled System is the ability to quickly reference values defined in a theme in your components' props.
Instead of hard-coding values or importing a theme into other components,
Styled System props hook directly into React context-based themes.

Given the following colors in a theme:

\`\`\`js
const colors = {
  blue: '#07c',
}

export default {
  colors,
}
\`\`\`

A component with \`color\` props can pick up the \`blue\` value:

\`\`\`jsx
<Box color="blue" />
\`\`\`
`,"../../packages/styled-system/docs/typescript.md":"# TypeScript\n\n`@soroush.tech/styled-system` ships its own first-class types - it **replaces\n`@types/styled-system`**, and the public type surface matches `@types/styled-system@5.1.25`\nso existing typed code keeps compiling.\n\n## Typing component props\n\nEvery style function has a matching prop interface. Compose the ones you use into your\ncomponent's props. Each interface is generic over your `Theme`, so prop values are\n**scale-aware** - they resolve to keys of the relevant theme scale.\n\n```tsx\nimport styled from '@emotion/styled'\nimport {\n  space,\n  color,\n  typography,\n  type SpaceProps,\n  type ColorProps,\n  type TypographyProps,\n  type Theme,\n} from '@soroush.tech/styled-system'\n\nconst theme = {\n  space: [0, 4, 8, 16, 32, 64],\n  fontSizes: [12, 14, 16, 24, 32],\n  colors: { primary: '#0077cc', white: '#fff' },\n} satisfies Theme\n\ntype AppTheme = typeof theme\n\ntype BoxProps = SpaceProps<AppTheme> & ColorProps<AppTheme> & TypographyProps<AppTheme>\n\nconst Box = styled('div')<BoxProps>(space, color, typography)\n\n// `m` → space index, `bg`/`color` → colors keys, `fontSize` → fontSizes index.\n// `bg=\"green\"` would be a compile error - green isn't in the theme's colors.\n;<Box m={2} bg=\"primary\" color=\"white\" fontSize={3} />\n```\n\n## How scale-awareness works\n\n`SpaceProps<ThemeType, TVal = ThemeValue<'space', ThemeType>>` derives the value type\n`TVal` from the theme via the `ThemeValue` helper:\n\n- array scale (`space: [...]`) → the value type is `number` (an index)\n- object scale (`colors: { primary, ... }`) → the value type is the key union\n\nThe seven scale-bound groups mirror `@types/styled-system`: `space` (`SpaceProps`,\n`MarginProps`, `PaddingProps`), `colors` (`ColorProps`, `BorderProps.borderColor`),\n`fontSizes`/`fontWeights`/`lineHeights` (`TypographyProps`), and `radii`\n(`BorderProps.borderRadius`). Everything else is typed as the corresponding CSS property.\n\nProp interfaces exported: `SpaceProps`, `MarginProps`, `PaddingProps`, `LayoutProps`,\n`TypographyProps`, `FlexboxProps`, `PositionProps`, `ColorProps`, `BorderProps`,\n`BackgroundProps`, `GridProps`, `ShadowProps`, plus the foundation types `Theme`,\n`RequiredTheme`, `ResponsiveValue`, `ThemeValue`, `ObjectOrArray`, `TLengthStyledSystem`.\n\n## Custom style functions are typed too\n\n`system()` / `createParser()` / `compose()` return a `Parser` - a callable that drops\nstraight into Emotion's or styled-components' `styled()` as an interpolation. Its call\nsignature is currently loosened to `(...args: any[]): any` to match the original\n`@styled-system` `styleFn`, so the style functions stay permissive interpolations on any\nhost element. A stricter `<P extends { theme?: unknown }>(props: P) => CSSObject`\nsignature is planned for a future major.\n\n## Drop-in for existing `styled-system` + `@types/styled-system`\n\nSwap via a package-manager alias - no code or type changes:\n\n```jsonc\n\"dependencies\": {\n  \"styled-system\": \"npm:@soroush.tech/styled-system@^5\"\n}\n```\n\nA runnable, `tsc`-verified example lives in\n[`styled-system/typescript`](https://github.com/soroush-tech/examples/tree/main/styled-system/typescript).\n","../../packages/styled-system/docs/variants.md":`# Variants

Use the variant API to apply complex styles to a component based on a single prop.
This can be a handy way to support slight stylistic variations in button or typography components.

Import the variant function and pass variant style objects in your component definition.
When defining variants inline, you can use Styled System like syntax to pick up values from your theme.

Note: Inline variants is a new feature in \`v5.1.0\`, which uses [@soroush.tech/styled-system/css][].

\`\`\`js
// example Button with variants
import styled from 'styled-components'
import { variant } from '@soroush.tech/styled-system'

const Button = styled('button')(
  {
    appearance: 'none',
    fontFamily: 'inherit',
  },
  variant({
    variants: {
      primary: {
        color: 'white',
        bg: 'primary',
      },
      secondary: {
        color: 'white',
        bg: 'secondary',
      },
    },
  })
)
\`\`\`

The \`Button\` component can now use the \`variant\` prop to change between a primary and secondary style.

\`\`\`jsx
<Button variant='primary'>Primary</Button>
<Button variant='secondary'>Secondary</Button>
\`\`\`

Note: When using CSS properties in a variant, avoid mixing these styles with conflicting Styled System props. For example, if your variant includes the \`color\` property, avoid using the \`color\` React prop in your components.

## Custom Prop Name

If you'd like to use a custom prop name other than \`variant\`, use the \`prop\` option.

\`\`\`js
const Text = styled('div')(
  variant({
    prop: 'size',
    variants: {
      big: {
        fontSize: 4,
        lineHeight: 'heading',
      },
      small: {
        fontSize: 1,
        lineHeight: 'body',
      },
    },
  })
)

// <Text size='big' />
\`\`\`

## Themeable Variants

If you'd like to enable theming of variants from the global theme object, use the \`scale\` option to define the theme key to use for variants.

\`\`\`js
const Button = styled('button')(
  variant({
    scale: 'buttons',
    variants: {
      primary: {
        color: 'white',
        bg: 'primary',
      },
      secondary: {
        color: 'white',
        bg: 'secondary',
      },
    },
  })
)
\`\`\`

With the \`scale\` option above, the \`theme.buttons\` object can be used to override variants defined in the component.

\`\`\`js
// example theme
export default {
  // base theme values...
  // custom button variants
  buttons: {
    primary: {
      color: 'white',
      bg: 'red',
    },
    secondary: {
      color: 'white',
      bg: 'tomato',
    },
  },
}
\`\`\`

## Legacy API

To continue using the previous variant API,
without transforming style objects based on the theme,
omit the \`variants\` option.

\`\`\`js
// legacy API
variant({
  prop: 'size',
  scale: 'typeSizes',
})
\`\`\`

## Migrating from Legacy API

If you were previously using the legacy variant API, but would like to use theme-based values in your variants, it's recommended that you move the variant definitions inline into your component.
If you're using the same variants across multiple components, you can create a base component that others extend.

If you'd still like to keep variant definitions in your theme, but use theme-based style objects, you _must_ add the \`variants\` option to the \`variant\` function call in your component with at least one variant defined.

\`\`\`js
// to keep variant definitions in your theme,
// but use theme-based style objects, add a \`variants\` option
variant({
  prop: 'variant',
  scale: 'buttons',
  variants: {
    // can be blank to enable the new API
    primary: {},
  },
})
\`\`\`

### Built-in Variants

The built-in variants use the following props and theme keys:

| Function Name | Prop        | Theme Key     |
| ------------- | ----------- | ------------- |
| \`textStyle\`   | \`textStyle\` | \`textStyles\`  |
| \`colorStyle\`  | \`colors\`    | \`colorStyles\` |
| \`buttonStyle\` | \`variant\`   | \`buttons\`     |

[@soroush.tech/styled-system/css]: ./css.md
`}),f=[...t,...r],p=e=>Object.entries(d).find(([t])=>t.endsWith(`/docs/${e}`))?.[1],m=new Map(f.map(({label:e,file:t})=>[i(t),{label:e,source:p(t)??``}])),h=e=>{let t=e.length;for(;t>0&&e[t-1]===`/`;)t--;return e.slice(0,t)},g=e({default:()=>y}),_=c(),v=`*`;function y(){let{routeParams:e}=l(),t=h(e[v]??``),r=m.get(t);return(0,_.jsx)(a,{sidebar:(0,_.jsx)(u,{}),children:(0,_.jsx)(n,{source:r?.source??``})})}var b=e({default:()=>S}),x=`*`,S=e=>{let t=e.routeParams[x]??``;return m.get(h(t))?.label??`Docs`},C={hasServerOnlyHook:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!1}},isClientRuntimeLoaded:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},onBeforeRenderEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},dataEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},guardEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},onRenderClient:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+onRenderClient.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:s}},Page:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/styled-system/docs/+Page.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:g}},hydrationCanBeAborted:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+config.ts`,fileExportPathToShowToUser:[`default`,`hydrationCanBeAborted`]},valueSerialized:{type:`js-serialized`,value:!0}},title:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/styled-system/docs/+title.ts`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:b}},description:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/styled-system/docs/+config.ts`,fileExportPathToShowToUser:[`default`,`description`]},valueSerialized:{type:`js-serialized`,value:`Guides and reference documentation for @soroush.tech/styled-system.`}},Loading:{type:`standard`,definedAtData:{filePathToShowToUser:`vike-react/__internal/integration/Loading`,fileExportPathToShowToUser:[]},valueSerialized:{type:`pointer-import`,value:o}}};export{C as configValuesSerialized};