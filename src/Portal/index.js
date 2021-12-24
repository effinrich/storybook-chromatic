import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Portal as ReactPortal } from 'react-portal'

export default class Portal extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpened: PropTypes.bool,
    onOpen: PropTypes.func,
    portalRef: PropTypes.func,
  }
  static defaultProps = {
    isOpened: false,
    onOpen: /* istanbul ignore next */ () => {},
    portalRef: /* istanbul ignore next */ () => {},
  }
  componentDidMount() {
    if (this.props.isOpened) {
      this.props.onOpen()
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.isOpened && this.props.isOpened) {
      this.props.onOpen()
    }
  }
  render() {
    const { isOpened, children, portalRef, ...restProps } = this.props

    if (!isOpened) return null

    return (
      <ReactPortal {...restProps}>
        <div ref={portalRef}>{children}</div>
      </ReactPortal>
    )
  }
}
