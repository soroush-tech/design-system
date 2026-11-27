import { screen } from '@testing-library/react'
import { describeSlots } from '../../utils/test/describeSlots'
import { ToggleButton } from '../ToggleButton'
import { ToggleButtonGroup, type ToggleButtonGroupProps } from './ToggleButtonGroup'

const root = () => screen.getByRole('group')

describeSlots({
  name: 'ToggleButtonGroup',
  render: (props: ToggleButtonGroupProps) => (
    <ToggleButtonGroup {...props}>
      <ToggleButton value="a">A</ToggleButton>
    </ToggleButtonGroup>
  ),
  root,
  slots: { root },
})
