# NavGroup

A group of a [`NavTree`](../NavTree/README.md): a name over a list of [`NavLink`](../NavLink/README.md)s.
Plain, the name is a heading and the links always show; with `isCollapsible` the name is a `summary` and
the links fold under it - a native `details`, so it folds and opens with scripts off. Each child is put in
a list item of the group's list.

```tsx
<NavGroup label="Components" isCollapsible isOpen={holdsCurrentPage}>
  <NavLink href="/components/button/">Button</NavLink>
  <NavLink href="/components/tabs/">Tabs</NavLink>
</NavGroup>
```

## Props

Also accepts every attribute of an HTML element.

| Prop            | Type        | Default | Description                                                                                                 |
| --------------- | ----------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `label`         | `ReactNode` | -       | The group's name - a heading, or the button that folds it.                                                  |
| `children`      | `ReactNode` | -       | The `NavLink`s of the group.                                                                                |
| `isCollapsible` | `boolean`   | `false` | The group folds under its label, as a native `details`.                                                     |
| `isOpen`        | `boolean`   | `false` | Whether a collapsible group is open. The reader can still fold it; a change of the prop opens or closes it. |

## Theming

| Slot    | Element                                                 |
| ------- | ------------------------------------------------------- |
| `root`  | The `section`, or the `details` of a collapsible group. |
| `label` | The heading, or the `summary` of a collapsible group.   |
| `list`  | The list of links.                                      |

Customize via `theme.components.NavGroup.styleOverrides`.
