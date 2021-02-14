import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoaderState } from "./type"

export const initialState: LoaderState = {
  isLoading: false,
}

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setIsLoader: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
})

export default loaderSlice
