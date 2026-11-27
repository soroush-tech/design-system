import { Button } from '@gild-ui/react/Button'
import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
import { useAtom } from 'jotai'
import { countAtom } from '../../state/counter'

/** A count, held in a Jotai atom, src/state/counter, and the button that adds to it. */
export function Counter() {
  const [count, setCount] = useAtom(countAtom)
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
