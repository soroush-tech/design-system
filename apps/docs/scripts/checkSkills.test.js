import { describe, it, expect, afterEach, vi } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  checkSkills,
  readFrontmatter,
  reportSkills,
  INTERNAL_DIR,
  PUBLIC_DIR,
} from '../../../scripts/check-skills.mjs'

// The check reads the repository root: its tests build a small tree of that shape in a temporary
// folder.
const SCRIPT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../scripts/check-skills.mjs')
const roots = []
afterEach(() => {
  while (roots.length) rmSync(roots.pop(), { recursive: true, force: true })
})

const skill = (fields) => `---\n${fields.join('\n')}\n---\n\n# Skill\n`
const INTERNAL = (name) =>
  skill([`name: ${name}`, 'description: d', 'metadata:', '  internal: true'])
const PUBLIC = (name) => skill([`name: ${name}`, 'description: d'])

const tree = (files) => {
  const root = mkdtempSync(join(tmpdir(), 'skills-'))
  roots.push(root)
  for (const [path, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true })
    if (body !== null) writeFileSync(join(root, path), body)
  }
  return root
}

// A repository as it should be: two internal skills and the public skills.
const clean = (overrides = {}) =>
  tree({
    [`${INTERNAL_DIR}/commit/SKILL.md`]: INTERNAL('commit'),
    [`${INTERNAL_DIR}/vike/SKILL.md`]: INTERNAL("'vike'"),
    [`${PUBLIC_DIR}/soroush-design-system/SKILL.md`]: PUBLIC('soroush-design-system'),
    [`${PUBLIC_DIR}/wcag/SKILL.md`]: PUBLIC('wcag'),
    ...overrides,
  })

describe('readFrontmatter', () => {
  it('reads the top-level keys and the keys of the metadata block', () => {
    expect(
      readFrontmatter(
        skill([
          'name: a',
          'allowed-tools:',
          '  - Read',
          'metadata:',
          '  internal: true',
          'paths: x',
        ])
      )
    ).toEqual({ name: 'a', 'allowed-tools': '', paths: 'x', metadata: { internal: 'true' } })
  })

  it('reads a file written with Windows line endings', () => {
    expect(readFrontmatter('---\r\nname: a\r\n---\r\n').name).toBe('a')
  })

  it('skips lines that are not a key and a value, and indented keys outside the metadata block', () => {
    expect(
      readFrontmatter(
        skill(['name: a', 'just text', 'bad key: x', 'tags:', '  internal: true', 'paths: b: c'])
      )
    ).toEqual({ name: 'a', tags: '', paths: 'b: c', metadata: {} })
  })

  it('finds no frontmatter without an opening or a closing fence', () => {
    expect(readFrontmatter('# Title\n')).toBeNull()
    expect(readFrontmatter('---\nname: a\n')).toBeNull()
  })
})

describe('checkSkills', () => {
  it('passes a repository with internal skills marked and only the public skills in the plugin', () => {
    expect(checkSkills(clean())).toEqual([])
  })

  it('names an internal skill that is not marked internal, or has no name', () => {
    const root = clean({
      [`${INTERNAL_DIR}/commit/SKILL.md`]: skill(['description: d']),
    })
    expect(checkSkills(root)).toEqual([
      '.claude/skills/commit/SKILL.md has no name.',
      '.claude/skills/commit/SKILL.md is not marked internal (metadata.internal: true).',
    ])
  })

  it('names a skill folder without its SKILL.md, or a SKILL.md without frontmatter', () => {
    const root = clean({
      [`${INTERNAL_DIR}/empty/notes.md`]: 'x',
      [`${INTERNAL_DIR}/plain/SKILL.md`]: '# No frontmatter\n',
    })
    expect(checkSkills(root)).toEqual([
      '.claude/skills/empty/SKILL.md is missing.',
      '.claude/skills/plain/SKILL.md has no frontmatter.',
    ])
  })

  it('names a skill in the plugin that is not a public one - an outside copy written back', () => {
    const root = clean({ [`${PUBLIC_DIR}/vike/SKILL.md`]: INTERNAL('vike') })
    expect(checkSkills(root)).toEqual([
      'plugins/soroush-design-system/skills/vike is not a public skill; only soroush-design-system, wcag.',
    ])
  })

  it('names a public skill when it is missing, misnamed, undescribed or marked internal', () => {
    expect(checkSkills(tree({ [`${INTERNAL_DIR}/commit/SKILL.md`]: INTERNAL('commit') }))).toEqual([
      'plugins/soroush-design-system/skills/soroush-design-system is missing.',
      'plugins/soroush-design-system/skills/wcag is missing.',
    ])
    const where = 'plugins/soroush-design-system/skills/soroush-design-system/SKILL.md'
    const root = clean({
      [`${PUBLIC_DIR}/soroush-design-system/SKILL.md`]: skill([
        "name: 'other'",
        'metadata:',
        '  internal: true',
      ]),
    })
    expect(checkSkills(root)).toEqual([
      `${where} must be named soroush-design-system.`,
      `${where} has no description.`,
      `${where} is public and must not be marked internal.`,
    ])
  })

  it('reads a quoted name on the public skill as its plain name', () => {
    const root = clean({
      [`${PUBLIC_DIR}/soroush-design-system/SKILL.md`]: skill([
        'name: "soroush-design-system"',
        'description: d',
      ]),
    })
    expect(checkSkills(root)).toEqual([])
  })

  it('stops at a public skill folder without frontmatter', () => {
    const root = clean({ [`${PUBLIC_DIR}/soroush-design-system/SKILL.md`]: '# Plain\n' })
    expect(checkSkills(root)).toEqual([
      `${PUBLIC_DIR}/soroush-design-system/SKILL.md has no frontmatter.`,
    ])
  })

  it('passes this repository', () => {
    expect(checkSkills(resolve(dirname(SCRIPT), '..'))).toEqual([])
  })
})

describe('check-skills from the command line', () => {
  // Each run imports the script afresh, so its command-line branch runs again.
  let runs = 0
  const run = async (args = []) => {
    const argv = process.argv
    process.argv = [argv[0], SCRIPT, ...args]
    try {
      runs += 1
      await import(`${pathToFileURL(SCRIPT).href}?cli=${runs}`)
    } finally {
      process.argv = argv
    }
  }

  afterEach(() => {
    process.exitCode = undefined
    vi.restoreAllMocks()
  })

  it('reports the skills and leaves the exit code alone when all is well', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    await run()
    expect(log).toHaveBeenCalledWith(
      'Skills: soroush-design-system, wcag public, the rest internal.'
    )
    expect(process.exitCode).toBeUndefined()
  })

  it('checks this repository whatever arguments it is given', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    await run([clean({ [`${PUBLIC_DIR}/vike/SKILL.md`]: INTERNAL('vike') })])
    expect(log).toHaveBeenCalledWith(
      'Skills: soroush-design-system, wcag public, the rest internal.'
    )
    expect(process.exitCode).toBeUndefined()
  })

  it('prints each problem and fails when something drifted', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    reportSkills(clean({ [`${PUBLIC_DIR}/vike/SKILL.md`]: INTERNAL('vike') }))
    expect(error).toHaveBeenCalledWith(
      'plugins/soroush-design-system/skills/vike is not a public skill; only soroush-design-system, wcag.'
    )
    expect(process.exitCode).toBe(1)
  })
})
