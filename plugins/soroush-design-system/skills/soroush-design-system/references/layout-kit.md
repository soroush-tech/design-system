# App-level layout kit

These live in the app (`components/`), not the package. They're the shared vocabulary
that makes two apps read as one product. Copy them verbatim; adjust only the nav
items and brand wordmark.

Page anatomy, in order:

```
AppBar (TopBar)  →  rail/sidebar (optional)  →  Main column
                                                 └─ PageHeader
                                                 └─ SectionLabel (optional)
                                                 └─ PageCard  /  PageCard flush
```

---

## Main - the page column

Max 1600px, centered, 20px → 40px gutters at 600px, 48px bottom padding.

```tsx
'use client'
import { styled } from '@soroush.tech/design-system'
import { TOPBAR_HEIGHT } from './constants'

const MainRoot = styled('main')({
  width: '100%',
  maxWidth: '1600px',
  margin: '0 auto',
  padding: '0 20px 48px',
  minHeight: `calc(100vh - ${TOPBAR_HEIGHT} - 1px)`,
  '@media (min-width: 600px)': { padding: '0 40px 48px' },
})

export function Main({ children }: { children: React.ReactNode }) {
  return <MainRoot>{children}</MainRoot>
}
```

`components/chrome/constants.ts`: `export const TOPBAR_HEIGHT = "3.5rem";`

## PageCard - the content surface

White paper, 5px radius, hairline shadow, 20 → 30px padding at 800px.
`flush` drops the padding for children that own their own (tables, setting rows,
list rows).

```tsx
'use client'
import { styled } from '@soroush.tech/design-system'

export const PageCard = styled('section', {
  shouldForwardProp: (prop) => prop !== 'flush',
})<{ flush?: boolean }>(({ theme, flush }) => ({
  backgroundColor: theme.background.paper,
  borderRadius: '5px',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 3px 0',
  padding: flush ? 0 : '20px',
  '@media (min-width: 800px)': { padding: flush ? 0 : '30px' },
}))
```

## PageHeader - 32px title left, actions right

```tsx
'use client'
import { styled } from '@soroush.tech/design-system'

const Root = styled('section')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '10px',
  margin: '40px 0 24px',
})

const Title = styled('h1')(({ theme }) => ({
  margin: 0,
  fontSize: '32px',
  lineHeight: '40px',
  fontWeight: theme.fontWeights.bold,
  color: theme.text.initial,
}))

const Actions = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  whiteSpace: 'nowrap',
})

export function PageHeader({
  title,
  actions,
}: {
  title: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <Root>
      <Title>{title}</Title>
      {actions && <Actions>{actions}</Actions>}
    </Root>
  )
}
```

## SectionLabel - uppercase group heading above a card group

The `0.35em` tracking is the signature; don't soften it.

```tsx
import { styled } from '@soroush.tech/design-system'

export const SectionLabel = styled('h3')(({ theme }) => ({
  margin: 0,
  fontSize: '13px',
  lineHeight: '20px',
  fontWeight: theme.fontWeights.extraBold,
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: theme.text.secondary,
}))
```

## Pill - small rounded chip (counts, branches, severities)

Ghost by default (10% tint + 25% inset ring), `filled` for emphasis.

```tsx
'use client'
import { styled } from '@soroush.tech/design-system'
import type { PaletteColor } from '@soroush.tech/design-system'
import { alpha } from '@soroush.tech/design-system/utils'

const PillRoot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone' && prop !== 'filled',
})<{ tone: PaletteColor; filled: boolean }>(({ theme, tone, filled }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  fontSize: '12px',
  lineHeight: '12px',
  fontWeight: theme.fontWeights.bold,
  whiteSpace: 'nowrap',
  textTransform: 'capitalize',
  borderRadius: '3em',
  ...(filled
    ? { color: theme.palette[tone].contrastText, backgroundColor: theme.palette[tone].main }
    : {
        color: theme.palette[tone].main,
        backgroundColor: alpha(theme.palette[tone].main, 0.1),
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette[tone].main, 0.25)}`,
      }),
}))

export function Pill({
  children,
  tone = 'default',
  filled = false,
}: {
  children: React.ReactNode
  tone?: PaletteColor
  filled?: boolean
}) {
  return (
    <PillRoot tone={tone} filled={filled}>
      {children}
    </PillRoot>
  )
}
```

## StatusBadge - squared mono chip for machine states

Pill is for human labels, StatusBadge for enum values. The tone map is the pattern
worth copying: statuses map to palette slots in one table, so adding a status is one line.

```tsx
import { styled } from '@soroush.tech/design-system'
import type { PaletteColor } from '@soroush.tech/design-system'

const STATUS_TONE: Record<string, PaletteColor> = {
  PASSED: 'success',
  APPROVED: 'success',
  UNCHANGED: 'success',
  REJECTED: 'error',
  ERROR: 'error',
  PENDING_REVIEW: 'warning',
  CHANGED: 'warning',
  NEW: 'warning',
  QUEUED: 'info',
  RENDERING: 'info',
  COMPARING: 'info',
  PENDING: 'info',
}

const BadgeRoot = styled('span', { shouldForwardProp: (prop) => prop !== 'tone' })<{
  tone: PaletteColor
}>(({ theme, tone }) => ({
  display: 'inline-block',
  padding: '2px 10px',
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[0],
  fontWeight: theme.fontWeights.semiBold,
  letterSpacing: theme.letterSpacings.wide,
  whiteSpace: 'nowrap',
  color: theme.palette[tone].main,
  border: `${theme.borderWidths.thin} solid ${theme.palette[tone].main}`,
  borderRadius: theme.radii.sm,
}))

