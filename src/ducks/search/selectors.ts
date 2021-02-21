import { useSelector } from "react-redux"
import { SearchState } from "./type"

export const useSearchState = () => {
  return useSelector((state: { search: SearchState }) => state)
}
