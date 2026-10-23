import { useId } from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, type Theme } from '../index'
import { useDefaultProps } from '../theme'
import { useFormControl } from '../FormControl'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { Paper } from '../Paper'
import { Typography } from '../Typography'
import {
  useTransferList,
  type TransferListItem,
  type TransferListValue,
  type TransferSide,
} from './hooks/useTransferList'

export type { TransferListItem, TransferListValue } from './hooks/useTransferList'

export interface TransferListProps extends SpaceProps<Theme> {
  /** Every item, on either side. */
  items: readonly TransferListItem[]
  /** The values on the right. Controlled with `onChange`. */
  value?: readonly TransferListValue[]
  /** The values on the right at first, when uncontrolled. Default: none. */
  defaultValue?: readonly TransferListValue[]
  /** Fired as items move, with the values now on the right. */
  onChange?: (value: TransferListValue[]) => void
  /** The left list's title, which names it. */
  leftLabel?: string
  /** The right list's title, which names it. */
  rightLabel?: string
  /** Names the button that moves every item right. */
  moveAllRightLabel?: string
  /** Names the button that moves the checked items right. */
  moveRightLabel?: string
  /** Names the button that moves the checked items left. */
  moveLeftLabel?: string
  /** Names the button that moves every item left. */
  moveAllLeftLabel?: string
  /** Adds the buttons that move every enabled item at once. Default: `false`. */
  shouldShowMoveAll?: boolean
  /** A checkbox in each list's header - all, some or none checked - and the count beside it. Default: `false`. */
  hasSelectAll?: boolean
  /** The count in a header: what is checked, of how many. Default: `n/total`. */
  getCountLabel?: (checked: number, total: number) => string
  /** The checkboxes' and buttons' size. Default: its `FormControl`'s, else `'md'`. */
  size?: keyof Theme['sizes']
  /** The checkboxes' and buttons' color - resolves to `theme.palette`. Default: its `FormControl`'s. */
  color?: keyof Theme['palette']
  disabled?: boolean
  /** The lists take the error color. */
  error?: boolean
  /** On the group, which a `FormLabel` names it by. Default: its `FormControl`'s. */
  id?: string
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

interface RootStyle extends SpaceProps<Theme> {
  isDisabled: boolean
}

const TransferListRoot = styled('div', {
  name: 'TransferList',
  label: 'TransferList',
  shouldForwardProp: createShouldForwardProp([...props, 'isDisabled']),
  systemProps: [space],
})<RootStyle>(({ theme, isDisabled }) => ({
  display: 'flex',
  alignItems: 'stretch',
  // Along a column, such as a FormControl's, it takes the whole width.
  alignSelf: 'stretch',
  gap: theme.space[2],
  ...(isDisabled && { opacity: 0.5 }),
}))

interface ListStyle {
  isError: boolean
}

const TransferListList = styled(Paper, {
  name: 'TransferList',
  slot: 'list',
  label: 'TransferListList',
  shouldForwardProp: createShouldForwardProp(['isError']),
})<ListStyle>(({ theme, isError }) => ({
  flex: '1 1 0',
  minWidth: 0,
  overflow: 'hidden',
  border: `${theme.borderWidths.thin} solid ${get(theme, isError ? 'palette.error.main' : 'border.default')}`,
}))

const TransferListHeader = styled('div', {
  name: 'TransferList',
  slot: 'header',
  label: 'TransferListHeader',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
  padding: `${theme.space[1]} ${theme.space[2]}`,
  borderBottom: `${theme.borderWidths.thin} solid ${get(theme, 'border.default')}`,
}))

const TransferListTitle = styled('span', {
  name: 'TransferList',
  slot: 'title',
  label: 'TransferListTitle',
})({ flex: 1, minWidth: 0 })

const TransferListCount = styled('span', {
  name: 'TransferList',
  slot: 'count',
  label: 'TransferListCount',
})(({ theme }) => ({ color: theme.text.secondary, whiteSpace: 'nowrap' }))

const TransferListItems = styled('div', {
  name: 'TransferList',
  slot: 'items',
  label: 'TransferListItems',
})({ height: '14rem', overflowY: 'auto' })

