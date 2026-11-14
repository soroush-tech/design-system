import { lstatSync, mkdirSync, readFileSync, rmdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'

/** The file operations init uses: a seam, so a test can make one fail. */
export interface FileSystem {
  readFile: (path: string) => string
  /** Writes a file that must not exist yet, and fails if it does. */
  createFile: (path: string, content: string) => void
  writeFile: (path: string, content: string) => void
  removeFile: (path: string) => void
  createDirectory: (path: string) => void
  removeDirectory: (path: string) => void
  /** Removes a folder and everything in it, or a file. */
  removeTree: (path: string) => void
  /** Whether a path is a symbolic link, or `undefined` when nothing is there. */
  isSymbolicLink: (path: string) => boolean | undefined
}

export const nodeFileSystem: FileSystem = {
  readFile: (path) => readFileSync(path, 'utf8'),
  createFile: (path, content) => writeFileSync(path, content, { flag: 'wx' }),
  writeFile: (path, content) => writeFileSync(path, content),
  removeFile: (path) => rmSync(path),
  createDirectory: (path) => mkdirSync(path),
  removeDirectory: (path) => rmdirSync(path),
  removeTree: (path) => rmSync(path, { recursive: true, force: true }),
  isSymbolicLink: (path) => {
    try {
      return lstatSync(path).isSymbolicLink()
    } catch {
      return undefined
    }
  },
}

/**
 * The absolute path of `path`, given from the app's root, when it stays inside the root and
 * passes through no symbolic link. Anything else throws: init writes only inside the app.
 */
export function resolveInside(root: string, path: string, fileSystem: FileSystem): string {
  const absolute = resolve(root, path)
  const fromRoot = relative(root, absolute)
  if (!fromRoot || fromRoot.startsWith('..') || isAbsolute(fromRoot)) {
    throw new Error(`${path} is outside the app's folder`)
  }
  let current = root
  for (const segment of fromRoot.split(sep)) {
    current = join(current, segment)
    const isLink = fileSystem.isSymbolicLink(current)
    if (isLink === undefined) break
    if (isLink) throw new Error(`${path} goes through a symbolic link, which init does not follow`)
  }
  return absolute
}

/** The folders between the root and `directory` that do not exist yet, outermost first. */
export function findMissingDirectories(root: string, directory: string, fileSystem: FileSystem) {
  const missing: string[] = []
  let current = directory
  while (current !== root && fileSystem.isSymbolicLink(current) === undefined) {
    missing.unshift(current)
    current = dirname(current)
  }
  return missing
}
