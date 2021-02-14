import { useSelector } from "react-redux"
import { LoaderState } from "./type"

export const useCounterState = () => {
  return useSelector((state: { loader: LoaderState }) => state)
}
