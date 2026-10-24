import { PACKAGES } from 'src/common/packages'

/**
 * Points the relative links of a package's README (`./LICENSE`, `./release-notes`) at the
 * package's folder on GitHub, where those files are. An absolute link or an anchor is left as
 * it is.
 */
export const githubReadmeLinks = (readme: string, id: string): string => {
  const folder = PACKAGES.find((entry) => entry.id === id)!.github
  return readme.replace(/\]\(\.\/([^)\s]+)\)/g, (_full, path: string) => `](${folder}/${path})`)
}
