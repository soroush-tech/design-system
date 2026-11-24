import { resolve } from 'node:path'
import { build } from 'tsdown'

// The test of the built package loads dist/, and its build requires the dist of the core, which
// the workspace otherwise serves as source. Both are built before the suite.
export default async function setup() {
  await build({ config: true, cwd: resolve('../core'), logLevel: 'silent' })
  await build({ config: true, logLevel: 'silent' })
}
