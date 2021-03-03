import { useSelector } from "react-redux"
import { MobileModalState } from "./type"

export const useMobileModalState = () => {
  return useSelector((state: { mobileModal: MobileModalState }) => state)
}
