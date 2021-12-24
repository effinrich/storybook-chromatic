/*global google*/
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SubmissionError } from 'redux-form/immutable'

import { geocodeFromZip } from 'utils/geolocation'
import apiErrorHandler from 'utils/apiErrorHandler'

import { createLocation } from 'store/locations/duck'

export default function useCreateLocationForm({ change, onDone }) {
  const [formData, setFormData] = useState(null)
  const [locationLatLng, setLocationLatLng] = useState(null)
  const [isCreateSuccess, setIsCreateSuccess] = useState(false)
  const [createdId, setCreatedId] = useState(null)

  const dispatch = useDispatch()

  const handleGoogleDetails = useCallback(
    (placeId) => {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      )
      service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          change('googlePlaceId', placeId)
          change('location', place.name && place.name)

          let zipcode

          place.address_components.forEach((addressItem) => {
            addressItem.types.forEach((type) => {
              if (type === 'postal_code') {
                zipcode = addressItem.short_name
              }
            })
          })

          handleGeoByZip(zipcode)
        }

        setFormData({
          googlePlaceId: placeId,
        })
      })
    },
    [change]
  )

  const handleSelectLocation = (address, placeId) => {
    if (placeId) {
      handleGoogleDetails(placeId)
    }
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

  const handleSubmitForm = async (values) => {
    setIsCreateSuccess(false)

    const body = {
      ...formData,
      phone: values.get('phone'),
      locationGroupId: values.get('locationGroupId'),
    }

    const { error, payload } = await dispatch(createLocation(body))

    if (error) {
      throw new SubmissionError({
        _error: apiErrorHandler(payload, payload.message),
      })
    } else {
      setCreatedId(payload.result[0])
      setIsCreateSuccess(true)
      onDone && onDone()
    }
  }

  return {
    locationLatLng,
    isCreateSuccess,
    createdId,
    handleGeoByZip,
    handleSelectLocation,
    handleSubmitForm,
  }
}
