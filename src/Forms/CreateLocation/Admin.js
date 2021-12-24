import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form/immutable'
import { Box, Flex } from 'reflexbox'
import { FiPlusSquare } from 'react-icons/fi'

import { Box } from 'reflexbox'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import SuccessPencil from 'components/SuccessPencil'

import { ZipField, PlaceField } from './fields'
import useCreateLocationForm from './useCreateLocationForm'

const AdminCreateLocationForm = (props) => {
  const { handleSubmit, submitting, pristine, error: submissionError } = props

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
    <Box mb={[2, 0]}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Flex
          pt={0}
          pb={[2, 2, 1]}
          justifyContent={['center', 'center', 'flex-end']}
          flexDirection={['column', 'row']}
        >
          <Box width={[1, 1 / 3]} pr={[0, 2]}>
            {submissionError && (
              <ErrorPencil mb={2}>{submissionError}</ErrorPencil>
            )}
            {isCreateSuccess && (
              <SuccessPencil mb={2}>
                Location successfully created
              </SuccessPencil>
            )}
          </Box>

          <Box width={[1, 1 / 5]} px={[0, 2]}>
            <ZipField onChange={(e) => handleGeoByZip(e.target.value)} />
          </Box>
          <Box width={[1, 1 / 3]} px={[0, 2]}>
            <PlaceField
              latLng={locationLatLng}
              onSelect={handleSelectLocation}
            />
          </Box>
          <Box width={[1, 1 / 7]} pl={[0, 2]} textAlign="right">
            <FlatButton
              primary
              type="submit"
              width={1}
              disabled={submitting || pristine}
              submitting={submitting}
            >
              <Flex alignItems="center" justifyContent="center">
                <FiPlusSquare style={{ marginRight: '5px' }} /> Add New
              </Flex>
            </FlatButton>
          </Box>
        </Flex>
      </form>
    </Box>
  )
}

AdminCreateLocationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool,
  error: PropTypes.string,
}

export default reduxForm({
  form: 'adminCreateLocationForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(AdminCreateLocationForm)
