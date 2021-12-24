import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import { AsyncCreatable, Async } from 'react-select'
import Async from 'react-select/async'
import AsyncCreatable from 'react-select/async-creatable'

// import 'react-select/dist/react-select.css'

// import StyledAsyncSelect, { StyledAsyncSelectHelpText } from './style'
import StyledSelect, { StyledSelectHelpText } from 'components/Select/style'

const propTypes = {
  value: PropTypes.any,
  helpText: PropTypes.string,
  onChange: PropTypes.func,
  creatable: PropTypes.bool,
  altLabel: PropTypes.string,
  isMulti: PropTypes.bool,
}

const defaultProps = {
  className: 'Select-container',
  classNamePrefix: 'Select',
}

const AsyncSelect = (props) => {
  const { creatable, value, altLabel, helpText } = props
  let hasValue = false

  if (
    (value && value.length) ||
    (value && value.constructor.name === 'Object')
  ) {
    hasValue = true
  }

  const [hasFocus, setFocused] = useState()

  return (
    <StyledSelect hasValue={hasValue} hasFocus={hasFocus}>
      {altLabel && <label>{altLabel}</label>}
      {creatable ? (
        <AsyncCreatable
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <Async
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {helpText && <StyledSelectHelpText>{helpText}</StyledSelectHelpText>}
    </StyledSelect>
  )
}

AsyncSelect.propTypes = propTypes
AsyncSelect.defaultProps = defaultProps

export default AsyncSelect
