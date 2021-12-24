import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import CarouselTile from '.'

const item = {
  name: 'Red O',
  distance: '8mi',
  rideContribution: 4,
  locationCategory: 'Mexican',

  id: '594fc9b60eb81615b9c47f45',
  location: 'Los Angeles, CA',

  photo:
    'https://igx.4sqi.net/img/general/560x350/8337115_VeaiCK_AUy1jAMjTqh5BOJCLwAPD9Q7o7UOQC-w8kRI.jpg',
  points: 0,
}

storiesOf('CarouselTile', module)
  .addDecorator(Decorator)
  .add('carousel tile', () => <CarouselTile item={item} />)
  .add('category carousel tile', () => <CarouselTile item={item} isCategory />)
