import styled from 'styled-components'
import { space, color } from 'styled-system'

export const StyledToggleText = styled.span`
  ${color};
  display: inline-block;
  padding-right: 4px;
  line-height: 22px;
`

export const StyledToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20.5px;
`

export const StyledToggleSlider = styled.span`
  position: absolute;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.disabledColor};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50px;

  &:before {
    position: absolute;
    content: "";
    height: 16.5px;
    width: 16.5px;
    left: 2px;
    bottom: 2px;
    background-color: ${(props) =>
    props.disabled ? props.theme.superLightGrey : 'white'};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  }
`

export const StyledToggleInput = styled.input`
  display: none;
  &:checked + ${StyledToggleSlider} {
    background-color: ${(props) => {
    if (props.error) {
      return props.theme.errorColor
    }
    if (props.warning) {
      return props.theme.warningColor
    }
    return props.enabledColor
  }};
  }

  &:focus + ${StyledToggleSlider} {
    box-shadow: 0 0 1px
      ${(props) => {
    if (props.error) {
      return props.theme.errorColor
    }
    if (props.warning) {
      return props.theme.warningColor
    }
    return props.enabledColor
  }};
  }
  &:checked + ${StyledToggleSlider}:before {
    transform: translateX(17px);
  }
`
StyledToggleInput.displayName = 'StyledToggleInput'

export default styled.div`
  ${space};
  display: flex;
  align-content: center;
`
