import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FaQuestionCircle } from 'react-icons/fa'
import { Flex } from 'reflexbox'

import theme from 'theme'
import Tooltip from 'components/Tooltip'
import FlatButton from 'components/FlatButton'

import StyledRadio, {
  StyledRadioLabel,
  StyledRadioButton,
  StyledRadioSwitch,
  StyledRadioInput,
  StyledRadioToolTip,
} from './style'

export default class Radio extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    // Value must be set, otherwise the submitted form value will be 'off' or 'on'.
    value: PropTypes.string.isRequired,
    currentValue: PropTypes.string,
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    textAlign: PropTypes.oneOf(['left', 'right']),
    disabled: PropTypes.bool,
    checked: PropTypes.oneOf(['', true, false]),
    onChange: PropTypes.func,
    helpTipText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
    }),
  }

  static defaultProps = {
    checked: false,
    labelPosition: 'left',
    textAlign: 'left',
    // Max width is 250px. See https://github.com/jxnblk/styled-system for syntax"
    width: 1,
    // See https://github.com/jxnblk/styled-system for syntax
    fontSize: 2,
    disabled: false,
    helpTipText: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked === '' ? false : props.checked,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      this.setState({ checked: this.props.checked })
    }
  }

  handleOnChange = (event) => {
    const nextChecked = !this.state.checked
    this.setState({ checked: nextChecked })

    if (this.props.onChange) {
      this.props.onChange(event, nextChecked)
    }

    event.stopPropagation()
  }

  render() {
    const {
      label,
      meta,
      disabled,
      name,
      value,
      currentValue,
      labelPosition,
      textAlign,
      helpTipText,
      ...styledProps
    } = this.props

    const { checked } = this.state

    const styledLogicProps = {
      textAlign,
      labelPosition,
      meta,
      disabled,
    }

    return (
      <StyledRadio
        meta={meta}
        label={label}
        disabled={disabled}
        {...styledLogicProps}
        {...styledProps}
      >
        {helpTipText && (
          <StyledRadioToolTip>
            <Tooltip content={helpTipText} placement="top">
              <FlatButton p="0px" overBg="transparent" type="button">
                <Flex mt={1} alignItems="center">
                  <FaQuestionCircle size={18} color={theme.brandColor} />
                </Flex>
              </FlatButton>
            </Tooltip>
          </StyledRadioToolTip>
        )}
        <StyledRadioLabel {...styledLogicProps}>{label}</StyledRadioLabel>

        <StyledRadioSwitch {...styledLogicProps}>
          <StyledRadioInput
            name={name}
            value={value}
            checked={currentValue ? value === currentValue : checked}
            type="radio"
            disabled={disabled}
            onChange={this.handleOnChange}
          />

          <StyledRadioButton {...styledLogicProps} />
        </StyledRadioSwitch>
      </StyledRadio>
    )
  }
}
