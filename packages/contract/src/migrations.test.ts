import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkMigrations, diskFiles, isBreaking, latestPublished, type Files } from './migrations'

const STEPS = 'packages/cli/src/migrate/steps'
const NOTES = 'packages/react/release-notes/0.2.0.md'
const SKILL = 'see .claude/skills/migrations/SKILL.md'

const SHIPPED: Record<string, string> = {
  [`${STEPS}/index.ts`]: "import { step } from './gild-ui-0.2.0'\nexport const STEPS = [step]",
  [`${STEPS}/gild-ui-0.2.0/index.ts`]:
    "export const step = {\n  to: { package: '@gild-ui/react', version: '0.2.0' },\n}",
  [`${STEPS}/gild-ui-0.2.0/fixtures/app/before/a.ts`]: '',
  [`${STEPS}/gild-ui-0.2.0/fixtures/app/after/a.ts`]: '',
  [`${STEPS}/gild-ui-0.2.0/fixtures/app/reports.json`]: '[]',
  [NOTES]: '## @gild-ui/react@0.2.0\n\n### Breaking\n\n- Renamed `a`: `migrate` does it.\n',
}

/** In-memory files: a path exists when it, or something under it, is in `tree`. */
const memory = (tree: Record<string, string>): Files => ({
  exists: (path) => Object.keys(tree).some((key) => key === path || key.startsWith(`${path}/`)),
  read: (path) => tree[path],
  list: (path) => [
    ...new Set(
      Object.keys(tree)
        .filter((key) => key.startsWith(`${path}/`))
        .map((key) => key.slice(path.length + 1).split('/')[0])
    ),
  ],
})
const without = (...prefixes: string[]) =>
  Object.fromEntries(
    Object.entries(SHIPPED).filter(([key]) => !prefixes.some((prefix) => key.startsWith(prefix)))
  )

describe('isBreaking', () => {
  it.each([
    ['0.2.0', '0.1.5', true],
    ['0.1.1', '0.1.0', false],
    ['1.0.0', '0.9.0', true],
    ['2.0.0', '1.4.0', true],
    ['1.1.0', '1.0.0', false],
    ['1.0.1', '1.0.0', false],
    ['0.1.0', '0.1.0', false],
    ['0.1.0', '0.2.0', false],
    ['1.0.0', '2.0.0', false],
    ['0.1.0', null, true],
  ])('%s after %s is %s', (version, published, expected) => {
    expect(isBreaking(version, published)).toBe(expected)
  })
})

