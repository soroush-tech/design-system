import { existsSync } from 'node:fs'

/** Where git is installed: fixed folders, so no search path decides which program runs. */
export const GIT_LOCATIONS = [
  '/usr/bin/git',
  '/usr/local/bin/git',
  '/opt/homebrew/bin/git',
  'C:\\Program Files\\Git\\cmd\\git.exe',
  'C:\\Program Files (x86)\\Git\\cmd\\git.exe',
]

/** The first of `locations` that exists. */
export const findGit = (
  locations: string[] = GIT_LOCATIONS,
  exists: (path: string) => boolean = existsSync
): string => {
  const found = locations.find((location) => exists(location))
  if (!found) throw new Error(`git is not installed in ${locations.join(', ')}`)
  return found
}
