import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Icon } from '@soroush.tech/design-system/Icon'
import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonValue,
} from '@soroush.tech/design-system/ToggleButton'

type Language = 'ts' | 'js'

const isLanguage = (value: ToggleButtonValue | ToggleButtonValue[] | null): value is Language =>
  value === 'ts' || value === 'js'

export interface DemoToolbarProps {
  language: 'ts' | 'js'
  onLanguageChange: (language: 'ts' | 'js') => void
  copied: boolean
  onCopy: () => void
  onOpenSandbox: () => void
  onReset: () => void
  isExpanded: boolean
  onToggleExpanded: () => void
  /** Whether the story exposes interactive controls. */
  hasControls: boolean
  isControlsOpen: boolean
  onToggleControls: () => void
}

/**
 * The action row between a demo and its always-editable code: the controls toggle on
 * the left; expand, language, sandbox, copy, and reset on the right.
 */
export function DemoToolbar({
  language,
  onLanguageChange,
  copied,
  onCopy,
  onOpenSandbox,
  onReset,
  isExpanded,
  onToggleExpanded,
  hasControls,
  isControlsOpen,
  onToggleControls,
}: Readonly<DemoToolbarProps>) {
  const copyLabel = copied ? 'Copied' : 'Copy the source'
  return (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      px={2}
      py={1}
    >
      <Flex flexDirection="row" alignItems="center" gap={2}>
        {hasControls && (
          <Button
            variant="outlined"
            color="primary"
            size="sm"
            shape="pill"
            onClick={onToggleControls}
            aria-expanded={isControlsOpen}
          >
            Controls
          </Button>
        )}
      </Flex>
      <Flex flexDirection="row" alignItems="center" gap={1}>
        <Button
          variant="outlined"
          color="default"
          size="sm"
          shape="pill"
          onClick={onToggleExpanded}
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Collapse code' : 'Expand code'}
        </Button>
        <ToggleButtonGroup
          value={language}
          isExclusive
          size="sm"
          color="primary"
          aria-label="Code language"
          // Clicking the selected language fires null (deselect) - the guard keeps the
          // selection exclusive and narrows the value to a Language.
          onChange={(value) => {
            if (isLanguage(value)) onLanguageChange(value)
          }}
        >
          <ToggleButton value="ts" title="Show TypeScript source">
            TS
          </ToggleButton>
          <ToggleButton value="js" title="Show JavaScript source">
            JS
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="text"
          color="default"
          size="sm"
          onClick={onOpenSandbox}
          aria-label="Edit in CodeSandbox"
          title="Edit in CodeSandbox"
        >
          <Icon name="external_link" size="1.1rem" />
        </Button>
        <Button
          variant="text"
          color="default"
          size="sm"
          onClick={onCopy}
          aria-label={copyLabel}
          title={copyLabel}
        >
          <Icon name={copied ? 'check' : 'content_copy'} size="1.1rem" />
        </Button>
        <Button
          variant="text"
          color="default"
          size="sm"
          onClick={onReset}
          aria-label="Reset demo"
          title="Reset demo"
        >
          <Icon name="refresh" size="1.1rem" />
        </Button>
      </Flex>
    </Flex>
  )
}
