import styled, { css } from 'styled-components'

import FlatButton from '../FlatButton'

export const StyledHamburgerSlices = styled.span``

const StyledHamburgerButton = styled(FlatButton)`
  box-sizing: content-box;
  transition: width ${(props) => `${props.timing}ms`} ease-in-out,
    transform ${(props) => `${props.timing}ms`} ease-in-out;

  &:before,
  &:after {
    content: "";
  }

  &:before,
  &:after,
  ${StyledHamburgerSlices} {
    pointer-events: none;
    width: 100%;
    display: block;
    background-color: ${(props) => props.color};
    border-radius: 4px;
    height: 2px;
    margin-bottom: 7px;
    transition: width ${(props) => `${props.timing}ms`} ease-in-out,
      transform ${(props) => `${props.timing + 100}ms`} ease-in-out;
  }

  &:after {
    margin-bottom: 0;
  }

  ${(props) => (props.active ? activeMixin : null)};
`

StyledHamburgerButton.defaultProps = {
  width: 22,
  height: 22,
  color: 'black',
  bg: 'transparent',
  overBg: 'transparent',
  p: 5,
  timing: 200,
}

export default StyledHamburgerButton

const activeMixin = css`
  transform: rotate(90deg);

  &:before,
  &:after {
    width: 70%;
  }

  &:before {
    transform: translateX(-2px) translateY(4px) rotate(-45deg);
  }

  &:after {
    transform: translateX(-2px) translateY(-4px) rotate(45deg);
  }
`
