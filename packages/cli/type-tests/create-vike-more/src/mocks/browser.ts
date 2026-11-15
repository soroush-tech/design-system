import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/** The mock API in the browser: a service worker answers the requests the handlers match. */
export const worker = setupWorker(...handlers)
