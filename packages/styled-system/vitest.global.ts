import { resolve } from 'node:path'
import { build } from 'tsdown'

// The test of the CommonJS build loads dist/, so the suite builds it first - and the core's,
// which the build imports and a consumer would have installed built.
export default async function setup() {
  await build({ config: true, cwd: resolve(__dirname, '../core'), logLevel: 'silent' })
  await build({ config: true, logLevel: 'silent' })
}
