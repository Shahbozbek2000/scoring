import styled from '@emotion/styled'

export const PaperWrapper = styled('div')`
  padding: 24px;
  background-color: var(--Gray-1);
  border-radius: 12px;
  min-height: 848px;
`
export const Paper = styled('div')`
  width: 100%;
  height: 297mm;
  background-color: var(--main-white);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Content = styled('div')`
  padding: 32px;
`

export const Form = styled('form')``
export const FormHeader = styled('div')`
  display: flex;
  gap: 4px;
`

export const SignedCompanies = styled('div')``

export const Card = styled('div')`
  width: 100%;
  background-color: #cce5ff;
  border: 1px solid #b8daff;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;

  p {
    margin: 0;
  }
  span {
    font-weight: bold;
  }
`
