/** The corner shapes of a control or a surface: square, rounded by a radius, or a full pill. */
export type Shape = 'square' | 'rounded' | 'pill'

/**
 * The corner radius of a shape. Only `rounded` takes a radius - `rounded` is the one the
 * `borderRadius` prop and the theme's radii set; `square` is none and `pill` is a full round.
 */
export const getShapeRadius = (shape: Shape, rounded: string | number) => {
  if (shape === 'square') return 0
  if (shape === 'pill') return '9999px'
  return rounded
}
