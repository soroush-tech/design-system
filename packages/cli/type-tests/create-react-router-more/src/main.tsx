import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { routes } from './routes'
import { store } from './state/store'

/** The router: it shows the page the URL names, and moves between pages with no reload. */
const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>
)
