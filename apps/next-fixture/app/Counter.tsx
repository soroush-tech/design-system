'use client'

import { Button } from '@gild-ui/react/Button'
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <Button color="brand" onClick={() => setCount(count + 1)} data-testid="counter">
      Clicked {count}
    </Button>
  )
}
