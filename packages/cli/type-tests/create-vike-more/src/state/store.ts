import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'

/** The color scheme the app is drawn in: a slice of the store. */
const schemeSlice = createSlice({
  name: 'scheme',
  initialState: 'light' as 'light' | 'dark',
  reducers: {
    schemeChanged: (_scheme, action: PayloadAction<'light' | 'dark'>) => action.payload,
  },
})

/** The home page's count: another slice. */
const countSlice = createSlice({
  name: 'count',
  initialState: 0,
  reducers: {
    incremented: (count) => count + 1,
  },
})

export const { schemeChanged } = schemeSlice.actions
export const { incremented } = countSlice.actions

/** The app's Redux store, which PageShell provides to every page. */
export const store = configureStore({
  reducer: { scheme: schemeSlice.reducer, count: countSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
