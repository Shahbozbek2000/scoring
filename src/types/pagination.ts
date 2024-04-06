export interface ICustomPagination {
  count: number
  params: {
    page?: number
    limit?: number
  }
  setParams: React.Dispatch<
    React.SetStateAction<{
      page: number
      limit: number
    }>
  >
}
