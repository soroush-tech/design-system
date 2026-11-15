// The Vike starter: a React app on the design system, rendered as the developer picks. Its files
// are the templates in templates/vike/ (see templates/templates.md); this module adds what is
// computed: package.json, from the libraries picked, and the themes and Providers `init` writes
// too. The Vike wiring here is the one `init` reuses for an existing Vike app (#80).
import { createProvidersSource, createThemesSource } from '../../templates/templates'
import type { Library } from '../libraries'
import type { Starter, StarterFacts, StarterFile } from '../starters'
import { createTemplateFiles } from '../template/starterFiles'
import { pickVersions, toRange, type Package } from '../versions'

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
  vitest: {
    devDependencies: ['vitest', '@testing-library/react', '@testing-library/dom', 'jsdom'],
  },
}

function createPackageJson({
  packageName,
  isTypeScript,
  rendering,
  libraries,
  version,
}: StarterFacts): string {
  // An SPA's server draws no page, so it extracts no styles.
  const renderer = rendering === 'spa' ? ([] as const) : (['@emotion/server'] as const)
  const libraryPackages = libraries.flatMap(
    (library) => LIBRARY_PACKAGES[library].dependencies ?? []
  )
  const libraryDevPackages = libraries.flatMap(
    (library) => LIBRARY_PACKAGES[library].devDependencies ?? []
  )
  const packageJson = {
    name: packageName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      // An SSR app runs the server the build writes, on PORT (3000 by default).
      ...(rendering === 'ssr' ? { start: 'node dist/server/index.mjs' } : {}),
      ...(isTypeScript ? { typecheck: 'tsc --noEmit' } : {}),
      ...(libraries.includes('vitest') ? { test: 'vitest run' } : {}),
    },
    dependencies: {
      '@soroush.tech/design-system': toRange(version),
      ...pickVersions([...renderer, ...libraryPackages, 'react', 'react-dom', 'vike']),
    },
    devDependencies: pickVersions([
      '@vitejs/plugin-react',
      ...libraryDevPackages,
      'vite',
      ...(isTypeScript
        ? (['@types/react', '@types/react-dom', 'typescript'] as const)
        : ([] as const)),
    ]),
  }
  return `${JSON.stringify(packageJson, null, 2)}\n`
}

/** The files of the Vike app `facts` describe. */
function createFiles(facts: StarterFacts): StarterFile[] {
  const { isTypeScript, scheme } = facts
  const x = isTypeScript ? 'ts' : 'js'
  return [
    { path: 'package.json', content: createPackageJson(facts) },
    { path: `src/theme/themes.${x}`, content: createThemesSource({ isTypeScript }) },
    {
      path: `src/theme/Providers.${x}`,
      content: createProvidersSource({ isTypeScript, scheme, themesImport: './themes' }),
    },
    ...createTemplateFiles('vike', facts),
  ]
}

export const vikeStarter: Starter = {
  title: 'Vike',
  label: 'Vike (recommended): React pages, rendered as you pick',
  renderings: ['isomorphic', 'ssr', 'spa', 'ssg'],
  hasLibraries: true,
  createFiles,
}
