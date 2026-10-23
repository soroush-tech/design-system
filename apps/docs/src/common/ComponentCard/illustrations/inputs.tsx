import type { ReactNode } from 'react'
import { Bar, Box, Dot, Plus, Star, Stroke } from '../shapes'

// Inputs and forms: a field, a control, a choice - each drawn in a 160 x 100 frame.
export const inputs: Record<string, () => ReactNode> = {
  Autocomplete: () => (
    <>
      <Box x={32} y={16} w={96} h={20} stroke="strong" />
      <Bar x={40} y={24} w={30} tone="soft" />
      <Stroke d="M112 23 L116 28 L120 23" />
      <Box x={32} y={42} w={96} h={42} fill="faint" stroke="strong" />
      <Box x={36} y={46} w={88} h={12} r={2} fill="strong" />
      <Bar x={42} y={50} w={34} tone="soft" />
      <Bar x={42} y={65} w={50} />
      <Bar x={42} y={74} w={40} />
    </>
  ),
  Fab: () => (
    <>
      <Bar x={26} y={24} w={70} />
      <Bar x={26} y={36} w={56} />
      <Bar x={26} y={48} w={64} />
      <Dot cx={112} cy={62} r={18} />
      <Plus x={112} y={62} s={7} tone="soft" />
    </>
  ),
  Button: () => (
    <>
      <Box x={22} y={37} w={60} h={26} r={5} fill="strong" />
      <Bar x={34} y={48} w={36} tone="soft" />
      <Box x={92} y={37} w={46} h={26} r={5} stroke="strong" />
      <Bar x={102} y={48} w={26} tone="strong" />
    </>
  ),
  ButtonGroup: () => (
    <>
      <Box x={24} y={37} w={112} h={26} r={5} stroke="strong" />
      <Stroke d="M61 37 V63 M99 37 V63" />
      <Bar x={32} y={48} w={22} tone="strong" />
      <Bar x={69} y={48} w={22} tone="strong" />
      <Bar x={107} y={48} w={22} tone="strong" />
    </>
  ),
  ToggleButton: () => (
    <>
      <Box x={24} y={37} w={36} h={26} r={5} stroke="faint" />
      <Box x={62} y={37} w={36} h={26} r={5} fill="strong" />
      <Box x={100} y={37} w={36} h={26} r={5} stroke="faint" />
      <Bar x={32} y={48} w={20} />
      <Bar x={70} y={48} w={20} tone="soft" />
      <Bar x={108} y={48} w={20} />
    </>
  ),
  TextInput: () => (
    <>
      <Bar x={28} y={26} w={34} tone="strong" />
      <Box x={28} y={36} w={104} h={28} stroke="strong" />
      <Bar x={36} y={48} w={44} tone="soft" />
      <Stroke d="M86 43 V57" />
    </>
  ),
  Checkbox: () => (
    <>
      <Box x={36} y={34} w={32} h={32} r={7} fill="strong" />
      <Stroke d="M44 51 L50 57 L61 43" tone="soft" sw={3} />
      <Bar x={80} y={42} w={44} />
      <Bar x={80} y={54} w={32} />
    </>
  ),
  Radio: () => (
    <>
      <Dot cx={46} cy={28} r={8} fill="none" stroke="strong" />
      <Dot cx={46} cy={28} r={4} />
      <Bar x={64} y={26} w={56} />
      <Dot cx={46} cy={50} r={8} fill="none" stroke="faint" />
      <Bar x={64} y={48} w={44} />
      <Dot cx={46} cy={72} r={8} fill="none" stroke="faint" />
      <Bar x={64} y={70} w={50} />
    </>
  ),
  Rating: () => (
    <>
      <Star x={34} y={50} />
      <Star x={57} y={50} />
      <Star x={80} y={50} />
      <Star x={103} y={50} fill="faint" />
      <Star x={126} y={50} fill="faint" />
    </>
  ),
  NumberInput: () => (
    <>
      <Box x={28} y={36} w={104} h={28} stroke="strong" />
      <Stroke d="M40 50 H50" />
      <Bar x={68} y={48} w={24} tone="soft" />
      <Plus x={118} y={50} s={5} />
    </>
  ),
  RangeInput: () => (
    <>
      <Bar x={26} y={48} w={108} h={5} />
      <Bar x={60} y={48} w={44} h={5} tone="strong" />
      <Dot cx={60} cy={50.5} r={8} />
      <Dot cx={104} cy={50.5} r={8} />
    </>
  ),
  TransferList: () => (
    <>
      <Box x={20} y={18} w={48} h={64} stroke="strong" />
      <Bar x={27} y={28} w={30} tone="soft" />
      <Bar x={27} y={40} w={34} />
      <Bar x={27} y={52} w={26} />
      <Box x={92} y={18} w={48} h={64} stroke="strong" />
      <Bar x={99} y={28} w={32} />
      <Stroke d="M76 38 H84 M80 34 L84 38 L80 42" />
      <Stroke d="M84 62 H76 M80 58 L76 62 L80 66" />
    </>
  ),
  Switch: () => (
    <>
      <Box x={50} y={36} w={60} h={28} r={14} fill="strong" />
      <Dot cx={96} cy={50} r={10} fill="soft" />
    </>
  ),
  NativeSelect: () => (
    <>
      <Box x={28} y={36} w={104} h={28} stroke="strong" />
      <Bar x={36} y={48} w={46} tone="soft" />
      <Stroke d="M112 47 L118 53 L124 47" />
    </>
  ),
  Select: () => (
    <>
      <Box x={28} y={16} w={104} h={26} stroke="strong" />
      <Bar x={36} y={27} w={40} tone="soft" />
      <Stroke d="M112 25 L118 31 L124 25" />
      <Box x={28} y={48} w={104} h={38} fill="faint" stroke="strong" />
      <Box x={32} y={52} w={96} h={12} r={2} fill="strong" />
      <Bar x={38} y={56} w={30} tone="soft" />
      <Bar x={38} y={71} w={44} />
    </>
  ),
  MenuItem: () => (
    <>
      <Box x={32} y={18} w={96} h={64} fill="faint" stroke="strong" />
      <Box x={36} y={24} w={88} h={16} r={2} fill="strong" />
      <Dot cx={46} cy={32} r={3} fill="soft" />
      <Bar x={56} y={30} w={36} tone="soft" />
      <Dot cx={46} cy={50} r={3} fill="faint" />
      <Bar x={56} y={48} w={44} />
      <Dot cx={46} cy={68} r={3} fill="faint" />
      <Bar x={56} y={66} w={30} />
    </>
  ),
  Form: () => (
    <>
      <Bar x={32} y={14} w={26} tone="strong" />
      <Box x={32} y={22} w={96} h={16} stroke="strong" />
      <Bar x={32} y={46} w={32} tone="strong" />
      <Box x={32} y={54} w={96} h={16} stroke="strong" />
      <Box x={32} y={78} w={36} h={14} r={4} fill="strong" />
    </>
  ),
  FormControl: () => (
    <>
      <Bar x={32} y={26} w={34} tone="strong" />
      <Box x={32} y={36} w={96} h={22} stroke="strong" />
      <Bar x={40} y={44} w={36} tone="soft" />
      <Bar x={32} y={66} w={50} />
    </>
  ),
  FormLabel: () => (
    <>
      <Bar x={32} y={30} w={44} h={6} tone="strong" />
      <Box x={32} y={42} w={96} h={24} stroke="faint" />
    </>
  ),
  FormHelperText: () => (
    <>
      <Box x={32} y={26} w={96} h={24} stroke="faint" />
      <Bar x={32} y={58} w={64} tone="strong" />
    </>
  ),
  Pagination: () => (
    <>
      <Box x={14} y={38} w={20} h={24} r={5} stroke="faint" />
      <Stroke d="M27 45 L21 50 L27 55" tone="faint" />
      <Box x={38} y={38} w={20} h={24} r={5} stroke="faint" />
      <Box x={62} y={38} w={20} h={24} r={5} fill="strong" />
      <Box x={86} y={38} w={20} h={24} r={5} stroke="faint" />
      <Box x={110} y={38} w={20} h={24} r={5} stroke="faint" />
      <Box x={134} y={38} w={20} h={24} r={5} stroke="faint" />
      <Stroke d="M141 45 L147 50 L141 55" tone="faint" />
    </>
  ),
}