const TransferListRow = styled('div', {
  name: 'TransferList',
  slot: 'item',
  label: 'TransferListItem',
})(({ theme }) => ({
  display: 'flex',
  '&:hover': { backgroundColor: get(theme, 'background.secondary') },
  // The checkbox is the row: its label fills it, so the whole row toggles.
  '& > label': {
    flex: 1,
    padding: `${theme.space[1]} ${theme.space[2]}`,
    boxSizing: 'border-box',
  },
}))

const TransferListControls = styled('div', {
  name: 'TransferList',
  slot: 'controls',
  label: 'TransferListControls',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  gap: theme.space[1],
}))

// A move's chevrons point the way the items go, so right to left they turn around.
const TransferListIcon = styled('span', {
  name: 'TransferList',
  slot: 'icon',
  label: 'TransferListIcon',
})({
  display: 'inline-flex',
  alignItems: 'center',
  '[dir="rtl"] &': { transform: 'scaleX(-1)' },
  '& > :nth-of-type(2)': { marginInlineStart: '-0.5em' },
})

type TransferListState = ReturnType<typeof useTransferList>

interface ListProps {
  side: TransferSide
  title?: string
  baseId: string
  state: TransferListState
  hasSelectAll: boolean
  getCountLabel: (checked: number, total: number) => string
  size: keyof Theme['sizes']
  color?: keyof Theme['palette']
  disabled: boolean
  isError: boolean
}

function List({
  side,
  title,
  baseId,
  state,
  hasSelectAll,
  getCountLabel,
  size,
  color,
  disabled,
  isError,
}: Readonly<ListProps>) {
  const items = state[side]
  const titleId = `${baseId}-${side}-title`
  const enabledCount = state.getEnabled(side).length
  const checkedCount = state.getChecked(side).length
  const isAll = enabledCount > 0 && checkedCount === enabledCount

  return (
    <TransferListList elevation={0} p={0} isError={isError} data-side={side}>
      <TransferListHeader>
        {hasSelectAll && (
          <Checkbox
            id={`${baseId}-${side}-all`}
            aria-labelledby={titleId}
            size={size}
            color={color}
            disabled={disabled || enabledCount === 0}
            checked={isAll}
            indeterminate={checkedCount > 0 && !isAll}
            onChange={() => state.toggleAll(side)}
          />
        )}
        <TransferListTitle id={titleId}>
          <Typography variant="subtitle2" as="span">
            {title}
          </Typography>
        </TransferListTitle>
        {hasSelectAll && (
          <TransferListCount>
            <Typography variant="caption">{getCountLabel(checkedCount, items.length)}</Typography>
          </TransferListCount>
        )}
      </TransferListHeader>
      <TransferListItems role="list" aria-labelledby={title ? titleId : undefined}>
        {items.map((item) => {
          // Positioned in the items, not named by value: a value may hold a space, an id may not.
          const position = state.items.indexOf(item)
          const labelId = `${baseId}-${position}-label`
          return (
            <TransferListRow key={item.value} role="listitem">
              <Checkbox
                id={`${baseId}-${position}`}
                aria-labelledby={labelId}
                size={size}
                color={color}
                disabled={disabled || item.disabled}
                checked={state.isChecked(item)}
                onChange={() => state.toggle(item)}
              >
                <Typography variant="body2" as="span" id={labelId}>
                  {item.label}
                </Typography>
              </Checkbox>
            </TransferListRow>
          )
        })}
      </TransferListItems>
    </TransferListList>
  )
}

/**
 * @description A transfer list: two lists, and the buttons that move the checked items from one
 * to the other. Each list is a list of rows whose checkbox is the row, so it is one tab stop and
 * the label toggles it. The value is the values on the right; the items keep their own order on
 * each side. A disabled item stays where it is. Every name - the lists' titles, the four buttons -
 * is the app's, so it carries no language of its own. In a `FormControl` it takes the field's
 * size, color, error and disabled state, and its `FormLabel` names the group.
 */
