/** Compares two semver core versions; positive when `a` is newer, 0 when equal. */
export const compareSemver = (a: string, b: string): number => {
  const parts = (version: string): number[] => version.split('.').map(Number)
  const [aParts, bParts] = [parts(a), parts(b)]
  for (let index = 0; index < 3; index += 1) {
    if (aParts[index] !== bParts[index]) return aParts[index] - bParts[index]
  }
  return 0
}
