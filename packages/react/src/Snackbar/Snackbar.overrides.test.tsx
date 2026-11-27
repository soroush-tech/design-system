import { screen } from '@testing-library/react'
import { describeSlots } from '../utils/test/describeSlots'
import { Snackbar, type SnackbarProps } from './Snackbar'

const content = () => screen.getByRole('status', { hidden: true })

describeSlots({
  name: 'Snackbar',
  render: (props: SnackbarProps) => (
    <Snackbar defaultOpen message="Saved" action={<button type="button">Undo</button>} {...props} />
  ),
  root: () => content().parentElement,
  slots: {
    root: () => content().parentElement,
    content,
    message: () => screen.getByText('Saved'),
    action: () => screen.getByText('Undo').parentElement,
  },
})
