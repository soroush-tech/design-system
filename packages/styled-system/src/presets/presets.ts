import { background } from '@soroush.design/styled-system/background'
import { border } from '@soroush.design/styled-system/border'
import { color } from '@soroush.design/styled-system/color'
import { compose, type Parser } from '@soroush.design/styled-system/core'
import { flexbox } from '@soroush.design/styled-system/flexbox'
import { grid, span } from '@soroush.design/styled-system/grid'
import { layout } from '@soroush.design/styled-system/layout'
import { position } from '@soroush.design/styled-system/position'
import { shadow } from '@soroush.design/styled-system/shadow'
import { space } from '@soroush.design/styled-system/space'
import { typography } from '@soroush.design/styled-system/typography'
import { buttonStyle, colorStyle, textStyle } from '@soroush.design/styled-system/variant'

// The composed parser whose propNames single-source the prop-filtering helpers.
export const all: Parser = compose(
  space,
  typography,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  grid,
  span,
  shadow,
  buttonStyle,
  textStyle,
  colorStyle
)
