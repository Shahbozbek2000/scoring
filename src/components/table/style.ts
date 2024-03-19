import styled from '@emotion/styled'

export const TableWrapper = styled('div')`
  width: 100%;
  overflow-x: auto;
`

export const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  thead {
    tr {
      padding: 8px;
      th {
        color: var(--Gray);
        font-variant-numeric: lining-nums tabular-nums;
        font-family: 'GothamProRegular';
        font-size: 14px;
        font-style: normal;
        line-height: 20px;
        padding: 8px;
        text-align: left;
      }
    }
  }
  tbody {
    tr {
      padding: 8px;
      border-radius: 4px;
      &:nth-of-type(2n + 1) {
        background-color: var(--Gray-1);
      }
      td {
        padding: 8px;
        color: var(--dark);
        font-variant-numeric: lining-nums tabular-nums;
        font-family: 'GothamProRegular';
        font-size: 14px;
        font-style: normal;
        line-height: 20px;
        max-width: 250px;
      }
    }
  }
`
