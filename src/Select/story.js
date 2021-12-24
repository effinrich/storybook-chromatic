import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import { usStateOptions } from 'utils/usStates'
import Decorator from 'utils/storybook'

import Select from '.'

storiesOf('Select', module)
  .addDecorator(Decorator)
  .add('naked story', () => <Select value={{}} options={usStateOptions} />)
  .add('w/ label', () => (
    <Select value={{}} options={usStateOptions} altLabel="This is a label" />
  ))
  .add('w/ label and value', () => (
    <Select
      value="CA"
      options={usStateOptions}
      altLabel="This is a label"
      placeholder="placeholder"
    />
  ))
