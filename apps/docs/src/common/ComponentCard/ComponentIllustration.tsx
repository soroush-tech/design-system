import { styled, useTheme } from '@gild-ui/react'
import { illustrationInk } from 'src/theme/illustrationInk'
import { illustrations } from './illustrations'
import { Bar, Box } from './shapes'

// The frame of a drawing sets the inks its shapes are painted from.
const Frame = styled('svg')<{ isDark: boolean }>(({ isDark }) => {
  const ink = illustrationInk[isDark ? 'dark' : 'light']
  return { '--ink-strong': ink.strong, '--ink-soft': ink.soft, '--ink-faint': ink.faint }
})

/** What a component without a drawing yet shows: an empty frame. */
const Placeholder = () => (
  <>
    <Box x={34} y={22} w={92} h={56} stroke="faint" dash="4 3" />
    <Bar x={46} y={46} w={48} />
  </>
)

/** A component's drawing in the blues of the current color mode - decorative: the card names it. */
export function ComponentIllustration({ name }: Readonly<{ name: string }>) {
  const theme = useTheme()
  const Drawing = illustrations[name as keyof typeof illustrations] ?? Placeholder
  return (
    <Frame
      isDark={theme.colorScheme === 'dark'}
      viewBox="0 0 160 100"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <Drawing />
    </Frame>
  )
}
