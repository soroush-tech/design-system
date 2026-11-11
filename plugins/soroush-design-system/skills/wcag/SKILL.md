---
name: wcag
description: WCAG 2.2 AA accessibility rules for apps built with @soroush.tech/design-system. Load when fixing a11y violations, checking color contrast, adding ARIA attributes, labeling form controls (Checkbox, Switch, TextInput, icon-only buttons), labeling nav landmarks, or writing accessibility tests and stories.
---

# WCAG accessibility

WCAG 2.2 AA is the target. Four principles: **Perceivable, Operable, Understandable, Robust**
(POUR). Automated tools catch about 30% of issues - always verify by hand with the keyboard and a
screen reader.

The design system already does part of the work: `Button` sets `aria-busy` while `loading`,
`CircularProgress` and `LinearProgress` carry a default `aria-label="Loading"` (override it by
passing your own), and `Checkbox` and `Switch` forward `aria-label` / `aria-labelledby` to their
hidden `<input>`. What is left is how the app uses them.

---

## Perceivable

### Text contrast ratios (SC 1.4.3 / 1.4.11)

- Normal text (< 18pt / < 14pt bold): **4.5:1 minimum**
- Large text (>= 18pt / >= 14pt bold): **3:1 minimum**
- UI components and focus indicators: **3:1 minimum**
- **Disabled UI components are exempt** - but only when actually disabled, not when the
  disabled color token is reused on regular text

### `opacity` compounds with the background - compute the effective color

```
effective = alpha x foreground + (1 - alpha) x background
```

```tsx
// ✗ - secondary #444748 at opacity 0.5 over #e2e2e2 -> effective #939595 -> 2.32:1
<Typography color="secondary" opacity={0.5}>© 2026 ...</Typography>

// ✓ - solid secondary #444748 -> 7.22:1
<Typography color="secondary">© 2026 ...</Typography>
```

When a theme token carries alpha (`#1a1c1c4D`): compute the effective color on every background
it appears on, then raise the alpha until the weakest background clears 4.5:1. Check both the
light and the dark theme.

### `visibility: hidden` removes content from the accessibility tree

`visibility: hidden` strips an element from assistive technology; `opacity: 0` keeps it.

```tsx
// ✗ - the button loses its accessible name while its label is hidden
...(isLoading && { visibility: 'hidden' })

// ✓ - the text stays readable by AT; a spinner overlays it with position: absolute
...(isLoading && { opacity: 0 })
```

A loading control of your own also sets `aria-busy={isLoading || undefined}` on its root.

---

## Operable

### Keyboard: never remove focus indicators

```tsx
// ✗ - removes all focus styling
button:focus { outline: none; }

// ✓ - visible on keyboard focus only
button:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
```

Tab order must follow DOM order. Every interactive element must be reachable and operable by
keyboard alone.

---

## Understandable

### Labels for all form inputs

Every input needs an accessible name, through one of:

1. **A visible label** - preferred: the component's `children`, or a `FormLabel` tied to it
2. **`aria-label`** - for icon-only or visually unlabeled controls
3. **`aria-labelledby`** - when the label text exists elsewhere in the DOM

`Checkbox` and `Switch` wrap a hidden `<input>` in a `<label>`. With no `children`, every icon is
`aria-hidden="true"`, so the input has no accessible name:

```tsx
// ✗ - the input has no accessible name
<Checkbox color="primary" />
<Switch color="primary" />

// ✓ - aria-label reaches the hidden <input>
<Checkbox color="primary" aria-label="Accept terms" />
<Switch color="primary" aria-label="Enable notifications" />

// ✓ - children become the label text (preferred when the text is visible)
<Checkbox color="primary">Accept terms</Checkbox>
```

Apply it at every usage site: pages, stories and tests.

---

## Robust

### ARIA: semantic-first, ARIA second

Use native HTML elements before reaching for ARIA. ARIA never fixes broken semantics - it
annotates correct structure.

```tsx
// ✗ - a div with a click handler: no keyboard, no role
<div onClick={open}>Menu</div>

// ✓ - a native button, keyboard-ready
<Button onClick={open}>Menu</Button>
```

### Widget and landmark roles need accessible names (SC 4.1.2)

**Several `<nav>` landmarks** - when a page has more than one `<nav>`, each needs a unique label
so screen reader users can tell them apart:

```tsx
// ✗ - two unlabeled <nav> elements on one page
<nav>{mainLinks}</nav>
<nav>{footerLinks}</nav>

// ✓ - a unique aria-label on every <nav>
<nav aria-label="Main">{mainLinks}</nav>
<nav aria-label="Footer">{footerLinks}</nav>
```

The same holds for several `<header>`, `<aside>` or `role="region"` landmarks.

**Icon-only controls** - an icon `Button` or `Fab` needs an `aria-label`, and the icon inside it
`aria-hidden="true"`.

### `display: none` / `visibility: hidden` hide from AT - use them on purpose

| CSS                  | In layout | In AT |
| -------------------- | --------- | ----- |
| `display: none`      | ✗         | ✗     |
| `visibility: hidden` | ✓         | ✗     |
| `opacity: 0`         | ✓         | ✓     |
| `clip` / sr-only     | ✗         | ✓     |

Put `aria-hidden="true"` on decorative SVG icons so they don't add meaningless text.

---

## Testing

**In component and page tests**, query with `getByRole(role, { name })` from Testing Library
instead of `data-testid`: the query fails when the role or the accessible name is missing, so
every such test checks accessibility too.

**If the app has Storybook**, `@storybook/addon-a11y` runs axe on every story. Set
`parameters.a11y.test` in `.storybook/preview` to `'error'` so a violation fails the test run
(`'todo'` reports only, `'off'` skips). Then writing the test means writing stories:

- **One story per meaningful state** (default, disabled, error, each variant and color). axe only
  checks what renders, so more states mean more coverage.
- **Give controls an accessible name in the story** - unlabeled controls fail under `'error'`:

  ```tsx
  export const Default: Story = { args: { color: 'primary', 'aria-label': 'Search' } }
  ```

- **Stateful violations (focus, expanded, an error after submit) go in `play`**; axe runs after
  `play`:

  ```tsx
  import { userEvent, within } from 'storybook/test'

  export const Invalid: Story = {
    args: { 'aria-label': 'Email', type: 'email' },
    play: async ({ canvasElement }) => {
      const input = within(canvasElement).getByRole('textbox', { name: 'Email' })
      await userEvent.type(input, 'bad@')
      await userEvent.tab()
    },
  }
  ```

- **Quarantine or tune a rule per story only with a written reason:**

  ```tsx
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  }
  // or test: 'todo' to keep a known-failing story out of the failing run
  ```

**Without Storybook**, run axe on rendered pages - for example `@axe-core/playwright` in the
app's end-to-end tests.

axe catches about 30%. Keyboard order, `:focus-visible` and effective contrast under `opacity`
still need checking by hand.

---

## Anti-patterns

- Relying only on automated tools - they miss about 70% of issues
- Using ARIA to patch non-semantic HTML instead of fixing the HTML
- Removing focus indicators for looks
- Hiding content with `display: none` and expecting AT to read it
- Using `opacity` on text without checking the effective contrast against the real background
- Icon-only controls (checkbox, switch, button) without `aria-label`
- Several `<nav>` / `<main>` / `<header>` landmarks without unique labels
- Treating accessibility as a post-launch addition
