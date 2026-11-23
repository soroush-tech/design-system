// The libraries this umbrella points at. A library is added by one line here and an entry in
// `dependencies` of package.json; `pnpm gen:react` then writes its entry points.
//
//   { package: '@soroush.design/react-components' }                    merged at the top: /Button
//   { package: '@soroush.design/react-markdown', under: 'markdown' }   under a name: /markdown/Editor
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
}

export const libraries: Library[] = [
  { package: '@soroush.design/react-components' },
  { package: '@soroush.design/react-hooks', under: 'hooks' },
  { package: '@soroush.design/react-markdown', under: 'markdown', optional: true },
]
