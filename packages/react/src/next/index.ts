// The style registry of the Next.js App Router, added once in the root layout. `next` is an optional
// peer: an app that never imports this entry does not need it. The engine is configured here, so the
// registry writes the rules of the package's own cache whichever entry the app imported first.
import { configureEngine } from '../style/engine'

configureEngine()

export { StyleRegistry } from '@umber-style/react/next'
