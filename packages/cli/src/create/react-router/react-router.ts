// The React Router starter: a single-page React app on Gild UI, in React Router's data
// mode on Vite. Its files are the templates in templates/react-router/ (see templates/templates.md);
// this module adds what is computed: package.json, from the libraries picked, and the themes and
// Providers `init` writes too.
import { APP_PACKAGE, CORE_PACKAGE } from '../../designSystemPackage'
import { createProvidersSource, createThemesSource } from '../../templates/templates'
import type { Starter, StarterFacts, StarterFile } from '../starters'
import { createTemplateFiles } from '../template/starterFiles'
import { getLibraryPackages, pickVersions, TEST_PACKAGES, toRange } from '../versions'

function createPackageJson({
  packageName,
  isTypeScript,
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
      ...(isTypeScript ? { typecheck: 'tsc --noEmit' } : {}),
      test: 'vitest run',
    },
    dependencies: {
      [APP_PACKAGE]: toRange(version),
      [CORE_PACKAGE]: toRange(version),
      ...pickVersions([...libraryPackages, 'react', 'react-dom', 'react-router']),
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

/** The files of the React Router app `facts` describe. */
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
    ...createTemplateFiles('react-router', facts),
  ]
}

export const reactRouterStarter: Starter = {
  title: 'React Router',
  label: 'React Router: a single-page app, rendered in the browser',
  renderings: ['spa'],
  hasLibraries: true,
  createFiles,
}
