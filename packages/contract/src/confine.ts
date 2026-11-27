import { isAbsolute, relative, resolve, sep } from 'node:path'

const isInside = (base: string, path: string): boolean => {
  const from = relative(base, path)
  return from !== '..' && !from.startsWith(`..${sep}`) && !isAbsolute(from)
}

/** `target` resolved to an absolute path; it throws when the path is not inside one of the `bases`. */
export const confine = (target: string, bases: string[]): string => {
  const path = resolve(target)
  if (bases.some((base) => isInside(resolve(base), path))) return path
  throw new Error(`${target} is outside ${bases.join(' and ')}`)
}
