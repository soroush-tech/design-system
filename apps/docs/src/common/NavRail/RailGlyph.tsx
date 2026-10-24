import type { RailIcon } from 'src/common/nav'

export type GlyphName =
  | RailIcon
  | 'search'
  | 'close'
  | 'history'
  | 'code'
  | 'open_in_new'
  | 'light_mode'
  | 'dark_mode'

// Each glyph is drawn on a 24 x 24 grid in the current text color - a stroke, so it follows the
// rail's text and a color mode without another file to load.
const GLYPHS: Record<Exclude<GlyphName, 'dots'>, string> = {
  home: 'M4 11 L12 4 L20 11 V20 H14.5 V14.5 H9.5 V20 H4 Z',
  add_circle: 'M12 3 a9 9 0 1 0 0.01 0 Z M12 8 V16 M8 12 H16',
  palette:
    'M12 3 a9 9 0 1 0 0 18 c1.6 0 2-1.2 1.4-2.2 c-.6-1 0-2.3 1.3-2.3 H17 a4 4 0 0 0 4-4 c0-5-4-9.5-9-9.5 Z M7.5 11 h.01 M10 7.5 h.01 M14.5 7.5 h.01',
  article: 'M5 4 H19 V20 H5 Z M8 9 H16 M8 13 H16 M8 17 H13',
  book: 'M6 3 H18 V21 L12 17 L6 21 Z M12 8 l.9 1.8 2 .3 -1.4 1.4 .3 2 -1.8 -.9 -1.8 .9 .3 -2 -1.4 -1.4 2 -.3 Z',
  search: 'M10.5 4 a6.5 6.5 0 1 0 0.01 0 Z M15.5 15.5 L20.5 20.5',
  close: 'M6 6 L18 18 M18 6 L6 18',
  history: 'M12 3 a9 9 0 1 1 -8.5 6 M3 4 V9 H8 M12 7.5 V12 L15 14',
  package: 'M12 3 L20 7.5 V16.5 L12 21 L4 16.5 V7.5 Z M4 7.5 L12 12 L20 7.5 M12 12 V21',
  code: 'M8 8 L3 12 L8 16 M16 8 L21 12 L16 16 M14 5 L10 19',
  open_in_new: 'M14 4 H20 V10 M20 4 L11 13 M18 14 V19 H5 V6 H10',
  light_mode:
    'M12 8 a4 4 0 1 0 0.01 0 Z M12 2 V4 M12 20 V22 M2 12 H4 M20 12 H22 M4.9 4.9 L6.3 6.3 M17.7 17.7 L19.1 19.1 M4.9 19.1 L6.3 17.7 M17.7 6.3 L19.1 4.9',
  dark_mode: 'M20 14.5 A8.5 8.5 0 1 1 9.5 4 a7 7 0 0 0 10.5 10.5 Z',
}

// Three rows of three: the dots of `Get started`, filled - a stroke this short would not show.
const DOTS = [6, 12, 18].flatMap((cy) => [6, 12, 18].map((cx) => ({ cx, cy })))

/** A navigation glyph; decorative - the label beside it names it. */
export function RailGlyph({ name, size = 24 }: Readonly<{ name: GlyphName; size?: number }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'dots' ? (
        DOTS.map(({ cx, cy }) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.7} fill="currentColor" stroke="none" />
        ))
      ) : (
        <path d={GLYPHS[name]} />
      )}
    </svg>
  )
}
