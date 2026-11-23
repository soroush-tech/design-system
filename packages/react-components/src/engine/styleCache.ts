import createEngineCache from '@umber-style/cache'
import { defaultExport } from './defaultExport'

// Named import when the engine has one (#144).
export const createCache = defaultExport(createEngineCache)

export default createCache({ key: 'soroush' })
