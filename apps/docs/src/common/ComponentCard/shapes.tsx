// The drawing parts of a component's illustration: a few shapes painted from the ink variables
// that `ComponentIllustration` sets on its `<svg>`, so one drawing serves both color modes.

export type Tone = 'strong' | 'soft' | 'faint' | 'none'

const paint = (tone: Tone) => (tone === 'none' ? 'none' : `var(--ink-${tone})`)

interface BoxProps {
  x: number
  y: number
  w: number
  h: number
  r?: number
  fill?: Tone
  stroke?: Tone
  sw?: number
  dash?: string
}

/** A rounded rectangle, filled, outlined, or both. */
export const Box = ({
  x,
  y,
  w,
  h,
  r = 3,
  fill = 'none',
  stroke = 'none',
  sw = 1.5,
  dash,
}: Readonly<BoxProps>) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={r}
    fill={paint(fill)}
    stroke={paint(stroke)}
    strokeWidth={sw}
    strokeDasharray={dash}
  />
)

interface BarProps {
  x: number
  y: number
  w: number
  h?: number
  tone?: Tone
}

/** A pill: a line of text, a track, a thumb. */
export const Bar = ({ x, y, w, h = 4, tone = 'faint' }: Readonly<BarProps>) => (
  <Box x={x} y={y} w={w} h={h} r={h / 2} fill={tone} />
)

interface DotProps {
  cx: number
  cy: number
  r?: number
  fill?: Tone
  stroke?: Tone
  sw?: number
}

/** A circle, filled, outlined, or both. */
export const Dot = ({
  cx,
  cy,
  r = 4,
  fill = 'strong',
  stroke = 'none',
  sw = 1.5,
}: Readonly<DotProps>) => (
  <circle cx={cx} cy={cy} r={r} fill={paint(fill)} stroke={paint(stroke)} strokeWidth={sw} />
)

interface StrokeProps {
  d: string
  tone?: Tone
  sw?: number
  fill?: Tone
}

/** A path with round ends: a check, an arrow, a chevron, a plus. */
export const Stroke = ({ d, tone = 'strong', sw = 1.5, fill = 'none' }: Readonly<StrokeProps>) => (
  <path
    d={d}
    fill={paint(fill)}
    stroke={paint(tone)}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)

interface StarProps {
  x: number
  y: number
  size?: number
  fill?: Tone
}

const STAR =
  'M0 -1 L0.3 -0.35 L1 -0.3 L0.48 0.15 L0.62 0.85 L0 0.5 L-0.62 0.85 L-0.48 0.15 L-1 -0.3 L-0.3 -0.35 Z'

/** A five-pointed star centred on a point; outlined when it is not filled. */
export const Star = ({ x, y, size = 9, fill = 'strong' }: Readonly<StarProps>) => (
  <path
    d={STAR}
    transform={`translate(${x} ${y}) scale(${size})`}
    fill={paint(fill)}
    stroke={paint('strong')}
    strokeWidth={1.5 / size}
    strokeLinejoin="round"
  />
)

/** A plus, centred on a point. */
export const Plus = ({
  x,
  y,
  s = 5,
  tone = 'strong',
}: Readonly<{ x: number; y: number; s?: number; tone?: Tone }>) => (
  <Stroke d={`M${x - s} ${y} H${x + s} M${x} ${y - s} V${y + s}`} tone={tone} />
)
