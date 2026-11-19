import type { RouteObject } from 'react-router'
import { ErrorPage } from './pages/ErrorPage'
import { Layout } from './pages/Layout'
import AboutPage from './pages/about/Page'
import HomePage from './pages/index/Page'
import ItemPage from './pages/item/Page'
import ItemsPage from './pages/items/Page'
import { loader as itemLoader } from './pages/item/loader'
import { loader as itemsLoader } from './pages/items/loader'

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
          { path: 'items', loader: itemsLoader, element: <ItemsPage /> },
          { path: 'items/:id', loader: itemLoader, element: <ItemPage /> },
          { path: '*', element: <ErrorPage /> },
        ],
      },
    ],
  },
]
