import { sections } from '@soroush.tech/docs-content'
import type { DocsSection } from 'src/common/nav'

const SEMVER_SEGMENT = /^\d+\.\d+\.\d+$/

/** The version a path is pinned to, or 'latest' when it names none. */
export const versionFromPath = (pathname: string, pkg: DocsSection): string => {
  const route = sections[pkg].route.split('/')
  const segments = pathname.split('/').filter(Boolean)
  const version = segments[route.length] ?? ''
  if (segments.slice(0, route.length).join('/') === route.join('/') && SEMVER_SEGMENT.test(version))
    return version
  return 'latest'
}

/**
 * The version the current page is pinned to. A snapshot carries it in the build base
 * (`/<route>/<version>/`) and Vike reports pathnames relative to that base, so the base
 * answers first; the pathname only speaks on the live site, where the base is `/`.
 */
export const currentVersion = (pathname: string, pkg: DocsSection, base: string): string => {
  const fromBase = versionFromPath(base, pkg)
  return fromBase === 'latest' ? versionFromPath(pathname, pkg) : fromBase
}
