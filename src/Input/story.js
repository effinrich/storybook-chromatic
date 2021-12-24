import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import Input from '.'

storiesOf('Input', module)
  .addDecorator(Decorator)
  .add('naked story', () => <Input />)
  .add('w/bigbox', () => <Input inputTheme="bigbox" />)
  .add('w/smallbox', () => <Input inputTheme="smallbox" />)
  .add('w/smallbox & rounded', () => <Input inputTheme="smallbox" rounded />)