export function StatusBadge({ status }: { status: string }) {
  return (
    <BadgeRoot tone={STATUS_TONE[status] ?? 'default'}>{status.replaceAll('_', ' ')}</BadgeRoot>
  )
}
```

## StatStrip - 28px figures with labels, groups split by a stretched divider

Stacks on mobile, 25px-gapped row at 800px.

```tsx
import { styled } from '@soroush.tech/design-system'

const Value = styled('div')(({ theme }) => ({
  fontSize: '28px',
  lineHeight: '28px',
  fontWeight: theme.fontWeights.normal,
  color: theme.text.initial,
  marginBottom: '4px',
}))
const Label = styled('div')(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.text.secondary,
}))
export const StatDivider = styled('div')(({ theme }) => ({
  alignSelf: 'stretch',
  width: '1px',
  backgroundColor: theme.border.default,
}))
```

`<StatStrip primary={{label, value}} items={[...]} />` - one lead figure, a divider,
then the rest.

## TabNav - underline tab strip (the library has no Tabs)

Built on `Pressable`; active tab is a 3px inset bottom shadow in primary.

```tsx
import { styled } from '@soroush.tech/design-system'
import { Pressable } from '@soroush.tech/design-system/Pressable'

const Bar = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  boxShadow: `inset 0 -1px 0 ${theme.border.default}`,
}))

const Tab = styled(Pressable, { shouldForwardProp: (prop) => prop !== 'isActive' })<{
  isActive: boolean
}>(({ theme, isActive }) => ({
  padding: '10px 20px',
  fontSize: theme.fontSizes[1],
  fontWeight: theme.fontWeights.bold,
  lineHeight: '20px',
  color: isActive ? theme.palette.primary.main : theme.text.secondary,
  boxShadow: isActive ? `inset 0 -3px 0 0 ${theme.palette.primary.main}` : 'none',
  '&:hover': { color: theme.palette.primary.main },
}))
```

Set `aria-current="page"` on the active tab and `aria-label` on the `<nav>`.

## SettingCard / SettingGroup - icon | body | right action rows

`SettingGroup` is just `<PageCard flush>`; each `SettingCard` is a row with a
hairline `borderBottom` (`&:last-of-type` clears it). Layout: 48px icon box +
20px gutter, body `flex: 1 1 240px` capped at 600px, actions pushed right with
`marginLeft: auto` at 800px and full-width stacked below on mobile.
Title carries an optional inline `": Status"` in a palette tone.

## SearchInput - TextInput with an absolutely positioned magnifier

`<Icon name="zoom_in" color="secondary" size="1rem" />` at `left: 10px`,
`top: 50%`, `translateY(-50%)`, `pointerEvents: none`; the `TextInput` gets
`fullWidth pl={4} size="sm"` and an explicit `aria-label`. Wrapper caps at 320px.

## TopBar - sticky AppBar

```tsx
<AppBar position="sticky" top={0} height={TOPBAR_HEIGHT} size="sm"
        color="appBar" blur borderBottom="1px solid" borderColor="default">
  <Flex flexDirection="row" alignItems="center" justifyContent="space-between" gap={2} height="100%">
```

Brand wordmark: mono, bold, `letterSpacings.wide`, `fontSizes[2]`, `text.initial`,
hovering to `text.primary` - with a glyph prefix (`◧ DIFFCHROMA`). Breadcrumb is a
`<Sep>/</Sep>` separator in `text.secondary` plus a `NavLink`. Right cluster: user
email in `variant="caption" color="secondary" fontFamily="mono"` + a
`variant="text" size="sm"` action.

Gate anything reading `localStorage` behind a `mounted` state - it's unreadable
during SSR/hydration and will mismatch.

## ProjectRail - icon rail, 60px, sticky under the AppBar

Bottom bar on mobile (`space-evenly`, labels only, 14px), vertical rail at 600px
(icons appear, labels shrink to 11px, `position: sticky; top: TOPBAR_HEIGHT`,
`height: calc(100vh - TOPBAR_HEIGHT)`, 2rem top padding, 2.25rem item gap).
Active item is `palette.primary.main` + bold; hover lifts `translateY(-1px)` over
150ms. The icon takes `color="inherit"` so the link drives it.

Rail item shape: `{ segment, label, icon: IconName }`. Active segment is derived
from the pathname, defaulting to the first item.

## NavLink / TokenCode - the two text primitives

```tsx
import NextLink from 'next/link'
import { styled } from '@soroush.tech/design-system'

export const NavLink = styled(NextLink)(({ theme }) => ({
  color: theme.text.primary,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
}))

export const TokenCode = styled('code')(({ theme }) => ({
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[0],
  color: theme.text.primary,
  backgroundColor: theme.background.terminal,
  border: `${theme.borderWidths.thin} solid ${theme.border.default}`,
  borderRadius: theme.radii.sm,
  padding: '4px 8px',
  wordBreak: 'break-all',
}))
```

---

## Page composition template

```tsx
"use client";

export default function BuildsPage() {
  const [builds, setBuilds] = useState<BuildRow[] | null>(null);

  if (!builds) {
    return (
      <>
        <PageHeader title="Builds" />
        <PageCard flush><BuildRowsSkeleton /></PageCard>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Builds" actions={<BranchFilter ... />} />
      <PageCard flush>
        {visible.map((build) => <BuildListRow key={build.id} build={build} />)}
        {visible.length === 0 && (
          <Typography variant="body2" color="secondary" p={3} as="div">
            No builds yet - run the DiffChroma action or `pnpm simulate`.
          </Typography>
        )}
      </PageCard>
    </>
  );
}
```

Three things to keep: the loading branch renders the _same_ header with a
shape-matched skeleton (no spinner, no layout shift); the empty state is a
`body2 / secondary / p={3}` line inside the card, never a blank card; and it says
what to do next, not just "no data".
