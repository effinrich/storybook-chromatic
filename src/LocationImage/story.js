import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import LocationImage from '.'

storiesOf('LocationImage', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <LocationImage
      src="https://s-media-cache-ak0.pinimg.com/originals/6d/96/41/6d9641691af89520f3b19b26bca4b5fc.jpg"
      alt="Photo for kitty"
      maxWidth={100}
    />
  ))
