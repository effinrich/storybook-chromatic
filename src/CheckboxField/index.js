import React from 'react'

import Checkbox from '../Checkbox'
import BaseToggleableField, {
  sharedPropTypes as BaseToggleableFieldPropTypes,
} from '../BaseToggleableField'

const propTypes = {
  ...BaseToggleableFieldPropTypes,
}

const defaultProps = {}

const CheckboxField = (props) => {
  const { input, meta, disabled } = props
  return (
    <BaseToggleableField {...props}>
      <Checkbox
        {...input}
        checked={input.value}
        error={!!meta.error}
        warning={!!meta.warning}
        disabled={disabled}
      />
    </BaseToggleableField>
  )
}

CheckboxField.propTypes = propTypes
CheckboxField.defaultProps = defaultProps

export default CheckboxField
