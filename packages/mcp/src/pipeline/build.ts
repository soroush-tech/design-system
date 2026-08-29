import { loadPackageFile } from '@soroush.tech/docs-content/node'
import type { ContentBundle } from '../types'
import { buildComponents } from './components'
import { buildDocs } from './docs'
import { buildTokens } from './tokens'

/** The design-system version the bundle describes. */
export const designSystemVersion = (): string =>
  (JSON.parse(loadPackageFile('design-system', 'package.json')) as { version: string }).version

/** Assembles the whole content bundle from the repo's own sources. */
export const buildContent = async (): Promise<ContentBundle> => ({
  version: designSystemVersion(),
  components: buildComponents(),
  docs: buildDocs(),
  tokens: await buildTokens(),
})
