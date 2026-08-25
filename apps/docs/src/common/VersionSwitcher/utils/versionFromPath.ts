import type { DocsPackage } from 'src/common/nav'

const SEMVER_SEGMENT = /^\d+\.\d+\.\d+$/

/** The version a path is pinned to, or 'latest' when it names none. */
export const versionFromPath = (pathname: string, pkg: DocsPackage): string => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === pkg && SEMVER_SEGMENT.test(segments[1] ?? '')) return segments[1]
  return 'latest'
}

/**
 * The version the current page is pinned to. A snapshot carries it in the build base
 * (`/<pkg>/<version>/`) and Vike reports pathnames relative to that base, so the base
 * answers first; the pathname only speaks on the live site, where the base is `/`.
 */
export const currentVersion = (pathname: string, pkg: DocsPackage, base: string): string => {
  const fromBase = versionFromPath(base, pkg)
  return fromBase === 'latest' ? versionFromPath(pathname, pkg) : fromBase
}
