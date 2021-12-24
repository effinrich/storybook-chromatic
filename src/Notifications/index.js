/**
 * NOTE: This file is pretty much untested,
 * WHY? Becuase react-transition-group is a pain in the ass
 * to test.
 *
 * Do not repeat being careless like this elsewhere. I carry
 * this burden with heavy shame
 *
 * - Duro
 *
 */

import React, { Component, createRef } from 'react'
// import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { TransitionGroup } from 'react-transition-group'
import IPT from 'react-immutable-proptypes'

import { Notification } from 'models'
import StyledNotifications, { StyledNotificationTransition } from './style'
import NotificationCard from '../NotificationCard'
import Box from '../Box'

class NotificationFade extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props)
    this.wrapper = createRef()
    this.state = {
      height: 'auto',
    }
  }

  /* istanbul ignore next */
  componentDidMount() {
    // const el = findDOMNode(this)
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(() => ({ height: `${this.wrapper.offsetHeight}px` }))
  }

  /* istanbul ignore next */
  render() {
    // eslint-disable-next-line react/prop-types
    const { children, transitionTime, ...props } = this.props
    const { height } = this.state
    return (
      <StyledNotificationTransition
        {...props}
        timeout={transitionTime}
        classNames="notification"
        height={height}
        ref={this.wrapper}
      >
        {children}
      </StyledNotificationTransition>
    )
  }
}

const propTypes = {
  notifications: IPT.orderedMapOf(PropTypes.instanceOf(Notification)),
  autoCloseAfter: PropTypes.number,
  onRemove: PropTypes.func,
  transitionTime: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ]),
}

const defaultProps = {
  transitionTime: 500,
}

const Notifications = ({
  notifications,
  autoCloseAfter,
  onRemove,
  width,
  transitionTime,
}) => {
  return (
    <StyledNotifications>
      <TransitionGroup appear>
        {
          /* istanbul ignore next */ notifications &&
            notifications.valueSeq().map(
              /* istanbul ignore next */ (n) => (
                <NotificationFade transitionTime={transitionTime} key={n.uid}>
                  <Box pb={1}>
                    <NotificationCard
                      width={width}
                      autoCloseAfter={
                        autoCloseAfter ? autoCloseAfter * 1000 : undefined
                      }
                      notification={n}
                      onRemove={onRemove}
                    />
                  </Box>
                </NotificationFade>
              )
            )
        }
      </TransitionGroup>
    </StyledNotifications>
  )
}

Notifications.propTypes = propTypes
Notifications.defaultProps = defaultProps

export default Notifications
