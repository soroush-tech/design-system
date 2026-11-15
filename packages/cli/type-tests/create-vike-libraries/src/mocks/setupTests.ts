import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './server'

// The mock API answers every request a test makes; one it has no handler for fails the test.
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
