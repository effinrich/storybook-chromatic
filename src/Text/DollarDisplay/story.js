import React from 'react'
import { storiesOf } from '@storybook/react'

import Decorator from 'utils/storybook'

import DollarDisplay from '.'

storiesOf('Text/DollarDisplay', module)
  .addDecorator(Decorator)
  .add('default', () => <DollarDisplay amount={10} />)
  .add('large', () => <DollarDisplay amount={10} large />)
