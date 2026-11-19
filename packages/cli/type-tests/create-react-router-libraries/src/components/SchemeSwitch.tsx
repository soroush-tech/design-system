import { Flex } from '@soroush.tech/design-system/Flex'
import { Icon } from '@soroush.tech/design-system/Icon'
import { Switch } from '@soroush.tech/design-system/Switch'
import { Typography } from '@soroush.tech/design-system/Typography'

type Scheme = 'light' | 'dark'

/** The switch between the light and the dark theme, on when dark, with the scheme's icon. */
export function SchemeSwitch({
  scheme,
  onSchemeChange,
}: {
  readonly scheme: Scheme
  readonly onSchemeChange: (scheme: Scheme) => void
}) {
  const isDark = scheme === 'dark'
  return (
    <Flex flexDirection="row" alignItems="center" gap={2}>
      {/* Hidden on a phone, so the bar fits: the switch keeps its label. */}
      <Typography
        variant="caption"
        letterSpacing="widest"
        color="primary"
        display={['none', 'block']}
      >
        MODE
      </Typography>
      <Switch
        checked={isDark}
        onChange={() => onSchemeChange(isDark ? 'light' : 'dark')}
        variant="inside"
        color="primary"
        size="sm"
        aria-label="Toggle theme"
      />
      <Icon name={isDark ? 'dark_mode' : 'light_mode'} size={14} color="primary" />
    </Flex>
  )
}
