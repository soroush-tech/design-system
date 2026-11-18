import { useState } from 'react'
import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'

/** A count, held in the component's own state, and the button that adds to it. */
export function Counter() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  return (
    <Flex flexDirection="row" alignItems="center" gap={2}>
      <Button size="sm" variant="outlined" onClick={increment}>
        Count
      </Button>
      <Typography>Count: {count}</Typography>
    </Flex>
  )
}
