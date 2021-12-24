import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import ErrorCard from '.'

storiesOf('ErrorCard', module)
  .addDecorator(Decorator)
  .add('naked story', () => <ErrorCard />)
  .add('w/custom message', () => (
    <ErrorCard customMessage="errors and errors oh my" />
  ))
