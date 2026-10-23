// The blues of a component's illustration, one set for each color mode: strong for outlines and
// fills, soft for what sits on a strong fill, faint for the quiet parts (text lines, tracks).
// Each clears 3:1 on its mode's tile (strong) - the faint ones are decoration.
export const illustrationInk = {
  light: { strong: '#0768cf', soft: '#bde3ff', faint: '#0768cf47' },
  dark: { strong: '#66b2ff', soft: '#cce5ff', faint: '#66b2ff47' },
} as const
