/**
 * Starts the mock API in the browser while VITE_MSW, in .env, is true. Set it to false once the
 * app's own API answers.
 */
export async function startMocks() {
  if (import.meta.env.VITE_MSW !== 'true') return
  const { worker } = await import('./browser')
  // A request the mock API has no handler for - a page the router fetches - goes to the network.
  await worker.start({ onUnhandledFrame: 'bypass' })
}
