import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { findGit } from './git'

/** The packages that left the `@soroush.design` scope for `@gild-ui`. */
export const MOVED = [
  'core',
  'react',
  'react-hooks',
  'react-markdown',
  'docs-content',
  'contract',
  'lab',
  'story-demo',
]

/**
 * A former package name or the former site address. The cli and the mcp server keep the old
 * scope, so a name is only a former one when it is followed by no more name characters.
 */
export const FORMER = new RegExp(
  `@soroush[.]design/(?:${MOVED.join('|')})(?![0-9A-Za-z_-])|docs[.]soroush[.]design`,
  'g'
)

/** What `read` finds of a package: the version in its manifest, or none. */
export type VersionOf = (directory: string) => string | undefined

const numbers = (version: string) => version.split('.').map(Number)

const isOlder = (version: string, current: string): boolean => {
  const [a, b] = [numbers(version), numbers(current)]
  const at = a.findIndex((part, index) => part !== b[index])
  return at !== -1 && a[at] < b[at]
}

/** Whether `file` is the release notes of a version older than its package's current one. */
export const isHistorical = (file: string, versionOf: VersionOf): boolean => {
  const match = /^packages\/([^/]+)\/release-notes\/(\d+\.\d+\.\d+)\.md$/.exec(file)
  if (!match) return false
  const current = versionOf(match[1])
  return current !== undefined && isOlder(match[2], current)
}

/** Every former name in `files`, as `file: name`, historical release notes apart. */
export const findFormerNames = (
  files: string[],
  read: (file: string) => string,
  versionOf: VersionOf
): string[] =>
  files
    .filter((file) => !isHistorical(file, versionOf))
    .flatMap((file) => [...read(file).matchAll(FORMER)].map(([name]) => `${file}: ${name}`))

/** The tracked files of the repository at `root`. */
export const trackedFiles = (root: string): string[] =>
  execFileSync(findGit(), ['ls-files', '-z'], { cwd: root, maxBuffer: 1 << 28 })
    .toString()
    .split('\0')
    .filter(Boolean)

/** The version of the package in `packages/<directory>`, or none when it has no manifest. */
export const manifestVersion = (root: string, directory: string): string | undefined => {
  try {
    return JSON.parse(readFileSync(join(root, 'packages', directory, 'package.json'), 'utf8'))
      .version
  } catch {
    return undefined
  }
}
