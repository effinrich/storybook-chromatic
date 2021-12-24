import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import { Padding } from 'components/StoryDecorators'
import Decorator from 'utils/storybook'

import ProgressBar from '.'

storiesOf('ProgressBar', module)
  .addDecorator(Decorator)
  .add('naked story (hidden by default)', () => (
    <Padding>
      <ProgressBar progress={1 / 2} />
    </Padding>
  ))
  .add('shown', () => (
    <Padding>
      <ProgressBar show progress={1 / 2} />
    </Padding>
  ))
