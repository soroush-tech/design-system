import { useEffect, useState } from 'react'
import { Button } from '@soroush.design/react/Button'
import { Menu } from '@soroush.design/react/Menu'
import { MenuItem } from '@soroush.design/react/MenuItem'
import { sections, type DocsSection } from 'src/common/nav'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'
import { groupVersions } from './utils/groupVersions'
import { newestVersion } from './utils/newestVersion'
import { currentVersion } from './utils/versionFromPath'

/** The manifest the deploy pipeline writes at the domain root. */
export interface VersionsManifest {
  [pkg: string]: string[]
}

export interface VersionMenuProps {
  pkg: DocsSection
  pathname: string
}

/**
 * The released snapshots of a package, from the manifest at the domain root (never the
 * snapshot's base, so a frozen snapshot lists versions released after it was built). None
 * until the manifest arrives - and none at all where there is no manifest, locally or
 * before the first deploy.
 */
const useVersions = (pkg: DocsSection): string[] => {
  const [versions, setVersions] = useState<string[]>([])
  useEffect(() => {
    let disposed = false
    // Revalidated, not served from the 10-minute cache: a release should show at once.
    fetch('/versions.json', { cache: 'no-cache' })
      .then((response) => (response.ok ? response.json() : {}))
      .then((manifest: VersionsManifest) => {
        if (!disposed) setVersions(manifest[pkg] ?? [])
      })
      .catch(() => {
        // No manifest - the menu simply lists the live version alone.
      })
    return () => {
      disposed = true
    }
  }, [pkg])
  return versions
}

const versionRow = (version: string, current: string) => (
  <MenuItem key={version} value={version} role="menuitemradio" selected={current === version}>
    v{version}
  </MenuItem>
)

/**
 * The version of the docs, and a menu to change it: the live docs (`latest`) or any released
 * snapshot. A snapshot is a separate build, so choosing one loads it.
 */
export function VersionMenu({ pkg, pathname }: Readonly<VersionMenuProps>) {
  const versions = useVersions(pkg)
  const current = currentVersion(pathname, pkg, import.meta.env.BASE_URL)
  const { current: own, former } = groupVersions(versions, sections[pkg])
  // "Latest" is the current package's version, never the highest number: the live build names its
  // own, a snapshot the newest the manifest lists for the current package - and just "Latest"
  // before there is one. A version of an earlier name never counts.
  const live = current === 'latest' ? PACKAGE_VERSIONS[pkg] : newestVersion(own)
  const shown = current === 'latest' ? PACKAGE_VERSIONS[pkg] : current
  return (
    <Menu
      aria-label="Documentation version"
      onSelect={(value) => {
        window.location.assign(value === 'latest' ? `/${pkg}/` : `/${pkg}/${value}/`)
      }}
      trigger={
        <Button
          variant="outlined"
          size="sm"
          aria-label={`Documentation version, v${shown}`}
          style={{ textTransform: 'none' }}
        >
          v{shown}
        </Button>
      }
    >
      <MenuItem value="latest" role="menuitemradio" selected={current === 'latest'}>
        {live === undefined ? 'Latest' : `Latest (v${live})`}
      </MenuItem>
      {own.map((version) => versionRow(version, current))}
      {former.map(({ name, versions: older }) => (
        <MenuItem key={name} submenu={older.map((version) => versionRow(version, current))}>
          Published as {name}
        </MenuItem>
      ))}
    </Menu>
  )
}
