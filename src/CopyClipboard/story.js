import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import CopyClipboard from '.'

storiesOf('CopyClipboard', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <CopyClipboard link={'http://www.charlesbronson.info/new.html'} />
  ))
  .add('w/icon only', () => (
    <CopyClipboard link={'http://www.charlesbronson.info/new.html'} iconOnly />
  ))
