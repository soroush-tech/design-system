import{n as e}from"../chunks/chunk-COiEfhsA.js";import{I as t,t as n}from"../chunks/chunk-B3o0ik77.js";import{t as r}from"../chunks/chunk-DSsNmT1g.js";import{w as i}from"../chunks/chunk-B-kGZV1z.js";var a=`# Installation

## Start a new app

To start a new app on the design system - a Vike app, prerendered at build time, that then moves
between pages with no reload - in TypeScript or JavaScript:

\`\`\`sh
npx @soroush.design/cli create my-app
\`\`\`

It makes the app in a new folder, with the themes, the providers and a few pages, shows every file
first, and installs it with the package manager you ran it with. Add \`--sample-data\`, or answer
yes to its question, for two pages that show how data gets onto a page: a list of sample items,
and a page for each. Its options are in the
[command line](/cli/) docs. For an app you already have, use \`init\`, below.

## Set it up with one command

In a client-rendered React app - built with Vite, webpack, Rspack, Parcel or Create React App,
in TypeScript or JavaScript - one command sets the design system up:

\`\`\`sh
npx @soroush.design/cli init
\`\`\`

It shows every change before it makes one, and writes nothing until you say yes:

- \`src/theme/themes\` - a \`light\` and a \`dark\` theme, each a \`createTheme(baseTheme, {...})\` call
  you make your own;
- \`src/theme/Providers\` - the \`ThemeProvider\` with the base page styles;
- your root - what it renders is wrapped in \`<Providers>\`;
- the install of \`@soroush.tech/design-system\`, with your own package manager.

It runs in a git repository with no uncommitted change, never overwrites a file, and takes back
every change if a write fails. Run in a workspace's root, it sets up the one app in it. Add
\`--dry-run\` to see the changes and exit. In PowerShell, quote the package name, since \`@\` starts a
splat there: \`npx '@soroush.design/cli' init\`.

Every option, and what \`init\` checks first, are in the [command line](/cli/) docs. Next.js, Vike
and React Router apps are not supported by \`init\` yet: set those up by hand, below.

## Or set it up by hand

Install the design system and its peer dependencies:

\`\`\`sh
npm i @soroush.tech/design-system react react-dom
\`\`\`

It works with React 18 and React 19: \`react\` and \`react-dom\` \`^18.0.0 || ^19.0.0\`. Both are tested
in CI, on 18.0.0 and on 19.

### Set up the ThemeProvider

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
`,o=e({default:()=>c}),s=i();function c(){return(0,s.jsx)(r,{source:a})}var l={hasServerOnlyHook:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},isClientRuntimeLoaded:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},onBeforeRenderEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},dataEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:{server:!0}}},guardEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},onRenderClient:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+onRenderClient.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:t}},Page:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/installation/+Page.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:o}},hydrationCanBeAborted:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+config.ts`,fileExportPathToShowToUser:[`default`,`hydrationCanBeAborted`]},valueSerialized:{type:`js-serialized`,value:!0}},title:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/installation/+config.ts`,fileExportPathToShowToUser:[`default`,`title`]},valueSerialized:{type:`js-serialized`,value:`Installation`}},description:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/installation/+config.ts`,fileExportPathToShowToUser:[`default`,`description`]},valueSerialized:{type:`js-serialized`,value:`Install @soroush.tech/design-system, wrap your app in the ThemeProvider, and set up the fonts.`}},Loading:{type:`standard`,definedAtData:{filePathToShowToUser:`vike-react/__internal/integration/Loading`,fileExportPathToShowToUser:[]},valueSerialized:{type:`pointer-import`,value:n}}};export{l as configValuesSerialized};