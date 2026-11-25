# The testing entry

`@soroush.design/react/testing` holds helpers for the unit tests of an app that uses the library.

```ts
import { installPopover } from '@soroush.design/react/testing'
```

## `installPopover()`

jsdom implements none of the HTML Popover API, so a component built on a popover (`Drawer`) does not open there. `installPopover()` installs a stand-in on the test document: the open state is a data attribute, a closed popover is hidden the way the browser hides it, Escape closes the open `auto` popovers, and a `popovertarget` button acts on its target. It fires `toggle` events with the old and the new state. It does nothing where the real API exists, and returns a function that removes it again.

```ts
let remove: () => void
beforeEach(() => {
  remove = installPopover()
})
afterEach(() => remove())
```

The top layer, clicks outside a popover and focus stay with a real browser: test those in one.
