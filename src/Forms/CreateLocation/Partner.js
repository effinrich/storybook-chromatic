import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form/immutable'
import { List } from 'immutable'

import { Box } from 'reflexbox'
import Flex from 'components/Flex'
import Heading from 'components/Text/Heading'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'

import {
  ZipField,
  PlaceField,
  LocationGroupIdField,
  PhoneField,
} from './fields'
import useCreateLocationForm from './useCreateLocationForm'

const PartnerCreateLocationForm = (props) => {
  const {
    locationGroups,
    handleSubmit,
    submitting,
    pristine,
    error: submissionError,
  } = props

  const {
    locationLatLng,
    isCreateSuccess,
    createdId,
    handleGeoByZip,
    handleSelectLocation,
    handleSubmitForm,
  } = useCreateLocationForm(props)

  if (isCreateSuccess) {
    return <Redirect push to={`/dashboard/locations/${createdId}/edit`} />
  }

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Heading size={3} pb={1}>
          Register Location
        </Heading>
        {submissionError && <ErrorPencil>{submissionError}</ErrorPencil>}
        <Box pt={1} pb={2} width={1}>
          <ZipField onChange={(e) => handleGeoByZip(e.target.value)} />
          <PlaceField
            latLng={locationLatLng}
            onSelect={handleSelectLocation}
            style={{ padding: '24px 0' }}
          />
          <PhoneField />
          <LocationGroupIdField locationGroups={locationGroups} />
        </Box>
        <Flex>
          <FlatButton
            primary
            type="submit"
            ml="auto"
            disabled={submitting || pristine}
            submitting={submitting}
          >
            Submit Location
          </FlatButton>
        </Flex>
      </form>
    </Box>
  )
}

PartnerCreateLocationForm.propTypes = {
  locationGroups: PropTypes.instanceOf(List),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool,
  change: PropTypes.func,
  error: PropTypes.string,
  onDone: PropTypes.func,
}

export default reduxForm({
  form: 'partnerCreateLocationForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(PartnerCreateLocationForm)
