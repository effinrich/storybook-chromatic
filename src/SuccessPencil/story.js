import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import SuccessPencil from '.'

storiesOf('SuccessPencil', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <SuccessPencil>This is a success inside a pencil</SuccessPencil>
  ))
