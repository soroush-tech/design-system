import { findInstalledVersion, getDependency, type PackageJson } from '../detect/detect'
import type { AppVersion } from './step'
import { compareVersions, readRangeMinimum } from './versions'

/**
 * The package the app is on, of `packages` (the newest first), and its version: the one installed
 * in node_modules, or the lowest package.json's range allows - the higher of the two, as an
 * install that is behind package.json means the app was moved and not installed yet. A string says
 * why there is none.
 */
export function detectAppVersion(
  root: string,
  packageJson: PackageJson,
  packages: readonly string[]
): AppVersion | string {
  const name = packages.find((candidate) => getDependency(packageJson, candidate) !== undefined)
  if (name === undefined) {
    return `migrate found none of ${packages.join(', ')} in package.json. Run it in the folder of the app to move.`
  }
  const range = getDependency(packageJson, name)!
  const declared = readRangeMinimum(range)
  const installed = findInstalledVersion(root, name)
  if (installed === undefined && declared === undefined) {
    return `migrate cannot tell which version of ${name} this app is on: package.json says "${range}". Install it, or give it a version, and run migrate again.`
  }
  if (installed === undefined) {
    const note = `${name} is not installed here, so its version is the lowest ${range} allows.`
    return { package: name, version: declared!, note }
  }
  const isBehind = declared !== undefined && compareVersions(installed, declared) < 0
  return { package: name, version: isBehind ? declared : installed }
}
