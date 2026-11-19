/**
 * The mock API in the browser, started once, while PUBLIC_MSW, in .env, is true: src/data/api waits
 * for it before each request. On the server, and in the tests, where msw's Node server answers,
 * nothing starts. Set PUBLIC_MSW to false once the app's own API answers.
 */
export const mocks = startMocks()

async function startMocks() {
  const isBrowser = typeof window !== 'undefined' && import.meta.env.MODE !== 'test'
  if (!isBrowser || import.meta.env.PUBLIC_MSW !== 'true') return
  const { worker } = await import('./browser')
  // A request the mock API has no handler for - a page the router fetches - goes to the network.
  await worker.start({ onUnhandledFrame: 'bypass' })
}
