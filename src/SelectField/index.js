import React from 'react'
import PropTypes from 'prop-types'

import Select from 'components/Select'

import StyledSelectField, {
  StyledSelectPlaceholder,
  StyledSelectMessageContainer,
  StyledSelectMessage,
} from './style'

const propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
    initial: PropTypes.string,
  }),
}

const defaultProps = {
  // Default Props go here
}

const SelectField = (props) => {
  const { input, label, placeholder, meta, ...styledProps } = props
  const { onChange, onBlur, onFocus } = props.input
  const hasValue = !!input.value
  const styleLogicProps = { hasValue, meta }

  return (
    <StyledSelectField {...styledProps} meta={meta} hasValue={hasValue}>
      <label htmlFor={input.name}>{label}</label>
      {placeholder && (
        <StyledSelectPlaceholder {...styleLogicProps}>
          {placeholder}
        </StyledSelectPlaceholder>
      )}
      <Select
        name={input.name}
        value={input.value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
      <StyledSelectMessageContainer>
        {meta.touched &&
          ((meta.error && (
            <StyledSelectMessage error>{meta.error}</StyledSelectMessage>
          )) ||
            (meta.warning && (
              <StyledSelectMessage warning>{meta.warning}</StyledSelectMessage>
            )))}
      </StyledSelectMessageContainer>
    </StyledSelectField>
  )
}

SelectField.propTypes = propTypes
SelectField.defaultProps = defaultProps

export default SelectField
