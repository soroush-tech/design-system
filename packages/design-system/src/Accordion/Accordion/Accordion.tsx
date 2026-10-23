import {
  Children,
  useContext,
  useId,
  useMemo,
  type ComponentType,
  type ReactNode,
  type SyntheticEvent,
} from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, type Theme } from '../../index'
import { useDefaultProps } from '../../theme'
import { themeDefault } from '../../theme/utils/themeDefault'
import { getSurfaceRadius } from '../../utils/getSurfaceRadius'
import { Collapse, type CollapseProps } from '../../Collapse'
import { useControlled } from '../../utils/useControlled'
import {
  AccordionContext,
  AccordionGroupContext,
  getRegionId,
  getSummaryId,
} from '../AccordionContext'

/** What an `Accordion` hands the transition that opens and closes its region. */
export type AccordionTransitionProps = Pick<
  CollapseProps,
  | 'isShown'
  | 'children'
  | 'shouldAppear'
  | 'shouldMountOnEnter'
  | 'shouldUnmountOnExit'
  | 'timeout'
  | 'easing'
>

export interface AccordionProps extends SpaceProps<Theme> {
  /** An `AccordionSummary`, then what it opens - `AccordionDetails`, `AccordionActions`. */
  children: ReactNode
  /** Whether it is open. Controlled with `onChange`. */
  isExpanded?: boolean
  /** Whether it is open at first, when uncontrolled. Default: `false`. */
  defaultExpanded?: boolean
  /** Fired when the summary is pressed, with the state it asks for. */
  onChange?: (event: SyntheticEvent, isExpanded: boolean) => void
  /** Stays as it is, and its summary is off. Default: `false`. */
  disabled?: boolean
  /** Side padding on the summary, the details and the actions. Default: `true`. */
  hasGutters?: boolean
  /** Corner radius, resolves against `theme.radii`. Default: `theme.defaults.surfaceRadius`, else square. */
  borderRadius?: keyof Theme['radii']
  /** Background, resolves against `theme.background`. Default: `'paper'`. */
  bg?: keyof Theme['background']
  /** Text color, resolves against `theme.text`. Default: `theme.defaults.textColor`, else `'initial'`. */
  textColor?: keyof Theme['text']
  /** The transition that opens and closes the region. Default: `Collapse`. */
  transition?: ComponentType<AccordionTransitionProps>
  className?: string
  'data-testid'?: string
}

interface SurfaceStyle {
  borderRadius?: keyof Theme['radii']
  bg?: keyof Theme['background']
  textColor?: keyof Theme['text']
}

const AccordionRoot = styled('div', {
  name: 'Accordion',
  label: 'Accordion',
  shouldForwardProp: createShouldForwardProp([...props, 'borderRadius', 'bg', 'textColor']),
  systemProps: [space],
})<SurfaceStyle>(({ theme, borderRadius, bg, textColor }) => ({
  overflow: 'hidden',
  backgroundColor: get(theme, `background.${bg ?? themeDefault(theme, 'surfaceBg', 'paper')}`),
  color: get(theme, `text.${textColor ?? themeDefault(theme, 'textColor', 'initial')}`),
  border: `${theme.borderWidths.thin} solid ${get(theme, 'border.default')}`,
  borderRadius: getSurfaceRadius(theme, borderRadius),
}))

const AccordionRegion = styled('div', {
  name: 'Accordion',
  slot: 'region',
  label: 'AccordionRegion',
})({})

/**
 * @description A heading that opens and closes a region. The first child is the
 * `AccordionSummary`, a button in a heading; the rest is the region it opens - a
 * `role="region"` named by the summary, which in turn `aria-expanded` and `aria-controls` it.
 * Open or closed it owns, until `isExpanded` takes it over. In an `AccordionGroup` the arrows,
 * Home and End move between the summaries, and the group may keep one open at a time.
 */
export function Accordion({
  children,
  isExpanded: isExpandedProp,
  defaultExpanded = false,
  onChange,
  disabled = false,
  hasGutters: hasGuttersProp,
  borderRadius: borderRadiusProp,
  bg: bgProp,
  textColor: textColorProp,
  transition: Transition = Collapse,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<AccordionProps>) {
  const dp = useDefaultProps('Accordion')
  const hasGutters = hasGuttersProp ?? dp.hasGutters ?? true
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const bg = bgProp ?? dp.bg
  const textColor = textColorProp ?? dp.textColor
  const baseId = useId()
  const group = useContext(AccordionGroupContext)
  const [ownExpanded, setOwnExpanded] = useControlled({
    controlled: isExpandedProp,
    default: defaultExpanded,
  })
  // An owner's word first; then the group's, once it has been asked to open one; then its own.
  const isInGroup = group?.isExclusive && group.openId !== undefined
  const isExpanded = isExpandedProp ?? (isInGroup ? group.openId === baseId : ownExpanded)

  const context = useMemo(
    () => ({
      baseId,
      isExpanded,
      disabled,
      hasGutters,
      toggle: (event: SyntheticEvent) => {
        const next = !isExpanded
        setOwnExpanded(next)
        group?.setOpenId(next ? baseId : null)
        onChange?.(event, next)
      },
    }),
    [baseId, isExpanded, disabled, hasGutters, setOwnExpanded, group, onChange]
  )

  const [summary, ...region] = Children.toArray(children)
  return (
    <AccordionContext.Provider value={context}>
      <AccordionRoot
        borderRadius={borderRadius}
        bg={bg}
        textColor={textColor}
        className={className}
        data-testid={dataTestid}
        {...spaceProps}
      >
        {summary}
        <Transition isShown={isExpanded} shouldAppear={false}>
          <AccordionRegion
            role="region"
            id={getRegionId(baseId)}
            aria-labelledby={getSummaryId(baseId)}
          >
            {region}
          </AccordionRegion>
        </Transition>
      </AccordionRoot>
    </AccordionContext.Provider>
  )
}
