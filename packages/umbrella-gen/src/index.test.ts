import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  entryFile,
  hasDefaultExport,
  mountSubpath,
  planEntries,
  readLibrary,
  renderEntry,
  renderPackageJson,
  run,
  type ResolvedLibrary,
} from './index'

// Two fake libraries, one of each kind: components merged at the top, markdown under a name.
const components: ResolvedLibrary = {
  package: '@fake/react-components',
  entries: [
    { subpath: '.', hasDefault: false },
    { subpath: './Button', hasDefault: false },
    { subpath: './Table/TableCell', hasDefault: true },
  ],
}
const markdown: ResolvedLibrary = {
  package: '@fake/react-markdown',
  under: 'markdown',
  entries: [
    { subpath: '.', hasDefault: false },
    { subpath: './Editor', hasDefault: true },
  ],
}

describe('hasDefaultExport', () => {
  it.each([
    ['export default function Foo() {}', true],
    ['const a = 1\nexport default a', true],
    ["export { default } from './Foo'", true],
    ["export { default, Foo } from './Foo'", true],
    ["export { default as Foo } from './Foo'", false],
    ['export { Foo as default }', true],
    ['export { type Foo, Bar as default }', true],
    ["export type { Foo } from './Foo'", false],
    ["export * from './Foo'", false],
    ['// export default is not here\n * export default either', false],
  ])('%j -> %s', (source, expected) => {
    expect(hasDefaultExport(source)).toBe(expected)
  })
})

describe('mountSubpath', () => {
  it('keeps a subpath of a library merged at the top', () => {
    expect(mountSubpath('./Button')).toBe('./Button')
    expect(mountSubpath('.')).toBe('.')
  })

  it('puts a library under its name', () => {
    expect(mountSubpath('.', 'markdown')).toBe('./markdown')
    expect(mountSubpath('./Editor', 'markdown')).toBe('./markdown/Editor')
  })
})

describe('planEntries', () => {
  it('merges the top library and mounts the other under its name, root first', () => {
    const hooks: ResolvedLibrary = {
      package: '@fake/react-hooks',
      under: 'hooks',
      entries: [{ subpath: '.', hasDefault: false }],
    }
    expect(
      planEntries([markdown, components, hooks]).map(({ subpath, target, hasDefault }) => [
        subpath,
        target,
        hasDefault,
      ])
    ).toEqual([
      ['.', '@fake/react-components', false],
      ['./Button', '@fake/react-components/Button', false],
      ['./Table/TableCell', '@fake/react-components/Table/TableCell', true],
      ['./hooks', '@fake/react-hooks', false],
      ['./markdown', '@fake/react-markdown', false],
      ['./markdown/Editor', '@fake/react-markdown/Editor', true],
    ])
  })

  it('fails when two libraries claim a name, naming both', () => {
    const clash: ResolvedLibrary = {
      package: '@fake/react-theme',
      entries: [{ subpath: './Button', hasDefault: false }],
    }
    expect(() => planEntries([components, clash])).toThrow(
      '@fake/react-components and @fake/react-theme both claim "./Button".'
    )
  })

  it('fails when a library mounted under a name meets a subpath of another', () => {
    const theme: ResolvedLibrary = {
      package: '@fake/react-theme',
      under: 'theme',
      entries: [{ subpath: '.', hasDefault: false }],
    }
    const withTheme: ResolvedLibrary = {
      package: '@fake/react-components',
      entries: [{ subpath: './theme', hasDefault: false }],
    }
    expect(() => planEntries([withTheme, theme])).toThrow(
      '@fake/react-components and @fake/react-theme both claim "./theme".'
    )
  })

  it('fails when two names differ only by case', () => {
    const editor: ResolvedLibrary = {
      package: '@fake/react-editor',
      entries: [{ subpath: './Markdown', hasDefault: false }],
    }
    expect(() => planEntries([editor, markdown])).toThrow(
      '@fake/react-editor and @fake/react-markdown both claim "./markdown" (it differs from "./Markdown" only by case).'
    )
  })

  describe('omit', () => {
    // A theme library whose style entry the component library also holds.
    const theme: ResolvedLibrary = {
      package: '@fake/react-theme',
      omit: ['.'],
      entries: [
        { subpath: '.', hasDefault: false },
        { subpath: './style', hasDefault: false },
      ],
    }
    const withStyle: ResolvedLibrary = {
      ...components,
      omit: ['./style'],
      entries: [...components.entries, { subpath: './style', hasDefault: false }],
    }

    it('takes a name two libraries hold from the one that does not omit it', () => {
      const entries = planEntries([theme, withStyle])
      expect(entries.map(({ subpath }) => subpath)).toEqual([
        '.',
        './Button',
        './Table/TableCell',
        './style',
      ])
      expect(entries.find(({ subpath }) => subpath === '.')?.library).toBe('@fake/react-components')
      expect(entries.find(({ subpath }) => subpath === './style')?.target).toBe(
        '@fake/react-theme/style'
      )
    })

    it('mounts an omitted name where its library is mounted', () => {
      const mounted = { ...markdown, omit: ['.'] }
      const other: ResolvedLibrary = {
        package: '@fake/other',
        under: 'markdown',
        entries: [{ subpath: '.', hasDefault: false }],
      }
      expect(planEntries([mounted, other]).map(({ target }) => target)).toEqual([
        '@fake/other',
        '@fake/react-markdown/Editor',
      ])
    })

    it('fails when an omitted entry point is not one the library publishes', () => {
      expect(() => planEntries([{ ...components, omit: ['./Missing'] }])).toThrow(
        '@fake/react-components: omits "./Missing", which is not one of its entry points.'
      )
    })

    it('fails when no other library serves an omitted entry point', () => {
      expect(() => planEntries([{ ...theme, omit: ['.', './style'] }, components])).toThrow(
        'no other library serves "./style"'
      )
      expect(() => planEntries([{ ...theme, omit: ['./style'] }])).toThrow(
        '@fake/react-theme: omits "./style" but no other library serves "./style".'
      )
    })
  })

  it('fails when a library is mounted under a name that is not lowercase', () => {
    expect(() => planEntries([{ ...markdown, under: 'Markdown' }])).toThrow(
      '@fake/react-markdown: "Markdown" is not a lowercase name'
    )
  })
})

