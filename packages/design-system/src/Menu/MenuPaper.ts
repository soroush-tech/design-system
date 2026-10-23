import type { PaperElevation } from '../Paper'
import { styled, type Theme, get, system } from '../index'
import { themeDefault } from '../theme/utils/themeDefault'
import { getSurfaceRadius } from '../utils/getSurfaceRadius'

export interface MenuPaperProps {
  elevation: PaperElevation
  layer: keyof Theme['zOrder']
  /** The least room to the window's edge, in pixels - the list never grows past it. */
  margin: number
  /** Corner radius - resolves against `theme.radii`. Default: `theme.defaults.surfaceRadius`, else square. */
  borderRadius?: keyof Theme['radii']
}

const elevationSystem = system({ elevation: { property: 'boxShadow', scale: 'shadows' } })

// The surface a `Paper` would draw, on an element that can be placed: fixed in the window,
// as high as the window allows, scrolling a long list.
export const MenuPaper = styled('div', {
  name: 'Menu',
  slot: 'paper',
  label: 'MenuPaper',
  shouldForwardProp: (prop) => !['elevation', 'layer', 'margin', 'borderRadius'].includes(prop),
})<MenuPaperProps>(
  ({ theme, layer, margin, borderRadius }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: theme.zOrder[layer],
    minWidth: '10rem',
    maxHeight: `calc(100vh - ${2 * margin}px)`,
    overflowY: 'auto',
    backgroundColor: get(theme, `background.${themeDefault(theme, 'surfaceBg', 'paper')}`),
    borderRadius: getSurfaceRadius(theme, borderRadius),
    // Hidden until placed (`useMenuPlacement` shows it), so it never shows at the wrong spot.
    visibility: 'hidden',
  }),
  elevationSystem
)
