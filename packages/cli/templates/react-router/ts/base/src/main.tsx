import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @if redux-toolkit
import { Provider as StoreProvider } from 'react-redux'
// @endif
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
// @if msw
import { startMocks } from './mocks/start'
// @endif
import { routes } from './routes'
// @if redux-toolkit
import { store } from './state/store'
// @endif

// @if msw
// The mock API starts first, so it answers the app's first request.
await startMocks()

// @endif
/** The router: it shows the page the URL names, and moves between pages with no reload. */
const router = createBrowserRouter(routes)

// @if redux-toolkit
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>
)
// @else
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
// @endif
