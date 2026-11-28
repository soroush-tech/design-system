// From jsdom 31 on, getComputedStyle reports lengths the way a browser does: rem and em resolve to
// px, and so does a unitless line-height. A test that expects a theme value converts it here, so it
// still names the theme value instead of a number worked out by hand.

const ROOT_FONT_SIZE = 16

/**
 * A length as the px a browser computes: `rem` against the 16px root font size, `em` and a
 * unitless number against `fontSize` (an element's computed font size, 16px when not given),
 * rounded to six significant digits as browsers serialize them. Any other value comes back as is.
 */
export const toPx = (length: string | number, fontSize = `${ROOT_FONT_SIZE}px`): string => {
  const match = /^(-?\d*\.?\d+)(rem|em)?$/.exec(String(length))
  if (!match) return String(length)
  const base = match[2] === 'rem' ? ROOT_FONT_SIZE : Number.parseFloat(fontSize)
  return `${Number((Number(match[1]) * base).toPrecision(6))}px`
}
