import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import locationFixture from 'fixtures/fetch-location-by-id.json'
import { Location } from 'models'

import Decorator from 'utils/storybook'

import LocationImageGrid from '.'

const location = new Location(locationFixture.data[0])

const primaryPhoto =
  location.photos.filter((p) => p.get('isPrimary')).first() ||
  location.photos.first()

storiesOf('LocationImageGrid', module)
  .addDecorator(Decorator)
  .add('> than 9 images', () => (
    <LocationImageGrid
      primaryPhoto={primaryPhoto}
      photos={location.photos.filter((p) => p !== primaryPhoto)}
    />
  ))
  .add('< than 9 images', () => (
    <LocationImageGrid
      primaryPhoto={primaryPhoto}
      photos={location.photos.setSize(7).filter((p) => p !== primaryPhoto)}
    />
  ))
