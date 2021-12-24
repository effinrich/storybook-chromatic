import styled from 'styled-components'

export const StyledCheckboxSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
`

export const StyledCheckboxBox = styled.span`
  position: absolute;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${({ disabled, theme }) =>
    disabled ? theme.superLightGrey : 'white'};

  border: solid 2px
    ${({ disabled, checked, error, warning, theme }) => {
    if (disabled) return theme.lightMedGrey
    if (checked && error) return theme.errorColor
    if (warning) return theme.warningColor
    return theme.brandColor
  }};

  transition: 0.4s;
`

export const StyledCheckboxInput = styled.input`
  display: none;

  &:checked + ${StyledCheckboxBox} {
    background-color: ${({ error, warning, theme }) => {
    if (error) return theme.errorColor
    if (warning) return theme.warningColor
    return theme.brandColor
  }};
  }

  &:checked + ${StyledCheckboxBox}:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 4px;
    background: transparent;
    top: 4px;
    left: 2.5px;
    border: 3px solid white;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }
`

StyledCheckboxInput.displayName = 'StyledCheckboxInput'

export default styled.div`
  display: flex;
`
