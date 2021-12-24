import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import TransferOwnershipLink from '.'

storiesOf('TransferOwnershipLink', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <TransferOwnershipLink link={'http://www.charlesbronson.info/new.html'} />
  ))
