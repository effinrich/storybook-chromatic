import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import AsyncSelect from '.'

storiesOf('AsyncSelect', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <AsyncSelect loadOptions={() => {}} altLabel="Enter whatnot..." />
  ))
  .add('w/help text', () => (
    <AsyncSelect
      loadOptions={() => {}}
      altLabel="Enter whatnot..."
      helpText="Just type and...ya"
    />
  ))
