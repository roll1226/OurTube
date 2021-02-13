import { Store, combineReducers } from "redux"
import logger from "redux-logger"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import counterSlice, { initialState as counterState } from "./auth/slice"

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
})

const preloadedState = () => {
  return { counter: counterState }
}

export type StoreState = ReturnType<typeof preloadedState>

export type ReduxStore = Store<StoreState>

const createStore = () => {
  const middlewareList = [...getDefaultMiddleware(), logger]

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: preloadedState(),
  })
}

export default createStore
