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

export const Card = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100px;
  padding: 32px;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  .show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 1rem;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    cursor: default;
    transform: translateY(100%);

    span {
      color: #fff;
      border: 2px solid #eee;
      border-radius: 8px;
      padding: 0 8px;
    }
  }
  &:hover {
    .show {
      transform: translateY(0);
      transition: all 0.2s ease-in-out;
    }
  }
`

export const Left = styled('div')`
  width: 20%;
`
export const Right = styled('div')`
  width: 80%;
`
