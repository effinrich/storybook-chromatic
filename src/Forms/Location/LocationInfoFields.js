/*global google*/
import React, { useState, useEffect, Fragment } from 'react'
import { Field } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import PropTypes from 'prop-types'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { Location } from 'models'
import { mapApiHoursToReduxForm } from 'models/helpers'
import Heading from 'components/Text/Heading'
import ShadowBox from 'components/ShadowBox'
import SelectField from 'components/SelectField'
import InputField from 'components/InputField'
import GooglePlacesSearchField from 'components/GooglePlacesSearchField'
import GooglePlaceMap from 'components/GooglePlaceMap'
import TextArea from 'components/TextArea'
import ErrorPencil from 'components/ErrorPencil'
import { usStateOptions } from 'utils/usStates'
import { required, zip, phone, url } from 'utils/validations'
import { reverseGeocode } from 'utils/geolocation'
import {
  processGoogleHours,
  processGooglePhotos,
} from 'utils/googleProcessors'

const propTypes = {
  location: PropTypes.instanceOf(Location),
  error: PropTypes.string,
  change: PropTypes.func,
  isAdmin: PropTypes.bool,
  isEdit: PropTypes.bool,
  isNewLocation: PropTypes.bool,
}

const validationRules = {
  // business details
  name: [required('Business name is required')],
  address: [required('Business address is required')],
  city: [required('City is required')],
  state: [required('State is required')],
  zipcode: [required('Zip is required'), zip('Invalid zipcode')],
  phone: [
    // required('Phone is required'),
    phone('A valid phone number is required (ie. 310-555-5555)'),
  ],
  description: [required('Description is required')],
  place: [required('Google place ID is required')],
  website: [url('Invalid URL: http://example.com')],
  menu: [url('Invalid URL: http://example.com')],
}

const LocationInfoFields = ({
  location,
  error,
  isAdmin,
  isEdit,
  isNewLocation,
  change,
}) => {
  const [address, setAddress] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  // const [isGeocoding, setGeocoding] = useState(null)

  useEffect(() => {
    if (location) {
      setLongitude(location.geo.get(0))
      setLatitude(location.geo.get(1))
      setPlaceName(location.get('name'))
    }
  }, [location])

  const handleOnChange = (address) => {
    setAddress(address)
    setLatitude(null)
    setLongitude(null)
  }

  const handleDetailsRequest = async (geo, placeId) => {
    change('geo', [geo.lng, geo.lat])
    change('placeId', placeId)

    const request = {
      fields: [
        'name',
        'address_components',
        'photos',
        'formatted_phone_number',
        'opening_hours',
      ],
      placeId,
    }
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    )
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlaceName(place.name && place.name)

        change('name', place.name && place.name)

        let streetNumber
        let streetName

        place.address_components.forEach((addressItem) => {
          addressItem.types.forEach((type) => {
            if (type === 'street_number') {
              streetNumber = addressItem.short_name
            }

            if (type === 'route') {
              streetName = addressItem.short_name
            }

            if (type === 'locality' || type === 'sublocality') {
              change('city', addressItem.long_name)
            }

            if (type === 'administrative_area_level_1') {
              change('state', addressItem.short_name)
            }

            if (type === 'postal_code') {
              change('zipcode', addressItem.short_name)
            }
          })
        })

        change('address', `${streetNumber} ${streetName}`)
        change(
          'phoneWork',
          place.formatted_phone_number && place.formatted_phone_number
        )

        // if (isNewLocation) {
        //process hours
        const hours = processGoogleHours(
          place.opening_hours && place.opening_hours.periods
        )
        const immutableHours = fromJS(hours)
        const formattedHours = mapApiHoursToReduxForm(immutableHours)

        change('hours', formattedHours)

        //process photos
        const photos = processGooglePhotos(place.photos && place.photos)
        const immutablePhotos = fromJS(photos)

        change('photos', immutablePhotos)
        // }
      }
    })
  }

  const handleOnSelect = (selected, placeId) => {
    // setGeocoding(true)
    geocodeByAddress(selected)
      .then((res) => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        setLatitude(lat)
        setLongitude(lng)
        // setGeocoding(false)
        handleDetailsRequest({ lat, lng }, placeId)
      })
  }

  const handleOnDragEnd = async (...args) => {
    const geo = {
      lat: args[0].latLng.lat(),
      lng: args[0].latLng.lng(),
    }

    setLatitude(geo.lat)
    setLongitude(geo.lng)

    const reverseGeo = await reverseGeocode(geo)

    handleDetailsRequest(geo, reverseGeo.placeId)
  }

  return (
    <div>
      {isAdmin && (
        <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
          <Heading size={2} mb={2}>
            Assign Place Id and Geocode
          </Heading>
          <Field
            name="placeId"
            component={GooglePlacesSearchField}
            value={address}
            onChange={handleOnChange}
            onSelect={handleOnSelect}
            validate={validationRules.place}
            placeholder="Enter business name or address"
            label="Google place ID"
            type="text"
            width={1}
          />
        </ShadowBox>
      )}
      {isAdmin && longitude && latitude && (
        <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
          <GooglePlaceMap
            isMarkerShown
            lng={longitude}
            lat={latitude}
            label={placeName}
            onDragEnd={handleOnDragEnd}
          />
        </ShadowBox>
      )}
      <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
        <Heading size={2} pb={2}>
          Location Information
        </Heading>
        {error && <ErrorPencil my={2}>{error}</ErrorPencil>}
        <Field
          label="Business name"
          name="name"
          component={InputField}
          validate={validationRules.name}
          placeholder="Business name"
          type="text"
          width={1}
        />
        <Field
          label="Business street address"
          name="address"
          component={InputField}
          validate={validationRules.address}
          placeholder="Business street address"
          type="text"
          width={1}
        />
        <Field
          label="City"
          name="city"
          component={InputField}
          validate={validationRules.city}
          placeholder="City"
          type="text"
          width={1}
        />
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
          maxLength="2"
          width={1}
        />
        <Field
          label="Zip code"
          name="zipcode"
          component={InputField}
          validate={validationRules.zipcode}
          placeholder="Zip code"
          type="tel"
          width={1}
        />
        {isEdit && (
          <Fragment>
            <Field
              label="Website"
              name="websiteUrl"
              component={InputField}
              validate={validationRules.website}
              placeholder="Website"
              type="text"
              width={1}
            />
            <Field
              label="Menu link"
              name="menuUrl"
              component={InputField}
              validate={validationRules.menu}
              placeholder="Menu link"
              type="text"
              width={1}
            />
          </Fragment>
        )}

        <Field
          label="Business phone number"
          name="phoneWork"
          component={InputField}
          validate={validationRules.phone}
          placeholder="Business phone number"
          type="tel"
          width={1}
        />
        <Field
          label="Business Description"
          name="description"
          component={TextArea}
          validate={validationRules.description}
          placeholder="Business Description"
          type="text"
          width={1}
        />
      </ShadowBox>
    </div>
  )
}

LocationInfoFields.propTypes = propTypes

export default LocationInfoFields
