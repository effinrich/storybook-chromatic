import styled, { css } from 'styled-components'
import { space, color, fontSize, width } from 'styled-system'

import { maxWidth } from 'utils/styled'

const flexStyleMap = {
  left: {
    left: {
      justifyContent: 'space-between',
    },
    right: {
      justifyContent: 'flex-end',
    },
  },
  right: {
    left: {
      justifyContent: 'flex-end',
      flexDirection: 'row-reverse',
    },
    right: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
  },
}

export const StyledRadioFieldLabel = styled.label`
  text-align: ${({ textAlign }) => textAlign};

  ${({ labelPosition }) => {
    if (labelPosition === 'right')
      return css`
        padding-left: 8px;
      `
    return css`
      padding-right: 8px;
    `
  }};

  color: ${({ meta: { active, error, touched, warning }, disabled, theme }) => {
    if (!active && disabled) return theme.lightMedGrey
    if (touched && error) return theme.errorColor
    if (touched && warning) return theme.warningColor
    if (!active) return theme.darkGrey
    return theme.brandColor
  }};
`

export const StyledRadioFieldSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
`

export const StyledRadioFieldButton = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 100%;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  background-color: ${({ disabled, theme }) =>
    disabled ? theme.superLightGrey : 'white'};

  border: solid 2px
    ${({ disabled, theme }) =>
    disabled ? theme.lightMedGrey : theme.brandColor};
`

export const StyledRadioFieldInput = styled.input`
  display: none;

  &:checked + ${StyledRadioFieldButton}:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.brandColor};
    top: 3px;
    left: 3px;
    border-radius: 100%;
  }
`
StyledRadioFieldInput.displayName = 'StyledRadioFieldInput'

export default styled.div`
  ${space};
  ${color};
  ${fontSize};
  ${width};
  ${maxWidth};
  display: flex;
  line-height: 24px;
  ${({ labelPosition, textAlign }) => flexStyleMap[labelPosition][textAlign]};
`
