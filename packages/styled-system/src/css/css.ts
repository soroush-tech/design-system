// Typed rewrite of @styled-system/css (styled-system v5).
// Standalone - carries its own get/responsive/scales; from ./core it shares only the
// media-query helper.
import { responsiveQueries, type Breakpoints, type ResponsiveQueries } from '../core/media'

export type CSSObject = Record<string, unknown>

export interface CssTheme {
  breakpoints?: Breakpoints
  [key: string]: unknown
}

type CssArg = CSSObject | ((theme: CssTheme) => CSSObject)

// based on https://github.com/developit/dlv
export const get = (
  obj: unknown,
  key?: string | number,
  def?: unknown,
  p = 0,
  undef?: unknown
): unknown => {
  const path = typeof key === 'string' ? key.split('.') : [key]
  let value = obj
  for (; p < path.length; p++) {
    value = value ? (value as Record<string, unknown>)[path[p] as string] : undef
  }
  return value === undef ? def : value
}

const defaultBreakpoints = [40, 52, 64].map((n) => n + 'em')

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}

const aliases: Record<string, string> = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY',
}

const multiples: Record<string, string[]> = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height'],
}

const scales: Record<string, string> = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  outlineColor: 'colors',
  textDecorationColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors',
}

const positiveOrNegative = (scale: unknown, value: unknown): unknown => {
  if (typeof value !== 'number' || value >= 0) {
    return get(scale, value as string | number, value)
  }
  const absolute = Math.abs(value)
  const n = get(scale, absolute, absolute)
  if (typeof n === 'string') return '-' + n
  return (n as number) * -1
}

const transforms = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'top',
  'bottom',
  'left',
  'right',
].reduce<Record<string, (scale: unknown, value: unknown, fallback?: unknown) => unknown>>(
  (acc, curr) => ({ ...acc, [curr]: positiveOrNegative }),
  {}
)

// An object value whose keys are all breakpoint names (or their `cq<Name>` keys) is a responsive
// value; any other object is a nested selector. Breakpoint names are never CSS properties.
const isResponsiveObject = (value: unknown, keyed: ResponsiveQueries['keyed']) =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.keys(value).length > 0 &&
  Object.keys(value).every((key) => keyed.has(key))

export const responsive =
  (styles: CSSObject) =>
  (theme: CssTheme): CSSObject => {
    const next: CSSObject = {}
    const blocks = new Map<string, CSSObject>()
    const breakpoints = get(theme, 'breakpoints', defaultBreakpoints) as Breakpoints
    const { array, keyed, order } = responsiveQueries(breakpoints)
    const place = (key: string, media: string | null | undefined, value: unknown) => {
      if (!media) {
        next[key] = value
        return
      }
      const block = blocks.get(media) ?? {}
      blocks.set(media, block)
      if (value != null) block[key] = value
    }

    for (const key in styles) {
      const value =
        typeof styles[key] === 'function'
          ? (styles[key] as (t: CssTheme) => unknown)(theme)
          : styles[key]

      if (value == null) continue
      if (Array.isArray(value)) {
        value.slice(0, array.length).forEach((item, i) => place(key, array[i], item))
      } else if (isResponsiveObject(value, keyed)) {
        for (const [name, item] of Object.entries(value as CSSObject))
          place(key, keyed.get(name), item)
      } else {
        next[key] = value
      }
    }

    // Generated blocks come after the author's own keys, in cascade order; a block the author
    // also wrote by hand (`[up('md')]: {...}`) is merged into.
    for (const media of order) {
      const block = blocks.get(media)
      if (!block) continue
      const own = next[media] as CSSObject | undefined
      delete next[media]
      next[media] = { ...own, ...block }
    }

    return next
  }

export const css =
  (args: CssArg) =>
  (props: Record<string, unknown> = {}): CSSObject => {
    const theme: CssTheme = {
      ...defaultTheme,
      ...((props.theme as CssTheme) || (props as CssTheme)),
    }
    let result: CSSObject = {}
    const obj = typeof args === 'function' ? args(theme) : args
    const styles = responsive(obj)(theme)

    for (const key in styles) {
      const x = styles[key]
      const val = typeof x === 'function' ? (x as (t: CssTheme) => unknown)(theme) : x

      if (key === 'variant') {
        const variant = css(get(theme, val as string) as CssArg)(theme)
        result = { ...result, ...variant }
        continue
      }

      if (val && typeof val === 'object') {
        result[key] = css(val as CssArg)(theme)
        continue
      }

      const prop = get(aliases, key, key) as string
      const scaleName = get(scales, prop) as string | undefined
      const scale = get(theme, scaleName, get(theme, prop, {}))
      const transform = get(transforms, prop, get) as (
        scale: unknown,
        value: unknown,
        fallback?: unknown
      ) => unknown
      const value = transform(scale, val, val)

      if (multiples[prop]) {
        const dirs = multiples[prop]
        for (const dir of dirs) {
          result[dir] = value
        }
      } else {
        result[prop] = value
      }
    }

    return result
  }

export default css
