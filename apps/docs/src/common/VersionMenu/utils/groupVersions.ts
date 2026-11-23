import type { SectionDescription } from 'src/common/nav'

/** The released versions of a section, in the lines they were published under. */
export interface VersionGroups {
  /** The versions of the current package, in the manifest's order. */
  current: string[]
  /** The versions of each earlier name, with that name - none for a name with no version listed. */
  former: { name: string; versions: string[] }[]
}

/**
 * Sorts the manifest's versions by the package they were published as: a version a section lists
 * under a former tag prefix belongs to that name (the prefix less its `@`), the rest to the
 * current package. What line a version is on comes from the section's data, never from its number.
 */
export const groupVersions = (
  versions: readonly string[],
  { formerVersions }: Pick<SectionDescription, 'formerVersions'>
): VersionGroups => {
  const former = Object.entries(formerVersions)
    .map(([prefix, own]) => ({
      name: prefix.slice(0, -1),
      versions: versions.filter((version) => own.includes(version)),
    }))
    .filter((group) => group.versions.length > 0)
  const apart = new Set(former.flatMap((group) => group.versions))
  return { current: versions.filter((version) => !apart.has(version)), former }
}
