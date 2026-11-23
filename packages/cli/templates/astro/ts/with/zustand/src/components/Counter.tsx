import { Button } from '@soroush.design/react-components/Button'
import { Flex } from '@soroush.design/react-components/Flex'
import { Typography } from '@soroush.design/react-components/Typography'
import { withIsland } from '../theme/Island'
import { useCounter } from '../state/counter'

/**
 * A count, held in a zustand store, src/state/counter, and the button that adds to it.
 * An island of its own, which renders in the browser only: the count it shows is the store's,
 * not the HTML's.
 */
function Counter() {
  const { count, increment } = useCounter()
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
