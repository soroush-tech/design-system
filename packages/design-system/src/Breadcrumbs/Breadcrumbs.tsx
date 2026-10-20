import {
  Children,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from 'react'
import { styled, get } from '../index'
import { useDefaultProps } from '../theme'
import { themeDefault } from '../theme/utils/themeDefault'
import { Icon, type IconProps } from '../Icon'
import { Typography, type TypographyProps, type TypographyVariant } from '../Typography'

export interface BreadcrumbsProps extends Omit<TypographyProps, 'children' | 'variant'> {
  /** The crumbs - the app's `Link`s, and the current page as `Typography` or a `Link` with `aria-current="page"`. */
  children?: ReactNode
  /** The trail's type - a `theme.typography` variant, given to its root `Typography`. Default: `'body1'`. */
  typography?: TypographyVariant
  /** Between two crumbs. Default: `'/'`. */
  separator?: ReactNode
  /** Past this many crumbs the trail collapses, a button standing for the ones between. Default: `8`. */
  maxItems?: number
  /** Crumbs shown before the button when collapsed. Default: `1`. */
  itemsBeforeCollapse?: number
  /** Crumbs shown after the button when collapsed. Default: `1`. */
  itemsAfterCollapse?: number
  /** Names the button that shows the whole trail - no built-in text; a theme gives it through `defaultProps`. */
  expandLabel?: string
  /** An icon of your own in the button, in place of `more_horiz`. */
  slots?: { collapsedIcon?: ElementType }
  /** Props for the button's icon. */
  slotProps?: { collapsedIcon?: Partial<Omit<IconProps, 'name'>> & { 'data-testid'?: string } }
  'data-testid'?: string
}

const BreadcrumbsRoot = styled(Typography as ComponentType<TypographyProps>, {
  name: 'Breadcrumbs',
  label: 'Breadcrumbs',
})({})

const BreadcrumbsList = styled('ol', {
  name: 'Breadcrumbs',
  slot: 'list',
  label: 'BreadcrumbsList',
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

// A crumb is one line of the trail: a paragraph's spacing (a body1 Typography is a `p`) would lift
// it off the others' line.
const BreadcrumbsItem = styled('li', {
  name: 'Breadcrumbs',
  slot: 'item',
  label: 'BreadcrumbsItem',
})({ display: 'flex', alignItems: 'center', '& > *': { marginBlock: 0 } })

// Decoration between two crumbs, out of the accessibility tree. An icon separator points the way
// the trail reads, so it mirrors right to left; a character stays as it is.
const BreadcrumbsSeparator = styled('li', {
  name: 'Breadcrumbs',
  slot: 'separator',
  label: 'BreadcrumbsSeparator',
})(({ theme }) => ({
  display: 'flex',
  userSelect: 'none' as const,
  marginInline: theme.space[1],
  '[dir="rtl"] & svg': { transform: 'scaleX(-1)' },
}))

// The button standing for the crumbs between: a small raised pill, apart from the links.
const BreadcrumbsCollapsed = styled('button', {
  name: 'Breadcrumbs',
  slot: 'collapsed',
  label: 'BreadcrumbsCollapsed',
})(({ theme }) => {
  const main = get(theme, `palette.${themeDefault(theme, 'color', 'primary')}.main`)
  return {
    appearance: 'none' as const,
    display: 'flex',
    alignItems: 'center',
    marginInline: theme.space[0.5],
    padding: `0 ${theme.space[0.5]}`,
    border: 'none',
    borderRadius: theme.radii.sm,
    backgroundColor: get(theme, 'background.paper'),
    color: 'inherit',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': { backgroundColor: `${main}1F` },
    '&:focus-visible': {
      outline: `${theme.borderWidths.base} solid ${main}`,
      outlineOffset: theme.borderWidths.thin,
    },
  }
})

const BreadcrumbsCollapsedIcon = styled('span', {
  name: 'Breadcrumbs',
  slot: 'collapsedIcon',
  label: 'BreadcrumbsCollapsedIcon',
})({ display: 'inline-flex' })

/**
 * @description The trail of links from a site's root to the current page - a `nav` landmark named
 * by `aria-label`, its crumbs an ordered list with a separator between two. Past `maxItems` the
 * trail collapses to its first and last crumbs and a button that shows them all.
 */
export function Breadcrumbs({
  children,
  as = 'nav',
  separator: separatorProp,
  maxItems: maxItemsProp,
  itemsBeforeCollapse: itemsBeforeCollapseProp,
  itemsAfterCollapse: itemsAfterCollapseProp,
  expandLabel: expandLabelProp,
  color: colorProp,
  typography,
  slots,
  slotProps,
  ...rest
}: Readonly<BreadcrumbsProps>) {
  const dp = useDefaultProps('Breadcrumbs')
  const separator = separatorProp ?? dp.separator ?? '/'
  const maxItems = maxItemsProp ?? dp.maxItems ?? 8
  const itemsBeforeCollapse = itemsBeforeCollapseProp ?? dp.itemsBeforeCollapse ?? 1
  const itemsAfterCollapse = itemsAfterCollapseProp ?? dp.itemsAfterCollapse ?? 1
  const expandLabel = expandLabelProp ?? dp.expandLabel
  const color = colorProp ?? dp.color ?? 'secondary'

  const [isExpanded, setIsExpanded] = useState(false)
  const listRef = useRef<HTMLOListElement>(null)
  // The button goes as the trail opens: focus moves to the trail's first link, so it isn't lost.
  const shouldFocusRef = useRef(false)
  useLayoutEffect(() => {
    if (!shouldFocusRef.current) return
    shouldFocusRef.current = false
    listRef.current?.querySelector<HTMLElement>('a[href],button,[tabindex]')?.focus()
  }, [isExpanded])

  const crumbs = Children.toArray(children)
    .filter(isValidElement)
    // Children.toArray gave each crumb a key of its own.
    .map((child) => <BreadcrumbsItem key={child.key}>{child}</BreadcrumbsItem>)

  // Collapsed only when it hides something: before and after covering every crumb shows them all.
  const isCollapsed =
    !isExpanded &&
    crumbs.length > maxItems &&
    itemsBeforeCollapse + itemsAfterCollapse < crumbs.length
  const CollapsedIcon = slots?.collapsedIcon
  const shown = isCollapsed
    ? [
        ...crumbs.slice(0, itemsBeforeCollapse),
        <BreadcrumbsItem key="collapsed">
          <BreadcrumbsCollapsed
            type="button"
            aria-label={expandLabel}
            onClick={() => {
              shouldFocusRef.current = true
              setIsExpanded(true)
            }}
          >
            <BreadcrumbsCollapsedIcon>
              {CollapsedIcon ? (
                <CollapsedIcon {...slotProps?.collapsedIcon} />
              ) : (
                <Icon name="more_horiz" size="sm" color="inherit" {...slotProps?.collapsedIcon} />
              )}
            </BreadcrumbsCollapsedIcon>
          </BreadcrumbsCollapsed>
        </BreadcrumbsItem>,
        ...crumbs.slice(crumbs.length - itemsAfterCollapse),
      ]
    : crumbs

  return (
    <BreadcrumbsRoot as={as} color={color} variant={typography} {...rest}>
      <BreadcrumbsList ref={listRef}>
        {shown.flatMap((crumb, index) =>
          index === 0
            ? [crumb]
            : [
                // Keyed by the crumb it comes before - stable as crumbs come and go.
                <BreadcrumbsSeparator key={`separator-${crumb.key}`} aria-hidden>
                  {separator}
                </BreadcrumbsSeparator>,
                crumb,
              ]
        )}
      </BreadcrumbsList>
    </BreadcrumbsRoot>
  )
}
