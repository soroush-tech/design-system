// Fails when the built catalog holds data instead of importing it.
//
//   pnpm check:catalog-dist     (run by `test:types`, after the build)
//
// The catalog's data is `@gild-ui/core`'s: the library's `/catalog` adds each component's
// module to it. A build that copied the data - or bundled the docs' release tags, the theme or
// the styling helpers a catalog once read - would give an app two copies and a larger bundle.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const failures = []

for (const file of ['catalog.mjs', 'catalog.cjs']) {
  const source = readFileSync(join(dist, file), 'utf8')
  const specifiers = [...source.matchAll(/(?:from|require\()\s*["']([^"']+)["']/g)].map((m) => m[1])
  if (!specifiers.includes('@gild-ui/core/catalog')) {
    failures.push(`${file} does not import @gild-ui/core/catalog`)
  }
  for (const specifier of specifiers) {
    if (specifier !== '@gild-ui/core/catalog') failures.push(`${file} imports ${specifier}`)
  }
  for (const copied of ['summary:', 'isPlaceable', 'formerTagPrefixes', 'tagPrefix']) {
    if (source.includes(copied)) failures.push(`${file} holds ${copied}`)
  }
  if (source.length > 4000) failures.push(`${file} is ${source.length} bytes - it has grown`)
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('check:catalog-dist: the built catalog imports its data from @gild-ui/core')
