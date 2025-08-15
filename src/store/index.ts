import { userSlice } from './UserSlice'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
