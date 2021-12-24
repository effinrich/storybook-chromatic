import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import CvcField from '.'

storiesOf('CreditCardInput/CvcField', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <CvcField
      label="CVC"
      placeholder="CVC"
      input={{ name: 'test' }}
      type="text"
      meta={{}}
    />
  ))
