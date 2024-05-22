import styled from '@emotion/styled'

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
