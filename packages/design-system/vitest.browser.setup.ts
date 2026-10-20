import { beforeEach } from 'vitest'

// The real-browser tier drives React with real events - `userEvent` from `vitest/browser`, focus,
// resize - which no `act()` wraps, so React must not expect one. Testing Library declares an act
// environment in a `beforeAll`; it is turned off before each test, and Testing Library's own
// `render` still runs in `act`, switching it on just for that call.
beforeEach(() => {
  ;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false
})
