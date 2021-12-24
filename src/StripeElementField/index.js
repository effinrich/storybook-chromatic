import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
// import omit from 'lodash/omit'
import isUndefined from 'lodash/isUndefined'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements'

import BaseInputField, { BaseInputFieldProps } from 'components/BaseInputField'
import { Box } from 'reflexbox'
import theme from 'theme'

export const stripeFieldValidator = (value) => {
  return !value || value.empty || value.error
    ? get(value, 'error', 'This field is required')
    : undefined
}

const typeElementMap = {
  cc: CardNumberElement,
  exp: CardExpiryElement,
  cvc: CardCvcElement,
}

const styles = () => ({
  base: {
    fontSize: '18px',
    '::placeholder': {
      color: theme.lightMedGrey,
    },
  },
})

const propTypes = {
  ...BaseInputFieldProps,
  input: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['cc', 'exp', 'cvc', 'zip']).isRequired,
  meta: PropTypes.object.isRequired,
}

const defaultProps = {
  // Default Props go here
}

const StripeElementField = ({
  input,
  type,
  meta,
  label,
  ...passthroughProps
}) => {
  const Element = typeElementMap[type]
  const isEmpty = get(input.value, 'empty', undefined)
  /* istanbul ignore next */ const hasValue = isUndefined(isEmpty)
    ? false
    : !isEmpty

  return (
    <BaseInputField
      name={input.name}
      meta={{
        ...meta,
        error: get(input.value, 'error.message', meta.error),
      }}
      hasValue={hasValue}
      label={label}
      expandLabel
      {...passthroughProps}
    >
      <Box py="8px" flex="1">
        <Element
          style={styles()}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          onChange={input.onChange}
        />
      </Box>
    </BaseInputField>
  )
}

StripeElementField.propTypes = propTypes
StripeElementField.defaultProps = defaultProps

export default StripeElementField
