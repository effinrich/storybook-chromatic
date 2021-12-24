import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import autosize from 'autosize'

import StyledTextArea, {
  StyledTextAreaContainer,
  StyledTextAreaMessageContainer,
  StyledTextAreaMessage,
} from './style'

export default class TextArea extends PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    //This is the value for maxLength
    maxLength: PropTypes.string,
    //This is the value for minLength
    minLength: PropTypes.string,
    cols: PropTypes.number,
    rows: PropTypes.number,
    resize: PropTypes.bool,
    holdMessageSpace: PropTypes.bool,
    helpText: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
    }),
  }

  static defaultProps = {
    holdMessageSpace: false,
    width: 256,
    rows: 1,
  }

  componentDidMount() {
    autosize(this.textarea)
  }

  render() {
    const {
      label,
      placeholder,
      input,
      meta,
      maxLength,
      minLength,
      holdMessageSpace,
      helpText,
      ...styledProps
    } = this.props
    const hasValue = input.value && input.value.length > 0
    const styleLogicProps = { hasValue, meta }

    return (
      <StyledTextArea hasValue={hasValue} {...styledProps} meta={meta}>
        <label htmlFor={input.name}>{label}</label>
        <StyledTextAreaContainer {...styleLogicProps}>
          <textarea
            {...input}
            maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            ref={(c) => (this.textarea = c)}
          />
        </StyledTextAreaContainer>
        <StyledTextAreaMessageContainer
          holdMessageSpace={!helpText || holdMessageSpace}
        >
          {meta.touched &&
            ((meta.error && (
              <StyledTextAreaMessage error>{meta.error}</StyledTextAreaMessage>
            )) ||
              (meta.warning && (
                <StyledTextAreaMessage warning>
                  {meta.warning}
                </StyledTextAreaMessage>
              )))}
          {maxLength && (
            <StyledTextAreaMessage>
              {maxLength - input.value.length} characters remaining
            </StyledTextAreaMessage>
          )}
          {helpText && (
            <StyledTextAreaMessage>{helpText}</StyledTextAreaMessage>
          )}
        </StyledTextAreaMessageContainer>
      </StyledTextArea>
    )
  }
}