// The family umbrella: its sources are platform umbrellas, each mounted under the platform's name.
describe('planEntries of platforms', () => {
  const react: ResolvedLibrary = {
    package: '@fake/react',
    under: 'react',
    entries: [
      { subpath: '.', hasDefault: false },
      { subpath: './Button', hasDefault: false },
      { subpath: './markdown/Editor', hasDefault: true },
    ],
  }
  const reactNative: ResolvedLibrary = {
    package: '@fake/react-native',
    under: 'react-native',
    entries: [
      { subpath: '.', hasDefault: false },
      { subpath: './Button', hasDefault: false },
    ],
  }

  it('mounts the root of a platform and each of its entry points under its name, with no root of its own', () => {
    expect(
      planEntries([reactNative, react]).map(({ subpath, target, hasDefault }) => [
        subpath,
        target,
        hasDefault,
      ])
    ).toEqual([
      ['./react', '@fake/react', false],
      ['./react-native', '@fake/react-native', false],
      ['./react-native/Button', '@fake/react-native/Button', false],
      ['./react/Button', '@fake/react/Button', false],
      ['./react/markdown/Editor', '@fake/react/markdown/Editor', true],
    ])
  })

  it('fails when two platforms are mounted under one name, naming both', () => {
    expect(() => planEntries([react, { ...reactNative, under: 'react' }])).toThrow(
      '@fake/react and @fake/react-native both claim "./react".'
    )
  })

  it('fails when a platform has an entry point that differs from another only by case', () => {
    const vue: ResolvedLibrary = {
      package: '@fake/vue',
      under: 'react',
      entries: [{ subpath: './button', hasDefault: false }],
    }
    expect(() =>
      planEntries([{ ...react, entries: [{ subpath: './Button', hasDefault: false }] }, vue])
    ).toThrow(
      '@fake/react and @fake/vue both claim "./react/button" (it differs from "./react/Button" only by case).'
    )
  })

  it('fails when a platform is mounted under a name that is not lowercase', () => {
    expect(() => planEntries([{ ...react, under: 'React' }])).toThrow(
      '@fake/react: "React" is not a lowercase name'
    )
  })
})

