import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { ComponentNavItem, DocsPackage } from '../registry'
import { repoRoot } from './repoRoot'

/** Absolute path to a workspace package's directory. */
export const packageDir = (pkg: DocsPackage): string => join(repoRoot(), 'packages', pkg)

/** The raw README source for a registered component. */
export const loadReadme = (item: ComponentNavItem): string =>
  readFileSync(join(packageDir(item.pkg), 'src', item.readmePath), 'utf8')

/** Reads any file inside a package, by path relative to the package directory. */
export const loadPackageFile = (pkg: DocsPackage, relativePath: string): string =>
  readFileSync(join(packageDir(pkg), relativePath), 'utf8')

/** Reads any file in the workspace, by path relative to the repo root. */
export const loadRepoFile = (relativePath: string): string =>
  readFileSync(join(repoRoot(), relativePath), 'utf8')

/**
 * Every component README on disk in a package, as a path suffix under `src/`
 * (`Button/README.md`, `Table/Table/README.md`). Only the two levels the docs routes
 * serve are scanned; deeper sub-component READMEs render inside their container's page.
 */
export const listComponentReadmes = (pkg: DocsPackage): string[] => {
  const root = join(packageDir(pkg), 'src')
  const found: string[] = []
  for (const top of readdirSync(root, { withFileTypes: true })) {
    if (!top.isDirectory()) continue
    for (const child of readdirSync(join(root, top.name), { withFileTypes: true })) {
      if (child.name === 'README.md') found.push(`${top.name}/README.md`)
      if (!child.isDirectory()) continue
      const nested = readdirSync(join(root, top.name, child.name))
      if (nested.includes('README.md')) found.push(`${top.name}/${child.name}/README.md`)
    }
  }
  // Ordered by code unit rather than `localeCompare`: these paths key a registry that
  // must come out identical on every machine, and collation varies with the runtime's
  // locale data. Arithmetic rather than a ternary so the comparator carries no branch
  // for the equal case, which two distinct paths can never reach.
  return found.sort((a, b) => Number(a > b) - Number(a < b))
}
