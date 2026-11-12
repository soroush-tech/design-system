// Keeps `npx skills add soroush-tech/design-system` offering our public skills and nothing else.
// That tool reads `.claude/skills/` and the plugin's `skills/` folder (through
// `.claude-plugin/marketplace.json`), and hides a skill whose frontmatter has `metadata.internal`.
//
// 1. Every skill in `.claude/skills/` is for working on this repository: it has a `name` and is
//    marked internal. Without a `name` the tool skips it with a warning that shows our paths.
// 2. The plugin's `skills/` folder holds exactly the public skills, each with a `name` that matches
//    its folder and a `description`, and none marked internal.
//
// An outside update command (Vike's) has already rewritten files here once, which is why this is
// a check and not a one-time edit. Run by the pre-commit hook and the CI lint job:
// `pnpm check:skills`.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

export const INTERNAL_DIR = '.claude/skills'
export const PUBLIC_DIR = 'plugins/soroush-design-system/skills'
export const PUBLIC_SKILLS = ['soroush-design-system', 'wcag']

const KEY = /^[\w-]+$/

/** One `key: value` line of frontmatter, and whether it is indented under a block; null otherwise. */
const readLine = (line) => {
  const colon = line.indexOf(':')
  if (colon === -1) return null
  const key = line.slice(0, colon).trim()
  if (!KEY.test(key)) return null
  return { key, value: line.slice(colon + 1).trim(), isNested: line !== line.trimStart() }
}

/**
 * The frontmatter of a SKILL.md as its top-level keys, with the keys of the `metadata` block under
 * `metadata`. Only what this check reads; values are the raw text after the colon.
 */
export const readFrontmatter = (text) => {
  const lines = text.split(/\r?\n/)
  if (lines[0] !== '---') return null
  const end = lines.indexOf('---', 1)
  if (end === -1) return null
  const fields = { metadata: {} }
  let block = null
  for (const line of lines.slice(1, end)) {
    const entry = readLine(line)
    if (!entry) continue
    if (entry.isNested) {
      if (block === 'metadata') fields.metadata[entry.key] = entry.value
      continue
    }
    block = entry.value === '' ? entry.key : null
    if (entry.key !== 'metadata') fields[entry.key] = entry.value
  }
  return fields
}

const unquote = (value) => value?.replace(/^(['"])(.*)\1$/, '$2')

const skillFolders = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()
    : []

/** A skill's frontmatter and its repo-relative path, or null after recording why it can't be read. */
const readSkill = (root, dir, folder, problems) => {
  const file = join(root, dir, folder, 'SKILL.md')
  const where = relative(root, file).replaceAll('\\', '/')
  if (!existsSync(file)) {
    problems.push(`${where} is missing.`)
    return null
  }
  const fields = readFrontmatter(readFileSync(file, 'utf8'))
  if (!fields) problems.push(`${where} has no frontmatter.`)
  return fields && { where, fields }
}

/** Every skill in `.claude/skills/` has a name and is marked internal. */
const checkInternal = (root, problems) => {
  for (const folder of skillFolders(join(root, INTERNAL_DIR))) {
    const skill = readSkill(root, INTERNAL_DIR, folder, problems)
    if (!skill) continue
    if (!skill.fields.name) problems.push(`${skill.where} has no name.`)
    if (skill.fields.metadata.internal !== 'true') {
      problems.push(`${skill.where} is not marked internal (metadata.internal: true).`)
    }
  }
}

/** One public skill: named after its folder, described, and not marked internal. */
const checkPublicSkill = (root, folder, problems) => {
  const skill = readSkill(root, PUBLIC_DIR, folder, problems)
  if (!skill) return
  if (unquote(skill.fields.name) !== folder) {
    problems.push(`${skill.where} must be named ${folder}.`)
  }
  if (!skill.fields.description) problems.push(`${skill.where} has no description.`)
  if (skill.fields.metadata.internal !== undefined) {
    problems.push(`${skill.where} is public and must not be marked internal.`)
  }
}

/** The plugin's `skills/` holds exactly the public skills, each well formed. */
const checkPublic = (root, problems) => {
  const found = skillFolders(join(root, PUBLIC_DIR))
  for (const folder of found.filter((name) => !PUBLIC_SKILLS.includes(name))) {
    problems.push(
      `${PUBLIC_DIR}/${folder} is not a public skill; only ${PUBLIC_SKILLS.join(', ')}.`
    )
  }
  for (const folder of PUBLIC_SKILLS) {
    if (found.includes(folder)) checkPublicSkill(root, folder, problems)
    else problems.push(`${PUBLIC_DIR}/${folder} is missing.`)
  }
}

/** What is wrong with the skills under `root`, one message per problem; empty when all is well. */
export const checkSkills = (root) => {
  const problems = []
  checkInternal(root, problems)
  checkPublic(root, problems)
  return problems
}

/** Prints the result of checking `root`, and sets a failing exit code when something drifted. */
export const reportSkills = (root) => {
  const problems = checkSkills(root)
  for (const problem of problems) console.error(problem)
  if (problems.length > 0) process.exitCode = 1
  else console.log(`Skills: ${PUBLIC_SKILLS.join(', ')} public, the rest internal.`)
}

// The command line always checks this repository: it takes no path to read.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  reportSkills(join(dirname(fileURLToPath(import.meta.url)), '..'))
}
