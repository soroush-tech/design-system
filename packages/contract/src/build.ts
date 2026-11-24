import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const newest = (dir: string, recursive: boolean): number =>
  readdirSync(dir, { withFileTypes: true }).reduce((latest, entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return recursive ? Math.max(latest, newest(path, true)) : latest
    return Math.max(latest, statSync(path).mtimeMs)
  }, 0)

/** A package needs a build when it has none, or when its sources or manifest are newer than its output. */
export const isStale = (packageDir: string): boolean => {
  const dist = join(packageDir, 'dist')
  if (!existsSync(dist)) return true
  const sources = Math.max(
    newest(join(packageDir, 'src'), true),
    statSync(join(packageDir, 'package.json')).mtimeMs
  )
  return sources > newest(dist, false)
}

/** Builds the packages whose output is missing or older than their sources; returns the names it built. */
export const ensureBuilt = (
  root: string,
  names: string[],
  exec: typeof execFileSync = execFileSync
): string[] => {
  const stale = names.filter((name) => isStale(join(root, name)))
  for (const name of stale) {
    exec('pnpm', ['--filter', `@soroush.design/${name}`, 'build'], {
      cwd: root,
      stdio: 'inherit',
      shell: true,
    })
  }
  return stale
}
