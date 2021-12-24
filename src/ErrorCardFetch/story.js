import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import ErrorCardFetch from '.'

storiesOf('ErrorCardFetch', module)
  .addDecorator(Decorator)
  .add('naked story', () => <ErrorCardFetch message="Stuff is broke" />)
