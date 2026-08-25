/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** '' on the live site; the package name during a versioned section snapshot build. */
  readonly PUBLIC_ENV__DOCS_SECTION: string
}

// A `?raw` markdown import resolves to the file's contents as a string (used to render a
// package's README or release notes). More specific than vite/client's generic `*?raw`.
declare module '*.md?raw' {
  const content: string
  export default content
}
