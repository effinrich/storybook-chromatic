import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SingleDatePicker } from 'react-dates'
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from 'react-dates/constants'
import omit from 'lodash/omit'
import moment from 'moment-timezone'

import 'react-dates/lib/css/_datepicker.css'

import StyledSingleDatePickerField, {
  StyledSingleDatePickerFieldLabel,
  StyledSingleDatePickerFieldMessageContainer,
  StyledSingleDatePickerFieldMessage,
} from './style'

export default class SingleDatePickerField extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    input: PropTypes.object.isRequired,
    date: PropTypes.object,
    inputWidth: PropTypes.number,
    vertical: PropTypes.bool,
    numberOfMonths: PropTypes.number,
    block: PropTypes.bool,
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
    numberOfMonths: 1,
    block: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      focused: false,
    }
  }

  handleDateChange = (date) => {
    this.props.date.input.onChange(date)
  }

  handleFocusChange = ({ focused }) => {
    this.setState({ focused })
  }

  render() {
    const {
      label,
      name,
      inputWidth,
      meta,
      vertical,
      input,
      numberOfMonths,
      block,
      ...pickerProps
    } = this.props

    const styleLogicProps = {
      meta,
    }

    return (
      <StyledSingleDatePickerField inputWidth={inputWidth}>
        <StyledSingleDatePickerFieldLabel htmlFor={name} {...styleLogicProps}>
          {label}
        </StyledSingleDatePickerFieldLabel>
        <SingleDatePicker
          id="expirationDate"
          date={input.value ? moment(input.value) : moment().add(30, 'days')}
          placeholder="End Date"
          block={block}
          focused={this.state.focused}
          keepOpenOnDateSelect={false}
          onDateChange={(value) => input.onChange({ value })}
          onFocusChange={this.handleFocusChange}
          numberOfMonths={numberOfMonths}
          readOnly
          orientation={
            /* istanbul ignore next */ vertical
              ? VERTICAL_ORIENTATION
              : HORIZONTAL_ORIENTATION
          }
          {...omit(pickerProps, [
            'name',
            'type',
            'onDateChange',
            'onFocusChange',
            'mt',
            'mb',
            'width',
            'normalize',
            'children',
            'render',
          ])}
        />
        <StyledSingleDatePickerFieldMessageContainer {...styleLogicProps}>
          {meta.touched &&
            ((meta.error && (
              <StyledSingleDatePickerFieldMessage error>
                {meta.error}
              </StyledSingleDatePickerFieldMessage>
            )) ||
              (meta.warning && (
                <StyledSingleDatePickerFieldMessage warning>
                  {meta.warning}
                </StyledSingleDatePickerFieldMessage>
              )))}
        </StyledSingleDatePickerFieldMessageContainer>
      </StyledSingleDatePickerField>
    )
  }
}
