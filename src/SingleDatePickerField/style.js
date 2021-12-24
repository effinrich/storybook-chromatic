import styled, { css } from 'styled-components'
import get from 'lodash/get'

export default styled.div`
  .DateRangePickerInput_clearDates {
    margin: 0;
    padding: 1px 6px 4px;
  }
  .DateRangePickerInput_arrow {
    padding: 0 ${(props) => `${get(props, 'theme.space[1]', 0)}px`};
  }
  .DateRangePickerInput_clearDates:focus,
  .DateRangePickerInput_clearDates:hover {
    background: transparent;

    .DateRangePickerInput_clearDates_svg {
      fill: ${(props) => props.theme.errorColor};
    }
  }
  .DateInput_input {
    box-sizing: border-box;
    padding: ${(props) => `${get(props, 'theme.space[1]', 0)}px`};
    font-size: ${(props) => `${get(props, 'theme.fontSizes[1]', 0)}px`};
  }
  .DateInput_input__focused {
    border-bottom-color: ${(props) =>
    get(props, 'theme.brandColor', 'transparent')};
  }
  .DayPickerKeyboardShortcuts_show__bottomRight {
    border-right-color: ${(props) =>
    get(props, 'theme.brandColor', 'transparent')};
  }
`

export const StyledSingleDatePickerFieldLabel = styled.label`
  font-size: 18px;
  color: ${({ theme }) => theme.lightMedGrey};

  ${({ meta: { active }, hasValue }) =>
    (active || hasValue) &&
    css`
      color: ${({ theme, hasValue, meta: { active, error, warning } }) => {
    if (active && error) return theme.errorColor
    if (active && warning) return theme.warningColor
    return theme.brandColor
  }};
    `};
`

export const StyledSingleDatePickerFieldMessageContainer = styled.div`
  ${({ holdMessageSpace, inlineEdit }) => {
    if (holdMessageSpace && !inlineEdit) {
      return css`
        min-height: 22px;
      `
    }
    if (holdMessageSpace && inlineEdit) {
      return css`
        min-height: 0;
      `
    }
  }};
`

export const StyledSingleDatePickerFieldMessage = styled.div`
  font-size: 8px;
  margin: 4px 0;
  color: ${({ theme, startDateMeta, endDateMeta, meta }) => {
    if (startDateMeta.error) return theme.errorColor
    if (startDateMeta.warning) return theme.warningColor
    return theme.medGrey
  }};
`
