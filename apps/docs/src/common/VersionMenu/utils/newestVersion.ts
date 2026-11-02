const toParts = (version: string) => version.split('.').map(Number)

/** The highest of x.y.z versions (the manifest only lists stable ones), or undefined for none. */
export const newestVersion = (versions: readonly string[]): string | undefined =>
  versions.reduce<string | undefined>((newest, version) => {
    if (newest === undefined) return version
    const [a, b] = [toParts(version), toParts(newest)]
    const index = a.findIndex((part, i) => part !== b[i])
    return index !== -1 && a[index] > b[index] ? version : newest
  }, undefined)
