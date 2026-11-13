#!/usr/bin/env node
// `npx @soroush.tech/design-system init`: the command line of @soroush.design/cli, run for this
// package - it installs this version, and checks the app's React against this package's peer
// range. Node only - nothing here is part of the browser entries.
import { fileURLToPath } from 'node:url'
import main, { createNodeIo, readDesignSystemPackage } from '@soroush.design/cli'

process.exitCode = await main(
  process.argv.slice(2),
  createNodeIo(),
  readDesignSystemPackage(fileURLToPath(import.meta.url))
)
