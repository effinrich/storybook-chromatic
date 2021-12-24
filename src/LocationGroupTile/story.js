import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import LocationGroupTile from '.'

const item = {
  name: 'Red O',
  address: '18812 Soledad Canyon Rd',
  city: 'Santa Clarita',
  state: 'CA',
  zipcode: '91351',
  id: '594fc9b60eb81615b9c47f45',
  photo:
    'https://igx.4sqi.net/img/general/560x350/8337115_VeaiCK_AUy1jAMjTqh5BOJCLwAPD9Q7o7UOQC-w8kRI.jpg',
  points: 0,
}

storiesOf('LocationGroupTile', module)
  .addDecorator(Decorator)
  .add('Location Group Tile', () => <LocationGroupTile item={item} />)