export function TransferList({
  items,
  value,
  defaultValue,
  onChange,
  leftLabel,
  rightLabel,
  moveAllRightLabel: moveAllRightLabelProp,
  moveRightLabel: moveRightLabelProp,
  moveLeftLabel: moveLeftLabelProp,
  moveAllLeftLabel: moveAllLeftLabelProp,
  shouldShowMoveAll: shouldShowMoveAllProp,
  hasSelectAll: hasSelectAllProp,
  getCountLabel = (checked, total) => `${checked}/${total}`,
  size: sizeProp,
  color: colorProp,
  disabled: disabledProp,
  error: errorProp,
  id: idProp,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<TransferListProps>) {
  const dp = useDefaultProps('TransferList')
  const fc = useFormControl({
    id: idProp,
    error: errorProp,
    disabled: disabledProp,
    size: sizeProp ?? dp.size,
    color: colorProp ?? dp.color,
  })
  const baseId = useId()
  const moveAllRightLabel = moveAllRightLabelProp ?? dp.moveAllRightLabel
  const moveRightLabel = moveRightLabelProp ?? dp.moveRightLabel
  const moveLeftLabel = moveLeftLabelProp ?? dp.moveLeftLabel
  const moveAllLeftLabel = moveAllLeftLabelProp ?? dp.moveAllLeftLabel
  const shouldShowMoveAll = shouldShowMoveAllProp ?? dp.shouldShowMoveAll ?? false
  const hasSelectAll = hasSelectAllProp ?? dp.hasSelectAll ?? false

  const state = useTransferList({ items, value, defaultValue, onChange })
  const buttonProps = { variant: 'outlined', size: fc.size, color: fc.color } as const
  const isOff = (side: TransferSide, ofChecked: boolean) =>
    fc.disabled ||
    (ofChecked ? state.getChecked(side).length === 0 : state.getEnabled(side).length === 0)

  return (
    <TransferListRoot
      id={fc.id}
      role="group"
      isDisabled={fc.disabled}
      className={className}
      data-testid={dataTestid}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby ?? fc.labelId}
      aria-describedby={ariaDescribedby ?? fc['aria-describedby']}
      {...spaceProps}
    >
      <List
        side="left"
        title={leftLabel}
        baseId={baseId}
        state={state}
        hasSelectAll={hasSelectAll}
        getCountLabel={getCountLabel}
        size={fc.size}
        color={fc.color}
        disabled={fc.disabled}
        isError={fc.error}
      />
      <TransferListControls>
        {shouldShowMoveAll && (
          <Button
            {...buttonProps}
            aria-label={moveAllRightLabel}
            disabled={isOff('left', false)}
            onClick={state.moveAllRight}
          >
            <TransferListIcon>
              <Icon name="chevron_right" size="1em" color="inherit" />
              <Icon name="chevron_right" size="1em" color="inherit" />
            </TransferListIcon>
          </Button>
        )}
        <Button
          {...buttonProps}
          aria-label={moveRightLabel}
          disabled={isOff('left', true)}
          onClick={state.moveRight}
        >
          <TransferListIcon>
            <Icon name="chevron_right" size="1em" color="inherit" />
          </TransferListIcon>
        </Button>
        <Button
          {...buttonProps}
          aria-label={moveLeftLabel}
          disabled={isOff('right', true)}
          onClick={state.moveLeft}
        >
          <TransferListIcon>
            <Icon name="chevron_left" size="1em" color="inherit" />
          </TransferListIcon>
        </Button>
        {shouldShowMoveAll && (
          <Button
            {...buttonProps}
            aria-label={moveAllLeftLabel}
            disabled={isOff('right', false)}
            onClick={state.moveAllLeft}
          >
            <TransferListIcon>
              <Icon name="chevron_left" size="1em" color="inherit" />
              <Icon name="chevron_left" size="1em" color="inherit" />
            </TransferListIcon>
          </Button>
        )}
      </TransferListControls>
      <List
        side="right"
        title={rightLabel}
        baseId={baseId}
        state={state}
        hasSelectAll={hasSelectAll}
        getCountLabel={getCountLabel}
        size={fc.size}
        color={fc.color}
        disabled={fc.disabled}
        isError={fc.error}
      />
    </TransferListRoot>
  )
}
