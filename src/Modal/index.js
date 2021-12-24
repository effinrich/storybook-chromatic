import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MdCancel } from 'react-icons/md'
import { Transition } from 'react-transition-group'
import omit from 'lodash/omit'

import theme from 'theme'

import Portal from '../Portal'
import FlatButton from '../FlatButton'
import ReactIconWrapper from '../ReactIconWrapper'

import {
  StyledModalBackdrop,
  StyledModalWrapper,
  StyledCloseButton,
} from './style'
import { mapBackdropProps, mapContainerProps } from './helpers'

const duration = 300

const backdropTransition = {
  default: {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  },
  transitionStyles: {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  },
}

const containerTransition = {
  default: {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateY(100px)',
  },
  transitionStyles: {
    entering: { transform: 'translateY(100px)' },
    entered: { transform: 'translateY(0px)' },
    exiting: { transform: 'translateY(100px)' },
    exited: { transform: 'translateY(100px)' },
  },
}

export default class Modal extends PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    align: PropTypes.oneOfType([
      PropTypes.oneOf(['top', 'bottom', 'center', 'fullscreen']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['top', 'bottom', 'center', 'fullscreen'])
      ),
    ]),
    noX: PropTypes.bool,
    onClose: PropTypes.func,
    width: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ),
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ]),
    maxW: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    maxH: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    minH: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    isVideo: PropTypes.bool,
    bg: PropTypes.string,
    children: PropTypes.func.isRequired,
    closeOnOutsideClick: PropTypes.bool,
  }

  static defaultProps = {
    show: false,
    isVideo: false,
    align: 'center',
    noX: false,
    p: 2,
    onClose: /* istanbul ignore next */ () => {},
    closeOnOutsideClick: true,
  }

  constructor(props) {
    super(props)

    this.ogBodyScroll = null

    this.state = {
      exited: true,
    }
  }

  componentDidMount() {
    if (this.props.show) {
      this.setState({ exited: false })
      this.freezeBody()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.setState({ exited: false })
      this.freezeBody()
    }
    if (this.props.show && !this.state.exited) {
      this.addOutsideClickListeners()
    } else {
      this.removeOutsideClickListeners()
    }
  }

  componentWillUnmount() {
    this.unfreezeBody()
    this.removeOutsideClickListeners()
  }

  addOutsideClickListeners = () => {
    document.addEventListener('mouseup', this.handleOutsideMouseClick)
    document.addEventListener('touchend', this.handleOutsideMouseClick)
  }

  removeOutsideClickListeners = () => {
    document.removeEventListener('mouseup', this.handleOutsideMouseClick)
    document.removeEventListener('touchend', this.handleOutsideMouseClick)
  }

  freezeBody = () => {
    this.ogBodyScroll = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  unfreezeBody = () => {
    document.body.style.overflow = this.ogBodyScroll
  }

  getBackdropTransitionStyles = (state) => ({
    ...backdropTransition.default,
    ...backdropTransition.transitionStyles[state],
  })

  getContainerTransitionStyles = (state, align) => ({
    ...containerTransition.default,
    ...containerTransition.transitionStyles[state],
    ...(align === 'fullscreen' ? { flex: '1' } : {}),
  })

  handleClose = () => {
    this.setState({ exited: true })
    this.unfreezeBody()
  }

  handleOutsideMouseClick = (event) => {
    if (this.props.closeOnOutsideClick) {
      if (
        this.childContainer.contains(event.target) &&
        event.target.tagName !== 'A'
      ) {
        return
      }

      event.stopPropagation()
      this.handleClose()
    }
  }

  render() {
    const {
      show,
      noX,
      align,
      width,
      children,
      onClose,
      maxW,
      maxH,
      minH,
      bg,
      ...restProps
    } = this.props

    const { exited } = this.state

    const backdropProps = mapBackdropProps(align)
    const containerProps = mapContainerProps(align)

    return (
      <Portal isOpened={show}>
        <Transition
          in={!exited}
          onExited={() => onClose()}
          timeout={{
            enter: 50,
            exit: duration,
          }}
          appear
        >
          {(state) => (
            <StyledModalBackdrop
              style={this.getBackdropTransitionStyles(state)}
              {...backdropProps}
              {...omit(restProps, ['closeOnOutsideClick'])}
            >
              <StyledModalWrapper
                bg={bg ? bg : 'white'}
                containerRef={(el) => (this.childContainer = el)}
                style={this.getContainerTransitionStyles(state, align)}
                width={width}
                maxW={maxW}
                maxH={maxH}
                minH={minH}
                {...containerProps}
                {...omit(restProps, ['closeOnOutsideClick', 'isVideo'])}
              >
                {!noX && (
                  <StyledCloseButton p={1} justifyContent="flex-end">
                    <FlatButton
                      p={0}
                      overBg="transparent"
                      onClick={this.handleClose}
                    >
                      <ReactIconWrapper
                        icon={MdCancel}
                        fontSize={4}
                        color={theme.darkMedGrey}
                      />
                    </FlatButton>
                  </StyledCloseButton>
                )}
                {children(this.handleClose)}
              </StyledModalWrapper>
            </StyledModalBackdrop>
          )}
        </Transition>
      </Portal>
    )
  }
}
