#!/usr/bin/env node
// `npx @soroush.design/cli init`: the command line run on its own. It checks React against the
// peer range of the React package this package was built next to; both its name and that range
// are read from the workspace at build time, so only these two fields ship. The version it
// installs is read the same way in designSystemPackage.ts.
import { name, peerDependencies } from '../../react/package.json'
import { createNodeIo } from './io'
import { main } from './main'

process.exitCode = await main(process.argv.slice(2), createNodeIo(), {
  name,
  peerDependencies,
})
