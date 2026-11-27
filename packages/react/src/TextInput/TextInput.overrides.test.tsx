import { describeSlots } from '../utils/test/describeSlots'
import { TextInput, type TextInputProps } from './TextInput'

const input = () => document.querySelector('input')!

describeSlots({
  name: 'TextInput',
  render: (props: TextInputProps) => <TextInput classes={{ input: 'own-input' }} {...props} />,
  root: () => input().parentElement,
  slots: { root: () => input().parentElement, input },
})
