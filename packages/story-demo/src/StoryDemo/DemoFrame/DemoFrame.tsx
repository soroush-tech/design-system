import type { ReactNode } from 'react'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'

export interface DemoFrameProps {
  /** The rendered demo, on its surface. */
  preview: ReactNode
  /** An evaluation error, shown under the preview. */
  error?: ReactNode
  /** The action row (and controls), between the preview and the code. */
  toolbar: ReactNode
  /** The code editor, in its terminal box. */
  code: ReactNode
}

/**
 * A demo's body - its preview, an error line, the toolbar and the code - laid out the same
 * whether read-only or live, so a prerendered demo that turns live moves nothing on the page.
 */
export function DemoFrame({ preview, error, toolbar, code }: Readonly<DemoFrameProps>) {
  return (
    <>
      <Flex
        p={5}
        bg="paper"
        borderRadius="md"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        {preview}
      </Flex>
      <Typography variant="caption" color="error" as="div" mt={1} px={2}>
        {error}
      </Typography>
      {toolbar}
      <View px={2} pb={2}>
        <View
          bg="terminal"
          borderRadius="md"
          borderColor="light"
          borderWidth="thin"
          maxWidth="100%"
          overflow="auto"
        >
          {code}
        </View>
      </View>
    </>
  )
}
