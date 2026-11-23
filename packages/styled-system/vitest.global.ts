import { build } from 'tsdown'

// The test of the CommonJS build loads dist/, so the suite builds it first.
export default async function setup() {
  await build({ config: true, logLevel: 'silent' })
}
