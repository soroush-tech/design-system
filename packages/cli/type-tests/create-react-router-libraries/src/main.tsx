import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { startMocks } from './mocks/start'
import { routes } from './routes'

// The mock API starts first, so it answers the app's first request.
await startMocks()

/** The router: it shows the page the URL names, and moves between pages with no reload. */
const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
