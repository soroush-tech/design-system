import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** The file that marks the monorepo root - present only there. */
const MARKER = 'pnpm-workspace.yaml'

/**
 * Walks up from `startDir` to the first directory holding the workspace marker.
 * `hasMarker` is injected so the walk can be exercised without touching disk.
 */
export const findRepoRoot = (startDir: string, hasMarker: (dir: string) => boolean): string => {
  let current = resolve(startDir)
  for (;;) {
    if (hasMarker(current)) return current
    const parent = dirname(current)
    if (parent === current) {
      throw new Error(`No ${MARKER} above ${startDir} - not inside the monorepo.`)
    }
    current = parent
  }
}

const moduleDir = dirname(fileURLToPath(import.meta.url))

let cached: string | undefined

/**
 * The monorepo root, resolved from this module's own location. Content loading is a
 * build-time concern inside the workspace, so walking up from here is reliable - the
 * MCP server bakes its bundle at build time rather than reading files at runtime.
 */
export const repoRoot = (): string => {
  cached ??= findRepoRoot(moduleDir, (dir) => existsSync(join(dir, MARKER)))
  return cached
}
