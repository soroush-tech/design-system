// The command line as a function, for a bin of its own: `@soroush.design/cli` runs it as
// `npx @soroush.design/cli init` (or `create`), passing the package.json of
// `@gild-ui/react`. Node only.
export { main as default } from './main'
export type { PackageJson } from './detect/detect'
export { createNodeIo, type Io } from './io'
export type { CreateOptions } from './create/create'
export type { InitOptions } from './init'
