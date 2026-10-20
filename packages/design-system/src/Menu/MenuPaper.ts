import type { PaperElevation } from '../Paper'
import { styled, type Theme, get, system } from '../index'
import { themeDefault } from '../theme/utils/themeDefault'

export interface MenuPaperProps {
  elevation: PaperElevation
  layer: keyof Theme['zOrder']
  /** The least room to the window's edge, in pixels - the list never grows past it. */
  margin: number
}

const elevationSystem = system({ elevation: { property: 'boxShadow', scale: 'shadows' } })

// The surface a `Paper` would draw, on an element that can be placed: fixed in the window,
// as high as the window allows, scrolling a long list.
export const MenuPaper = styled('div', {
  name: 'Menu',
  slot: 'paper',
  label: 'MenuPaper',
  shouldForwardProp: (prop) => !['elevation', 'layer', 'margin'].includes(prop),
})<MenuPaperProps>(
  ({ theme, layer, margin }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: theme.zOrder[layer],
    minWidth: '10rem',
    maxHeight: `calc(100vh - ${2 * margin}px)`,
    overflowY: 'auto',
    backgroundColor: get(theme, `background.${themeDefault(theme, 'surfaceBg', 'paper')}`),
    borderRadius: theme.radii.sm,
    // Hidden until placed (`useMenuPlacement` shows it), so it never shows at the wrong spot.
    visibility: 'hidden',
  }),
  elevationSystem
)
