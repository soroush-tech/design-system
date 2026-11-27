import { screen } from '@testing-library/react'
import { describeSlots } from '../../utils/test/describeSlots'
import { ToggleButton, type ToggleButtonProps } from './ToggleButton'

const root = () => screen.getByRole('button')

describeSlots({
  name: 'ToggleButton',
  render: (props: Partial<ToggleButtonProps>) => (
    <ToggleButton value="a" {...props}>
      A
    </ToggleButton>
  ),
  root,
  slots: { root },
})
