import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import StyledMobileMenu from './style'
import Seperator from 'components/Seperator'
import MenuItem from 'components/MenuItem'
import theme from 'theme'

const mobileMenuItemProps = {
  textAlign: 'center',
  overBg: 'transparent',
  overColor: theme.brandColor,
  fontSize: 2,
  py: 2,
}

class MobileMenu extends PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    absolute: PropTypes.bool,
    top: PropTypes.number,
    onClose: PropTypes.func,
    anchorEl: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([MenuItem]) })),
      PropTypes.shape({ type: PropTypes.oneOf([MenuItem]) }),
    ]),
  }

  static defaultProps = {
    show: false,
    absolute: false,
    top: 0,
  }

  constructor(props) {
    super(props)

    if (props.show) {
      document.addEventListener('mouseup', this.handleOutsideClick)
      document.addEventListener('touchend', this.handleOutsideClick)
    }
  }

  /* istanbul ignore next */
  componentDidUpdate(prevProps) {
    if (this.props.show && !prevProps.show) {
      document.addEventListener('mouseup', this.handleOutsideClick)
      document.addEventListener('touchend', this.handleOutsideClick)
    } else {
      document.removeEventListener('mouseup', this.handleOutsideClick)
      document.removeEventListener('touchend', this.handleOutsideClick)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOutsideClick)
    document.removeEventListener('touchend', this.handleOutsideClick)
  }

  handleOutsideClick = (event) => {
    if (
      this.el.contains(event.target) ||
      event.target === this.props.anchorEl
    ) {
      return
    }

    event.stopPropagation()
    this.props.onClose && this.props.onClose(event)
  }

  handleItemClick = () => {
    this.props.onClose && this.props.onClose()
  }

  buildChildren = (children) => {
    return children.reduce((arr, menuItem, index) => {
      arr.push(
        React.cloneElement(menuItem, {
          ...mobileMenuItemProps,
          key: `${index}-menuItem`,
          onClick: (event) => {
            this.handleItemClick(event)
            menuItem.props.onClick && menuItem.props.onClick(event)
          },
        })
      )
      if (index !== children.length - 1) {
        arr.push(<Seperator key={`${index}-sep`} />)
      }
      return arr
    }, [])
  }

  _setRef = (el) => {
    this.el = el
  }

  render() {
    const { show, children, ...styledProps } = this.props
    return (
      <StyledMobileMenu
        menuRef={(el) => this._setRef(el)}
        show={show}
        width="100%"
        py={0}
        {...styledProps}
      >
        {this.buildChildren(children)}
      </StyledMobileMenu>
    )
  }
}

export default MobileMenu
