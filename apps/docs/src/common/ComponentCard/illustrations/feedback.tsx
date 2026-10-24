import type { ReactNode } from 'react'
import { Bar, Box, Dot, Plus, Stroke } from '../shapes'

// Feedback: what the interface says back.
export const feedback: Record<string, () => ReactNode> = {
  FabMenu: () => (
    <>
      <Box x={70} y={14} w={56} h={20} r={10} fill="faint" stroke="strong" />
      <Bar x={80} y={22} w={30} tone="soft" />
      <Box x={70} y={40} w={56} h={20} r={10} fill="faint" stroke="strong" />
      <Bar x={80} y={48} w={26} tone="soft" />
      <Dot cx={126} cy={76} r={14} />
      <Plus x={126} y={76} s={6} tone="soft" />
      <Bar x={22} y={30} w={34} />
      <Bar x={22} y={42} w={26} />
    </>
  ),
  Snackbar: () => (
    <>
      <Bar x={22} y={20} w={80} />
      <Bar x={22} y={32} w={100} />
      <Box x={20} y={56} w={120} h={26} r={4} fill="strong" />
      <Bar x={30} y={67} w={54} tone="soft" />
      <Bar x={108} y={67} w={22} tone="soft" />
    </>
  ),
  Alert: () => (
    <>
      <Box x={22} y={26} w={116} h={48} fill="faint" stroke="strong" />
      <Dot cx={40} cy={50} r={9} />
      <Stroke d="M40 45 V51 M40 55 V55.5" tone="soft" sw={2} />
      <Bar x={58} y={42} w={56} tone="strong" />
      <Bar x={58} y={54} w={68} />
    </>
  ),
  Badge: () => (
    <>
      <Box x={52} y={34} w={50} h={36} r={5} fill="faint" stroke="strong" />
      <Stroke d="M54 38 L77 56 L100 38" />
      <Dot cx={102} cy={34} r={10} />
      <Bar x={98} y={32} w={8} tone="soft" />
    </>
  ),
  Chip: () => (
    <>
      <Box x={22} y={38} w={64} h={24} r={12} fill="faint" stroke="strong" />
      <Dot cx={36} cy={50} r={6} fill="strong" />
      <Bar x={47} y={48} w={22} />
      <Stroke d="M74 46 L80 54 M80 46 L74 54" sw={1.3} />
      <Box x={94} y={38} w={46} h={24} r={12} fill="strong" />
      <Bar x={104} y={48} w={26} tone="soft" />
    </>
  ),
  CircularProgress: () => (
    <>
      <Dot cx={80} cy={50} r={24} fill="none" stroke="faint" sw={7} />
      <Stroke d="M80 26 A24 24 0 0 1 104 50" sw={7} />
    </>
  ),
  LinearProgress: () => (
    <>
      <Bar x={24} y={34} w={112} h={6} />
      <Bar x={24} y={34} w={72} h={6} tone="strong" />
      <Bar x={24} y={60} w={112} h={6} />
      <Bar x={24} y={60} w={36} h={6} tone="strong" />
    </>
  ),
  Skeleton: () => (
    <>
      <Dot cx={40} cy={34} r={14} fill="faint" />
      <Bar x={62} y={26} w={64} h={6} />
      <Bar x={62} y={38} w={40} h={6} />
      <Box x={26} y={58} w={108} h={26} r={4} fill="faint" />
    </>
  ),
  Backdrop: () => (
    <>
      <Box x={22} y={14} w={116} h={72} r={3} fill="faint" />
      <Bar x={32} y={24} w={50} />
      <Bar x={32} y={34} w={80} />
      <Dot cx={80} cy={56} r={13} fill="none" stroke="soft" sw={5} />
      <Stroke d="M80 43 A13 13 0 0 1 93 56" tone="strong" sw={5} />
    </>
  ),
}
