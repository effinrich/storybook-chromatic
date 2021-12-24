import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import HamburgerButton from '.'

storiesOf('HamburgerButton', module)
  .addDecorator(Decorator)
  .addDecorator(withKnobs)
  .add('interactive (use knobs)', () => (
    <HamburgerButton
      active={boolean('Active', false)}
      onClick={action('clicked')}
    />
  ))
  .add('inactive', () => <HamburgerButton />)
  .add('active', () => <HamburgerButton active />)
