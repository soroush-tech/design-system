# Drawer

A panel that slides in from a screen edge. It is an HTML `popover`: a `DrawerToggle` button opens
and closes it through `popovertarget`, and the browser closes it on Escape or a click outside and
shows it in the top layer, above everything. None of that needs JavaScript, so a drawer works on
a prerendered page with scripts off - the mobile navigation menu, for example.

With JavaScript, it can also be controlled from state (`isOpen` / `onClose`), and while open it
moves focus inside, keeps Tab cycling within it, locks body scroll, and returns focus when it
closes. The surface is a [`Paper`](../Paper/README.md) pinned to the chosen edge, with a slide-in
that respects `prefers-reduced-motion`; the page behind is dimmed through the popover's
`::backdrop`.

## Usage

```tsx
import { Drawer, DrawerToggle } from '@soroush.tech/design-system/Drawer'

<DrawerToggle drawer="nav" aria-label="Open navigation">
  <Icon name="menu" />
</DrawerToggle>

<Drawer id="nav" anchor="left">
  <Navigation />
  <DrawerToggle drawer="nav" action="hide">Close</DrawerToggle>
</Drawer>
```

Controlled, with JavaScript:

```tsx
const [isOpen, setIsOpen] = useState(false)

<Drawer id="filters" anchor="right" isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Filters />
</Drawer>
```

The drawer's content is always in the page (hidden while closed), so it is server-rendered and
indexable; `left` / `right` drawers fill the window's height, `top` / `bottom` its width.

---

## Props

| Prop                 | Type                                                | Default  | Description                                                          |
| -------------------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| `id`                 | `string`                                            | -        | The id a `DrawerToggle`'s `drawer` names.                            |
| `children`           | `ReactNode`                                         | -        | The drawer content.                                                  |
| `isOpen`             | `boolean`                                           | -        | With JavaScript: open state, for controlled use.                     |
| `onClose`            | `(event, reason: 'escapeKey' \| 'dismiss') => void` | -        | Fired when it closes by itself: Escape, a click outside, its toggle. |
| `anchor`             | `'left' \| 'right' \| 'top' \| 'bottom'`            | `'left'` | Edge the drawer slides in from.                                      |
| `elevation`          | `0-24`                                              | `16`     | Shadow depth of the panel, forwarded to `Paper`.                     |
| `transitionDuration` | `number`                                            | `225`    | Slide duration in milliseconds.                                      |
| `hasBackdrop`        | `boolean`                                           | `true`   | Dim the page behind the open drawer.                                 |
| `shouldLockScroll`   | `boolean`                                           | `true`   | With JavaScript: lock body scroll while open.                        |
| `shouldAutoFocus`    | `boolean`                                           | `true`   | With JavaScript: move focus into the drawer when it opens.           |
| `shouldTrapFocus`    | `boolean`                                           | `true`   | With JavaScript: keep Tab cycling within the open drawer.            |
| `shouldRestoreFocus` | `boolean`                                           | `true`   | With JavaScript: return focus to where it was when it closes.        |

## DrawerToggle

A [`Button`](../Button/README.md) that opens and closes a drawer. Takes every `Button` prop, plus:

| Prop     | Type                           | Default    | Description                      |
| -------- | ------------------------------ | ---------- | -------------------------------- |
| `drawer` | `string`                       | -          | The `id` of the `Drawer`.        |
| `action` | `'toggle' \| 'show' \| 'hide'` | `'toggle'` | What a click does to the drawer. |

## Why `id` is required

The toggle opens the drawer with plain HTML - `<button popovertarget="nav">` - which is what makes
it work with JavaScript off, and `popovertarget` can only name an element by its `id`. The toggle
usually lives far from the drawer (in an `AppBar`), so the pair is linked by name:
`<Drawer id="nav">` and `<DrawerToggle drawer="nav">`.

## Browsers without the Popover API

Browsers before Safari 17 and Firefox 125 have no Popover API. There a drawer stays closed - a
controlled `isOpen` does nothing rather than throwing - and the rest of the page keeps working.

## Testing

jsdom has no Popover API either. `installPopover` from `@soroush.tech/design-system/testing`
stands in for it - show, hide, the `toggle` event, Escape and `DrawerToggle` clicks - and returns
a function that removes it:

```tsx
import { installPopover } from '@soroush.tech/design-system/testing'

let restore = () => {}
beforeAll(() => {
  restore = installPopover()
})
afterAll(() => restore())
```

The top layer, clicks outside and focus need a real browser.
