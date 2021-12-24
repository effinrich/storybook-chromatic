import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import ProgressCircle from '.'

storiesOf('ProgressCircle', module)
  .addDecorator(Decorator)
  .add('naked story', () => <ProgressCircle />)
