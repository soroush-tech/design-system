import{n as e}from"../chunks/chunk-aKtaBQYM.js";import{t,u as n}from"../chunks/chunk-BF5idQyo.js";import{W as r}from"../chunks/chunk-BkML6sXq.js";import{t as i}from"../chunks/chunk-VwUPG73Q.js";var a=`# Usage

## Import per component

Every component ships on its own subpath, so bundlers tree-shake by construction:

\`\`\`tsx
import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
\`\`\`

The barrel export carries the styling engine and theme helpers:

\`\`\`tsx
import { styled, css } from '@soroush.tech/design-system'
import { createTheme, type Theme } from '@soroush.tech/design-system/theme'
\`\`\`

## Style props

Components accept styled-system props resolved against theme scales - space, layout,
typography, flexbox, border, and position:

\`\`\`tsx
<Flex flexDirection="column" gap={3} p={4} maxWidth="40rem" mx="auto">
  <Typography variant="h2">Title</Typography>
  <Typography color="secondary">Body copy.</Typography>
  <Button variant="contained" color="primary" mt={2}>
    Continue
  </Button>
</Flex>
\`\`\`

Numbers resolve against \`theme.space\`; named keys resolve against their scale
(\`color="secondary"\` reads \`theme.text.secondary\`). Responsive arrays work on every style
prop: \`px={[2, 3, 5]}\` applies per breakpoint.

## Layout primitives

Prefer \`View\`, \`Flex\`, and \`Typography\` over raw \`div\` and \`p\` - they carry the style-prop
surface and keep markup theme-aware. See each component's page for its full prop reference.
`,o=e({default:()=>c}),s=r();function c(){return(0,s.jsx)(i,{source:a})}var l={hasServerOnlyHook:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},isClientRuntimeLoaded:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},onBeforeRenderEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},dataEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:{server:!0}}},guardEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},onRenderClient:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+onRenderClient.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:n}},Page:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/usage/+Page.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:o}},hydrationCanBeAborted:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+config.ts`,fileExportPathToShowToUser:[`default`,`hydrationCanBeAborted`]},valueSerialized:{type:`js-serialized`,value:!0}},title:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/usage/+config.ts`,fileExportPathToShowToUser:[`default`,`title`]},valueSerialized:{type:`js-serialized`,value:`Usage`}},description:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/getting-started/usage/+config.ts`,fileExportPathToShowToUser:[`default`,`description`]},valueSerialized:{type:`js-serialized`,value:`Per-component subpath imports, styled-system props against theme scales, and the layout primitives.`}},Loading:{type:`standard`,definedAtData:{filePathToShowToUser:`vike-react/__internal/integration/Loading`,fileExportPathToShowToUser:[]},valueSerialized:{type:`pointer-import`,value:t}}};export{l as configValuesSerialized};