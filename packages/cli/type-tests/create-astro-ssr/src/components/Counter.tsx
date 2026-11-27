import { useState } from 'react'
import { Button } from '@gild-ui/react/Button'
import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
import { withIsland } from '../theme/Island'

/**
 * A count, held in the component's own state, and the button that adds to it. An island of its
 * own, which renders in the browser only.
 */
function Counter() {
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

export default withIsland(Counter)
