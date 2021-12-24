import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable'

import { Box } from 'reflexbox'
import Flex from 'components/Flex'
import Heading from 'components/Text/Heading'
import SelectField from 'components/SelectField'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import BodyCopy from 'components/Text/BodyCopy'
import apiErrorHandler from 'utils/apiErrorHandler'
import { Location } from 'models'
import { selectLocationGroups } from 'store/locationGroups/duck'

import { patchLocation } from 'store/locations/duck'

const MoveLocationForm = ({
  location,
  handleSubmit,
  submitting,
  pristine,
  error: submissionError,
  onDone,
}) => {
  const dispatch = useDispatch()

  const locationGroups = useSelector(selectLocationGroups)

  const locationGroupOptions = locationGroups
    .map((record) => record.get('locationGroup'))
    .filter((locGroup) => locGroup.get('_id') !== location.get('locationGroup'))
    .map((locGroup) => ({
      label: locGroup.get('name'),
      value: locGroup.get('_id'),
    }))
    .toArray()

  const handleSubmitForm = async (values) => {
    const body = {
      locationGroup: values.get('locationGroupId'),
    }
    const { error, payload } = await dispatch(
      patchLocation(location.get('_id'), body)
    )

    if (error) {
      throw new SubmissionError({
        _error: apiErrorHandler(payload, payload.message),
      })
    }

    onDone()
  }

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Heading size={3} pb={1}>
          Update Location Billing
        </Heading>
        {submissionError && <ErrorPencil mb={2}>{submissionError}</ErrorPencil>}
        <BodyCopy>
          Select the billing group you would like to move this location to.
          Moving a location to a new billing group will change the payment
          method the selected location is charged to.
        </BodyCopy>
        <Box pt={2}>
          <Field
            name="locationGroupId"
            label="Select Billing Group"
            component={SelectField}
            parse={(value) => value.value}
            options={locationGroupOptions}
            autoFocus
            width="100%"
          />
        </Box>
        <Flex>
          <FlatButton
            primary
            type="submit"
            ml="auto"
            disabled={submitting || pristine}
            submitting={submitting}
          >
            Move Location
          </FlatButton>
        </Flex>
      </form>
    </Box>
  )
}

MoveLocationForm.propTypes = {
  location: PropTypes.instanceOf(Location),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  onDone: PropTypes.func,
}

export default reduxForm({
  form: 'moveLocationForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(MoveLocationForm)
