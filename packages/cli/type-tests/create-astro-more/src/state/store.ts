import { configureStore, createSlice } from '@reduxjs/toolkit'

/** The home page's count: a slice of the store. */
const countSlice = createSlice({
  name: 'count',
  initialState: 0,
  reducers: {
    incremented: (count) => count + 1,
  },
})

export const { incremented } = countSlice.actions

/** The app's Redux store, which every island's Island provides: one store, for all of them. */
export const store = configureStore({ reducer: { count: countSlice.reducer } })

export type RootState = ReturnType<typeof store.getState>
