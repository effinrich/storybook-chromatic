import styled from 'styled-components'
import get from 'lodash/get'

export default styled.div`
  .DateRangePicker {
    display: block;
  }
  .DateRangePickerInput {
    display: flex;
    align-items: center;
  }
  .DateInput {
    width: auto;
    flex: 1;
  }
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
