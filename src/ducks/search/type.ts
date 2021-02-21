export type SearchState = {
  result: {
    url: string
    id: string
    title: string
    thumbnail: string
  }[]
  loading: boolean
  error: boolean
  errorMessage: string
}
