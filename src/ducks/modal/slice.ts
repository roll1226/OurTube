import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ModalState } from "./type"

export const initialState: ModalState = {
  roomId: "",
  isOpen: false,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => ({
      ...state,
      roomId: action.payload,
    }),
    setIsActive: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpen: action.payload,
    }),
  },
})

export default modalSlice
