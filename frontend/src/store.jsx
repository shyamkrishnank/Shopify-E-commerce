import { configureStore } from '@reduxjs/toolkit'
import AuthSliceReducers from './Slices/AuthSlice'

const store = configureStore({
  reducer: {
    auth : AuthSliceReducers
  },
})

export default store