describe('checkMigrations', () => {
  it('passes a bump that is not breaking, with nothing shipped', () => {
    expect(checkMigrations(memory({}), '0.1.1', '0.1.0')).toEqual([])
  })

  it('passes a breaking bump that ships its step, fixture and notes', () => {
    expect(checkMigrations(memory(SHIPPED), '0.2.0', '0.1.0')).toEqual([])
  })

  it('passes a first release with its step and no notes to check', () => {
    const tree = {
      [`${STEPS}/index.ts`]: "from './gild-ui-0.1.0'",
      [`${STEPS}/gild-ui-0.1.0/index.ts`]: "to: { package: 'x', version: '0.1.0' }",
      [`${STEPS}/gild-ui-0.1.0/fixtures/a/before/x`]: '',
      [`${STEPS}/gild-ui-0.1.0/fixtures/a/after/x`]: '',
      [`${STEPS}/gild-ui-0.1.0/fixtures/a/reports.json`]: '[]',
    }
    expect(checkMigrations(memory(tree), '0.1.0', null)).toEqual([])
  })

  it('names the missing step folder and its fixture', () => {
    const problems = checkMigrations(memory({ [NOTES]: SHIPPED[NOTES] }), '0.2.0', '0.1.0')
    expect(problems).toEqual([
      `${STEPS}/gild-ui-0.2.0/index.ts is missing - a breaking release ships its step (${SKILL})`,
      `${STEPS}/gild-ui-0.2.0/fixtures needs a fixture with before/, after/ and reports.json (${SKILL})`,
    ])
  })

  it('fails a step that is not registered, or that ends on another version', () => {
    const unregistered = { ...SHIPPED, [`${STEPS}/index.ts`]: 'export const STEPS = []' }
    expect(checkMigrations(memory(unregistered), '0.2.0', '0.1.0')).toEqual([
      `${STEPS}/index.ts does not register gild-ui-0.2.0 (${SKILL})`,
    ])
    expect(checkMigrations(memory(without(`${STEPS}/index.ts`)), '0.2.0', '0.1.0')).toHaveLength(1)
    const wrong = { ...SHIPPED, [`${STEPS}/gild-ui-0.2.0/index.ts`]: "to: { version: '0.3.0' }" }
    expect(checkMigrations(memory(wrong), '0.2.0', '0.1.0')).toEqual([
      `${STEPS}/gild-ui-0.2.0/index.ts does not end on to.version '0.2.0' (${SKILL})`,
    ])
  })

  it.each(['before/a.ts', 'after/a.ts', 'reports.json'])('fails a fixture without %s', (part) => {
    const tree = without(`${STEPS}/gild-ui-0.2.0/fixtures/app/${part}`)
    expect(checkMigrations(memory(tree), '0.2.0', '0.1.0')).toHaveLength(1)
  })

  it('fails notes that are missing or have no Breaking section', () => {
    expect(checkMigrations(memory(without(NOTES)), '0.2.0', '0.1.0')).toEqual([
      `${NOTES} is missing`,
    ])
    const plain = { ...SHIPPED, [NOTES]: '## x\n\n### Added\n\n- a\n' }
    expect(checkMigrations(memory(plain), '0.2.0', '0.1.0')).toEqual([
      `${NOTES} has no Breaking section - a breaking release lists what breaks`,
    ])
  })

  it('fails a Breaking item that says neither migrate nor by hand, and reads wrapped bullets', () => {
    const notes = [
      '## x',
      '### BREAKING CHANGES',
      '',
      '- `a` was renamed.',
      '- `b` moved; run `migrate`, or',
      '  do it by hand.',
      '* `c` is gone, by hand',
      '- an item that is long enough to be cut off in the message, so say nothing useful',
      '#### Detail',
      'text',
      '### Added',
      '- not breaking',
    ].join('\n')
    const said = `${NOTES}: a Breaking item says neither that migrate handles it nor what to do by hand:`
    expect(checkMigrations(memory({ ...SHIPPED, [NOTES]: notes }), '0.2.0', '0.1.0')).toEqual([
      `${said} - \`a\` was renamed.`,
      `${said} - an item that is long enough to be cut off in the message,`,
    ])
  })
})

describe('latestPublished', () => {
  const answer = (init: ResponseInit, body: unknown = {}) =>
    (async () => new Response(JSON.stringify(body), init)) as typeof fetch

  it('reads the version, null for a 404, undefined for any other failure or when offline', async () => {
    expect(await latestPublished('p', answer({ status: 200 }, { version: '1.2.3' }))).toBe('1.2.3')
    expect(await latestPublished('p', answer({ status: 404 }))).toBeNull()
    expect(await latestPublished('p', answer({ status: 500 }))).toBeUndefined()
    expect(
      await latestPublished('p', answer({ status: 200 }, { version: '1.2.3\nforged line' }))
    ).toBeUndefined()
    const offline = (async () => {
      throw new Error('offline')
    }) as typeof fetch
    expect(await latestPublished('p', offline)).toBeUndefined()
  })

  it('asks the registry through the global fetch by default', async () => {
    const real = globalThis.fetch
    globalThis.fetch = answer({ status: 200 }, { version: '9.9.9' })
    try {
      expect(await latestPublished('p')).toBe('9.9.9')
    } finally {
      globalThis.fetch = real
    }
  })
})

describe('diskFiles', () => {
  it('reads files and folders under a root', () => {
    const files = diskFiles(join(__dirname, '..'))
    expect(files.exists('package.json')).toBe(true)
    expect(files.exists('nope')).toBe(false)
    expect(files.read('package.json')).toContain('@gild-ui/contract')
    expect(files.list('src')).toContain('migrations.ts')
  })
})

describe('scripts/check-migrations.mjs', () => {
  it('passes for this repository, online or not', () => {
    const script = join(__dirname, '..', '..', '..', 'scripts', 'check-migrations.mjs')
    const run = spawnSync(process.execPath, [script], { encoding: 'utf8' })
    expect(run.status).toBe(0)
    expect(run.stdout + run.stderr).toMatch(/Migrations: |migration check skipped/)
  })
})
