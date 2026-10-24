# NavLink

A link to a page of the site, a row of a [`NavTree`](../NavTree/README.md): its name, an optional
note beside it, and a fill when it is the current page. It is a plain anchor - the keyboard
follows it as any link - and the current page is marked `aria-current="page"`. An external link
opens in a tab of its own, `noopener noreferrer`, and carries an arrow after its name so it is not
taken for a page of the site.

```tsx
<NavLink href="/components/button/" isCurrent>Button</NavLink>
<NavLink href="/markdown/" note="v1.2.3">Markdown</NavLink>
<NavLink href="https://github.com/soroush-tech" isExternal>Source</NavLink>
```

## Props

Also accepts every attribute of an `a` - they win over what `isExternal` sets.

| Prop         | Type                     | Default         | Description                                                             |
| ------------ | ------------------------ | --------------- | ----------------------------------------------------------------------- |
| `href`       | `string`                 | -               | Where it goes.                                                          |
| `children`   | `ReactNode`              | -               | The name of the page.                                                   |
| `isCurrent`  | `boolean`                | `false`         | The page the reader is on: `aria-current="page"`, filled.               |
| `note`       | `ReactNode`              | -               | A short note beside the name - a version, a count.                      |
| `isExternal` | `boolean`                | `false`         | The page is outside the site: a tab of its own, with an arrow after it. |
| `color`      | `keyof Theme['palette']` | its `NavTree`'s | Color of the pill and the focus ring.                                   |

## Theming

| Slot    | Element     |
| ------- | ----------- |
| `root`  | The anchor. |
| `label` | The name.   |
| `note`  | The note.   |

Customize via `theme.components.NavLink.styleOverrides`.
