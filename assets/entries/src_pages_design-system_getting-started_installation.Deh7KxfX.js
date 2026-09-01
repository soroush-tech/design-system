import{n as e}from"../chunks/chunk-aKtaBQYM.js";import{t,u as n}from"../chunks/chunk-BF5idQyo.js";import{W as r}from"../chunks/chunk-BkML6sXq.js";import{t as i}from"../chunks/chunk-VwUPG73Q.js";var a=`# Installation

Install the design system and its peer dependencies:

\`\`\`sh
npm i @soroush.tech/design-system react react-dom
\`\`\`

## Set up the ThemeProvider

Every component reads its colors, spacing, and typography from the theme. Wrap your app once:

\`\`\`tsx
import { ThemeProvider, baseTheme, createTheme } from '@soroush.tech/design-system/theme'

const theme = createTheme(baseTheme, {
  // Your brand overrides - palettes, backgrounds, text colors, ...
})

export function App() {
  return <ThemeProvider theme={theme}>{/* your app */}</ThemeProvider>
}
\`\`\`

\`baseTheme\` is a complete dark-schemed default, so an empty override object is a valid start.
See [Theming](/design-system/customization/theming/) for building light and dark brand themes.

## Fonts

The theme's default stacks reference Space Grotesk (body) and JetBrains Mono (code). Self-host
them with Fontsource, or swap the \`fonts\` scale to your own faces:

\`\`\`sh
npm i @fontsource-variable/space-grotesk @fontsource-variable/jetbrains-mono
\`\`\`

\`\`\`ts
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
\`\`\`
`,o=e({default:()=>c}),s=r();function c(){return(0,s.jsx)(i,{source:a})}var l={hasServerOnlyHook:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},isClientRuntimeLoaded:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},onBeforeRenderEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},dataEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:{server:!0}}},guardEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},onRenderClient:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+onRenderClient.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:n}},Page:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/installation/+Page.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:o}},hydrationCanBeAborted:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+config.ts`,fileExportPathToShowToUser:[`default`,`hydrationCanBeAborted`]},valueSerialized:{type:`js-serialized`,value:!0}},title:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/installation/+config.ts`,fileExportPathToShowToUser:[`default`,`title`]},valueSerialized:{type:`js-serialized`,value:`Installation`}},description:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/installation/+config.ts`,fileExportPathToShowToUser:[`default`,`description`]},valueSerialized:{type:`js-serialized`,value:`Install @soroush.tech/design-system, wrap your app in the ThemeProvider, and set up the fonts.`}},Loading:{type:`standard`,definedAtData:{filePathToShowToUser:`vike-react/__internal/integration/Loading`,fileExportPathToShowToUser:[]},valueSerialized:{type:`pointer-import`,value:t}}};export{l as configValuesSerialized};