import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `TabPanel`. */
export interface TabPanelOwnerState {
  shouldKeepMounted?: boolean
}

/** The slots of TabPanel a theme can style with `styleOverrides`. */
export type TabPanelSlot = 'root'

/** What `theme.components.TabPanel` takes. */
export type TabPanelThemeConfig = ComponentConfig<TabPanelOwnerState, TabPanelSlot>
