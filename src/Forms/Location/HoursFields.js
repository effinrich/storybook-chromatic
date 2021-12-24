import React from 'react'
import { FieldArray } from 'redux-form/immutable'
import PropTypes from 'prop-types'

import ShadowBox from 'components/ShadowBox'
import Heading from 'components/Text/Heading'
import Hours from 'components/Hours'
import ErrorPencil from 'components/ErrorPencil'

const propTypes = {
  error: PropTypes.string,
}

const HoursFields = (props) => {
  const { error: hoursError } = props
  return (
    <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
      <Heading size={2} mb={2}>
        Operating Hours
      </Heading>
      {hoursError && <ErrorPencil my={2}>{hoursError}</ErrorPencil>}
      <FieldArray name="hours" component={Hours} rerenderOnEveryChange />
    </ShadowBox>
  )
}

HoursFields.propTypes = propTypes

export default HoursFields
