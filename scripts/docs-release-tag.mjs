// Finds the release tag the removed cd-docs.yml froze a docs section from. A section's tags are
// `<prefix><version>`, and the prefixes are listed in `sections.json` of docs-content, with the
// package's name. The current prefix is where the newest release is looked for; a former
// prefix (a package renamed) only supplies archived versions, so an old name's higher
// versions can never outrank a newer release under the current one.
//
//   node scripts/docs-release-tag.mjs <section>             the newest stable release
//   node scripts/docs-release-tag.mjs <section> <version>   the tag of that stable version
//
// Prints the tag, or nothing when there is none. Reads the tags of the repository it runs in.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compareSemver } from './canonicalize-docs-dist.mjs'

export const STABLE = /^\d+\.\d+\.\d+$/

const HERE = dirname(fileURLToPath(import.meta.url))
const SECTIONS_FILE = join(HERE, '..', 'packages', 'docs-content', 'src', 'sections.json')

/** What `sections.json` says of a section; throws on an id it does not list. */
export const readSection = (section, file = SECTIONS_FILE) => {
  const described = JSON.parse(readFileSync(file, 'utf8'))
  if (!Object.hasOwn(described, section)) throw new Error(`unknown docs section: ${section}`)
  return described[section]
}

/** The newest stable version released under one prefix, as its tag; undefined for none. */
const newestUnder = (prefix, tags) =>
  tags
    .filter((tag) => tag.startsWith(prefix) && STABLE.test(tag.slice(prefix.length)))
    .sort((a, b) => compareSemver(a.slice(prefix.length), b.slice(prefix.length)))
    .at(-1)

/**
 * The tag a section's docs are frozen from. Without a version, the newest release under the
 * current prefix. With one, that version's tag under the current prefix, else under a former
 * one - an archived version may have been released under an earlier name.
 */
export const releaseTag = (description, tags, version) => {
  const { tagPrefix, formerTagPrefixes } = description
  if (version === undefined) return newestUnder(tagPrefix, tags)
  return [tagPrefix, ...formerTagPrefixes]
    .map((prefix) => `${prefix}${version}`)
    .find((tag) => tags.includes(tag))
}

export const gitTags = () =>
  execFileSync('git', ['tag', '--list'], { encoding: 'utf8' }).split('\n').filter(Boolean)

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [section, version] = process.argv.slice(2)
  const tag = releaseTag(readSection(section), gitTags(), version)
  if (tag) console.log(tag)
}
