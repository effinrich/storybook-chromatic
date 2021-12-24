import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import DateRangePicker from '.'

storiesOf('DateRangePicker', module)
  .addDecorator(Decorator)
  .add('naked story', () => <DateRangePicker />)
