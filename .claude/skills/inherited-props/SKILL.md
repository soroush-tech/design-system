---
description: How a design-system container and its children share a look - a row (Tabs, MenuList, Table) sets color/textColor/size/... for every child (Tab, MenuItem, TableCell), a child's own value wins, and the theme's defaultProps sit in between. The resolution chain, the `rowProps` context, the pieces that follow the selected child, the 2- and 3-level forms, and the docs/tests/catalog chores. Use when adding a prop that a parent sets for its children, or a child prop that falls back to its parent's.
paths: packages/design-system/**
---

# Inherited props - a row's look, a child's own value

Like a table cell: the row sets the look, the cell may set its own, and the cell's own wins.

Canonical reference: `src/Tabs/Tabs/Tabs.tsx`, `src/Tabs/Tab/Tab.tsx`, `src/Tabs/TabsContext.ts`.
Three-level form: `src/Menu/MenuList/MenuList.tsx` → `src/MenuItem/MenuItem.tsx`.

## The chain

A **child** resolves each inherited prop in this order - first defined wins:

```ts
const color = colorProp ?? rowProps.color ?? dp.color ?? tabs.color
//            own prop     set on the row    theme's     the row's resolved value
//                                           Tab dp      (row prop ?? row dp ?? theme.defaults ?? literal)
```

1. **Its own prop.**
2. **What was set on the row itself** (`rowProps`) - only props the consumer passed to the parent,
   never the parent's resolved value. A value set on the row beats the theme's defaults for every
   child.
3. **`theme.components.Child.defaultProps`** (`useDefaultProps('Child')`).
4. **The row's resolved value** - the parent's own chain: its prop ?? `useDefaultProps('Parent')`
   ?? `themeDefault(theme, key, literal)`. A theme default for every child beats the row's default.

Why step 2 is separate from step 4: with only the resolved value in context, a theme's
`Tab.defaultProps.color` would either always lose to the row's literal default (`'primary'`) or
always beat a color the consumer set on the row. `rowProps` keeps both right.

The **parent** resolves as any component does:

```ts
const color = colorProp ?? dp.color ?? themeDefault(theme, 'color', 'primary')
```

## The parent's side

- A `XRowProps` type in the context file, typed with theme keys, and a `rowProps` in the context
  value - memoized from the **raw** props only:
  ```ts
  const rowProps = useMemo<TabRowProps>(
    () => ({ color: colorProp, textColor, size: sizeProp, selectedBg: selectedBgProp }),
    [colorProp, textColor, sizeProp, selectedBgProp]
  )
  ```
- The resolved values stay in the context too (`color`, `size`, ...) - step 4 reads them.

### Pieces the row draws for one child

What the parent draws on a child's behalf - the underline indicator, the enclosed divider, the
overflow button and its ✕ - follows the **selected** child, so the line stays one line when that
child has a color of its own. The parent resolves it with the child's same chain and puts it in
the context:

```ts
const tabDp = useDefaultProps('Tab')
const selectedTab = readTabs(children).find((tab) => tab.value === selectedValue)
const selectedColor = selectedTab?.color ?? colorProp ?? tabDp.color ?? color
```

A sibling piece with a look of its own (`TabScrollButton`) takes the same chain, its last step
being that shared value: `colorProp ?? dp.color ?? tabs.selectedColor`. Its text color follows the
child chain: `textColorProp ?? tabs.rowProps.textColor ?? dp.textColor ?? tabs.textColor ?? 'primary'`.
Outside its parent (no context) it is a plain component with its own fallback.

## Three levels

A middle level (Menu → MenuList → MenuItem) **passes through without a literal**, so the leaf still
applies its own chain:

```ts
// MenuList: own ?? its parent's ?? its theme defaults - undefined when none set it
const rowColor = color ?? parent?.color ?? dp.color
// MenuItem: own ?? its list's ?? its theme defaults ?? the literal
const color = colorProp ?? menu?.color ?? dp.color ?? themeDefault(theme, 'color', 'primary')
```

The value a pass-through level puts in context is "what was set above me" - the same role as
`rowProps`. Only the leaf (or the parent whose look it is) ends in a literal.

## What does not cascade

Keep a prop on the row only when the children must agree on it: `variant`, `orientation`,
`hasDivider`, `fullWidth` - one tab in another look breaks the shared line and indicator. Skip
a prop on a piece that sizes itself to its siblings (a scroll button's `size`: its width is an
icon's and its height stretches to the tabs).

## Checklist for a new inherited prop

1. **Types** - `keyof Theme['palette']` (`color`), `keyof Theme['text']` (`textColor`),
   `keyof Theme['sizes']` (`size`), `keyof Theme['background']` (grounds). Doc comment ends with
   the default: ``Default: its `Tabs`'.``
2. **Context** - add it to `XRowProps` and to `rowProps`' memo and deps.
3. **Child** - resolve it with the chain; pass the **resolved** value to the styled root, so
   `ownerState` sees it.
4. **Theme** - add it to `ChildOwnerState` in `src/theme/themes.ts`
   (`Child?: ComponentConfig<ChildOwnerState, slots>`); a new component reading `useDefaultProps`
   goes in the list in `docs/customization.md`.
5. **Stories** - a control in `controls.include`, options from `utils/test/storiesOptions`
   (`buttonColorTokens`, `textColorTokens`, `textInputSizeTokens`, `backgroundTokens`),
   `defaultValue: { summary: "its Tabs'" }`, category `Visual` or `Layout`. One story showing
   children with their own look against the row's.
6. **Catalog** - `options: { color: { scale: 'palette' }, textColor: { scale: 'text' }, size: { scale: 'sizes' } }`.
7. **README** - a props-table row ("its `Tabs`'" as the default) and one paragraph stating the
   order. Release notes: the order once, in plain words.
8. **Tests** - one per step of the chain:
   - its own value beats the row's;
   - a value set on the row beats `theme.components.Child.defaultProps`;
   - the theme's child default beats the row's own default;
   - a piece the row draws follows the selected child, and moves when the selection does.

## Gotchas

- Computed `box-shadow` and `border` colors come back lower-case: compare with
  `baseTheme.palette.x.main.toLowerCase()`.
- A disabled state's color wins over the one under test (a scroll button at a row's end is
  disabled in jsdom): render it with `disabled={false}`.
- `react-hooks-js(preserve-manual-memoization)` on a memo dep derived from an array that is passed
  on to a hook later (`readTabs(children)` into `useTabsOverflow`): derive the dep from its own
  read instead of sharing the array.
- Never resolve against the parent's resolved value at step 2 - that is the bug `rowProps` exists
  to prevent.
