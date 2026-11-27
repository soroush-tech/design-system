import { describeSlots } from '../utils/test/describeSlots'
import { Radio, type RadioProps } from './Radio'

const root = () => document.querySelector('label')!
const icon = () => document.querySelector('.rb-unchecked')!.parentElement

describeSlots({
  name: 'Radio',
  render: (props: RadioProps) => <Radio {...props}>Label</Radio>,
  root,
  slots: {
    root,
    input: () => document.querySelector('input'),
    icon,
    label: () => root().lastElementChild,
  },
})
