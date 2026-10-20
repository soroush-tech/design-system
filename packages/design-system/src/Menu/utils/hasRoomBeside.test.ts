import { describe, it, expect } from 'vitest'
import { hasRoomBeside } from './hasRoomBeside'

// A row 100px wide, 300px from the left of a 1000px window, kept 16px from its edges.
const row = { top: 0, left: 300, width: 100, height: 40 }

describe('hasRoomBeside', () => {
  it('fits a list on the side with room - after the row, or before it', () => {
    expect(hasRoomBeside(row, 584, 1000, 16)).toBe(true)
    expect(hasRoomBeside({ ...row, left: 800 }, 784, 1000, 16)).toBe(true)
  })

  it('has no room when the list is wider than either side', () => {
    expect(hasRoomBeside(row, 585, 1000, 16)).toBe(false)
  })
})
