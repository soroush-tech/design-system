import type { ReactNode } from 'react'
import { Bar, Box, Stroke } from '../shapes'

// Navigation and menus: where a reader goes next.
export const navigation: Record<string, () => ReactNode> = {
  Breadcrumbs: () => (
    <>
      <Bar x={16} y={46} w={26} />
      <Stroke d="M48 44 L52 48 L48 52" tone="faint" />
      <Bar x={58} y={46} w={30} />
      <Stroke d="M94 44 L98 48 L94 52" tone="faint" />
      <Bar x={104} y={46} w={40} tone="strong" />
    </>
  ),
  NavTree: () => (
    <>
      <Bar x={16} y={14} w={30} tone="faint" />
      <Box x={16} y={24} w={128} h={14} r={7} fill="strong" />
      <Bar x={26} y={29} w={44} tone="soft" />
      <Bar x={26} y={46} w={56} />
      <Bar x={16} y={62} w={30} tone="faint" />
      <Bar x={26} y={74} w={48} />
      <Bar x={26} y={86} w={36} />
    </>
  ),
  Menu: () => (
    <>
      <Box x={34} y={10} w={50} h={20} r={5} fill="strong" />
      <Bar x={42} y={18} w={26} tone="soft" />
      <Box x={34} y={36} w={92} h={52} fill="faint" stroke="strong" />
      <Box x={38} y={41} w={84} h={12} r={2} fill="strong" />
      <Bar x={44} y={45} w={36} tone="soft" />
      <Bar x={44} y={60} w={48} />
      <Bar x={44} y={73} w={40} />
    </>
  ),
  Tabs: () => (
    <>
      <Bar x={22} y={24} w={30} tone="strong" />
      <Bar x={64} y={24} w={30} />
      <Bar x={106} y={24} w={30} />
      <Stroke d="M18 36 H142" tone="faint" />
      <Stroke d="M20 36 H54" sw={2.5} />
      <Bar x={22} y={50} w={96} />
      <Bar x={22} y={62} w={110} />
      <Bar x={22} y={74} w={74} />
    </>
  ),
}
