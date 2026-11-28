/**
 * The files an `import.meta.glob` matched. A glob whose path is wrong matches nothing and says
 * nothing, so the demos would vanish from the build without a failure; this throws at build
 * time instead, naming the glob.
 */
export const requireMatches = <T>(
  pattern: string,
  matches: Record<string, T>
): Record<string, T> => {
  if (Object.keys(matches).length === 0) {
    throw new Error(`import.meta.glob('${pattern}') matched no files - did the folder move?`)
  }
  return matches
}
