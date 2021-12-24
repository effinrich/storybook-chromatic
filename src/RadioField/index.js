import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import StyledRadioField, {
  StyledRadioFieldLabel,
  StyledRadioFieldButton,
  StyledRadioFieldSwitch,
  StyledRadioFieldInput,
} from './style'

export default class RadioField extends PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    textAlign: PropTypes.oneOf(['left', 'right']),
    disabled: PropTypes.bool,
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
    mb: 1,
  }

  render() {
    const {
      label,
      meta,
      disabled,
      input,
      labelPosition,
      textAlign,
      ...styledProps
    } = this.props

    const styledLogicProps = { textAlign, labelPosition, meta, disabled }
    return (
      <StyledRadioField
        meta={meta}
        label={label}
        disabled={disabled}
        {...styledLogicProps}
        {...styledProps}
      >
        <StyledRadioFieldLabel {...styledLogicProps}>
          {label}
        </StyledRadioFieldLabel>
        <StyledRadioFieldSwitch {...styledLogicProps}>
          <StyledRadioFieldInput {...input} disabled={disabled} />
          <StyledRadioFieldButton {...styledLogicProps} />
        </StyledRadioFieldSwitch>
      </StyledRadioField>
    )
  }
}
