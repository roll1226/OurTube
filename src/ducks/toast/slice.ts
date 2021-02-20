import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToastState } from "./type"

export const initialState: ToastState = {
  text: "",
  isActive: false,
  toastColor: "",
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => ({
      ...state,
      text: action.payload,
    }),
    setIsActive: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isActive: action.payload,
    }),
    setToastColor: (
      state,
      action: PayloadAction<"success" | "error" | "">
    ) => ({
      ...state,
      toastColor: action.payload,
    }),
  },
})

export default toastSlice
