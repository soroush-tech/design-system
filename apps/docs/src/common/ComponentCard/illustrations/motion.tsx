import type { ReactNode } from 'react'
import { Bar, Box, Dot, Stroke } from '../shapes'

// Transitions, overlays and behavior: what appears, moves, floats or holds focus.
export const motion: Record<string, () => ReactNode> = {
  Collapse: () => (
    <>
      <Box x={36} y={14} w={88} h={22} r={3} fill="strong" />
      <Bar x={44} y={22} w={40} tone="soft" />
      <Box x={36} y={42} w={88} h={22} r={3} fill="faint" stroke="strong" dash="3 3" />
      <Stroke d="M80 70 V84 M74 78 L80 84 L86 78" />
    </>
  ),
  Fade: () => (
    <>
      <Box x={20} y={30} w={36} h={40} r={4} fill="strong" />
      <Box x={62} y={30} w={36} h={40} r={4} fill="faint" stroke="strong" />
      <Box x={104} y={30} w={36} h={40} r={4} stroke="faint" dash="3 3" />
    </>
  ),
  Grow: () => (
    <>
      <Box x={22} y={56} w={16} h={16} r={3} fill="faint" stroke="strong" />
      <Box x={48} y={44} w={30} h={30} r={4} fill="faint" stroke="strong" />
      <Box x={88} y={28} w={50} h={46} r={5} fill="strong" />
    </>
  ),
  Slide: () => (
    <>
      <Stroke d="M20 34 H54 M20 50 H44 M20 66 H54" tone="faint" />
      <Box x={62} y={26} w={64} h={48} r={5} fill="strong" />
      <Bar x={72} y={44} w={36} tone="soft" />
      <Stroke d="M130 50 H142 M137 45 L142 50 L137 55" />
    </>
  ),
  Zoom: () => (
    <>
      <Box x={30} y={14} w={100} h={72} r={5} stroke="faint" dash="3 3" />
      <Box x={48} y={28} w={64} h={44} r={4} stroke="strong" />
      <Box x={64} y={40} w={32} h={20} r={3} fill="strong" />
    </>
  ),
  Tooltip: () => (
    <>
      <Box x={44} y={16} w={72} h={22} r={4} fill="strong" />
      <Bar x={54} y={25} w={50} tone="soft" />
      <Stroke d="M74 38 L80 45 L86 38 Z" tone="strong" fill="strong" />
      <Box x={54} y={52} w={52} h={26} r={5} stroke="strong" />
      <Bar x={64} y={63} w={32} />
    </>
  ),
  Portal: () => (
    <>
      <Box x={20} y={20} w={80} h={56} r={3} stroke="faint" />
      <Bar x={28} y={30} w={44} />
      <Box x={66} y={36} w={72} h={46} r={4} fill="soft" stroke="strong" />
      <Bar x={76} y={48} w={40} tone="strong" />
      <Bar x={76} y={60} w={50} />
      <Stroke d="M44 58 V44 M38 50 L44 44 L50 50" />
    </>
  ),
  FocusTrap: () => (
    <>
      <Box x={22} y={16} w={116} h={68} r={5} stroke="strong" dash="5 4" />
      <Box x={34} y={28} w={44} h={22} r={4} fill="strong" />
      <Bar x={44} y={36} w={24} tone="soft" />
      <Box x={84} y={28} w={44} h={22} r={4} stroke="strong" />
      <Bar x={34} y={62} w={92} />
    </>
  ),
  Modal: () => (
    <>
      <Box x={14} y={10} w={132} h={80} r={4} fill="faint" />
      <Box x={36} y={24} w={88} h={52} r={5} fill="soft" stroke="strong" />
      <Bar x={46} y={34} w={44} tone="strong" />
      <Bar x={46} y={46} w={66} />
      <Box x={90} y={60} w={26} h={10} r={5} fill="strong" />
    </>
  ),
  Popover: () => (
    <>
      <Box x={52} y={12} w={56} h={20} r={5} fill="strong" />
      <Bar x={62} y={20} w={36} tone="soft" />
      <Box x={36} y={44} w={88} h={42} r={5} fill="faint" stroke="strong" />
      <Stroke d="M72 44 L80 36 L88 44" tone="strong" />
      <Bar x={46} y={54} w={50} tone="strong" />
      <Bar x={46} y={66} w={68} />
    </>
  ),
  Pressable: () => (
    <>
      <Box x={36} y={32} w={88} h={36} r={6} stroke="strong" />
      <Dot cx={92} cy={50} r={18} fill="faint" />
      <Bar x={46} y={48} w={32} />
      <Stroke
        d="M98 54 L98 74 L103 69 L108 78 L111 76 L106 67 L113 67 Z"
        tone="strong"
        fill="soft"
        sw={1.2}
      />
    </>
  ),
}
