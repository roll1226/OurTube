import { createAsyncThunk } from "@reduxjs/toolkit"
import FetchYouTubeUtil from "../../utils/lib/FetchYouTubeUtil"

export const asyncSearchYouTube = createAsyncThunk<
  {
    url: string
    id: string
    title: string
    thumbnail: string
  }[],
  string
>(
  "search/asyncSearchYouTube",
  async (
    keyword: string
  ): Promise<
    {
      url: string
      id: string
      title: string
      thumbnail: string
    }[]
  > => {
    const result = await FetchYouTubeUtil.searchYouTubeVide(keyword)

    if (!result) {
      return Promise.reject(new Error("asyncIncrementCounter error"))
    }

    return result
  }
)
