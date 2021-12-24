/*global google*/
import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form/immutable'

import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import FlatButton from 'components/FlatButton'
import InputField from 'components/InputField'
import SelectField from 'components/SelectField'
import ErrorPencil from 'components/ErrorPencil'
import { required } from 'utils/validations'
import { usStateOptions } from 'utils/usStates'

const StyledCustomGeoForm = styled.div`
  max-width: 600px;
`

const validationRules = {
  city: [required('City is required')],
  state: [required('State is required')],
}

const propTypes = {
  createNotification: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  dirty: PropTypes.bool,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  error: PropTypes.string,
  dispatch: PropTypes.func,
  form: PropTypes.string,
  reset: PropTypes.func,
  onReset: PropTypes.func,
  setFilterGeo: PropTypes.func,
}

const defaultProps = {
  // Default Props go here
}

const CustomGeoForm = ({
  change,
  pristine,
  dirty,
  handleSubmit,
  submitting,
  createNotification,
  dispatch,
  form,
  reset,
  onReset,
  setFilterGeo,
  error: submissionError,
}) => {
  const [geoState, setGeoState] = useState()
  const [geoCity, setGeoCity] = useState()

  const handleFetchGeo = async (city, state) => {
    let lat
    let lng
    const address = `${city}, ${state}`
    const geocoder = new google.maps.Geocoder()
    await geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat()
        lng = results[0].geometry.location.lng()

        change('latitude', lat.toFixed(7))
        change('longitude', lng.toFixed(7))
      } else {
        createNotification(
          `Geocode was not successful for the following reason: ${status}`,
          'error'
        )
      }
    })
  }

  const handleOnBlur = (event, city) => {
    setGeoCity(city)

    if (geoState) {
      handleFetchGeo(city, geoState)
    }
  }

  const handleOnChange = (event, state) => {
    setGeoState(state)

    if (geoCity) {
      handleFetchGeo(geoCity, state)
    }
  }

  const handleOnClickReset = () => {
    // clear form values
    reset()

    // clear filter geo values
    setFilterGeo({
      latitude: null,
      longitude: null,
    })

    // fetch default carousels in parent
    onReset()
  }

  return (
    <StyledCustomGeoForm>
      {submissionError && <ErrorPencil mb={2}>{submissionError}</ErrorPencil>}
      <form onSubmit={handleSubmit}>
        <Flex flexDirection={['column', 'row']}>
          <Box width={[1, 1 / 3]} pr={[0, 1]}>
            <Field
              label="City"
              name="city"
              component={InputField}
              validate={validationRules.city}
              placeholder="City"
              type="text"
              width={1}
              onBlur={handleOnBlur}
            />
          </Box>
          <Box width={[1, 1 / 3]} px={[0, 1]}>
            <Field
              label="State"
              name="state"
              component={SelectField}
              validate={validationRules.state}
              parse={(value) => value.value}
              options={usStateOptions}
              blurInputOnSelect
              placeholder="State"
              type="text"
              width={1}
              onChange={handleOnChange}
            />
          </Box>
          <Box width={[1, 1 / 6]} pl={[0, 1]} pt={2} mb={[2, 0]}>
            <FlatButton
              primary
              type="submit"
              disabled={submitting || pristine}
              submitting={submitting}
              width={1}
              p={1}
            >
              Filter
            </FlatButton>
          </Box>
          <Box width={[1, 1 / 6]} pl={[0, 1]} pt={2}>
            <FlatButton
              cancel
              type="button"
              disabled={!dirty}
              onClick={handleOnClickReset}
              width={1}
              p={1}
            >
              Reset
            </FlatButton>
          </Box>
        </Flex>
      </form>
    </StyledCustomGeoForm>
  )
}

CustomGeoForm.propTypes = propTypes
CustomGeoForm.defaultProps = defaultProps

export default reduxForm({
  form: 'customGeoForm',
  destroyOnUnmount: false,
})(CustomGeoForm)
