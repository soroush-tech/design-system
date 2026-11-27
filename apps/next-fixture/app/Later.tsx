'use client'

import { Button } from '@gild-ui/react/Button'
import { Paper } from '@gild-ui/react/Paper'
import { useState } from 'react'

/** A client component that mounts after a click, so its classes are new to the document. */
export function Later() {
  const [shown, setShown] = useState(false)
  return (
    <>
      <Button variant="text" onClick={() => setShown(true)} data-testid="show-later">
        Show
      </Button>
      {shown ? (
        <Paper p={5} data-testid="later">
          Mounted later
        </Paper>
      ) : null}
    </>
  )
}
