import type { RouteObject } from 'react-router'
import { ErrorPage } from './pages/ErrorPage'
import { Layout } from './pages/Layout'
import AboutPage from './pages/about/Page'
// @if react-hook-form
import FormPage from './pages/form/Page'
// @endif
import HomePage from './pages/index/Page'
// @if sample-data
import ItemPage from './pages/item/Page'
import ItemsPage from './pages/items/Page'
// @endif
// @if sample-data && !tanstack-query && !swr
import { loader as itemLoader } from './pages/item/loader'
import { loader as itemsLoader } from './pages/items/loader'
// @endif

/**
 * The app's pages, by path, each in the Layout. A path with no page, and a page that fails, show
 * the error page in its place. https://reactrouter.com/start/data/routing
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'about', element: <AboutPage /> },
          // @if sample-data && (tanstack-query || swr)
          { path: 'items', element: <ItemsPage /> },
          { path: 'items/:id', element: <ItemPage /> },
          // @elif sample-data
          { path: 'items', loader: itemsLoader, element: <ItemsPage /> },
          { path: 'items/:id', loader: itemLoader, element: <ItemPage /> },
          // @endif
          // @if react-hook-form
          { path: 'form', element: <FormPage /> },
          // @endif
          { path: '*', element: <ErrorPage /> },
        ],
      },
    ],
  },
]
