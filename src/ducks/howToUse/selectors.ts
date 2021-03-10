import { useSelector } from "react-redux"
import { HowToUseState } from "./type"

export const useHowToUseState = () => {
  return useSelector((state: { howToUse: HowToUseState }) => state)
}
