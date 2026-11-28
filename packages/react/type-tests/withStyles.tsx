// Type-level test of `withStyles`, against the built declarations (`pnpm test:types`): the wrapped
// component, a class or a function, gets `styles` as an entry usable as `style`, the 2.2.0 call
// forms type-check, and the wrapper takes the component's props without `styles`.
import { Component } from 'react'
import { withStyles, type StyleOverride } from '@gild-ui/react'
import type { StyleFactory } from '@gild-ui/react/withStyles'
import { Paper } from '@gild-ui/react/Paper'

const factory: StyleFactory = { getStyles: (theme) => ({ padding: theme.space[2] }) }

class Card extends Component<{ label: string; styles: StyleOverride }> {
  render() {
    return <Paper style={this.props.styles}>{this.props.label}</Paper>
  }
}
function Panel({ styles }: { styles: StyleOverride }) {
  return <Paper style={styles} />
}

const FromFactory = withStyles<{ label: string }>(factory)(Card)
const FromObject = withStyles<{ label: string }>({ opacity: 0.5 })(Card)
const FromFunction = withStyles<object>(factory)(Panel)

export const Accepted = () => (
  <>
    <FromFactory label="a" />
    <FromObject label="b" />
    <FromFunction />
  </>
)
export const Given = () => (
  // @ts-expect-error `styles` is given by the wrapper, not by the caller
  <FromFactory label="a" styles={{}} />
)
export const Missing = () => (
  // @ts-expect-error the other props are still required
  <FromObject />
)
