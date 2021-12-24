import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import { Notification } from 'models'
import Decorator from 'utils/storybook'

import NotificationCard from '.'

storiesOf('NotificationCard', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <NotificationCard
      notification={
        new Notification({ uid: '4jhg', message: 'Default Notification' })
      }
    />
  ))
  .add('success', () => (
    <NotificationCard
      notification={
        new Notification({
          uid: '4jhg',
          type: 'success',
          message: 'Success Notification',
        })
      }
    />
  ))
  .add('warning', () => (
    <NotificationCard
      notification={
        new Notification({
          uid: '4jhg',
          type: 'warning',
          message: 'Warning Notification',
        })
      }
    />
  ))
  .add('error', () => (
    <NotificationCard
      notification={
        new Notification({
          uid: '4jhg',
          type: 'error',
          message: 'Error Notification',
        })
      }
    />
  ))
  .add('info', () => (
    <NotificationCard
      notification={
        new Notification({
          uid: '4jhg',
          type: 'info',
          message: 'Info Notification',
        })
      }
    />
  ))
  .add('long message', () => (
    <NotificationCard
      notification={
        new Notification({
          uid: '4jhg',
          type: 'success',
          message:
            'This is a super long Success Notification saying that things happened',
        })
      }
    />
  ))
