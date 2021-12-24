import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import ZipField from '.'

storiesOf('CreditCardInput/ZipField', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <ZipField
      label="zip"
      placeholder="zip"
      input={{ name: 'test' }}
      type="text"
      meta={{}}
    />
  ))
