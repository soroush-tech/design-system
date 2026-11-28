import { css } from '@gild-ui/react/css'
import { keyframes } from '@gild-ui/react/keyframes'
import { styled } from '@gild-ui/react/styled'
import { createShouldForwardProp } from '@soroush.tech/styled-system/should-forward-prop'
import { LayoutProvider } from '@gild-ui/react/LayoutProvider'
import { ThemeProvider } from '@gild-ui/react/ThemeProvider'
import { withTheme } from '@gild-ui/react/withTheme'
import { Portal } from '@gild-ui/react/Portal'
import { Button } from '@gild-ui/react/Button'
import { Tooltip } from '@gild-ui/react/Tooltip'

const spin = keyframes`
  to { transform: rotate(360deg); }
`
const fade = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const dynamic = css`
  color: ${(props) => props.color};
`
const staticCss = css({ color: 'red' })

export const Dot = styled('span')<{ isOn: boolean }>(({ isOn }) => ({ opacity: isOn ? 1 : 0.5 }))
export const Safe = styled('span', { shouldForwardProp: createShouldForwardProp(['isOn']) })<{ isOn: boolean }>({})
export const Plain = styled('span')({ animation: `${spin} 1s infinite` })
export const Wrapped = styled(Button).withComponent('a')({ color: 'red' })
export const Themed = withTheme(class Themed extends React.Component<{ theme: object }> {})

export const App = () => (
  <ThemeProvider>
    <LayoutProvider>
      <Portal>
        <Tooltip title="x" slotProps={{ arrow: { style: { left: 3 } }, root: { className: 'x' } }}>
          <Button>Go</Button>
        </Tooltip>
      </Portal>
    </LayoutProvider>
  </ThemeProvider>
)

export { dynamic, fade, staticCss }
