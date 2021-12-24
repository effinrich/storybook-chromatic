import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

import Portal from '../Portal'

import StyledPopOver from './style'

export default class PopOver extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    anchorEl: PropTypes.object,
    hAlign: PropTypes.oneOf(['left', 'right']),
    closeOnOutsideClick: PropTypes.bool,
    show: PropTypes.bool,
    enterTime: PropTypes.number,
    exitTime: PropTypes.number,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    show: false,
    hAlign: 'left',
    closeOnOutsideClick: true,
    enterTime: 300,
    exitTime: 300,
  }

  constructor(props) {
    super(props)
    this.state = {
      portalOpen: props.show,
      revealPopOver: false,
    }
    this.handlePortalOpen = this.handlePortalOpen.bind(this)
    this.handlePortalClose = this.handlePortalClose.bind(this)
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.state.portalOpen && nextProps.show) {
      return this.setState({ portalOpen: true })
    }
    if (this.props.show !== nextProps.show) {
      return this.setState({ revealPopOver: nextProps.show })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOutsideMouseClick)
    document.removeEventListener('touchend', this.handleOutsideMouseClick)
  }

  handlePortalOpen() {
    this.setState({ revealPopOver: true })
    document.addEventListener('mouseup', this.handleOutsideMouseClick)
    document.addEventListener('touchend', this.handleOutsideMouseClick)
  }

  handlePortalClose() {
    this.setState({ portalOpen: false })
    document.removeEventListener('mouseup', this.handleOutsideMouseClick)
    document.removeEventListener('touchend', this.handleOutsideMouseClick)
    this.props.onClose && this.props.onClose()
  }

  handleOutsideMouseClick(event) {
    if (this.props.closeOnOutsideClick) {
      if (
        (this.portal.contains(event.target) && event.target.tagName !== 'A') ||
        event.target === this.props.anchorEl
      ) {
        return
      }

      event.stopPropagation()
      this.setState({ revealPopOver: false })
    }
  }

  render() {
    const { children, anchorEl, hAlign, enterTime, exitTime, ...styledProps } =
      this.props
    const { portalOpen, revealPopOver } = this.state
    const animationTiming = { enter: enterTime, exit: exitTime }
    return (
      <Portal
        portalRef={(el) => (this.portal = el)}
        isOpened={portalOpen}
        onOpen={this.handlePortalOpen}
        style={{ backgroundColor: 'red' }}
      >
        <PopOverTransition
          onExited={this.handlePortalClose}
          in={revealPopOver}
          timeout={animationTiming}
          appear
        >
          {(transitionState) => (
            <PopOverContainer
              hAlign={hAlign}
              transitionState={transitionState}
              animationTiming={animationTiming}
              anchorEl={anchorEl}
              {...styledProps}
            >
              {children}
            </PopOverContainer>
          )}
        </PopOverTransition>
      </Portal>
    )
  }
}

export class PopOverContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    transitionState: PropTypes.string,
    animationTiming: PropTypes.object,
    anchorEl: PropTypes.object,
    hAlign: PropTypes.oneOf(['left', 'right']),
  }

  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
    }
    // this.setRef = this.setRef.bind(this)
    this.forceReposition = this.forceReposition.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.forceReposition)
    window.addEventListener('scroll', this.forceReposition)
    // Don't normally do this! We need to do this here since our animate in
    // does not work properly if the default styles are not in the DOM before we
    // transition them
    setTimeout(() => this.setState({ mounted: true }), 0)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.forceReposition)
    window.removeEventListener('scroll', this.forceReposition)
  }

  getAnchorPosition() {
    if (!this.state.mounted || !this.props.anchorEl) {
      return {}
    }
    const { anchorEl, hAlign } = this.props
    const popOverEl = this.popOverEl
    const rect = anchorEl.getBoundingClientRect()

    const calcHOffset = () => {
      if (hAlign === 'right') {
        return rect.left + (anchorEl.offsetWidth - popOverEl.offsetWidth)
      }
      return rect.left
    }

    const pos = {
      top: rect.top + anchorEl.offsetHeight,
      left: calcHOffset(),
    }

    return pos
  }

  forceReposition() {
    this.forceUpdate()
  }

  // setRef(el) {
  //   this.popOverEl = el
  // }

  render() {
    const { transitionState, animationTiming, children, ...styledProps } =
      this.props
    return (
      <StyledPopOver
        ref={(el) => (this.popOverEl = el)}
        transitionState={transitionState}
        animationTiming={animationTiming}
        style={this.getAnchorPosition()}
        {...styledProps}
      >
        {children}
      </StyledPopOver>
    )
  }
}

export class PopOverTransition extends PureComponent {
  static propTypes = {
    children: PropTypes.func,
    onExited: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
    }
  }

  componentDidMount() {
    // Don't normally do this! We need to do this here since our animate in
    // does not work properly if the default styles are not in the DOM before we
    // transition them
    setTimeout(() => this.setState({ mounted: true }), 0)
  }

  render() {
    const { children, onExited, ...transitionProps } = this.props
    const { mounted } = this.state
    return (
      <Transition
        onExited={onExited}
        {...transitionProps}
        in={mounted && transitionProps.in}
      >
        {children}
      </Transition>
    )
  }
}
