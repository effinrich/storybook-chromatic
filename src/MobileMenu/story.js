import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import Decorator from 'utils/storybook'

import MobileMenu from '.'
import MenuItem from '../MenuItem'

storiesOf('MobileMenu', module)
  .addDecorator(Decorator)
  .addDecorator(withKnobs)
  .add('shown (use knobs)', () => (
    <MobileMenu show={boolean('Show', true)}>
      <MenuItem primaryText="Account" />
      <MenuItem primaryText="Logout" />
    </MobileMenu>
  ))
  .add('hidden (use knobs)', () => (
    <MobileMenu show={boolean('Show', false)}>
      <MenuItem primaryText="Account" />
      <MenuItem primaryText="Logout" />
    </MobileMenu>
  ))
