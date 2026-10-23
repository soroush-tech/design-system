import { useEffect, useState } from 'react'
import { Button } from '@soroush.tech/design-system/Button'
import { Menu } from '@soroush.tech/design-system/Menu'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'
import type { DocsPackage } from 'src/common/nav'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'
import { currentVersion } from './utils/versionFromPath'

/** The manifest the deploy pipeline writes at the domain root. */
export interface VersionsManifest {
  [pkg: string]: string[]
}

export interface VersionMenuProps {
  pkg: DocsPackage
  pathname: string
}

/**
 * The released snapshots of a package, from the manifest at the domain root (never the
 * snapshot's base, so a frozen snapshot lists versions released after it was built). None
 * until the manifest arrives - and none at all where there is no manifest, locally or
 * before the first deploy.
 */
const useVersions = (pkg: DocsPackage): string[] => {
  const [versions, setVersions] = useState<string[]>([])
  useEffect(() => {
    let disposed = false
    fetch('/versions.json')
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

/**
 * The version of the docs, and a menu to change it: the live docs (`latest`) or any released
 * snapshot. A snapshot is a separate build, so choosing one loads it.
 */
export function VersionMenu({ pkg, pathname }: Readonly<VersionMenuProps>) {
  const versions = useVersions(pkg)
  const current = currentVersion(pathname, pkg, import.meta.env.BASE_URL)
  const live = PACKAGE_VERSIONS[pkg]
  const shown = current === 'latest' ? live : current
  return (
    <Menu
      aria-label="Documentation version"
      onSelect={(value) => {
        window.location.assign(value === 'latest' ? `/${pkg}/` : `/${pkg}/${value}/`)
      }}
      trigger={
        <Button variant="outlined" size="sm" aria-label={`Documentation version, v${shown}`}>
          v{shown}
        </Button>
      }
    >
      <MenuItem value="latest" role="menuitemradio" selected={current === 'latest'}>
        Latest (v{live})
      </MenuItem>
      {versions.map((version) => (
        <MenuItem key={version} value={version} role="menuitemradio" selected={current === version}>
          v{version}
        </MenuItem>
      ))}
    </Menu>
  )
}
