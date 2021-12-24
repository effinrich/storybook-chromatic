import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import CardNumberField from '.'

storiesOf('CreditCardInput/CardNumberField', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <CardNumberField
      label="Credit Card"
      placeholder="Credit Card"
      input={{ name: 'test' }}
      type="text"
      meta={{}}
    />
  ))
