import { resolve } from 'node:path'
import { build } from 'tsdown'

// The test of the CommonJS build loads dist/, and the build requires the dist of the styling
// system, which the workspace otherwise serves as source. Both are built before the suite.
export default async function setup() {
  await build({ config: true, cwd: resolve('../styled-system'), logLevel: 'silent' })
  await build({ config: true, logLevel: 'silent' })
}
