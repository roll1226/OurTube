import { Store, combineReducers } from "redux"
import logger from "redux-logger"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import counterSlice, { initialState as counterState } from "./test/slice"
import authSlice from "./auth/slice"
import { initialState as AuthState } from "./auth/slice"
import loaderSlice, { initialState as LoaderState } from "./loader/slice"

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
  loader: loaderSlice.reducer,
})

const preloadedState = () => {
  return { counter: counterState, auth: AuthState, loader: LoaderState }
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
