import React, { useState, useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { FaLocationArrow } from 'react-icons/fa'

import StyledGooglePlaceMap from './style'

const propTypes = {
  isMarkerShown: PropTypes.bool,
  lng: PropTypes.number,
  lat: PropTypes.number,
  label: PropTypes.string,
  onDragEnd: PropTypes.func,
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.object,
  containerElement: PropTypes.object,
  mapElement: PropTypes.object,
}

const defaultProps = {
  // googleMapURL:
  //   'https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '100%' }} />,
}

const GooglePlaceMap = ({ lng, lat, label, onDragEnd }) => {
  const [location, setLocation] = useState({ lat: lat, lng: lng })
  const [isOpen, setIsOpen] = useState(true)
  const markerRef = useRef(null)
  const mapRef = useRef(null)

  const handleToggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleOnLoad = useCallback(
    (map) => {
      mapRef.current = map
    },
    [mapRef]
  )

  const handleOnMarkerLoad = useCallback(
    (marker) => {
      markerRef.current = marker
    },
    [markerRef]
  )

  useEffect(() => {
    setLocation({ lat: lat, lng: lng })
  }, [lng, lat])

  return (
    <StyledGooglePlaceMap>
      <GoogleMap
        zoom={12}
        center={location}
        mapContainerStyle={{
          height: '400px',
          maxWidth: '100%',
        }}
        onLoad={handleOnLoad}
      >
        <Marker
          position={location}
          onClick={handleToggleOpen}
          draggable
          onLoad={handleOnMarkerLoad}
          onDragEnd={onDragEnd}
        >
          {isOpen && (
            <InfoWindow onCloseClick={handleToggleOpen} position={location}>
              <div>
                <FaLocationArrow /> {label}
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </StyledGooglePlaceMap>
  )
}

GooglePlaceMap.propTypes = propTypes
GooglePlaceMap.defaultProps = defaultProps

export default GooglePlaceMap
