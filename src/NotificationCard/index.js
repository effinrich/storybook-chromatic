import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import omit from 'lodash/omit'

import { Notification } from 'models'
import StyledNotificationCard from './style'

import Flex from '../Flex'
import Box from '../Box'

export default class NotificationCard extends PureComponent {
  static propTypes = {
    notification: PropTypes.instanceOf(Notification),
    bg: PropTypes.string,
    onRemove: PropTypes.func,
    autoCloseAfter: PropTypes.number,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.array,
    ]),
  }

  static defaultProps = {
    width: '300px',
  }

  componentDidMount() {
    if (this.props.autoCloseAfter) {
      this.timeout = setTimeout(
        () => this.handleRequestClose(),
        this.props.autoCloseAfter
      )
    }
  }

  handleRequestClose = () => {
    /* istanbul ignore else */
    if (this.props.onRemove) {
      clearTimeout(this.timeout)
      this.props.onRemove(this.props.notification)
    }
  }

  renderNotificationIcon = (notificationType) => {
    const NotificationIconMap = {
      error: FaExclamationCircle,
      warning: FaExclamationTriangle,
      info: FaInfoCircle,
    }

    const DefaultIcon = FaCheck

    const Icon = NotificationIconMap[notificationType] || DefaultIcon

    return <Icon />
  }

  render() {
    const { notification, ...styleProps } = this.props
    return (
      <StyledNotificationCard
        type={notification.type}
        {...omit(styleProps, ['onRemove'])}
      >
        <Flex alignItems="center">
          <Box flex="0">{this.renderNotificationIcon(notification.type)}</Box>
          <Box flex="1" px={2}>
            {notification.message}
          </Box>
          <Box flex="0">
            <MdClose onClick={this.handleRequestClose} />
          </Box>
        </Flex>
      </StyledNotificationCard>
    )
  }
}
