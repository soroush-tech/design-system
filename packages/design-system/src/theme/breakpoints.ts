import {
  createContainerQueries,
  createMediaHelpers,
  type ContainerQueries,
  type QueryHelpers,
} from '@soroush.tech/styled-system'

/**
 * The query helpers a theme's breakpoint scale carries: `up` / `down` / `only` / `between` /
 * `not` as `@media` rules, and `containerQueries` for the same sizes as `@container` rules.
 */
export interface BreakpointHelpers extends QueryHelpers {
  containerQueries: ContainerQueries
}

/**
 * The scale with its helpers attached as non-enumerable methods: the engine, the theme's JSON
 * and a spread see only the sizes, while `theme.breakpoints.up('md')` works. `createTheme`
 * and `ThemeProvider` re-attach them after a merge, so they always follow the theme's own
 * breakpoints.
 */
export const withBreakpointHelpers = <Scale extends Record<string, string | number>>(
  scale: Scale
): Scale & BreakpointHelpers => {
  const sizes = { ...scale }
  const helpers = { ...createMediaHelpers(sizes), containerQueries: createContainerQueries(sizes) }
  for (const [name, helper] of Object.entries(helpers)) {
    Object.defineProperty(sizes, name, { value: helper, enumerable: false })
  }
  return sizes as Scale & BreakpointHelpers
}
