import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MobileModalState } from "./type"

export const initialState: MobileModalState = {
  isOpen: false,
}

const mobileModalSlice = createSlice({
  name: "mobileModal",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpen: action.payload,
    }),
  },
})

export default mobileModalSlice
