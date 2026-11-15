import { devDependencies } from '../../package.json'
import type { Library } from './libraries'

/** The versions the starters install: the ones this package is tested with. */
export const VERSIONS = devDependencies

/** A package a starter installs, by its name in this package's devDependencies. */
export type Package = keyof typeof VERSIONS

/** A version from this package's own manifest, as a range an app takes. */
export const toRange = (version: string) => (/^\d/.test(version) ? `^${version}` : version)

/** The ranges of `names`, by name, as a package.json lists them. */
export const pickVersions = (names: readonly Package[]) =>
  Object.fromEntries(names.map((name) => [name, toRange(VERSIONS[name])]))

/** The packages each library installs: for the app's code, and for its development only. */
const LIBRARY_PACKAGES: Readonly<
  Record<Library, { dependencies?: readonly Package[]; devDependencies?: readonly Package[] }>
> = {
  'tanstack-query': { dependencies: ['@tanstack/react-query'] },
  swr: { dependencies: ['swr'] },
  msw: { devDependencies: ['msw'] },
  zustand: { dependencies: ['zustand'] },
  jotai: { dependencies: ['jotai'] },
  'redux-toolkit': { dependencies: ['@reduxjs/toolkit', 'react-redux'] },
  'react-hook-form': { dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'] },
}

/** The packages of `libraries`: what the app's code imports, and what only its development does. */
export function getLibraryPackages(libraries: readonly Library[]) {
  return {
    dependencies: libraries.flatMap((library) => LIBRARY_PACKAGES[library].dependencies ?? []),
    devDependencies: libraries.flatMap(
      (library) => LIBRARY_PACKAGES[library].devDependencies ?? []
    ),
  }
}

/** What every app's tests run on: Vitest, and Testing Library on jsdom. */
export const TEST_PACKAGES: readonly Package[] = [
  'vitest',
  '@testing-library/react',
  '@testing-library/dom',
  'jsdom',
]
