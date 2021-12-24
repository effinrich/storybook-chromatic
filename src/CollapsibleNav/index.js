import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { FaCheck, FaChevronDown, FaCaretDown, FaCaretUp } from 'react-icons/fa'

import theme from 'theme'
import {
  StyledNav,
  StyledNavItem,
  StyledNavList,
  StyledNavItemLink,
  // StyledSubNavItemLink,
  StyledNavItemSeperator,
  StyledSubNavItemContainer,
  StyledNavItemIcon,
} from './style'

/**
 * PUBLIC: CollapsibleNavItem
 * Note: This is used as a config object, but doesn't actually render
 */

const CollapsibleNavItem = () => null

// interface ICollapsibleNavItemProps {
//   welcome?: any
// }

CollapsibleNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.func,
  exact: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({ type: PropTypes.oneOf([CollapsibleNavItem]) })
    ),
    PropTypes.shape({ type: PropTypes.oneOf([CollapsibleNavItem]) }),
  ]),
  hidden: PropTypes.bool,
  labelColor: PropTypes.string,
  activeColor: PropTypes.string,
  isNavItemsBg: PropTypes.bool,
}

CollapsibleNavItem.defaultProps = {
  exact: false,
}

/**
 * Private: CollapsibleNavItemRenderer
 * Note: This is used internally, and only exported for testing
 */

const CollapsibleNavItemRenderer = ({
  to,
  onClick,
  collapsible,
  match,
  open,
  seperator,
  children,
  label,
  hidden,
  labelColor,
  activeColor,
  isNavItemsBg,
  isSubmenu,
  submenuIsOpen,
}) => {
  const styleProps = {
    match,
    collapsible,
    open,
    hidden,
    labelColor,
    activeColor,
    isNavItemsBg,
  }

  return (
    <StyledNavItem {...styleProps}>
      <StyledNavItemLink
        to={to}
        onClick={(e) => onClick(e, match)}
        {...styleProps}
      >
        {label}
        {collapsible && match && (
          <StyledNavItemIcon>
            {open ? <FaCheck /> : <FaChevronDown />}
          </StyledNavItemIcon>
        )}
        {isSubmenu && (
          <StyledNavItemIcon>
            {submenuIsOpen ? <FaCaretUp /> : <FaCaretDown />}
          </StyledNavItemIcon>
        )}
      </StyledNavItemLink>
      {children && (
        <StyledSubNavItemContainer pb={1} {...styleProps}>
          {children.map((child, index) => {
            return (
              <Route
                key={index}
                path={child.props.to}
                exact={child.props.exact}
                children={({ match: subMatch }) => {
                  return (
                    <CollapsibleSubNavItemRenderer
                      subMatch={subMatch}
                      label={child.props.label}
                      onClick={onClick}
                      {...child.props}
                      {...styleProps}
                    />
                  )
                }}
              />
            )
          })}
        </StyledSubNavItemContainer>
      )}
      {seperator && <StyledNavItemSeperator {...styleProps} />}
    </StyledNavItem>
  )
}

CollapsibleNavItemRenderer.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({ type: PropTypes.oneOf([CollapsibleNavItem]) })
    ),
    PropTypes.shape({ type: PropTypes.oneOf([CollapsibleNavItem]) }),
  ]),
  onClick: PropTypes.func.isRequired,
  collapsible: PropTypes.bool,
  match: PropTypes.object,
  open: PropTypes.bool,
  seperator: PropTypes.bool,
  hidden: PropTypes.bool,
  navBgColor: PropTypes.string,
  isNavItemsBg: PropTypes.bool,
  labelColor: PropTypes.string,
  activeColor: PropTypes.string,
  isSubmenu: PropTypes.bool,
  submenuIsOpen: PropTypes.bool,
}

CollapsibleNavItemRenderer.defaultProps = {
  navBgColor: 'white',
  labelColor: theme.defaultTextColor,
  activeColor: theme.defaultTextColor,
  isSubmenu: false,
  submenuIsOpen: false,
  isNavItemsBg: false,
}

CollapsibleNavItemRenderer.displayName = 'CollapsibleNavItemRenderer'

