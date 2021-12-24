import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import ExpirationField from '.'

storiesOf('CreditCardInput/ExpirationField', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <ExpirationField
      label="exp"
      placeholder="exp"
      input={{ name: 'test' }}
      type="text"
      meta={{}}
    />
  ))
