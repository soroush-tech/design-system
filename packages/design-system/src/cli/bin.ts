#!/usr/bin/env node
// `npx @soroush.tech/design-system init`: the package's command line. Node only - nothing here is
// part of the browser entries.
import { fileURLToPath } from 'node:url'
import { readOwnPackage } from './detect/detect'
import { createNodeIo } from './io'
import { main } from './main'

process.exitCode = await main(
  process.argv.slice(2),
  createNodeIo(),
  readOwnPackage(fileURLToPath(import.meta.url))
)
