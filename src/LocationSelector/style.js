import styled, { css } from 'styled-components'
import { space } from 'styled-system'

import { omitStyled } from 'utils/styled'

import Flex from '../Flex'

export default styled.div`
  width: ${(props) => `${props.width}px`};
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `};
  position: relative;
  z-index: 2;
`

const StyledLSButton = omitStyled(Flex, ['locations', 'fullWidth'])`
  cursor: pointer;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.lightMedGrey};
  ${(props) =>
    props.fullWidth &&
    css`
      margin: 0 15px;
    `};
  padding: 0;
  height: 60px;
  background-color: transparent;
  position: relative;
  z-index: 4;
`

StyledLSButton.displayName = 'StyledLSButton'

export { StyledLSButton }

export const StyledLSOptions = styled.div`
  opacity: ${(props) => (props.open ? 1 : 0)};
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
  transition: opacity 0.3s;
  background-color: white;
  top: -15px;
  box-sizing: border-box;
  left: -15px;
  right: -15px;
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `};
  ${(props) =>
    props.fullWidth &&
    css`
      box-sizing: border-box;
    `};
  ${(props) =>
    props.fullWidth &&
    css`
      left: 0;
    `};
  ${(props) =>
    props.fullWidth &&
    css`
      right: 0;
    `};
  padding: 85px 15px 15px;
  position: absolute;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
`

export const StyledLocationItem = styled.div`
  ${space};
  cursor: pointer;
  transition: color 0.3s;
  ${(props) =>
    props.active &&
    css`
      cursor: default;
      color: ${props.theme.brandColor};
      font-weight: ${props.theme.fontSizeBold};
    `};

  &:hover {
    color: ${(props) => props.theme.brandColor};
  }

  &:last-child {
    margin-bottom: 0;
  }
`

StyledLocationItem.defaultProps = {
  py: 1,
}
