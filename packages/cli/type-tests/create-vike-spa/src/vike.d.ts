// Types for what this app adds to Vike: each page's component, and the +Layout around it.
import type { ReactNode } from 'react'

type Layout = (props: { children: ReactNode }) => ReactNode

declare global {
  namespace Vike {
    interface PageContext {
      Page: () => ReactNode
    }
    interface Config {
      Layout?: Layout
    }
    interface ConfigResolved {
      Layout?: Layout
    }
  }
}

export {}
