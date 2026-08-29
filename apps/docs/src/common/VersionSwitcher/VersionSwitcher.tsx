import { useEffect, useState } from 'react'
import { NativeSelect } from '@soroush.tech/design-system/NativeSelect'
import type { DocsPackage } from 'src/common/nav'
import { currentVersion } from './utils/versionFromPath'

/** The manifest the deploy pipeline writes at the domain root. */
export interface VersionsManifest {
  [pkg: string]: string[]
}

export interface VersionSwitcherProps {
  pkg: DocsPackage
  pathname: string
}

/**
 * Switches the section between its released snapshots. The manifest is fetched from the
 * domain root (never the snapshot's base), so frozen snapshots list versions released
 * after they were built. Renders nothing until the manifest lists versions for the
 * package - locally, before the first deploy, there is no manifest at all.
 */
export function VersionSwitcher({ pkg, pathname }: Readonly<VersionSwitcherProps>) {
  const [versions, setVersions] = useState<string[]>([])
  useEffect(() => {
    let disposed = false
    fetch('/versions.json')
      .then((response) => (response.ok ? response.json() : {}))
      .then((manifest: VersionsManifest) => {
        if (!disposed) setVersions(manifest[pkg] ?? [])
      })
      .catch(() => {
        // No manifest - the switcher simply stays hidden.
      })
    return () => {
      disposed = true
    }
  }, [pkg])

  if (versions.length === 0) return null
  const current = currentVersion(pathname, pkg, import.meta.env.BASE_URL)
  return (
    <NativeSelect
      selectProps={{ 'aria-label': 'Documentation version' }}
      value={current}
      onChange={(value) => {
        window.location.assign(value === 'latest' ? `/${pkg}/` : `/${pkg}/${value}/`)
      }}
      options={[
        { value: 'latest', label: 'latest' },
        ...versions.map((version) => ({ value: version, label: `v${version}` })),
      ]}
    />
  )
}