/**
 * Private: CollapsibleNavItemRenderer
 * Note: This is used internally, and only exported for testing
 */

const CollapsibleSubNavItemRenderer = ({
  to,
  onClick,
  subMatch,
  open,
  label,
  hidden,
  setSubNavOpen,
  labelColor,
  activeColor,
  isNavItemsBg,
}) => {
  const styleProps = {
    subMatch,
    open,
    hidden,
    labelColor,
    activeColor,
    isNavItemsBg,
  }
  return (
    <StyledNavItem {...styleProps}>
      <StyledNavItemLink
        to={to}
        onClick={(e) => onClick(e, subMatch)}
        py={isNavItemsBg ? 2 : 1}
        {...styleProps}
      >
        {label}
      </StyledNavItemLink>
    </StyledNavItem>
  )
}

CollapsibleSubNavItemRenderer.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({ type: PropTypes.oneOf([CollapsibleNavItem]) })
    ),
    PropTypes.shape({ type: PropTypes.oneOf([CollapsibleNavItem]) }),
  ]),
  onClick: PropTypes.func.isRequired,
  subMatch: PropTypes.object,
  open: PropTypes.bool,
  hidden: PropTypes.bool,
  setSubNavOpen: PropTypes.func,
  labelColor: PropTypes.string,
  activeColor: PropTypes.string,
  isNavItemsBg: PropTypes.bool,
}

CollapsibleSubNavItemRenderer.defaultProps = {
  labelColor: theme.defaultTextColor,
  activeColor: theme.defaultTextColor,
  isNavItemsBg: false,
}

CollapsibleSubNavItemRenderer.displayName = 'CollapsibleSubNavItemRenderer'

export {
  CollapsibleNavItem,
  CollapsibleNavItemRenderer,
  CollapsibleSubNavItemRenderer,
}

/**
 * CollapsibleNav
 */

export default class CollapsibleNav extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf([CollapsibleNavItem]),
        })
      ),
      PropTypes.shape({
        type: PropTypes.oneOf([CollapsibleNavItem]),
      }),
    ]),
    collapsible: PropTypes.bool,
    label: PropTypes.string,
    navBgColor: PropTypes.string,
    labelColor: PropTypes.string,
    activeColor: PropTypes.string,
    isNavItemsBg: PropTypes.bool,
  }

  static defaultProps = {
    collapsible: false,
    navBgColor: 'white',
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  toggleNav = () => {
    if (this.props.collapsible) {
      if (!this.state.open) {
        document.addEventListener('mouseup', this.handleOutsideMouseClick)
      } else {
        document.removeEventListener('mouseup', this.handleOutsideMouseClick)
      }
      this.setState((prevState) => ({ open: !prevState.open }))
    }
  }

  handleItemClick = (event) => {
    if (this.props.collapsible && !this.state.open) {
      event.preventDefault()
    }
    this.toggleNav()
  }

  handleOutsideMouseClick = (event) => {
    if (this.el.contains(event.target)) {
      return
    }

    event.stopPropagation()
    this.setState(() => ({ open: false }))
    document.removeEventListener('mouseup', this.handleOutsideMouseClick)
  }

  _setRef = (el) => {
    this.el = el
  }

  render() {
    const {
      collapsible,
      label,
      navBgColor,
      labelColor,
      isNavItemsBg,
      activeColor,
    } = this.props
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children]
    const { open } = this.state
    const styleProps = {
      collapsible,
      open,
      navBgColor,
      labelColor,
      activeColor,
      isNavItemsBg,
    }

    return (
      <StyledNav ref={(el) => this._setRef(el)} {...styleProps}>
        <StyledNavList {...styleProps}>
          {children.map((child, index) => {
            return (
              <Route
                key={index}
                path={child.props.to}
                exact={child.props.exact}
                children={({ match }) => (
                  <CollapsibleNavItemRenderer
                    match={match}
                    label={label}
                    onClick={this.handleItemClick}
                    seperator={index !== children.length - 1}
                    {...child.props}
                    {...styleProps}
                  />
                )}
              />
            )
          })}
        </StyledNavList>
      </StyledNav>
    )
  }
}
