// Set up by @soroush.tech/design-system init. Your themes: change any value, or add a theme.
// Every token is listed at https://docs.soroush.tech/design-system/customization/theming/
import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'

// To add tokens of your own, declare them here, then give them values in each theme:
//
// import type { PaletteEntry } from '@soroush.tech/design-system/theme'
//
// declare module '@soroush.tech/design-system/theme' {
//   interface ThemePalette {
//     brand: PaletteEntry
//   }
// }

const themes = {
  light: createTheme(baseTheme, {
    name: 'light',
    colorScheme: 'light',
    logoFilter: 'brightness(0)',
    portraitBlend: 'multiply',
    portraitOpacity: 1,
    palette: {
      default: { main: '#5E6065', light: '#8F9094', dark: '#111214', contrastText: '#FFFFFF' },
      primary: { main: '#006E17', light: '#D4F9D2', dark: '#00530F', contrastText: '#FFFFFF' },
      secondary: { main: '#5ACC57', light: '#D4F9D2', dark: '#3AAA37', contrastText: '#FFFFFF' },
      success: { main: '#009928', light: '#E8FFE5', dark: '#006413', contrastText: '#FFFFFF' },
      error: { main: '#BA1A1A', light: '#FFDAD6', dark: '#93000A', contrastText: '#FFFFFF' },
      info: { main: '#0071A4', light: '#E0FAFF', dark: '#004D70', contrastText: '#FFFFFF' },
      warning: { main: '#CCA800', light: '#FFF0A0', dark: '#8C6D00', contrastText: '#FFFFFF' },
    },
    background: {
      backdrop: '#00000080',
      appBar: '#FFFFFFD9',
      glass: '#FFFFFF4D',
      modal: '#FFFFFF',
      default: '#EEEEEE',
      primary: '#F9F9F9',
      secondary: '#F3F3F3',
      paper: '#FFFFFF',
      terminal: '#EEEEEE',
      grid: '#5ACC5733',
      transparent: '#00000000',
      scrollbar: '#0000004D',
      scrollbarTrack: '#F3F3F380',
    },
    text: {
      inherit: 'inherit',
      initial: '#1A1C1C',
      primary: '#006E17',
      secondary: '#444748',
      disabled: '#1A1C1C73',
      error: '#BA1A1A',
      success: '#009928',
      info: '#0071A4',
      warning: '#8C6D00',
    },
    border: {
      default: '#1A1C1C24',
      light: '#0073181A',
      primary: '#006E17',
      dark: '#003D0B',
    },
    skeleton: {
      highlight: '#FFFFFFA6',
    },
  }),
  dark: createTheme(baseTheme, {
    name: 'dark',
    colorScheme: 'dark',
  }),
}

export default themes
