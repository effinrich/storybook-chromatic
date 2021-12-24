import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { LoadScript } from '@react-google-maps/api'

import Decorator from 'utils/storybook'

import GooglePlaceMap from '.'

const handleDragEnd = () => {}

storiesOf('GooglePlaceMap', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyDjdSJ2P0AI6piIC0Y51AgCpNAjGWsf6xg"
    >
      <GooglePlaceMap
        isMarkerShown
        lng={-118.47826250000003}
        lat={33.9972735}
        label="Freebird"
        onDragEnd={handleDragEnd}
      />
    </LoadScript>
  ))
