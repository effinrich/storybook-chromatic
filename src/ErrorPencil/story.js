import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import ErrorPencil from '.'

storiesOf('ErrorPencil', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <ErrorPencil>This is an error inside a pencil</ErrorPencil>
  ))
