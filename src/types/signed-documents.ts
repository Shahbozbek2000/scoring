export interface DocumentItem {
  number: string
  sign_date: string
  signer: string
  application_pdf: string
  createdAt: string
  updatedAt: string
  actions: any
  type_name: string
}

export interface DocumentResponse {
  result: DocumentItem[]
  count: number
}
