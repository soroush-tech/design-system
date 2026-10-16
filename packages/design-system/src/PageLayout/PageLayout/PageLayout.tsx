import type { ReactNode } from 'react'
import { styled, layout, type Theme } from '../../index'
import { Grid, type GridProps } from '../../Grid'
import { View } from '../../View'
import type { CSSObject, LayoutPanel, LayoutPanels } from '../../theme'
import { layoutLength, layoutStyles } from '../layoutStyles'

export type PageLayoutPanelSide = keyof LayoutPanels
export type PageLayoutBarPlacement = 'top' | 'bottom'

export interface PageLayoutProps extends GridProps {
  /** The page content, in the theme's content container (fluid or fixed per breakpoint). */
  children: ReactNode
  /** The top bar - its height per breakpoint is `theme.layout.*.bars.top`; absent where unset or `0`. */
  topBar?: ReactNode
  /** The bottom bar - its height per breakpoint is `theme.layout.*.bars.bottom`; absent where unset or `0`. */
  bottomBar?: ReactNode
  /** The start-side panel, laid out per breakpoint by `theme.layout.*.panels.start`. */
  startPanel?: ReactNode
  /** The end-side panel, laid out per breakpoint by `theme.layout.*.panels.end`. */
  endPanel?: ReactNode
  /** Which `overlay` panels are open. Panels in another mode ignore it. Default: none. */
  openPanels?: { [Side in PageLayoutPanelSide]?: boolean }
}

/** Which regions the page renders - an absent one gets no track. */
type PageLayoutRegions = Record<PageLayoutBarPlacement | PageLayoutPanelSide, boolean>

// A panel takes a track only inline (its width) or collapsed (its rail width).
const panelTrack = (theme: Theme, panel?: LayoutPanel) => {
  if (panel?.mode === 'inline') return layoutLength(theme, panel.width)
  if (panel?.mode === 'collapsed') return layoutLength(theme, panel.railWidth)
  return '0px'
}

// The page grid. Its tracks change per breakpoint; `layout` comes last so a
// `minHeight`/`height` prop beats the default height.
const PageLayoutRoot = styled(Grid, {
  name: 'PageLayout',
  label: 'PageLayout',
  shouldForwardProp: (prop) => prop !== 'regions',
  systemProps: [layout],
})<{ regions: PageLayoutRegions }>(
  {
    position: 'relative',
    minHeight: '100dvh',
    gridTemplateAreas: '"top top top" "start content end" "bottom bottom bottom"',
  },
  ({ theme, regions }) =>
    layoutStyles(theme, ({ bars, panels }) => {
      const track = (side: PageLayoutPanelSide) =>
        regions[side] ? panelTrack(theme, panels[side]) : '0px'
      const row = (placement: PageLayoutBarPlacement) =>
        regions[placement] ? layoutLength(theme, bars[placement]) : '0px'
      return {
        gridTemplateColumns: `${track('start')} minmax(0, 1fr) ${track('end')}`,
        gridTemplateRows: `${row('top')} minmax(0, 1fr) ${row('bottom')}`,
      }
    })
)

const PageLayoutBar = styled(View, {
  name: 'PageLayout',
  slot: 'bar',
  label: 'PageLayoutBar',
  shouldForwardProp: (prop) => prop !== 'placement',
})<{ placement: PageLayoutBarPlacement }>(({ theme, placement }) => ({
  gridArea: placement,
  minWidth: 0,
  ...layoutStyles(theme, ({ bars }) => ({
    display: layoutLength(theme, bars[placement]) === '0px' ? 'none' : 'block',
  })),
}))

// An overlay panel sits over the page at its open width; every other mode is a
// grid item, so each breakpoint resets what an overlay set.
const panelStyle = (
  theme: Theme,
  side: PageLayoutPanelSide,
  isOpen: boolean,
  panel?: LayoutPanel
): CSSObject => {
  if (panel?.mode === 'overlay') {
    const inset = side === 'start' ? 'insetInlineStart' : 'insetInlineEnd'
    return {
      display: isOpen ? 'block' : 'none',
      position: 'absolute',
      insetBlock: 0,
      [inset]: 0,
      width: layoutLength(theme, panel.width),
      zIndex: theme.zOrder.drawer,
    }
  }
  const isHidden = !panel || panel.mode === 'hidden'
  return { display: isHidden ? 'none' : 'block', position: 'static', width: 'auto', zIndex: 'auto' }
}

const PageLayoutPanel = styled(View, {
  name: 'PageLayout',
  slot: 'panel',
  label: 'PageLayoutPanel',
  shouldForwardProp: (prop) => prop !== 'side' && prop !== 'isOpen',
})<{ side: PageLayoutPanelSide; isOpen: boolean }>(({ theme, side, isOpen }) => ({
  gridArea: side,
  minWidth: 0,
  overflow: 'auto',
  ...layoutStyles(theme, ({ panels }) => panelStyle(theme, side, isOpen, panels[side])),
}))

// The content container: the breakpoint's margin as inline padding, and in
// `fixed` mode centred at its max width.
const PageLayoutContent = styled(View, {
  name: 'PageLayout',
  slot: 'content',
  label: 'PageLayoutContent',
})(({ theme }) => ({
  gridArea: 'content',
  minWidth: 0,
  width: '100%',
  ...layoutStyles(theme, ({ content: { margin, mode, maxWidth } }) => {
    const isFixed = mode === 'fixed'
    return {
      paddingInline: layoutLength(theme, margin),
      maxWidth: isFixed && maxWidth !== undefined ? layoutLength(theme, maxWidth) : 'none',
      marginInline: isFixed ? 'auto' : 0,
    }
  }),
}))

/**
 * The page frame from `theme.layout`: bars on top and bottom, side panels at the
 * start and end, and the content container between them, each breakpoint
 * arranged by its layout entry in CSS alone (no JavaScript media queries, so
 * server rendering matches the client). Lay the content out on the theme's
 * columns with `LayoutGrid`.
 */
export function PageLayout({
  children,
  topBar,
  bottomBar,
  startPanel,
  endPanel,
  openPanels = {},
  ...rest
}: Readonly<PageLayoutProps>) {
  const regions = {
    top: topBar != null,
    bottom: bottomBar != null,
    start: startPanel != null,
    end: endPanel != null,
  }
  return (
    <PageLayoutRoot regions={regions} {...rest}>
      {regions.top && <PageLayoutBar placement="top">{topBar}</PageLayoutBar>}
      {regions.start && (
        <PageLayoutPanel side="start" isOpen={!!openPanels.start}>
          {startPanel}
        </PageLayoutPanel>
      )}
      <PageLayoutContent>{children}</PageLayoutContent>
      {regions.end && (
        <PageLayoutPanel side="end" isOpen={!!openPanels.end}>
          {endPanel}
        </PageLayoutPanel>
      )}
      {regions.bottom && <PageLayoutBar placement="bottom">{bottomBar}</PageLayoutBar>}
    </PageLayoutRoot>
  )
}
