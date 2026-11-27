import { screen } from '@testing-library/react'
import { describeSlots } from '../utils/test/describeSlots'
import { Rating, type RatingProps } from './Rating'

const item = () => screen.getAllByRole('radio')[0].closest('label')!

describeSlots({
  name: 'Rating',
  render: (props: RatingProps) => <Rating precision={0.5} emptyLabelText="None" {...props} />,
  root: () => screen.getByRole('radiogroup'),
  slots: {
    root: () => screen.getByRole('radiogroup'),
    item,
    icon: () => item().firstElementChild,
    decimal: () => item().parentElement,
    input: () => screen.getAllByRole('radio')[0],
    text: () => item().querySelector('span:not(:first-child)'),
    emptyLabel: () => screen.getByText('None').closest('label'),
  },
})
