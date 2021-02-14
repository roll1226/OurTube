import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState } from "./type"
import firebase from "firebase/app"

export const initialState: AuthState = {
  name: "",
  isAnonymously: false,
  authLoader: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    settUser: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAnonymously: action.payload,
      authLoader: false,
    }),
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    setAuthLoader: (state, action: PayloadAction<boolean>) => ({
      ...state,
      authLoader: action.payload,
    }),
  },
})

export default authSlice
