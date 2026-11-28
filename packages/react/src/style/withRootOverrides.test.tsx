import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { View } from '../View'
import { Flex } from '../Flex'
import { Grid } from '../Grid'
import { Quote } from '../Quote'
import { styled } from './styled'
import { withRootOverrides } from './withRootOverrides'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'

const root = () => screen.getByTestId('root')

describeRootSlot('View', (props) => <View data-testid="root" {...props} />, root)
describeRootSlot('Flex', (props) => <Flex data-testid="root" {...props} />, root)
describeRootSlot('Grid', (props) => <Grid data-testid="root" {...props} />, root)
describeRootSlot('Quote', (props) => <Quote data-testid="root" {...props} />, root)

describe('a component with a root override', () => {
  it('renders the same element, with no attribute of its own, when nothing is given', () => {
    renderWithTheme(<View data-testid="root">x</View>)
    expect(root().outerHTML).toBe('<div data-testid="root">x</div>')
  })

  it('is still a styled component: styling it again flattens into one element', () => {
    const Wide = styled(Flex)({ width: '100%' })
    renderWithTheme(
      <Wide data-testid="root">
        <i />
      </Wide>
    )
    expect(root().tagName).toBe('DIV')
    expect(root()).toHaveStyle({ display: 'flex', width: '100%' })
  })

  it('is still a selector where the styled component is one', () => {
    const Marked = withRootOverrides(styled('div', { target: 'marked' })({ color: 'red' }))
    expect(String(Marked)).toContain('.marked')
  })
})
