import styled, { css } from 'styled-components'
import { space, color, fontSize, width } from 'styled-system'
import { Box } from 'reflexbox'

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

export const StyledRadioLabel = styled.label`
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

export const StyledRadioSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-right: 5px;
`

export const StyledRadioButton = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 100%;
  width: 22px;
  height: 22px;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  background-color: ${({ disabled, theme }) =>
    disabled ? theme.superLightGrey : 'white'};

  border: solid 2px
    ${({ disabled, theme }) =>
    disabled ? theme.lightMedGrey : theme.brandColor};
`

export const StyledRadioInput = styled.input`
  display: none;

  &:checked + ${StyledRadioButton}:after {
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

export const StyledRadioToolTip = styled(Box)`
  padding-left: 5px;
  margin-top: -5px;
`

StyledRadioInput.displayName = 'StyledRadioInput'

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
