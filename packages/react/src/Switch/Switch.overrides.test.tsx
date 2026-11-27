import { describeSlots } from '../utils/test/describeSlots'
import { Switch, type SwitchProps } from './Switch'

const root = () => document.querySelector('label')!

describeSlots({
  name: 'Switch',
  render: (props: SwitchProps) => <Switch {...props}>Label</Switch>,
  root,
  slots: {
    root,
    input: () => document.querySelector('input'),
    track: () => document.querySelector('.sw-track'),
    thumb: () => document.querySelector('.sw-thumb'),
    label: () => root().lastElementChild,
  },
})
