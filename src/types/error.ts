export interface ErrorProps {
  status: number
  response: { data: { code: number; message: string; errors: string[] }; status: number }
}
