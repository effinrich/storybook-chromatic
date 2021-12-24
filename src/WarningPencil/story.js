import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import WarningPencil from '.'

storiesOf('WarningPencil', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <WarningPencil>This is a warning inside a pencil</WarningPencil>
  ))