describe('rendering', () => {
  const [root, button, cell] = planEntries([components])

  it('names the file of an entry point', () => {
    expect(entryFile('.')).toBe('index.ts')
    expect(entryFile('./Button')).toBe('Button.ts')
    expect(entryFile('./markdown/Editor')).toBe('markdown/Editor.ts')
  })

  it('re-exports the target, and its default only when it has one', () => {
    expect(renderEntry(root)).toBe("export * from '@fake/react-components'\n")
    expect(renderEntry(button)).toBe("export * from '@fake/react-components/Button'\n")
    expect(renderEntry(cell)).toBe(
      "export * from '@fake/react-components/Table/TableCell'\nexport { default } from '@fake/react-components/Table/TableCell'\n"
    )
  })

  it('writes source in exports and dist in publishConfig, keeping the rest of package.json', () => {
    const manifest = JSON.parse(
      renderPackageJson('{ "name": "@fake/react", "version": "1.2.3" }', [root, cell])
    )
    expect(manifest.name).toBe('@fake/react')
    expect(manifest.exports).toEqual({
      '.': './src/index.ts',
      './Table/TableCell': './src/Table/TableCell.ts',
    })
    expect(manifest.types).toBe('./src/index.ts')
    expect(manifest.publishConfig.exports['./Table/TableCell']).toEqual({
      import: {
        types: './dist/Table/TableCell.d.mts',
        default: './dist/Table/TableCell.mjs',
      },
      require: {
        types: './dist/Table/TableCell.d.cts',
        default: './dist/Table/TableCell.cjs',
      },
    })
    expect(manifest.publishConfig.exports['.'].import.default).toBe('./dist/index.mjs')
    expect(manifest.publishConfig.typesVersions).toEqual({ '*': { '*': ['./dist/*.d.cts'] } })
  })

  it('leaves out main, module and types when the umbrella has no root entry point', () => {
    const family = planEntries([{ ...components, under: 'react' }])
    const manifest = JSON.parse(
      renderPackageJson('{ "name": "fake", "types": "./src/index.ts" }', family)
    )
    expect(Object.keys(manifest.exports)).toEqual([
      './react',
      './react/Button',
      './react/Table/TableCell',
    ])
    expect(manifest.types).toBeUndefined()
    expect(Object.keys(manifest.publishConfig).sort()).toEqual([
      'access',
      'exports',
      'typesVersions',
    ])
    expect(manifest.publishConfig.exports['./react'].import.default).toBe('./dist/react.mjs')
    expect(manifest.publishConfig.exports['./react/Button'].require.types).toBe(
      './dist/react/Button.d.cts'
    )
  })
})

