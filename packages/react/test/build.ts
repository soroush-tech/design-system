import { build } from 'tsdown'

// The tests of dist/ need a build that matches the generated sources, so the suite builds one.
export default async function setup() {
  await build({ config: true, logLevel: 'silent' })
}
