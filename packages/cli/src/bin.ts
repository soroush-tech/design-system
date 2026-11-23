#!/usr/bin/env node
// `npx @soroush.design/cli init`: the command line run on its own. It installs the design system
// version this package was built next to, and checks React against that version's range: both are
// read from the workspace at build time, so only these two fields ship. That version is a released
// one, so even an alpha cli installs the stable design system.
import { name, peerDependencies, version } from '../../react-components/package.json'
import { createNodeIo } from './io'
import { main } from './main'

process.exitCode = await main(process.argv.slice(2), createNodeIo(), {
  name,
  version,
  peerDependencies,
})
