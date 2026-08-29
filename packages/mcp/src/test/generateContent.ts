import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { emitContent } from '../pipeline/emit'

// vitest global setup: the content bundle is a build artifact, so regenerate it before
// the suite imports it. Keeps a bare `pnpm test` working from a clean checkout.
export default async function setup(): Promise<void> {
  await emitContent(join(dirname(fileURLToPath(import.meta.url)), '..', 'generated', 'content.ts'))
}
