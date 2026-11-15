// Vitest's global setup: makes the JavaScript templates from the TypeScript ones, as the build does,
// so the tests read what create would copy.
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export default function setup() {
  const script = join(dirname(fileURLToPath(import.meta.url)), 'gen-templates.mjs')
  execFileSync(process.execPath, [script], { stdio: 'inherit' })
}
