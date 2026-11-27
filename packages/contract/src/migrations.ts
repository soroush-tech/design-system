import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/** The package whose `latest` on npm says what the family has released. */
export const FAMILY_PACKAGE = '@gild-ui/react'

const STEPS_DIR = 'packages/cli/src/migrate/steps'
const MENTION = 'see .claude/skills/migrations/SKILL.md'
const HANDLED = /migrate|by hand/

/** The files the check reads, by path from the repository root. */
export interface Files {
  exists: (path: string) => boolean
  read: (path: string) => string
  /** The names in a folder, sorted. */
  list: (path: string) => string[]
}

/** `Files` on disk under `root`. */
export const diskFiles = (root: string): Files => ({
  exists: (path) => existsSync(join(root, path)),
  read: (path) => readFileSync(join(root, path), 'utf8'),
  list: (path) => readdirSync(join(root, path)).sort(),
})

const parts = (version: string) => version.split('-')[0].split('.').map(Number)

/**
 * Whether going from `published` (`null`: nothing on npm yet) to `version` breaks apps: the major
 * grows, or below 1.0.0 the minor grows. A first release breaks the apps on
 * `@soroush.tech/design-system` 2.x that it replaces.
 */
export const isBreaking = (version: string, published: string | null): boolean => {
  if (published === null) return true
  const [major, minor] = parts(version)
  const [publishedMajor, publishedMinor] = parts(published)
  if (major !== publishedMajor) return major > publishedMajor
  return major === 0 && minor > publishedMinor
}

/** What is missing, as messages, for the step of `version`. */
const checkStep = (files: Files, version: string): string[] => {
  const id = `gild-ui-${version}`
  const folder = `${STEPS_DIR}/${id}`
  const problems: string[] = []
  if (files.exists(`${folder}/index.ts`)) {
    const escaped = version.replaceAll('.', String.raw`\.`)
    if (
      !new RegExp(`to:\\s*\\{[^}]*version:\\s*'${escaped}'`).test(files.read(`${folder}/index.ts`))
    ) {
      problems.push(`${folder}/index.ts does not end on to.version '${version}' (${MENTION})`)
    }
    const registry = files.exists(`${STEPS_DIR}/index.ts`)
      ? files.read(`${STEPS_DIR}/index.ts`)
      : ''
    if (!registry.includes(`'./${id}'`)) {
      problems.push(`${STEPS_DIR}/index.ts does not register ${id} (${MENTION})`)
    }
  } else {
    problems.push(`${folder}/index.ts is missing - a breaking release ships its step (${MENTION})`)
  }
  const fixtures = files.exists(`${folder}/fixtures`) ? files.list(`${folder}/fixtures`) : []
  const complete = fixtures.some((name) =>
    ['before', 'after', 'reports.json'].every((part) =>
      files.exists(`${folder}/fixtures/${name}/${part}`)
    )
  )
  if (!complete) {
    problems.push(
      `${folder}/fixtures needs a fixture with before/, after/ and reports.json (${MENTION})`
    )
  }
  return problems
}

/** The bullets of the notes' Breaking section; `null` when there is no such section. */
const breakingBullets = (notes: string): string[] | null => {
  const lines = notes.split(/\r?\n/)
  const start = lines.findIndex((line) => /^#{2,6}\s+.*breaking/i.test(line))
  if (start === -1) return null
  const level = /^#+/.exec(lines[start])![0].length
  const bullets: string[] = []
  for (const line of lines.slice(start + 1)) {
    const heading = /^(#+)\s/.exec(line)
    if (heading && heading[1].length <= level) break
    if (/^\s*[-*]\s/.test(line)) bullets.push(line)
    else if (bullets.length > 0 && line.trim() !== '') bullets[bullets.length - 1] += ` ${line}`
  }
  return bullets
}

/** What is wrong with the Breaking section of the notes in `file`. */
const checkNotes = (files: Files, file: string): string[] => {
  if (!files.exists(file)) return [`${file} is missing`]
  const bullets = breakingBullets(files.read(file))
  if (bullets === null) {
    return [`${file} has no Breaking section - a breaking release lists what breaks`]
  }
  return bullets
    .filter((bullet) => !HANDLED.test(bullet))
    .map(
      (bullet) =>
        `${file}: a Breaking item says neither that migrate handles it nor what to do by hand: ${bullet.trim().slice(0, 60).trimEnd()}`
    )
}

/**
 * The problems of releasing `version` of the family when npm has `published` (`null`: never
 * published). A breaking release needs its migrate step, registered, with a fixture, and notes
 * whose Breaking items each say `migrate` or `by hand`. The first release has nothing to break
 * inside Gild UI, so its notes are exempt.
 */
export const checkMigrations = (
  files: Files,
  version: string,
  published: string | null
): string[] => {
  if (!isBreaking(version, published)) return []
  const problems = checkStep(files, version)
  if (published !== null) {
    problems.push(...checkNotes(files, `packages/react/release-notes/${version}.md`))
  }
  return problems
}

/** `latest` of `name` on npm; `null` when never published, `undefined` when the registry failed. */
export const latestPublished = async (
  name: string,
  fetcher: typeof fetch = fetch
): Promise<string | null | undefined> => {
  try {
    const response = await fetcher(`https://registry.npmjs.org/${name}/latest`, {
      signal: AbortSignal.timeout(5000),
    })
    if (response.status === 404) return null
    if (!response.ok) return undefined
    return ((await response.json()) as { version: string }).version
  } catch {
    return undefined
  }
}
