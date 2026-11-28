import { build } from 'tsdown'

// The test of dist/ needs a build that matches the sources, so the suite builds one.
export default async function setup() {
  await build({ config: true, logLevel: 'silent' })
}
