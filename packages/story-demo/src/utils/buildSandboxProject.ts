import { inferDependencies } from './inferDependencies'
import { tsToJs } from './tsToJs'

export interface SandboxFiles {
  [path: string]: { content: string | object }
}

export interface SandboxOptions {
  /** Which flavor of project to synthesize - the demo source must match. */
  language: 'ts' | 'js'
  /** Version pins for our own packages; unlisted imports ride at latest. */
  versions: Record<string, string>
  /** The react / react-dom pin for the sandbox package.json. */
  reactVersion: string
}

const INDEX_HTML = '<div id="root"></div>'

const INDEX_TSX = `import { createRoot } from 'react-dom/client'
import { ThemeProvider, baseTheme, createTheme } from '@soroush.tech/design-system/theme'
import Demo from './Demo'

const theme = createTheme(baseTheme, {})

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Demo />
  </ThemeProvider>
)
`

const TSCONFIG = {
  compilerOptions: {
    target: 'ES2020',
    lib: ['ES2022', 'DOM', 'DOM.Iterable'],
    module: 'ESNext',
    moduleResolution: 'bundler',
    jsx: 'react-jsx',
    strict: true,
    skipLibCheck: true,
    noEmit: true,
  },
  include: ['src'],
}

/**
 * An npm-safe slug for a Storybook title: `Fixtures/Sample` becomes `fixtures-sample`
 * and `Button (outlined)` becomes `button-outlined`. npm rejects a name carrying a
 * slash, a space, or parentheses, and the sandbox refuses the project with one.
 */
const slugifyTitle = (title: string): string =>
  title
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    // A single `-` on each edge: the collapse above leaves no two hyphens adjacent, so
    // `-+` would be an unbounded repeat that can never match more than one character.
    .replaceAll(/^-|-$/g, '') || 'story'

/**
 * A complete, self-contained React project for the sandbox define API: the demo's
 * source as src/Demo.tsx (or .jsx), an entry that mounts it under the base theme, and a
 * package.json whose dependencies are inferred from the demo's imports. In js mode the
 * entry is transpiled and the TypeScript layer is dropped entirely.
 */
export const buildSandboxProject = (
  title: string,
  source: string,
  options: SandboxOptions
): SandboxFiles => {
  const { language, versions, reactVersion } = options
  const extension = language === 'ts' ? 'tsx' : 'jsx'
  const indexSource = language === 'ts' ? INDEX_TSX : tsToJs(INDEX_TSX)
  const typescriptFiles: SandboxFiles =
    language === 'ts' ? { 'tsconfig.json': { content: TSCONFIG } } : {}
  const typescriptDevDependencies =
    language === 'ts'
      ? { typescript: 'latest', '@types/react': 'latest', '@types/react-dom': 'latest' }
      : {}
  return {
    'package.json': {
      content: {
        name: `${slugifyTitle(title)}-demo`,
        private: true,
        main: `src/index.${extension}`,
        dependencies: {
          ...inferDependencies(source, versions),
          ...inferDependencies(indexSource, versions),
          // Pinned last so the inferred 'latest' never wins for the react pair.
          react: reactVersion,
          'react-dom': reactVersion,
        },
        devDependencies: {
          'react-scripts': 'latest',
          ...typescriptDevDependencies,
        },
      },
    },
    ...typescriptFiles,
    'public/index.html': { content: INDEX_HTML },
    [`src/index.${extension}`]: { content: indexSource },
    [`src/Demo.${extension}`]: { content: source },
  }
}
