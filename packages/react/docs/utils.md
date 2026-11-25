# The utils

`@soroush.design/core/utils` holds small pure helpers for working with colors and sizes. None of them needs a theme or React.

```ts
import { alpha, clamp, generateBoxShadow, luminance } from '@soroush.design/core/utils'
```

| Export                                | Does                                                                                                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alpha(color, opacity)`               | Appends an alpha channel to a 6-digit hex color: `alpha('#4ade80', 0.1)` is `'#4ade801A'`. A theme token is not a hex color: use `alpha` of `@soroush.design/react` for one. |
| `clamp(value, min, max)`              | Clamps a number to the inclusive range `[min, max]`.                                                                                                                         |
| `luminance(hex)`                      | The perceived brightness of a 6-digit hex color, from `0` (black) to `1` (white).                                                                                            |
| `generateBoxShadow(elevation, color)` | A box-shadow value for an elevation in pixels: `0 <elevation>px <2 x elevation>px <color>`.                                                                                  |

Take colors from the theme where a token exists; these helpers are for a value you derive from one, such as a tint of `theme.palette.primary.main`.
