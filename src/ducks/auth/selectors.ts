import { useSelector } from "react-redux"
import { CounterState } from "./type"

export const useCounterState = () => {
  return useSelector((state: { counter: CounterState }) => state)
}
