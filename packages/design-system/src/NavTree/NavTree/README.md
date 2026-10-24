# NavTree

A tree of links to the pages of a site: its [`NavGroup`](../NavGroup/README.md)s, each with its
[`NavLink`](../NavLink/README.md)s, and any link of its own. It is plain markup - links and lists,
nothing that needs JavaScript - so it is in the server-rendered page and works with scripts off. A
group that folds is a native `details`. The current page is a pill of the tree's color; a hovered
link is a wash of it.

It is what goes in the panel of a navigation rail - a [`Sidebar`](../../Sidebar/Sidebar/README.md)
with `layout="stacked"` and a `panel` - or in a drawer, or in a column of its own.

```tsx
import { NavTree, NavGroup, NavLink } from '@soroush.tech/design-system/NavTree'

;<nav aria-label="Documentation">
  <NavTree>
    <NavGroup label="Get started">
      <NavLink href="/install/">Installation</NavLink>
      <NavLink href="/usage/" isCurrent>
        Usage
      </NavLink>
    </NavGroup>
    <NavGroup label="Components" isCollapsible isOpen>
      <NavLink href="/components/button/">Button</NavLink>
      <NavLink href="/components/tabs/" note="v2">
        Tabs
      </NavLink>
    </NavGroup>
    <NavGroup label="More">
      <NavLink href="https://github.com/soroush-tech" isExternal>
        Source
      </NavLink>
    </NavGroup>
  </NavTree>
</nav>
```

## Props

Also accepts every `Flex` prop (spacing, layout, ...).

| Prop       | Type                     | Default     | Description                                                                            |
| ---------- | ------------------------ | ----------- | -------------------------------------------------------------------------------------- |
| `children` | `ReactNode`              | -           | `NavGroup`s and `NavLink`s.                                                            |
| `color`    | `keyof Theme['palette']` | `'primary'` | Color of the current page's pill, a hovered link and the focus ring - the group's too. |

## Accessibility

`NavTree` is a column with no role of its own: put it in a landmark you name - a `nav` with an
`aria-label`, or the panel of a `Sidebar`, which is one. A `NavGroup` that does not fold is a
`section` named by its heading; one that folds is a `details` and its name is the `summary` - a
button the keys open and close (Enter and Space), with the links under it. A link is an anchor,
followed by Enter, and the current page is marked `aria-current="page"`.

## Theming

| Slot   | Element                 |
| ------ | ----------------------- |
| `root` | The column of the tree. |

Customize via `theme.components.NavTree.styleOverrides`; `NavGroup` and `NavLink` have slots of their own.
