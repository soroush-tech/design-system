import { css, keyframes, styled, createShouldForwardProp } from '@soroush.tech/design-system'
import { LayoutProvider, ThemeProvider, withTheme } from '@soroush.tech/design-system/theme'
import { Portal } from '@soroush.tech/design-system/Portal'
import { Button } from '@soroush.tech/design-system/Button'
import { Tooltip } from '@soroush.tech/design-system/Tooltip'

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
