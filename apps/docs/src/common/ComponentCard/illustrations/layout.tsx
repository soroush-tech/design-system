import type { ReactNode } from 'react'
import { Bar, Box, Dot, Stroke } from '../shapes'

// Layout and surfaces: the frames a page is built from.
export const layout: Record<string, () => ReactNode> = {
  ScrollArea: () => (
    <>
      <Box x={34} y={14} w={92} h={72} stroke="strong" />
      <Bar x={42} y={24} w={60} />
      <Bar x={42} y={36} w={68} />
      <Bar x={42} y={48} w={52} />
      <Bar x={42} y={60} w={64} />
      <Bar x={116} y={22} w={4} h={56} />
      <Bar x={116} y={26} w={4} h={22} tone="strong" />
    </>
  ),
  View: () => (
    <>
      <Box x={30} y={18} w={100} h={64} stroke="strong" dash="4 3" />
      <Box x={48} y={34} w={64} h={32} fill="faint" stroke="strong" />
    </>
  ),
  Flex: () => (
    <>
      <Box x={20} y={34} w={30} h={32} fill="strong" />
      <Box x={58} y={34} w={30} h={32} fill="faint" stroke="strong" />
      <Box x={96} y={34} w={44} h={32} fill="faint" stroke="strong" />
      <Stroke d="M20 78 H140 M134 74 L140 78 L134 82" tone="faint" />
    </>
  ),
  Grid: () => (
    <>
      <Box x={26} y={18} w={32} h={30} fill="strong" />
      <Box x={64} y={18} w={32} h={30} fill="faint" stroke="strong" />
      <Box x={102} y={18} w={32} h={30} fill="faint" stroke="strong" />
      <Box x={26} y={54} w={32} h={30} fill="faint" stroke="strong" />
      <Box x={64} y={54} w={70} h={30} fill="faint" stroke="strong" />
    </>
  ),
  Paper: () => (
    <>
      <Box x={40} y={26} w={88} h={58} fill="faint" />
      <Box x={34} y={20} w={88} h={58} fill="faint" stroke="strong" />
      <Bar x={44} y={32} w={44} tone="strong" />
      <Bar x={44} y={44} w={68} />
      <Bar x={44} y={54} w={56} />
    </>
  ),
  Card: () => (
    <>
      <Box x={36} y={12} w={88} h={76} stroke="strong" />
      <Box x={36} y={12} w={88} h={30} r={3} fill="faint" />
      <Stroke d="M40 38 L58 24 L72 34 L84 26 L120 38" tone="strong" />
      <Bar x={44} y={50} w={44} tone="strong" />
      <Bar x={44} y={60} w={68} />
      <Box x={44} y={72} w={26} h={10} r={5} fill="strong" />
    </>
  ),
  Quote: () => (
    <>
      <Bar x={34} y={22} w={4} h={56} tone="strong" />
      <Stroke d="M48 36 Q48 28 54 26 M60 36 Q60 28 66 26" sw={3} />
      <Bar x={48} y={46} w={78} />
      <Bar x={48} y={56} w={64} />
      <Bar x={48} y={68} w={30} tone="strong" />
    </>
  ),
  AppBar: () => (
    <>
      <Box x={20} y={16} w={120} h={22} r={3} fill="strong" />
      <Stroke d="M28 23 H40 M28 27 H40 M28 31 H40" tone="soft" />
      <Bar x={50} y={25} w={32} tone="soft" />
      <Dot cx={128} cy={27} r={5} fill="soft" />
      <Bar x={20} y={50} w={80} />
      <Bar x={20} y={62} w={104} />
      <Bar x={20} y={74} w={60} />
    </>
  ),
  Drawer: () => (
    <>
      <Box x={18} y={12} w={52} h={76} fill="faint" stroke="strong" />
      <Bar x={26} y={22} w={34} tone="strong" />
      <Bar x={26} y={34} w={28} />
      <Bar x={26} y={46} w={32} />
      <Bar x={26} y={58} w={24} />
      <Bar x={82} y={22} w={58} />
      <Bar x={82} y={34} w={46} />
      <Bar x={82} y={46} w={54} />
    </>
  ),
  Sidebar: () => (
    <>
      <Box x={18} y={12} w={36} h={76} r={3} fill="faint" stroke="strong" />
      <Box x={22} y={20} w={28} h={10} r={2} fill="strong" />
      <Bar x={26} y={36} w={20} />
      <Bar x={26} y={46} w={16} />
      <Bar x={26} y={56} w={20} />
      <Box x={62} y={12} w={80} h={76} stroke="faint" />
      <Bar x={70} y={22} w={44} tone="strong" />
      <Bar x={70} y={34} w={64} />
      <Bar x={70} y={44} w={52} />
    </>
  ),
}
