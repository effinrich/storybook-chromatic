import React from 'react'
import { storiesOf } from '@storybook/react'
import { MdWhatshot } from 'react-icons/md'

import Decorator from 'utils/storybook'

import Circle from '.'

storiesOf('Circle', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Circle p={2}>
      <MdWhatshot size={34} color="black" />
    </Circle>
  ))
