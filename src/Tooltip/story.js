import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from '../../utils/storybook'
import { Padding } from 'components/StoryDecorators'
import FlatButton from 'components/FlatButton'

import Tooltip from '.'

storiesOf('Tooltip', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Padding p={'100px'}>
      <Tooltip content={'Whammmy'}>
        <FlatButton primary>Show Tooltip</FlatButton>
      </Tooltip>
    </Padding>
  ))
