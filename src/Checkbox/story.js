import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import Checkbox from '.'

storiesOf('Checkbox', module)
  .addDecorator(Decorator)
  .add('untouched', () => (
    <Padding>
      <Checkbox name="checkbox" onChange={action('onChange')} />
    </Padding>
  ))
  .add('touched', () => (
    <Padding>
      <Checkbox name="checkbox" checked onChange={action('onChange')} />
    </Padding>
  ))
  .add('disabled', () => (
    <Padding>
      <Checkbox name="checkbox" disabled onChange={action('onChange')} />
    </Padding>
  ))
  .add('w/error', () => (
    <Padding>
      <Checkbox name="checkbox" checked error onChange={action('onChange')} />
    </Padding>
  ))
  .add('w/warning', () => (
    <Padding>
      <Checkbox name="checkbox" checked warning onChange={action('onChange')} />
    </Padding>
  ))
