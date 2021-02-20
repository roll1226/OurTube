import { useSelector } from "react-redux"
import { ModalState } from "./type"

export const useModalState = () => {
  return useSelector((state: { modal: ModalState }) => state)
}
