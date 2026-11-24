// A class component cannot call hooks: `withTheme` hands it the registered theme type.
import { Component } from 'react'
import { withTheme } from '@soroush.design/react/withTheme'
import { themes } from '../shared/themes'

class Chart extends Component<{ title: string; theme: typeof themes.light }> {
  render() {
    const grid: string = this.props.theme.chart.grid
    return `${this.props.title} ${grid}`
  }
}

export const ThemedChart = withTheme(Chart)
export const chart = <ThemedChart title="sales" />
