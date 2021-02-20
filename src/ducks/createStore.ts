import { Store, combineReducers } from "redux"
import logger from "redux-logger"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import counterSlice, { initialState as counterState } from "./test/slice"
import toastSlice, { initialState as toastState } from "./toast/slice"
import loaderSlice, { initialState as LoaderState } from "./loader/slice"
import modalSlice, { initialState as ModalState } from "./modal/slice"

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  toast: toastSlice.reducer,
  loader: loaderSlice.reducer,
  modal: modalSlice.reducer,
})

const preloadedState = () => {
  return {
    counter: counterState,
    toast: toastState,
    loader: LoaderState,
    modal: ModalState,
  }
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
