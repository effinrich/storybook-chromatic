import React, { PureComponent } from 'react'
import shortid from 'shortid'
import { OrderedMap } from 'immutable'

import Notifications from '.'
import { Notification as NotificationModel } from 'models'

export default class NotificationStoryWrapper extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      notifications: [
        {
          uid: shortid.generate(),
          type: 'success',
          message: 'This was a success',
        },
        {
          uid: shortid.generate(),
          type: 'error',
          message:
            'This was a super long error notification saying that something went wrong',
        },
        {
          uid: shortid.generate(),
          type: 'warning',
          message: 'This was a warning',
        },
        {
          uid: shortid.generate(),
          type: 'info',
          message: 'This was some info',
        },
      ].reduce(
        (om, n) => om.set(n.uid, new NotificationModel(n)),
        new OrderedMap()
      ),
    }
  }

  handleRemove = (notification) =>
    this.setState((prevState) => ({
      notifications: prevState.notifications.delete(notification.uid),
    }))

  render() {
    return (
      <Notifications
        autoCloseAfter={10}
        notifications={this.state.notifications}
        onRemove={this.handleRemove}
      />
    )
  }
}
