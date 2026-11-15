import { setupServer } from 'msw/node'
import { handlers } from './handlers'

/** The mock API in Node, for the tests: it answers the requests the handlers match. */
export const server = setupServer(...handlers)
