import 'react-dates/initialize'

import React from 'react'
import PropTypes from 'prop-types'
import {
  DateRangePicker as ABBDateRangePicker,
  DateRangePickerShape,
} from 'react-dates'
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from 'react-dates/constants'
import MPT from 'react-moment-proptypes'
import omit from 'lodash/omit'

import 'react-dates/lib/css/_datepicker.css'

import StyledDateRangePicker from './style'

export default class DateRangePicker extends React.PureComponent {
  static propTypes = {
    startDate: MPT.momentObj,
    endDate: MPT.momentObj,
    onDatesChange: PropTypes.func,
    onFocusChange: PropTypes.func,
    inputWidth: PropTypes.number,
    vertical: PropTypes.bool,
    ...omit(DateRangePickerShape, [
      'startDate',
      'endDate',
      'onDatesChange',
      'onFocusChange',
    ]),
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
      startDate: props.startDate || null,
      endDate: props.endDate || null,
      focusedInput: props.focusedInput || null,
    }
  }

  componentDidUpdate(prevProps) {
    const nextState = {}
    /* istanbul ignore else */
    if (this.props.startDate !== prevProps.startDate) {
      nextState.startDate = this.props.startDate
    }
    /* istanbul ignore else */
    if (this.props.endDate !== prevProps.endDate) {
      nextState.endDate = this.props.endDate
    }
    this.setState(nextState)
  }

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate })

    if (this.props.onDatesChange) {
      this.props.onDatesChange({ startDate, endDate })
    }
  }

  render() {
    const { inputWidth, vertical, ...pickerProps } = this.props
    return (
      <StyledDateRangePicker inputWidth={inputWidth}>
        <ABBDateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.handleDateChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={
            /* istanbul ignore next */ (focusedInput) =>
              this.setState({ focusedInput })
          }
          orientation={
            /* istanbul ignore next */ vertical
              ? VERTICAL_ORIENTATION
              : HORIZONTAL_ORIENTATION
          }
          {...omit(pickerProps, [
            'startDate',
            'endDate',
            'onDatesChange',
            'onFocusChange',
          ])}
        />
      </StyledDateRangePicker>
    )
  }
}
