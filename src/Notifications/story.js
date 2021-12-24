import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import NotificationsWrapper from './story.wrappers'

storiesOf('Notifications', module)
  .addDecorator(Decorator)
  .add('naked story', () => <NotificationsWrapper />)
