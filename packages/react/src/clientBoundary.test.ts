// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import manifest from '../package.json'

// The library's components are server components or client components, and an app's bundler decides
// from the first line of each built file: `'use client'` makes the file, and what it exports, client
// code. This reads the build and holds it to the classification of `packages.md`:
//
// - a client entry starts with the directive, a server-capable entry does not;
// - no file that uses a client-only API lacks the directive, so no chunk a server component reaches
//   holds client code;
// - a server-capable entry reaches another client entry, which is a reference, and never a client
//   chunk of a hook or a context, which would be called or read on the server.
const dist = join(process.cwd(), 'dist')
const directive = '"use client";'

// The entries that need no client code: they render with props, the styling engine and the theme
// the app registered. The root and `engine` are barrels: they also re-export client names, which
// reach a server component as references.
const barrels = ['index', 'engine']
const serverEntries = [
  ...barrels,
  ...[
    'AppBar',
    'Backdrop',
    'Badge',
    'Card',
    'CircularProgress',
    'Fab',
    'Flex',
    'Grid',
    'Icon',
    'LinearProgress',
    'Link',
    'Paper',
    'Quote',
    'Skeleton',
    'Typography',
    'View',
    'catalog',
    'Global',
    'StyleSheet',
    'next',
    'server',
    'LayoutProvider',
    'ThemeProvider',
    'css',
    'keyframes',
    'styled',
    'useDefaultProps',
    'useStyle',
    'useTheme',
  ],
]
const entries = Object.keys(manifest.publishConfig.exports).map((subpath) =>
  subpath === '.' ? 'index' : subpath.slice(2)
)
const clientEntries = entries.filter((entry) => !serverEntries.includes(entry))

// What only a client component can use: React's state, effects, refs and context, a portal, our own
// hooks of those, and what the engine's server build lacks.
const clientApi = new RegExp(
  String.raw`\b(?:useState|useEffect|useLayoutEffect|useInsertionEffect|useRef|useReducer|useContext|useSyncExternalStore|useImperativeHandle|useTransition|useDeferredValue|createContext|createPortal|useMediaQuery|useThemeClass|CacheProvider|ThemeContext|ThemeScope)\b|@gild-ui/hooks/`
)
const withoutComments = (code: string) =>
  code.replaceAll(/\/\*[\s\S]*?\*\//g, '').replaceAll(/^\s*\/\/.*$/gm, '')

const imports = {
  '.mjs': /(?:from|import)\s+"(\.\/[^"]+\.mjs)"/g,
  '.cjs': /require\("(\.\/[^"]+\.cjs)"\)/g,
} as const

describe.each(['.mjs', '.cjs'] as const)('the %s build', (extension) => {
  const files = readdirSync(dist).filter((file) => file.endsWith(extension))
  const code = new Map(files.map((file) => [file, readFileSync(join(dist, file), 'utf8')]))
  const isClient = (file: string) => code.get(file)!.startsWith(directive)
  const reached = (file: string) =>
    [...code.get(file)!.matchAll(imports[extension])].map(([, specifier]) => specifier.slice(2))

  it.each(clientEntries)('starts the client entry %s with the directive', (entry) => {
    expect(isClient(entry + extension)).toBe(true)
  })

  it.each(serverEntries)(
    'does not start the server-capable entry %s with the directive',
    (entry) => {
      expect(isClient(entry + extension)).toBe(false)
    }
  )

  // A barrel names client exports (`useMediaQuery`, `CacheProvider`) only to re-export them.
  it('has the directive on every file that uses a client-only API', () => {
    const lacking = files.filter(
      (file) =>
        !barrels.includes(file.slice(0, -4)) &&
        clientApi.test(withoutComments(code.get(file)!)) &&
        !isClient(file)
    )
    expect(lacking).toEqual([])
  })

  it.each(serverEntries.filter((entry) => !barrels.includes(entry)))(
    'reaches from %s no client chunk but the entry of a client component',
    (entry) => {
      const seen = new Set<string>()
      const clientChunks: string[] = []
      const visit = (file: string) => {
        if (seen.has(file)) return
        seen.add(file)
        if (isClient(file)) {
          clientChunks.push(file)
          return
        }
        reached(file).forEach(visit)
      }
      visit(entry + extension)
      expect(clientChunks.filter((file) => !clientEntries.includes(file.slice(0, -4)))).toEqual([])
    }
  )

  it('leaves the engine to the app: the packages are imported, never bundled', () => {
    const everything = [...code.values()].join('\n')
    expect(everything).toContain(
      extension === '.mjs' ? 'from "@umber-style/react"' : 'require("@umber-style/react")'
    )
    expect(everything).not.toContain('There is no theme yet')
  })
})
