import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { exportsOf } from './exportsOf'
import type { ExportList } from './exportsOf'

/** `exports/<package>.json`: every entry point of a package and the exact names it exports. */
export interface ListFile {
  package: string
  entries: Record<string, ExportList>
}

/** The declaration file of each entry point a package publishes, from its `publishConfig.exports`. */
export const publishedDeclarations = (packageDir: string): Record<string, string> => {
  const manifest = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')) as {
    publishConfig: { exports: Record<string, { import: { types: string } }> }
  }
  return Object.fromEntries(
    Object.entries(manifest.publishConfig.exports).map(([entry, target]) => [
      entry,
      join(packageDir, target.import.types),
    ])
  )
}

const missingFrom = (wanted: string[], found: string[]) => wanted.filter((n) => !found.includes(n))

/** What differs between the contract's list and the built package, one readable line each; empty when they match. */
export const diffLists = (
  expected: Record<string, ExportList>,
  built: Record<string, ExportList | undefined>
): string[] => {
  const problems: string[] = []
  for (const [entry, want] of Object.entries(expected)) {
    const have = built[entry]
    if (!have) {
      problems.push(`${entry}: entry point is not built`)
      continue
    }
    for (const kind of ['values', 'types'] as const) {
      const absent = missingFrom(want[kind], have[kind])
      const extra = missingFrom(have[kind], want[kind])
      if (absent.length) problems.push(`${entry}: ${kind} missing: ${absent.join(', ')}`)
      if (extra.length) problems.push(`${entry}: ${kind} not in the contract: ${extra.join(', ')}`)
    }
  }
  for (const entry of Object.keys(built)) {
    if (!(entry in expected)) problems.push(`${entry}: entry point is not in the contract`)
  }
  return problems
}

/** Compares the list `exports/<name>.json` with the declarations built in `packageDir`. */
export const checkList = (listFile: string, packageDir: string): string[] => {
  const list = JSON.parse(readFileSync(listFile, 'utf8')) as ListFile
  const declarations = Object.entries(publishedDeclarations(packageDir)).filter(([, file]) =>
    existsSync(file)
  )
  const lists = exportsOf(declarations.map(([, file]) => file))
  const built = Object.fromEntries(declarations.map(([entry, file]) => [entry, lists[file]]))
  return diffLists(list.entries, built)
}