describe('on disk', () => {
  let root: string
  const write = (file: string, content: string) => {
    mkdirSync(dirname(join(root, file)), { recursive: true })
    writeFileSync(join(root, file), content)
  }
  const read = (file: string) => readFileSync(join(root, file), 'utf8')

  const fakeLibrary = (name: string, manifest: object, sources: Record<string, string>) => {
    write(`node_modules/${name}/package.json`, JSON.stringify(manifest))
    for (const [file, source] of Object.entries(sources)) {
      write(`node_modules/${name}/${file}`, source)
    }
  }

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'umbrella-'))
    write(
      'package.json',
      JSON.stringify({ name: '@fake/umbrella', dependencies: { '@fake/react-components': '1' } })
    )
    fakeLibrary(
      '@fake/react-components',
      {
        exports: {
          '.': './src/index.ts',
          './Button': './src/Button/index.ts',
          './package.json': './package.json',
          './Local': './src/Local.ts',
          './Table/Cell': './src/Table/Cell.ts',
        },
        publishConfig: {
          exports: {
            '.': {},
            './Button': {},
            './Table/Cell': {},
            './package.json': './package.json',
          },
        },
      },
      {
        'src/index.ts': 'export {}',
        'src/Button/index.ts': 'export default function Button() {}',
        'src/Table/Cell.ts': 'export {}',
      }
    )
  })

  afterEach(() => rmSync(root, { recursive: true, force: true }))

  const options = (check: boolean) => ({
    root,
    libraries: [{ package: '@fake/react-components' }],
    check,
  })

  it('reads what a library publishes, not what its workspace exports', () => {
    expect(readLibrary({ package: '@fake/react-components' }, root).entries).toEqual([
      { subpath: '.', hasDefault: false },
      { subpath: './Button', hasDefault: true },
      { subpath: './Table/Cell', hasDefault: false },
    ])
  })

  it('falls back to exports for a library with no publishConfig', () => {
    fakeLibrary(
      '@fake/react-plain',
      { exports: { '.': './index.ts', './package.json': './package.json' } },
      { 'index.ts': 'export {}' }
    )
    expect(readLibrary({ package: '@fake/react-plain' }, root).entries).toEqual([
      { subpath: '.', hasDefault: false },
    ])
  })

  it('refuses a pattern, which cannot be listed', () => {
    fakeLibrary('@fake/react-pattern', { exports: { './*': './src/*.ts' } }, {})
    expect(() => readLibrary({ package: '@fake/react-pattern' }, root)).toThrow(
      '"./*" is a pattern'
    )
  })

  it('refuses an entry that is published without a source file', () => {
    fakeLibrary(
      '@fake/react-broken',
      { exports: { '.': './index.ts' }, publishConfig: { exports: { './Gone': {} } } },
      {}
    )
    expect(() => readLibrary({ package: '@fake/react-broken' }, root)).toThrow(
      '"./Gone" is published but has no source file'
    )
  })

  it('writes the entry points, then finds nothing to change', () => {
    const written = run(options(false))
    expect(written.problems).toEqual([])
    expect(written.summary).toBe('Wrote 4 files; 3 entry points from 1 library package(s).')
    expect(read('src/index.ts')).toBe("export * from '@fake/react-components'\n")
    expect(read('src/Button.ts')).toBe(
      "export * from '@fake/react-components/Button'\nexport { default } from '@fake/react-components/Button'\n"
    )
    expect(Object.keys(JSON.parse(read('package.json')).exports)).toEqual([
      '.',
      './Button',
      './Table/Cell',
    ])

    expect(run(options(true))).toEqual({
      problems: [],
      summary: 'Up to date: 3 entry points from 1 library package(s).',
    })
  })

  it('reports drift under --check without writing', () => {
    run(options(false))
    fakeLibrary(
      '@fake/react-components',
      {
        exports: { '.': './src/index.ts', './Button': './src/Button/index.ts', './Card': './c.ts' },
        publishConfig: { exports: { '.': {}, './Button': {}, './Card': {} } },
      },
      { 'src/index.ts': 'export {}', 'src/Button/index.ts': 'export {}', 'c.ts': 'export {}' }
    )
    write('src/Orphan.ts', 'export const a = 1\n')

    const checked = run(options(true))
    expect(checked.problems).toEqual([
      'package.json is out of date.',
      'src/Button.ts is out of date.',
      'src/Card.ts is out of date.',
      'src/Orphan.ts is not an entry point of any library.',
      'src/Table/Cell.ts is not an entry point of any library.',
      'Run `pnpm gen:umbrellas` and commit what it writes.',
    ])
    expect(checked.summary).toBe('The umbrella has drifted from its libraries.')
    expect(read('src/Orphan.ts')).toBe('export const a = 1\n')

    run(options(false))
    expect(read('src/Card.ts')).toBe("export * from '@fake/react-components/Card'\n")
    expect(run(options(true)).problems).toEqual([])
    expect(() => read('src/Orphan.ts')).toThrow()
  })

  describe('a platform umbrella as a source', () => {
    const platform = (entries: Record<string, string>) =>
      fakeLibrary(
        '@fake/react',
        {
          exports: Object.fromEntries(Object.keys(entries).map((key) => [key, `./src/${key}.ts`])),
          publishConfig: { exports: Object.fromEntries(Object.keys(entries).map((k) => [k, {}])) },
        },
        Object.fromEntries(
          Object.entries(entries).map(([key, source]) => [`src/${key}.ts`, source])
        )
      )
    const family = (check: boolean) => ({
      root,
      libraries: [{ package: '@fake/react', under: 'react' }],
      check,
    })

    beforeEach(() => {
      write(
        'package.json',
        JSON.stringify({
          name: 'fake-family',
          types: './src/index.ts',
          dependencies: { '@fake/react': '1' },
        })
      )
      platform({
        './Button': "export * from '@fake/react-components/Button'",
        './Table': "export * from '@fake/x'\nexport { default } from '@fake/x'",
      })
    })

    it('mounts the platform under its name, with no root, and keeps the default of an entry', () => {
      expect(run(family(false)).summary).toBe(
        'Wrote 3 files; 2 entry points from 1 library package(s).'
      )
      expect(read('src/react/Button.ts')).toBe("export * from '@fake/react/Button'\n")
      expect(read('src/react/Table.ts')).toBe(
        "export * from '@fake/react/Table'\nexport { default } from '@fake/react/Table'\n"
      )
      const manifest = JSON.parse(read('package.json'))
      expect(Object.keys(manifest.exports)).toEqual(['./react/Button', './react/Table'])
      expect(manifest.types).toBeUndefined()
      expect(manifest.publishConfig.main).toBeUndefined()
      expect(run(family(true)).problems).toEqual([])
    })

    it('drifts when the platform gains an entry point', () => {
      run(family(false))
      platform({
        './Button': "export * from '@fake/react-components/Button'",
        './Table': "export * from '@fake/x'",
        './Card': "export * from '@fake/y'",
      })
      expect(run(family(true)).problems).toEqual([
        'package.json is out of date.',
        'src/react/Card.ts is out of date.',
        'src/react/Table.ts is out of date.',
        'Run `pnpm gen:umbrellas` and commit what it writes.',
      ])
    })
  })

  it('asks for the dependency of a library it is given', () => {
    const result = run({ ...options(true), libraries: [{ package: '@fake/react-markdown' }] })
    expect(result.problems).toEqual([
      '@fake/react-markdown is in libraries.ts but not in "dependencies".',
    ])
  })

  it('asks for it too when package.json has no dependencies at all', () => {
    write('package.json', '{ "name": "@fake/umbrella" }')
    expect(run(options(true)).problems).toEqual([
      '@fake/react-components is in libraries.ts but not in "dependencies".',
    ])
  })

  describe('an optional library', () => {
    const peer = { '@fake/react-markdown': '^0.1.0' }
    const optionalPeer = { '@fake/react-markdown': { optional: true } }
    const libraries = [
      { package: '@fake/react-components' },
      { package: '@fake/react-markdown', under: 'markdown', optional: true },
    ]
    const withManifest = (manifest: object, check = true) => {
      write(
        'package.json',
        JSON.stringify({
          name: '@fake/umbrella',
          dependencies: { '@fake/react-components': '1' },
          ...manifest,
        })
      )
      return run({ ...options(check), libraries })
    }

    beforeEach(() => {
      fakeLibrary(
        '@fake/react-markdown',
        {
          exports: { '.': './src/index.ts', './Editor': './src/Editor.ts' },
          publishConfig: { exports: { '.': {}, './Editor': {} } },
        },
        { 'src/index.ts': 'export {}', 'src/Editor.ts': 'export {}' }
      )
    })

    it('is an optional peer, and a dev dependency the workspace reads it from', () => {
      const manifest = {
        peerDependencies: peer,
        peerDependenciesMeta: optionalPeer,
        devDependencies: { '@fake/react-markdown': 'workspace:*' },
      }
      expect(withManifest(manifest, false)).toEqual({
        problems: [],
        summary: 'Wrote 6 files; 5 entry points from 2 library package(s).',
      })
      expect(read('src/markdown/Editor.ts')).toBe("export * from '@fake/react-markdown/Editor'\n")
      expect(JSON.parse(read('package.json')).peerDependenciesMeta).toEqual(optionalPeer)
      expect(run({ ...options(true), libraries }).summary).toBe(
        'Up to date: 5 entry points from 2 library package(s).'
      )
    })

    it('is not a dependency, which would install it for every app', () => {
      expect(
        withManifest({
          dependencies: { '@fake/react-components': '1', '@fake/react-markdown': '1' },
        }).problems
      ).toEqual([
        '@fake/react-markdown is optional in libraries.ts, so it is a peer and not in "dependencies".',
      ])
    })

    it.each([
      ['no peer at all', { peerDependenciesMeta: optionalPeer }],
      ['a peer that is not marked optional', { peerDependencies: peer }],
      [
        'a peer whose meta says nothing',
        { peerDependencies: peer, peerDependenciesMeta: { '@fake/react-markdown': {} } },
      ],
    ])('is an optional peer, not %s', (_name, manifest) => {
      expect(withManifest(manifest).problems).toEqual([
        '@fake/react-markdown is optional in libraries.ts but not an optional peer ("peerDependencies" and "peerDependenciesMeta").',
      ])
    })

    it('is a dev dependency too, for the workspace to read it', () => {
      expect(
        withManifest({ peerDependencies: peer, peerDependenciesMeta: optionalPeer }).problems
      ).toEqual([
        '@fake/react-markdown is optional in libraries.ts but not in "devDependencies", which is where the workspace reads it.',
      ])
    })
  })
})
