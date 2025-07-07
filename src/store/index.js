import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./webSocket"
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})