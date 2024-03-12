import styled from '@emotion/styled'

export const Badge = styled('span')`
  background-color: rgba(8, 112, 95, 0.2);
  border-radius: 4px;
  font-variant-numeric: lining-nums tabular-nums;
  font-family: 'GothamProRegular';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  padding: 4px 8px;
  color: var(--Green);
  white-space: nowrap;
  &.in_progress {
    color: #f2994a;
    background-color: rgba(242, 153, 74, 0.2);
  }
  &.canceled {
    background-color: rgba(235, 87, 87, 0.2);
    color: #eb5757;
  }
`
