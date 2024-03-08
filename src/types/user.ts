export interface Phone {
  phone: string | null
}

export interface MyFormValues {
  id?: string | null
  checkbox?: boolean | null
  firstname: string
  name: string
  country?: string | null
  language?: string | null
  phones?: Phone[] | null
}
