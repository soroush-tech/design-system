const packageName = (specifier: string): string => {
  const segments = specifier.split('/')
  return specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0]
}

/**
 * The npm dependencies a demo module needs, inferred from its import statements -
 * relative imports are skipped, subpath imports resolve to their package root. Packages
 * listed in `versions` get that pin; anything else rides at latest.
 */
export const inferDependencies = (
  source: string,
  versions: Record<string, string>
): Record<string, string> => {
  const dependencies: Record<string, string> = {}
  for (const match of source.matchAll(/^import[^'"]*['"]([^'"]+)['"]/gm)) {
    const specifier = match[1]
    if (specifier.startsWith('.')) continue
    const name = packageName(specifier)
    dependencies[name] = versions[name] ?? 'latest'
  }
  return dependencies
}
