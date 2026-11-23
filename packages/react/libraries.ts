// The libraries this umbrella points at. A library is added by one line here and an entry in
// `dependencies` of package.json; `pnpm gen:react` then writes its entry points.
//
//   { package: '@soroush.design/react-components' }                    merged at the top: /Button
//   { package: '@soroush.design/react-markdown', under: 'markdown' }   under a name: /markdown/Editor
export interface Library {
  /** The library's package name. */
  package: string
  /** A lowercase name to mount the library under; without it the library is merged at the top. */
  under?: string
}

export const libraries: Library[] = [{ package: '@soroush.design/react-components' }]
