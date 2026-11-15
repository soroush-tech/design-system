import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { incremented } from '../../state/store'
/** A count, held in the Redux store, src/state/store, and the button that adds to it. */
export function Counter() {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
  const increment = () => dispatch(incremented())
  return (
    <Flex flexDirection="row" alignItems="center" gap={2}>
      <Button size="sm" variant="outlined" onClick={increment}>
        Count
      </Button>
      <Typography>Count: {count}</Typography>
    </Flex>
  )
}
