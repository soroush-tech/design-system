// From jsdom 31 on, a color inside a computed value (a box-shadow, a border) reads as `rgb(...)`,
// as in a browser. A test that expects a theme color converts the theme's hex here.

/** A six-digit hex color as a computed style writes it: `#ffd930` -> `rgb(255, 217, 48)`. */
export const toRgb = (hex: string): string => {
  const [red, green, blue] = [1, 3, 5].map((at) => Number.parseInt(hex.slice(at, at + 2), 16))
  return `rgb(${red}, ${green}, ${blue})`
}
