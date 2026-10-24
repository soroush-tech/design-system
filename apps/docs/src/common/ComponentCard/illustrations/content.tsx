import type { ReactNode } from 'react'
import { Bar, Box, Dot, Star, Stroke } from '../shapes'

// Content and data display: text, media, and what holds them in rows.
export const content: Record<string, () => ReactNode> = {
  Typography: () => (
    <>
      <Bar x={34} y={20} w={78} h={10} tone="strong" />
      <Bar x={34} y={38} w={56} h={6} tone="soft" />
      <Bar x={34} y={54} w={92} />
      <Bar x={34} y={64} w={84} />
      <Bar x={34} y={74} w={60} />
    </>
  ),
  Link: () => (
    <>
      <Bar x={22} y={46} w={54} />
      <Bar x={82} y={46} w={40} tone="strong" />
      <Bar x={82} y={55} w={40} h={2} tone="strong" />
      <Bar x={126} y={46} w={14} />
    </>
  ),
  Icon: () => (
    <>
      <Star x={80} y={52} size={26} fill="faint" />
      <Dot cx={38} cy={26} r={5} fill="faint" />
      <Dot cx={124} cy={76} r={4} fill="faint" />
    </>
  ),
  Image: () => (
    <>
      <Box x={32} y={16} w={96} h={68} stroke="strong" />
      <Stroke d="M36 78 L62 50 L80 68 L96 54 L124 78" />
      <Dot cx={104} cy={34} r={6} fill="faint" stroke="strong" />
    </>
  ),
  Avatar: () => (
    <>
      <Dot cx={60} cy={50} r={24} fill="faint" stroke="strong" />
      <Dot cx={60} cy={44} r={8} />
      <Stroke d="M44 68 Q60 54 76 68" />
      <Dot cx={108} cy={58} r={16} />
      <Bar x={98} y={56} w={20} tone="soft" />
    </>
  ),
  Table: () => (
    <>
      <Box x={22} y={16} w={116} h={68} stroke="strong" />
      <Box x={22} y={16} w={116} h={16} r={3} fill="strong" />
      <Bar x={30} y={22} w={20} tone="soft" />
      <Bar x={68} y={22} w={20} tone="soft" />
      <Bar x={106} y={22} w={20} tone="soft" />
      <Bar x={30} y={42} w={24} />
      <Bar x={68} y={42} w={20} />
      <Bar x={106} y={42} w={16} />
      <Bar x={30} y={56} w={20} />
      <Bar x={68} y={56} w={24} />
      <Bar x={106} y={56} w={20} />
      <Bar x={30} y={70} w={26} />
      <Bar x={68} y={70} w={16} />
      <Bar x={106} y={70} w={22} />
    </>
  ),
  Accordion: () => (
    <>
      <Box x={30} y={12} w={100} h={44} stroke="strong" />
      <Bar x={38} y={20} w={40} tone="strong" />
      <Stroke d="M110 22 L116 16 L122 22" />
      <Bar x={38} y={34} w={80} />
      <Bar x={38} y={44} w={64} />
      <Box x={30} y={62} w={100} h={12} stroke="faint" />
      <Bar x={38} y={66} w={30} />
      <Box x={30} y={78} w={100} h={12} stroke="faint" />
      <Bar x={38} y={82} w={36} />
    </>
  ),
}
