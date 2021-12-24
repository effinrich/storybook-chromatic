import styled, { css } from 'styled-components'

export const StyledDateRangePickerFieldMessageContainer = styled.div`
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

export const StyledDateRangePickerFieldMessage = styled.div`
  font-size: 8px;
  margin: 4px 0;
  color: ${({ theme, startDateMeta, endDateMeta, meta }) => {
    if (startDateMeta.error) return theme.errorColor
    if (startDateMeta.warning) return theme.warningColor
    return theme.medGrey
  }};
`

export const StyledDateRangePickerFieldLabel = styled.label`
  font-size: 18px;
  color: ${({ theme }) => theme.lightMedGrey};

  ${({ startDateMeta, endDateMeta, hasValue }) =>
    (startDateMeta.active || endDateMeta.active || hasValue) &&
    css`
      color: ${({ theme, hasValue, startDateMeta, endDateMeta }) => {
    if (
      (startDateMeta.active && startDateMeta.error) ||
          (endDateMeta.active && endDateMeta.error)
    )
      return theme.errorColor
    if (
      (startDateMeta.active && startDateMeta.warning) ||
          (endDateMeta.active && endDateMeta.warning)
    )
      return theme.warningColor
    return theme.brandColor
  }};
    `};
`
