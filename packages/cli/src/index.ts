// The command line as a function, for a package that exposes it with a bin of its own:
// `@soroush.tech/design-system` runs it as `npx @soroush.tech/design-system init` (or `create`),
// passing its own package.json. Node only.
export { main as default } from './main'
export { readDesignSystemPackage, type PackageJson } from './detect/detect'
export { createNodeIo, type Io } from './io'
export type { CreateOptions } from './create/create'
export type { InitOptions } from './init'
