import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { ComponentNavItem } from '../registry'
import { sections, type DocsSection } from '../sections'
import { repoRoot } from './repoRoot'

/** Absolute path to the workspace package a docs section describes; fails for a package of another repository. */
export const packageDir = (section: DocsSection): string => {
  const { dir } = sections[section]
  if (dir === null) throw new Error(`The "${section}" package lives in its own repository.`)
  return join(repoRoot(), 'packages', dir)
}

/** The raw README source for a registered component. */
export const loadReadme = (item: ComponentNavItem): string =>
  readFileSync(join(packageDir(item.pkg), 'src', item.readmePath), 'utf8')

/** Reads any file inside a package, by path relative to the package directory. */
export const loadPackageFile = (section: DocsSection, relativePath: string): string =>
  readFileSync(join(packageDir(section), relativePath), 'utf8')

/** Reads any file in the workspace, by path relative to the repo root. */
export const loadRepoFile = (relativePath: string): string =>
  readFileSync(join(repoRoot(), relativePath), 'utf8')

/**
 * Every component README on disk in a package, as a path suffix under `src/`
 * (`Button/README.md`, `Table/Table/README.md`). Only the two levels the docs routes
 * serve are scanned; deeper sub-component READMEs render inside their container's page.
 */
export const listComponentReadmes = (section: DocsSection): string[] => {
  const root = join(packageDir(section), 'src')
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
