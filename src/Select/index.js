import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'

import StyledSelect, { StyledSelectHelpText } from './style'

const propTypes = {
  value: PropTypes.any,
  helpText: PropTypes.string,
  onChange: PropTypes.func,
  hideOptions: PropTypes.bool,
  creatable: PropTypes.bool,
  altLabel: PropTypes.string,
  isClearable: PropTypes.bool,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
}

const defaultProps = {
  isClearable: false,
  className: 'Select-container',
  classNamePrefix: 'Select',
}

const getValue = (opts, val) => opts.find((o) => o.value === val)

const Select = (props) => {
  const {
    hideOptions,
    creatable,
    value,
    altLabel,
    helpText,
    isClearable,
    isMulti,
    ...styleProps
  } = props

  let hasValue = false
  if (value && value.length) {
    hasValue = true
  }

  const [hasFocus, setFocused] = useState()

  const restProps = {
    ...props,
  }

  if (!isMulti && !creatable)
    restProps.value = getValue(restProps.options, value)

  return (
    <StyledSelect
      hideOptions={hideOptions}
      hasValue={hasValue}
      hasFocus={hasFocus}
      {...styleProps}
    >
      {altLabel && <label>{altLabel}</label>}
      {creatable ? (
        <Creatable
          {...restProps}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <ReactSelect
          {...restProps}
          isClearable={isClearable}
          backspaceRemoves={true}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {helpText && <StyledSelectHelpText>{helpText}</StyledSelectHelpText>}
    </StyledSelect>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
