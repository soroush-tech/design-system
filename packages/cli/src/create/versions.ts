import { devDependencies } from '../../package.json'

/** The versions the starters install: the ones this package is tested with. */
export const VERSIONS = devDependencies

/** A package a starter installs, by its name in this package's devDependencies. */
export type Package = keyof typeof VERSIONS

/** A version from this package's own manifest, as a range an app takes. */
export const toRange = (version: string) => (/^\d/.test(version) ? `^${version}` : version)

/** The ranges of `names`, by name, as a package.json lists them. */
export const pickVersions = (names: readonly Package[]) =>
  Object.fromEntries(names.map((name) => [name, toRange(VERSIONS[name])]))
