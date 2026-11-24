// The libraries this umbrella points at. A library is added by one line here and an entry in
// `dependencies` of package.json; `pnpm gen:umbrellas` then writes its entry points. The options of
// a line (`under`, `optional`, `omit`) are described on `Library`.
import type { Library } from '@soroush.design/umbrella-gen'

export const libraries: Library[] = [
  // `/style` and `/engine` are the theme library's own. Its `/theme` is the component library's: that
  // one adds the typing of the components (owner states, `TabsVariants`) to the theme library's names.
  { package: '@soroush.design/react-theme', omit: ['.', './theme'] },
  { package: '@soroush.design/react-components', omit: ['./style', './engine'] },
  { package: '@soroush.design/react-hooks', under: 'hooks' },
  { package: '@soroush.design/react-markdown', under: 'markdown', optional: true },
]
