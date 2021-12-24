/*global google*/
import * as React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'
import { createTextMask } from 'redux-form-input-masks'
import { fromJS } from 'immutable'

import { Location } from 'models'
import InputField from 'components/InputField'
import CheckboxField from 'components/CheckboxField'
import FlatButton from 'components/FlatButton'
import GooglePlacesSearchField from 'components/GooglePlacesSearchField'
import ErrorPencil from 'components/ErrorPencil'
import { required, email, name, phone, minChar, zip } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'
import { processGooglePhotos } from 'utils/googleProcessors'
import { geocodeFromZip } from 'utils/geolocation'

import GoogleLocationCard from './partials/GoogleLocationCard'

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
})

const validationRules = {
  zip: [required('Business zip is required'), zip()],
  googlePlaceId: [required('Location is required')],
  location: [required('Location is required')],
  firstName: [required('First name is required'), name(), minChar(2)],
  lastName: [required('Last name is required'), name(), minChar(3)],
  company: [required('Company is required')],
  email: [required('Contact email is required'), email('Invalid email')],
  phone: [
    required('Contact number is required'),
    phone('A valid contact number is required (ie. 310-555-5555)'),
  ],
  terms: [required('You must read and accept terms of service')],
}

const terms = (
  <span>
    <span>I have reviewed and accept the Freebird </span>
    <a
      href="https://www.freebirdrides.com/terms"
      target="_blank"
      rel="noopener noreferrer"
    >
      Terms of Service
    </a>{' '}
    and{' '}
    <a
      href="https://www.freebirdrides.com/privacy"
      target="_blank"
      rel="noopener noreferrer"
    >
      Privacy Policy
    </a>
    .
  </span>
)

const RegisterForm = ({
  handleSubmit,
  submitting,
  pristine,
  change,
  isEdit,
  location,
  form,
  error: submissionError,
}) => {
  const [googlePlaceId, setGooglePlaceId] = React.useState(null)
  const [googlePlaceDetails, setGooglePlaceDetails] = React.useState({})
  const [locationLatLng, setLocationLatLng] = React.useState(null)

  const registerFormValues = useSelector((state) => getFormValues(form)(state))

  const handleGoogleDetails = React.useCallback(
    (placeId) => {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      )
      service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          change('googlePlaceId', placeId)
          change('location', place.name && place.name)
          change('googlePlaceName', place.name && place.name)
          change('googlePlaceAddress', place.formatted_address)

          const photos = processGooglePhotos(place.photos && place.photos)
          const immutablePhotos = fromJS(photos)

          let streetNumber
          let streetName
          let city
          let state
          let zipcode

          place.address_components.forEach((addressItem) => {
            addressItem.types.forEach((type) => {
              if (type === 'street_number') {
                streetNumber = addressItem.short_name
              }

              if (type === 'route') {
                streetName = addressItem.short_name
              }

              if (type === 'locality' || type === 'sublocality') {
                city = addressItem.long_name
              }

              if (type === 'administrative_area_level_1') {
                state = addressItem.short_name
              }

              if (type === 'postal_code') {
                zipcode = addressItem.short_name
              }
            })
          })

          change('zip', zipcode)
          handleGeoByZip(zipcode)

          if (place.name) {
            change('company', place.name)
          }

          const googlePlace = {
            photos: immutablePhotos,
            name: place.name ? place.name : 'Unknown',
            address:
              streetNumber && streetName
                ? `${streetNumber} ${streetName}`
                : 'Unknown',
            city: city ? city : 'Unknown',
            state: state ? state : 'Unknown',
            zipcode: zipcode ? zipcode : 'Unknown',
          }

          setGooglePlaceDetails(googlePlace)
        }

        setGooglePlaceId(placeId)
      })
    },
    [change]
  )

  React.useEffect(() => {
    // this is for pre-populating the registration form if in portal edit location view
    if (isEdit && location.get('placeId')) {
      const placeId = location.get('placeId')
      handleGoogleDetails(placeId)
    }
  }, [handleGoogleDetails, change, isEdit, location])

  const handleOnSelect = (address, placeId) => {
    handleGoogleDetails(placeId)
  }

  const handleGeoByZip = async (zip) => {
    if (zip.length >= 5) {
      try {
        const geoFromZip = await geocodeFromZip(zip)
        const {
          coords: { longitude, latitude },
        } = geoFromZip
        setLocationLatLng(new google.maps.LatLng(latitude, longitude))
      } catch (error) {
        setLocationLatLng(null)
      }
    } else {
      setLocationLatLng(null)
    }
  }

  return (
    <React.Fragment>
      {submissionError && (
        <ErrorPencil mb={2} mt={1}>
          {submissionError}
        </ErrorPencil>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          label="Business zip code"
          name="zip"
          component={InputField}
          validate={validationRules.zip}
          placeholder="Business zip code"
          type="number"
          width={1}
          onChange={(event) => handleGeoByZip(event.target.value)}
          helpText="Enter the zip code for your business to improve search results."
        />
        <Field
          name="location"
          disabled={!locationLatLng}
          component={GooglePlacesSearchField}
          onSelect={handleOnSelect}
          validate={validationRules.googlePlaceId}
          placeholder="Find your business"
          label="Find your business"
          type="text"
          width={1}
          autoComplete="nope"
          location={locationLatLng}
          helpText="IF AVAILABLE, PLEASE SELECT THE LISTING DISPLAYING YOUR BUSINESS NAME. If you can't find your business by name or address, please contact support using the green 'Help' or '?' button on the bottom right hand side of this page"
        />
        {googlePlaceId && (
          <GoogleLocationCard googlePlace={googlePlaceDetails} my={2} />
        )}
        <Field
          name="firstName"
          component={InputField}
          label="First name"
          placeholder="First name"
          validate={validationRules.firstName}
          type="text"
          width={1}
          normalize={normalizers.capitalize}
          autoComplete="nope"
        />
        <Field
          name="lastName"
          component={InputField}
          label="Last name"
          placeholder="Last name"
          validate={validationRules.lastName}
          type="text"
          width={1}
          normalize={normalizers.capitalize}
          autoComplete="nope"
        />
        <Field
          name="company"
          component={InputField}
          label="Company"
          placeholder="Company"
          validate={validationRules.company}
          type="text"
          width={1}
          normalize={normalizers.capitalize}
          autoComplete="nope"
          helpText="Please enter your business or company name here."
        />
        <Field
          name="email"
          component={InputField}
          label="Email"
          placeholder="Email"
          validate={validationRules.email}
          type="email"
          width={1}
        />
        <Field
          name="phone"
          component={InputField}
          label="Contact number"
          placeholder="Contact number"
          validate={validationRules.phone}
          type="tel"
          width={1}
          {...phoneMask}
        />
        <Field
          name="referrer"
          component={InputField}
          label="How did you hear about us?"
          placeholder="How did you hear about us?"
          type="text"
          width={1}
        />
        <Field
          mt={2}
          label={terms}
          name="terms"
          component={CheckboxField}
          validate={validationRules.terms}
          labelPosition="right"
          parse={(value) => (value === true ? value : undefined)}
        />
        <FlatButton
          primary
          type="submit"
          width={1}
          mt={2}
          mb={1}
          disabled={
            submitting ||
            pristine ||
            (registerFormValues && !registerFormValues.toJS().terms)
          }
          submitting={submitting}
        >
          Submit
        </FlatButton>
      </form>
    </React.Fragment>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  change: PropTypes.func,
  isEdit: PropTypes.bool,
  location: PropTypes.instanceOf(Location),
  form: PropTypes.string,
}

export default reduxForm({
  form: 'registerForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(RegisterForm)
