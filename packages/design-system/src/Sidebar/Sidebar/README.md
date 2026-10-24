# Sidebar

A collapsible vertical icon rail. Collapsed, it shows icon-only `SidebarItem`s; open, each item's
label appears next to its icon - rendered **away from the anchored edge** (a right-anchored rail
shows labels to the left of the icons). The rail renders as a `<nav>` landmark and requires an
`aria-label` so multiple navigation regions stay distinguishable.

The open state is **purely controlled**: pass `isOpen` and flip it from wherever your layout
keeps the menu toggle - usually a hamburger button in the app bar, not inside the rail. Children
compose freely: `SidebarItem`s, a sponsor logo, a footer, dividers - anything. Items read the
open state and anchor through `SidebarContext`, so they need no wiring of their own.

## Usage

```tsx
import { Sidebar, SidebarItem } from '@soroush.tech/design-system/Sidebar'

const [isOpen, setIsOpen] = useState(false)

// The toggle lives in your app bar:
<Button aria-label="Expand menu" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
  <Icon name="menu" />
</Button>

<Sidebar aria-label="Editor panels" anchor="right" isOpen={isOpen} bg="paper">
  <SidebarItem icon="folder" label="Directory" isSelected onSelect={openDirectory} />
  <SidebarItem icon="terminal" label="Terminal console" onSelect={openTerminal} />
  <Typography variant="caption" mt="auto">v1.1.0</Typography>
</Sidebar>
```

## Navigation rail

`layout="stacked"` makes the rail a navigation rail, as in Material 3: each item's label is under its
icon, always shown, in a rail of one width (`stackedWidth`, `5.5rem`) that does not animate. `isOpen`
has nothing to do and is ignored. The selected item's fill is on a pill behind its icon, and a
hovered item tints its pill. The default, `layout="inline"`, is the collapsible rail described
above and does not change.

```tsx
<Sidebar aria-label="Primary" layout="stacked">
  <SidebarItem icon="home" label="Home" href="/" aria-current="page" aria-pressed={undefined} />
  <SidebarItem icon="search" label="Search" href="/search" aria-pressed={undefined} />
</Sidebar>
```

## Panel column

With `hasPanel`, the rail gains a second column and the **selected** item's `children` render
there instead of inside its row - an icon rail beside a detail panel. Without it, `children`
render inline in the row as usual, so the mode is opt-in and changes nothing for existing rails.

```tsx
<Sidebar aria-label="Editor panels" isOpen={isOpen} hasPanel panelWidth="20rem">
  <SidebarItem
    icon="folder"
    label="Directory"
    isSelected={panel === 'directory'}
    onSelect={() => setPanel('directory')}
  >
    <DirectoryTree /> {/* renders in the panel, not in the row */}
  </SidebarItem>
</Sidebar>
```

Selection stays yours - the rail only decides _where_ the selected item's children go. The
selected item **ports** its children into the panel through `Portal`, so they stay declared and
mounted inside the item: whatever context, state, and handlers they close over resolve against the
item's own position in the React tree, and the item can sit at any depth in the rail - inside your
own grouping component, a fragment, or a `map` - with no requirement to be a direct child.

Because the content is ported rather than lifted, it is **client-only**: `Portal` renders nothing
during server rendering, so a server-rendered panel arrives empty and fills in on hydration. The
rail and its items server-render as normal.

- The panel column stays mounted as the port target, but **collapses while empty** (`:empty`), so
  nothing selected - or a selection with no children - leaves no gap. Unnamed while empty too, so
  an idle panel is not announced as a region.
- It is **independent of `isOpen`**, so a collapsed icons-only rail can sit beside an open panel.
- It sits on the rail's inner side, following `anchor`, and **inside the `<nav>`**, so the rail's
  `bg` and padding cover it too rather than stopping at the rail's edge.
- The panel is a `<section>` named by the item's `label`, and that item becomes a disclosure -
  `aria-expanded`, plus `aria-controls` pointing at the panel while it is shown.

### A panel rendered in place

`hasPanel` fills the panel on the client: the selected item's children are ported in through
`Portal`, so the markup the server renders has an empty panel. For a panel the page already knows -
a navigation tree beside a navigation rail - pass it as `panel`. It is rendered in place, so it is in
the server-rendered markup and works with JavaScript off. `panel` takes the place of `hasPanel`:
with both, the items keep their `children` in their rows.

```tsx
<Sidebar
  aria-label="Primary"
  layout="stacked"
  panel={<NavTree>...</NavTree>}
  panelProps={{ 'aria-label': 'Components', bg: 'secondary' }}
>
  <SidebarItem icon="add_circle" label="Components" href="/components/" aria-pressed={undefined} />
</Sidebar>
```

Style or re-tag the column with `panelProps` - any `Flex` prop, plus `as`. It overrides
`panelWidth` and the derived `aria-label`; the `id` and ref stay with the rail, which needs them
as the port target and the `aria-controls` anchor.

```tsx
<Sidebar aria-label="Editor panels" isOpen={isOpen} hasPanel
  panelProps={{ as: 'aside', bg: 'paper', p: 3, borderLeft: 'thin' }}
>
```

## Props

Also accepts every `Flex` prop (`bg`, spacing, layout, ...).

| Prop             | Type                                                       | Default    | Description                                                                                     |
| ---------------- | ---------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `children`       | `ReactNode`                                                | -          | Rail contents - items and any other nodes.                                                      |
| `isOpen`         | `boolean`                                                  | `false`    | Whether item labels are shown. Controlled. A `stacked` rail always shows them.                  |
| `layout`         | `'inline' \| 'stacked'`                                    | `'inline'` | `inline` is the collapsible icon rail; `stacked` puts each label under its icon, always shown.  |
| `stackedWidth`   | `string`                                                   | `'5.5rem'` | Rail width of a `stacked` layout.                                                               |
| `panel`          | `ReactNode`                                                | -          | The panel column's content, rendered in place (server-rendered). Takes the place of `hasPanel`. |
| `anchor`         | `'left' \| 'right'`                                        | `'left'`   | Screen edge the rail hugs - labels render away from it.                                         |
| `variant`        | `'text' \| 'outlined' \| 'plain'`                          | `'text'`   | Default variant for every item - an item's own `variant` wins.                                  |
| `expandedWidth`  | `string`                                                   | `'14rem'`  | Rail width while open.                                                                          |
| `collapsedWidth` | `string`                                                   | `'3.5rem'` | Rail width while collapsed (icons only).                                                        |
| `hasPanel`       | `boolean`                                                  | `false`    | Render the selected item's `children` in a second column.                                       |
| `panelWidth`     | `string`                                                   | `'18rem'`  | Width of the panel column. Only meaningful with `hasPanel` or `panel`.                          |
| `panelProps`     | `Omit<FlexProps, 'children'\|'id'> & { as?: ElementType }` | -          | Props for the panel column - any `Flex` prop, plus `as`.                                        |
| `aria-label`     | `string`                                                   | -          | Required accessible name of the `<nav>` landmark.                                               |

## Theming

| Slot    | Element                                                            |
| ------- | ------------------------------------------------------------------ |
| `root`  | The `<nav>` landmark wrapping the rail and, when shown, the panel. |
| `rail`  | The animating icon column.                                         |
| `panel` | The `<section>` column shown by `hasPanel`.                        |

The root holds no width of its own - it is sized by its contents, which is what lets `bg` and the
other `Flex` props cover the panel as well as the rail rather than stopping at the rail's edge.
The width animation lives on `rail`, runs 200ms, and honors `prefers-reduced-motion`.

Customize via `theme.components.Sidebar.styleOverrides`.
