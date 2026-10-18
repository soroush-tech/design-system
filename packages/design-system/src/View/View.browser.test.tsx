import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Flex } from '../Flex'
import { Grid } from '../Grid'
import { View } from './'

// A fixed-mode frame's width comes from its parent's layout - only a real layout engine
// resolves it. Without a width of its own, a grid or flex item sizes to its content.
const fixed = { mode: 'fixed', maxWidth: '1000px' } as const

const frameBox = () => document.querySelector('[data-testid="frame"]')!.getBoundingClientRect()

describe('a fixed-mode frame (real layout)', () => {
  it('stretches to its max width inside a flex column, centred', () => {
    renderWithTheme(
      <Flex width="1400px">
        <View layout={fixed} data-testid="frame">
          short
        </View>
      </Flex>
    )
    expect(frameBox().width).toBeCloseTo(1000, 0)
    expect(frameBox().left).toBeCloseTo(200, 0)
  })

  it('stretches to its max width as a grid item', () => {
    renderWithTheme(
      <Grid width="1400px" gridTemplateColumns="1fr">
        <View layout={fixed} data-testid="frame">
          short
        </View>
      </Grid>
    )
    expect(frameBox().width).toBeCloseTo(1000, 0)
  })

  it('stretches inside a flex row too, capped and centred', () => {
    renderWithTheme(
      <Flex flexDirection="row" width="1400px">
        <View layout={fixed} data-testid="frame">
          short
        </View>
      </Flex>
    )
    expect(frameBox().width).toBeCloseTo(1000, 0)
    expect(frameBox().left).toBeCloseTo(200, 0)
  })

  it('fills a flex row narrower than its max width', () => {
    renderWithTheme(
      <Flex flexDirection="row" width="800px">
        <View layout={fixed} data-testid="frame">
          short
        </View>
      </Flex>
    )
    expect(frameBox().width).toBeCloseTo(800, 0)
  })

  it('fills a parent narrower than its max width', () => {
    renderWithTheme(
      <Flex width="600px">
        <View layout={fixed} data-testid="frame">
          short
        </View>
      </Flex>
    )
    expect(frameBox().width).toBeCloseTo(600, 0)
  })
})
