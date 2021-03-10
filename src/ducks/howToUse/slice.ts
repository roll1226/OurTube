import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HowToUseState } from "./type"

export const initialState: HowToUseState = {
  isOpen: false,
}

const howToUseSlice = createSlice({
  name: "howToUse",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpen: action.payload,
    }),
  },
})

export default howToUseSlice
