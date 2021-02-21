import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SearchState } from "./type"
import { asyncSearchYouTube } from "./asyncActions"

export const initialState: SearchState = {
  result: [],
  loading: false,
  error: false,
  errorMessage: "",
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setResult: (
      state,
      action: PayloadAction<
        {
          url: string
          id: string
          title: string
          thumbnail: string
        }[]
      >
    ) => ({
      ...state,
      result: action.payload,
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
    setError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      error: action.payload,
    }),
    setErrorMessage: (state, action: PayloadAction<string>) => ({
      ...state,
      errorMessage: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSearchYouTube.pending, (state) => {
      return {
        ...state,
        result: [],
        loading: true,
        error: false,
        errorMessage: "",
      }
    })
    builder.addCase(
      asyncSearchYouTube.rejected,
      (state, action: RejectedAction<string>) => {
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: action.error.message,
        }
      }
    )
    builder.addCase(
      asyncSearchYouTube.fulfilled,
      (
        state,
        action: PayloadAction<
          {
            url: string
            id: string
            title: string
            thumbnail: string
          }[]
        >
      ) => {
        return {
          ...state,
          result: action.payload,
          loading: false,
          error: false,
          errorMessage: "",
        }
      }
    )
  },
})

export default searchSlice
