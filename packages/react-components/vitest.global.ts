import { resolve } from 'node:path'
import { build } from 'tsdown'

// The test of the CommonJS build loads dist/, and the build requires the dist of the styling
// system, of the core and of the hooks, which the workspace otherwise serves as source. All are
// built before the suite.
export default async function setup() {
  await build({ config: true, cwd: resolve('../styled-system'), logLevel: 'silent' })
  await build({ config: true, cwd: resolve('../core'), logLevel: 'silent' })
  await build({ config: true, cwd: resolve('../react-hooks'), logLevel: 'silent' })
  await build({ config: true, logLevel: 'silent' })
}
