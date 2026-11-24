// The libraries this umbrella points at. A library is added by one line here and an entry in
// `dependencies` of package.json; `pnpm gen:react` then writes its entry points.
//
//   { package: '@soroush.design/react-components' }                    merged at the top: /Button
//   { package: '@soroush.design/react-markdown', under: 'markdown' }   under a name: /markdown/Editor
//   { package: '...', omit: ['./style'] }                               without an entry point another library serves
//
// A library with heavy dependencies is `optional: true`: the umbrella lists it as an optional peer,
// so an app that never imports its entry points installs none of them.
export interface Library {
  /** The library's package name. */
  package: string
  /** A lowercase name to mount the library under; without it the library is merged at the top. */
  under?: string
  /**
   * The app installs the library itself: it is an optional peer of the umbrella, not a dependency,
   * and importing its entry points without it fails with a module-not-found error.
   */
  optional?: boolean
  /**
   * Entry points of the library the umbrella does not re-export, as the library publishes them
   * (`'.'`, `'./style'`). Two libraries may hold the same name - the component library re-exports the
   * theme library's `/style` - and the umbrella takes it from one: the generator checks that an
   * omitted entry point exists and that another library serves it.
   */
  omit?: string[]
}

export const libraries: Library[] = [
  // `/style` and `/engine` are the theme library's own. Its `/theme` is the component library's: that
  // one adds the typing of the components (owner states, `TabsVariants`) to the theme library's names.
  { package: '@soroush.design/react-theme', omit: ['.', './theme'] },
  { package: '@soroush.design/react-components', omit: ['./style', './engine'] },
  { package: '@soroush.design/react-hooks', under: 'hooks' },
  { package: '@soroush.design/react-markdown', under: 'markdown', optional: true },
]
