import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { FaAmbulance } from 'react-icons/fa'

import Decorator from 'utils/storybook'

import ReactIconWrapper from '.'

storiesOf('ReactIconWrapper', module)
  .addDecorator(Decorator)
  .add('naked story', () => <ReactIconWrapper icon={FaAmbulance} />)
