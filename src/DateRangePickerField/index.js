import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DateRangePicker as ABBDateRangePicker } from 'react-dates'
import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from 'react-dates/constants'
import omit from 'lodash/omit'

import 'react-dates/lib/css/_datepicker.css'

import StyledDateRangePicker from 'components/DateRangePicker/style'
import {
  StyledDateRangePickerFieldLabel,
  StyledDateRangePickerFieldMessageContainer,
  StyledDateRangePickerFieldMessage,
} from './style'

export default class DateRangePickerField extends PureComponent {
  static propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    inputWidth: PropTypes.number,
    vertical: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      active: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
    }),
  }

  static defaultProps = {
    inputWidth: 130,
    vertical: false,
    startDateId: 'startDate',
    endDateId: 'endDate',
  }

  constructor(props) {
    super(props)

    this.state = {
      focusedInput: null,
    }
  }

  handleDatesChange = (dates) => {
    const startField = this.props[this.props.start]
    const endField = this.props[this.props.end]
    startField.input.onChange(dates.startDate)
    endField.input.onChange(dates.endDate)
  }

  handleFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
    if (focusedInput === START_DATE) {
      this.props[this.props.start].input.onFocus()
      return
    }
    if (focusedInput === END_DATE) {
      this.props[this.props.end].input.onFocus()
      return
    }
  }

  render() {
    const {
      inputWidth,
      startDate: { meta: startDateMeta },
      endDate: { meta: endDateMeta },
      vertical,
      meta,
      name,
      label,
      ...pickerProps
    } = this.props
    const start = this.props[this.props.start].input.value || null
    const end = this.props[this.props.end].input.value || null

    const styleLogicProps = {
      startDateMeta,
      endDateMeta,
    }

    return (
      <StyledDateRangePicker inputWidth={inputWidth}>
        {label && (
          <StyledDateRangePickerFieldLabel htmlFor={name} {...styleLogicProps}>
            {label}
          </StyledDateRangePickerFieldLabel>
        )}
        <ABBDateRangePicker
          endDate={end}
          endDatePlaceholderText="End Date"
          focusedInput={this.state.focusedInput || null}
          onDatesChange={this.handleDatesChange}
          onFocusChange={this.handleFocusChange}
          startDate={start}
          startDatePlaceholderText="Start Date"
          isOutsideRange={() => false}
          orientation={
            /* istanbul ignore next */ vertical
              ? VERTICAL_ORIENTATION
              : HORIZONTAL_ORIENTATION
          }
          {...omit(pickerProps, [
            'start',
            'end',
            'names',
            'type',
            'onDatesChange',
            'onFocusChange',
          ])}
        />
        <StyledDateRangePickerFieldMessageContainer {...styleLogicProps}>
          {(startDateMeta.touched || endDateMeta.touched) &&
            (startDateMeta.error ||
              (endDateMeta.error && (
                <StyledDateRangePickerFieldMessage error>
                  {startDateMeta.error}
                </StyledDateRangePickerFieldMessage>
              )) ||
              startDateMeta.warning ||
              (endDateMeta.warning && (
                <StyledDateRangePickerFieldMessage warning>
                  {startDateMeta.warning}
                </StyledDateRangePickerFieldMessage>
              )))}
        </StyledDateRangePickerFieldMessageContainer>
      </StyledDateRangePicker>
    )
  }
}
