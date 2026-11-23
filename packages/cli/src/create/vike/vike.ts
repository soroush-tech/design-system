// The Vike starter: a React app on the design system, rendered as the developer picks. Its files
// are the templates in templates/vike/ (see templates/templates.md); this module adds what is
// computed: package.json, from the libraries picked, and the themes and Providers `init` writes
// too. The Vike wiring here is the one `init` reuses for an existing Vike app (#80).
import { APP_PACKAGE } from '../../designSystemPackage'
import { createProvidersSource, createThemesSource } from '../../templates/templates'
import type { Starter, StarterFacts, StarterFile } from '../starters'
import { createTemplateFiles } from '../template/starterFiles'
import { getLibraryPackages, pickVersions, TEST_PACKAGES, toRange } from '../versions'

function createPackageJson({
  packageName,
  isTypeScript,
  rendering,
  libraries,
  version,
}: StarterFacts): string {
  const { dependencies: libraryPackages, devDependencies: libraryDevPackages } =
    getLibraryPackages(libraries)
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
      test: 'vitest run',
    },
    dependencies: {
      [APP_PACKAGE]: toRange(version),
      ...pickVersions(['@umber-style/server', ...libraryPackages, 'react', 'react-dom', 'vike']),
    },
    devDependencies: pickVersions([
      '@vitejs/plugin-react',
      ...libraryDevPackages,
      ...TEST_PACKAGES,
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
  renderings: ['isomorphic', 'ssr', 'ssg'],
  hasLibraries: true,
  createFiles,
}
