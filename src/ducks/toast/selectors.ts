import { useSelector } from "react-redux"
import { ToastState } from "./type"

export const useToastState = () => {
  return useSelector((state: { toast: ToastState }) => state)
}
