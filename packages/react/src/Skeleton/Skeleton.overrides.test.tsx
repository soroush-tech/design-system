import { describeSlots } from '../utils/test/describeSlots'
import { Skeleton, type SkeletonProps } from './Skeleton'

const root = () => document.querySelector('span')!

describeSlots({
  name: 'Skeleton',
  render: (props: SkeletonProps) => <Skeleton {...props}>Text</Skeleton>,
  root,
  slots: { root, content: () => root().firstElementChild },
})
