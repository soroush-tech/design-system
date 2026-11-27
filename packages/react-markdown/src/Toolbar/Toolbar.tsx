import { Button } from '@gild-ui/react/Button'
import { ButtonGroup } from '@gild-ui/react/ButtonGroup'
import { Flex } from '@gild-ui/react/Flex'
import { Icon } from '@gild-ui/react/Icon'
import { MenuItem } from '@gild-ui/react/MenuItem'
import { Select } from '@gild-ui/react/Select'
import { Typography } from '@gild-ui/react/Typography'
import { styled, type SlotProps, type StyleOverride } from '@gild-ui/react'
import { useMarkdownContext } from '../MarkdownContext'
import type { MarkdownToolbarSlot } from '../themeTypes'
import { mergeOverrides } from '../utils/mergeOverrides'
import { buildTableSnippet } from '../utils/buildTableSnippet'
import { groupToolbarActions } from '../utils/groupToolbarActions'
import {
  CODE_LANGUAGES,
  HEADING_ACTIONS,
  INLINE_CODE_ACTION,
  MERMAID_DIAGRAMS,
  TOOLBAR_ACTIONS,
  codeBlockAction,
  mermaidDiagramAction,
  type LinePrefixAction,
  type ToolbarAction,
} from '../const'
import { TablePicker } from './TablePicker'

const HEADING_OPTIONS = HEADING_ACTIONS.map((action) => ({ label: action.label, value: action.id }))

const DIAGRAM_OPTIONS = MERMAID_DIAGRAMS.map((diagram) => ({
  label: diagram.label,
  value: diagram.value,
}))

const DIAGRAM_SNIPPET_BY_VALUE: Record<string, string> = Object.fromEntries(
  MERMAID_DIAGRAMS.map((diagram) => [diagram.value, diagram.snippet])
)

// An action menu: each pick dispatches, and the empty value resets the field to its placeholder.
const menuItems = (options: { label: string; value: string }[]) =>
  options.map(({ label, value }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ))

const HEADING_BY_ID: Record<string, LinePrefixAction> = Object.fromEntries(
  HEADING_ACTIONS.map((action) => [action.id, action])
)

// line-through has no Typography style prop, so a thin styled Typography carries it.
// Named styled root - theme-customizable via
// `theme.components.MarkdownToolbar.styleOverrides.root`.
const ToolbarRoot = styled(Flex, { name: 'MarkdownToolbar', label: 'MarkdownToolbar' })()

const StrikeLabel = styled(Typography, {
  name: 'MarkdownToolbar',
  slot: 'strike',
  label: 'MarkdownStrike',
})({
  textDecoration: 'line-through',
})

/** Renders a button's content: an icon, an emphasis-styled letter, or the plain label. */
function ActionLabel({
  action,
  slotProps,
}: Readonly<{ action: ToolbarAction; slotProps?: SlotProps<'strike'> }>) {
  if (action.icon) return <Icon name={action.icon} size="1.1rem" />
  if (action.emphasis === 'bold')
    return (
      <Typography as="span" variant="inherit" fontWeight="extraBold">
        {action.label}
      </Typography>
    )
  if (action.emphasis === 'italic')
    return (
      <Typography as="span" variant="inherit" fontStyle="italic">
        {action.label}
      </Typography>
    )
  if (action.emphasis === 'strike')
    return (
      <StrikeLabel {...slotProps?.strike} as="span" variant="inherit">
        {action.label}
      </StrikeLabel>
    )
  return <>{action.label}</>
}

export interface ToolbarProps {
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<MarkdownToolbarSlot>
}

/** Formatting buttons, heading + code-language selects, and the table-size picker. */
export function Toolbar({ style, slotProps }: Readonly<ToolbarProps>) {
  const { dispatch } = useMarkdownContext()

  const renderButton = (action: ToolbarAction) => (
    <Button
      key={action.id}
      type="button"
      variant="outlined"
      size="sm"
      aria-label={action.ariaLabel}
      onClick={() => dispatch(action)}
    >
      <ActionLabel action={action} slotProps={slotProps} />
    </Button>
  )

  return (
    <ToolbarRoot
      {...mergeOverrides(slotProps?.root, { style })}
      flexDirection="row"
      flexWrap="wrap"
      gap={1}
      role="toolbar"
      aria-label="Markdown formatting"
    >
      <Select
        native
        size="sm"
        variant="outlined"
        placeholder="Heading"
        value=""
        onChange={(value) => dispatch(HEADING_BY_ID[String(value)])}
        aria-label="Heading level"
      >
        {menuItems(HEADING_OPTIONS)}
      </Select>
      {groupToolbarActions(TOOLBAR_ACTIONS).map((segment) =>
        segment.length > 1 ? (
          <ButtonGroup key={segment[0].id} borderRadius="sq" size="sm" variant="outlined">
            {segment.map(renderButton)}
          </ButtonGroup>
        ) : (
          renderButton(segment[0])
        )
      )}
      <TablePicker
        slotProps={slotProps}
        onSelect={(rows, cols) =>
          dispatch({
            id: 'table',
            label: 'Table',
            ariaLabel: 'Table',
            kind: 'insert',
            snippet: buildTableSnippet(rows, cols),
          })
        }
      />
      <Flex flexDirection="row" gap={0} alignItems="stretch">
        {renderButton(INLINE_CODE_ACTION)}
        <Select
          native
          size="sm"
          variant="outlined"
          placeholder="Code"
          value=""
          onChange={(value) => dispatch(codeBlockAction(String(value)))}
          aria-label="Code block language"
        >
          {menuItems(CODE_LANGUAGES)}
        </Select>
        <Select
          native
          size="sm"
          variant="outlined"
          placeholder="Diagram"
          value=""
          onChange={(value) =>
            dispatch(mermaidDiagramAction(DIAGRAM_SNIPPET_BY_VALUE[String(value)]))
          }
          aria-label="Mermaid diagram type"
        >
          {menuItems(DIAGRAM_OPTIONS)}
        </Select>
      </Flex>
    </ToolbarRoot>
  )
}
