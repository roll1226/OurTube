import { useSelector } from "react-redux"
import { AuthState } from "./type"

export const useAuthState = () => {
  return useSelector((state: { auth: AuthState }) => state)
}
