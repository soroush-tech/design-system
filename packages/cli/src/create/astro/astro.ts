// The Astro starter: HTML pages whose parts are React islands drawn with the design system. Astro
// renders each island as a React root of its own, with plain react-dom/server, so the design system
// needs no 'use client' here, and an island's styles are in its HTML. Its files are the templates in
// templates/astro/ (see templates/templates.md); this module adds what is computed: package.json,
// and the themes and Providers `init` writes too.
import { APP_PACKAGE, CORE_PACKAGE } from '../../designSystemPackage'
import { createProvidersSource, createThemesSource } from '../../templates/templates'
import type { Starter, StarterFacts, StarterFile } from '../starters'
import { createTemplateFiles } from '../template/starterFiles'
import { getLibraryPackages, pickVersions, TEST_PACKAGES, toRange, VERSIONS } from '../versions'

// Astro's type checker (`astro check`) takes TypeScript 6 at most: this package keeps that
// version under an alias.
const TYPESCRIPT_RANGE = VERSIONS['typescript-astro'].replace('npm:typescript@', '')

function createPackageJson({
  packageName,
  isTypeScript,
  rendering,
  libraries,
  version,
}: StarterFacts): string {
  const isServer = rendering === 'ssr'
  const { dependencies: libraryPackages, devDependencies: libraryDevPackages } =
    getLibraryPackages(libraries)
  const packageJson = {
    name: packageName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'astro dev',
      build: 'astro build',
      preview: 'astro preview',
      // An SSR app runs the server the build writes, on HOST and PORT (4321 by default).
      ...(isServer ? { start: 'node dist/server/entry.mjs' } : {}),
      ...(isTypeScript ? { typecheck: 'astro check' } : {}),
      test: 'vitest run',
    },
    dependencies: {
      [APP_PACKAGE]: toRange(version),
      [CORE_PACKAGE]: toRange(version),
      ...pickVersions([
        ...(isServer ? (['@astrojs/node'] as const) : ([] as const)),
        '@astrojs/react',
        ...libraryPackages,
        'astro',
        'react',
        'react-dom',
      ]),
    },
    devDependencies: {
      ...pickVersions([
        ...(isTypeScript ? (['@astrojs/check', '@types/react', '@types/react-dom'] as const) : []),
        ...libraryDevPackages,
        ...TEST_PACKAGES,
      ]),
      ...(isTypeScript ? { typescript: TYPESCRIPT_RANGE } : {}),
    },
  }
  return `${JSON.stringify(packageJson, null, 2)}\n`
}

/** The files of the Astro app `facts` describe. */
function createFiles(facts: StarterFacts): StarterFile[] {
  const { isTypeScript, scheme } = facts
  const x = isTypeScript ? 'ts' : 'js'
  return [
    { path: 'package.json', content: createPackageJson(facts) },
    { path: `src/theme/themes.${x}`, content: createThemesSource({ isTypeScript, scheme }) },
    {
      path: `src/theme/Providers.${x}`,
      content: createProvidersSource({ isTypeScript, scheme, themesImport: './themes' }),
    },
    ...createTemplateFiles('astro', facts),
  ]
}

export const astroStarter: Starter = {
  title: 'Astro',
  label: 'Astro: HTML pages, with React islands',
  renderings: ['ssr', 'ssg'],
  hasLibraries: true,
  createFiles,
}
