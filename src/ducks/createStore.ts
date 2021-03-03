import { Store, combineReducers } from "redux"
import logger from "redux-logger"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import toastSlice, { initialState as toastState } from "./toast/slice"
import loaderSlice, { initialState as LoaderState } from "./loader/slice"
import modalSlice, { initialState as ModalState } from "./modal/slice"
import searchSlice, { initialState as SearchState } from "./search/slice"
import mobileModalSlice, {
  initialState as MobileModalState,
} from "./mobileModal/slice"

const rootReducer = combineReducers({
  toast: toastSlice.reducer,
  loader: loaderSlice.reducer,
  modal: modalSlice.reducer,
  search: searchSlice.reducer,
  mobileModal: mobileModalSlice.reducer,
})

const preloadedState = () => {
  return {
    toast: toastState,
    loader: LoaderState,
    modal: ModalState,
    search: SearchState,
    mobileModal: MobileModalState,
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
